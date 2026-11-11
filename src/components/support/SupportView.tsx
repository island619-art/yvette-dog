import React, { useState } from 'react';
import { INITIAL_FAQS } from '../../data/initialData';
import { 
  HelpCircle, 
  ChevronDown, 
  Send, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2,
  MessageCircle
} from 'lucide-react';

export const SupportView: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }
    setIsSent(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-6 border-b border-stone-200">
        <span className="text-xs font-bold text-[#6F9278] uppercase tracking-wider">Help & Support</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#26332B] mt-1">고객센터</h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          궁금한 점이 있으신가요? 자주 묻는 질문을 확인하시거나 1:1 문의를 남겨주시면 정성껏 답변드리겠습니다.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
          <Phone className="w-5 h-5 text-[#6F9278] mb-2" />
          <span className="text-xs text-stone-400 font-medium">전화 상담</span>
          <p className="text-lg font-bold text-[#26332B] font-mono">1588-4282</p>
          <p className="text-[11px] text-stone-400">평일 09:30 - 18:00 (공휴일 제외)</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
          <Mail className="w-5 h-5 text-[#6F9278] mb-2" />
          <span className="text-xs text-stone-400 font-medium">이메일 문의</span>
          <p className="text-sm font-bold text-[#26332B]">support@dangdang.life</p>
          <p className="text-[11px] text-stone-400">24시간 접수 (평일 순차 답변)</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
          <Clock className="w-5 h-5 text-[#6F9278] mb-2" />
          <span className="text-xs text-stone-400 font-medium">제휴 및 입점 문의</span>
          <p className="text-sm font-bold text-[#26332B]">partner@dangdang.life</p>
          <p className="text-[11px] text-stone-400">반려견 동반 시설 및 용품사 제휴</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#6F9278]" />
          <h2 className="text-lg font-bold text-[#26332B]">자주 묻는 질문 (FAQ)</h2>
        </div>

        <div className="space-y-3">
          {INITIAL_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#26332B] hover:bg-stone-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#6F9278] font-bold text-sm">Q.</span>
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 shrink-0 transform transition-transform ${
                      isOpen ? 'rotate-180 text-[#6F9278]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-[#FAF8F5]">
                    <div className="flex items-start gap-2.5">
                      <span className="text-[#F4B183] font-black text-sm shrink-0">A.</span>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 1:1 Inquiry Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
          <MessageCircle className="w-5 h-5 text-[#6F9278]" />
          <div>
            <h3 className="text-base font-bold text-[#26332B]">1:1 온라인 고객 문의</h3>
            <p className="text-xs text-stone-400">서비스 이용 중 불편한 점이나 제안사항을 남겨주세요.</p>
          </div>
        </div>

        {isSent && (
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>문의가 성공적으로 접수되었습니다. 기재하신 이메일로 24시간 이내에 답변드리겠습니다.</span>
          </div>
        )}

        <form onSubmit={handleSubmitInquiry} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#26332B] mb-1">성함 / 닉네임</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="홍길동"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#26332B] mb-1">회신받을 이메일</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#26332B] mb-1">문의 제목</label>
            <input
              type="text"
              required
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="문의 내용을 요약해 주세요"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#26332B] mb-1">문의 내용</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="구체적인 상황이나 질문을 남겨주시면 신속하게 확인 후 안내해 드립니다."
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-[#6F9278] hover:bg-[#5a7c63] text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>문의 접수하기</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
