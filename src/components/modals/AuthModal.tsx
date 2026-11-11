import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, Mail, User, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, authMode, setAuthMode, login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'reset') {
      setResetSuccess(true);
      setTimeout(() => {
        setResetSuccess(false);
        setAuthMode('login');
      }, 2000);
      return;
    }

    login(email || 'petlover@dangdang.life', nickname || '댕댕이친구');
    setIsAuthOpen(false);
  };

  const handleDemoLogin = () => {
    login('happypet@dangdang.life', '콩이누나');
    setIsAuthOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#6F9278]/15 rounded-2xl flex items-center justify-center mx-auto mb-3 text-[#6F9278]">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#26332B]">
            {authMode === 'login' && '댕댕 라이프 로그인'}
            {authMode === 'signup' && '반려가족 회원가입'}
            {authMode === 'reset' && '비밀번호 재설정'}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            {authMode === 'login' && '우리 강아지의 건강과 일상을 스마트하게 기록하세요'}
            {authMode === 'signup' && '간단한 정보 입력으로 댕댕 라이프의 모든 기능을 시작하세요'}
            {authMode === 'reset' && '가입하신 이메일로 비밀번호 재설정 링크를 발송해 드립니다'}
          </p>
        </div>

        {resetSuccess ? (
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center text-xs text-emerald-800 space-y-1 mb-4">
            <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-600 mb-1" />
            <p className="font-bold">재설정 이메일 발송 완료</p>
            <p>입력하신 이메일의 수신함을 확인해 주세요. 잠시 후 로그인 화면으로 전환됩니다.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#26332B] mb-1">보호자 닉네임</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                    placeholder="예: 초코엄마, 보리파파"
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F9278]/30 focus:border-[#6F9278]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#26332B] mb-1">이메일 주소</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F9278]/30 focus:border-[#6F9278]"
                />
              </div>
            </div>

            {authMode !== 'reset' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-[#26332B]">비밀번호</label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setAuthMode('reset')}
                      className="text-[11px] text-[#6F9278] hover:underline"
                    >
                      비밀번호 찾기
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F9278]/30 focus:border-[#6F9278]"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#6F9278] hover:bg-[#5a7c63] text-white font-semibold text-sm rounded-xl shadow-sm transition-colors mt-2"
            >
              {authMode === 'login' && '로그인'}
              {authMode === 'signup' && '무료 회원가입 완료'}
              {authMode === 'reset' && '재설정 링크 보내기'}
            </button>
          </form>
        )}

        <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col gap-2">
          {authMode === 'login' && (
            <>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 bg-[#F7F3EA] hover:bg-[#ede7d8] text-[#26332B] text-xs font-semibold rounded-xl border border-stone-200 transition-colors"
              >
                체험용 원클릭 바로 로그인 (샘플 계정)
              </button>
              <div className="text-center text-xs text-stone-500 mt-2">
                계정이 없으신가요?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="font-bold text-[#6F9278] hover:underline"
                >
                  회원가입하기
                </button>
              </div>
            </>
          )}

          {authMode === 'signup' && (
            <div className="text-center text-xs text-stone-500 mt-2">
              이미 계정이 있으신가요?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="font-bold text-[#6F9278] hover:underline"
              >
                로그인하기
              </button>
            </div>
          )}

          {authMode === 'reset' && (
            <div className="text-center text-xs text-stone-500 mt-2">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="font-bold text-[#6F9278] hover:underline"
              >
                ← 로그인 화면으로 돌아가기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
