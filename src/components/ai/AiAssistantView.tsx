import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Send, 
  ShieldAlert, 
  Bot, 
  User, 
  RefreshCw, 
  CheckCircle2, 
  Info,
  Heart
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestedAction?: string;
}

const PRESET_KNOWLEDGE: { [key: string]: string } = {
  '산책': `반려견의 적절한 산책 시간과 강도는 견종 크기와 연령에 따라 다릅니다:
1. 소형견 (말티즈, 포메라니안 등): 하루 1~2회, 회당 20~30분
2. 중·대형견 (리트리버, 보더콜리 등): 하루 2회, 회당 45~60분 이상
3. 주의사항: 아스팔트 바닥 온도 확인, 환절기 진드기 기피제 도포, 배변봉투 지참 필수!
※ 노령견이나 슬개골 탈구 질환견은 무리한 경사로 산책을 피하고 평지 위주로 산책해 주세요.`,

  '배변': `강아지 배변 훈련(하우스 트레이닝) 4단계 긍정강화 원칙:
1. 배변 신호 포착: 식사 후 15~30분 뒤, 자고 일어난 직후 바닥 냄새를 맡으며 빙빙 돌 때 즉시 패드로 유도합니다.
2. 칭찬과 보상 타이밍: 패드 위에 소변을 본 '즉시(2초 이내)' 간식과 함께 차분하게 칭찬합니다.
3. 실수 시 대처: 절대로 소리치거나 체벌하지 마세요! 냄새 제거제로 흔적을 완벽히 지우고 묵묵히 치웁니다.
4. 패드 위치: 식기나 잠자리와 최소 2미터 이상 떨어진 조용한 장소에 배치하세요.`,

  '짖음': `강아지가 자주 짖는 주요 원인과 교정 방법:
1. 요구성 짖음 (간식이나 놀아달라고 조를 때): 눈을 마주치지 말고 뒤돌아서서 완전히 무시하세요. 조용해졌을 때만 보상합니다.
2. 경계성 짖음 (현관 소리, 초인종): 작은 소리 녹음본을 틀어주고 짖지 않을 때 간식을 주는 '역조건 형성(카운터 컨디셔닝)' 훈련을 진행합니다.
3. 불안/분리불안: 외출 전 노즈워크 간식을 곳곳에 숨겨두어 주의를 분산시키세요.
※ 짖음 방지 충격 목줄은 공포와 공격성을 유발하므로 권장하지 않습니다.`,

  '초보': `초보 견주 필수 준비 체크리스트 8가지:
1. 식기: 턱 여드름 예방을 위한 스테인리스 또는 도자기 식기
2. 잠자리: 푹신하고 세탁이 쉬운 방석/하우스
3. 사료 & 영양: 이전 보호처에서 먹이던 사료를 1주일간 점진적으로 교체
4. 배변용품: 무향 배변패드 및 친환경 배변봉투
5. 산책용품: Y자형 하네스 및 2m 내외 고정 리드줄
6. 위생용품: 순한 반려견 전용 샴푸, 슬리커 브러시, 발톱깎이
7. 안전용품: 바닥 논슬립 매트 및 안전문
8. 법적 의무: 동물등록(내장형/외장형 칩) 완료하기`,

  '노령견': `7세 이상 시니어 노령견 일상 케어 가이드:
1. 환경 개선: 관절 보호를 위한 실내 논슬립 매트 시공 및 완만한 슬라이드 경사로 설치
2. 식사 조절: 소화 흡수율이 높고 단백질 분해 부담이 적은 시니어 전용 사료 급여
3. 건강 검진: 6개월~1년에 한 번 정기 혈액 검사, 초음파, 엑스레이 검진 권장
4. 뇌 활성화: 무리한 운동 대신 냄새 맡기(노즈워크)를 통해 인지기능장애(치매) 예방
5. 체온 유지: 계절 변화에 민감하므로 실내 22~24도 유지 및 보온 옷 착용`,
};

export const AiAssistantView: React.FC = () => {
  const { currentDog, setActiveTab } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `반갑습니다! 댕댕 라이프 AI 생활관리 도우미입니다. 🐾\n현재 '${currentDog?.name || '우리 아이'}'의 기본 정보(${currentDog?.breed || '반려견'}, ${currentDog?.weight || 4.5}kg)를 바탕으로 맞춤 생활 가이드를 안내해 드립니다.\n궁금한 점이 있으시면 언제든 편하게 물어보세요!`,
      timestamp: '방금',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    '우리 강아지에게 적절한 산책 활동은?',
    '강아지 배변 훈련은 어떻게 하나요?',
    '강아지가 자주 짖는 이유는?',
    '초보 견주가 준비해야 할 필수 물품은?',
    '노령견 생활관리 방법은?',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || input).trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // AI Response generation with knowledge base + dog personalization
    setTimeout(() => {
      let reply = '';
      if (q.includes('산책')) {
        reply = `${currentDog?.name ? `[${currentDog.name} 맞춤 안내]\n` : ''}${PRESET_KNOWLEDGE['산책']}`;
      } else if (q.includes('배변')) {
        reply = PRESET_KNOWLEDGE['배변'];
      } else if (q.includes('짖')) {
        reply = PRESET_KNOWLEDGE['짖음'];
      } else if (q.includes('초보') || q.includes('물품') || q.includes('준비')) {
        reply = PRESET_KNOWLEDGE['초보'];
      } else if (q.includes('노령') || q.includes('나이') || q.includes('시니어')) {
        reply = PRESET_KNOWLEDGE['노령견'];
      } else if (q.includes('슬개골') || q.includes('다리')) {
        reply = `${currentDog?.name}의 관절 건강을 위해 실내 바닥 미끄럼 방지 매트 설치, 발바닥 털 정리, 침대/소파 앞 완만한 슬라이드 경사로 설치를 권장합니다. 체중이 늘면 관절 부담이 급증하므로 체중 관리 탭을 확인해 보세요.`;
      } else {
        reply = `반려견의 생활 습관 및 양육에 관한 소중한 질문입니다.\n댕댕 라이프 전문가 칼럼 및 건강 기록 탭에서 더 구체적인 이력을 기록해보실 수 있습니다.\n\n※ 만약 구토, 혈변, 기력 저하 등 응급 증상이 의심된다면 AI 답변에 의존하지 마시고 즉시 인근 동물병원을 방문해 주시기 바랍니다.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold text-[#6F9278] uppercase tracking-wider">AI Canine Lifestyle Advisor</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#26332B] mt-1">AI 반려견 도우미</h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            산책 활동량, 배변 훈련, 행동 심리부터 생활 관리 팁까지 실시간으로 상담해드립니다.
          </p>
        </div>

        {/* AI Engine Status Pill */}
        <div className="inline-flex items-center gap-2 p-2.5 bg-[#F7F3EA] border border-stone-200 rounded-2xl text-xs text-[#26332B]">
          <Sparkles className="w-4 h-4 text-[#F4B183]" />
          <span>표준 수의·행동학 지식 엔진 작동 중</span>
        </div>
      </div>

      {/* Veterinary Disclaimer Alert */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>안전 안내:</strong> AI 도우미는 일반적인 반려견 생활 정보와 행동 훈련 가이드를 제공합니다. 질병의 진단, 응급 상황 처치, 약물 투약 등 수의학적 처치를 대신할 수 없으므로 이상 증상이 있을 때는 반드시 동물병원을 방문하세요.
        </p>
      </div>

      {/* Chat Window */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm flex flex-col h-[560px] overflow-hidden">
        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-white ${
                  msg.sender === 'ai' ? 'bg-[#6F9278]' : 'bg-[#26332B]'
                }`}
              >
                {msg.sender === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-[#6F9278] text-white rounded-tr-none'
                    : 'bg-[#FAF8F5] text-[#26332B] rounded-tl-none border border-stone-200/80'
                }`}
              >
                {msg.text}
                <span
                  className={`block text-[10px] mt-1.5 ${
                    msg.sender === 'user' ? 'text-white/70 text-right' : 'text-stone-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#6F9278] text-white flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-3 text-xs text-stone-500 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#6F9278]" />
                <span>답변을 작성하고 있습니다...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="px-4 py-2.5 bg-stone-50/80 border-t border-stone-100 overflow-x-auto scrollbar-none flex items-center gap-2">
          <span className="text-[11px] font-bold text-stone-400 shrink-0">추천 질문:</span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-[#F7F3EA] border border-stone-200 text-xs text-[#26332B] font-medium whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="우리 강아지에 관해 무엇이든 물어보세요 (예: 짖음 훈련, 적정 산책 시간)"
            className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm text-[#26332B] focus:ring-2 focus:ring-[#6F9278]/30 focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-3 bg-[#6F9278] hover:bg-[#5a7c63] disabled:opacity-40 text-white rounded-2xl transition-all shadow-sm"
            aria-label="질문 전송"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
