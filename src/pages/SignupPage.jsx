import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Loader2, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function SignupPage() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (!userId.trim()) { setError('아이디를 입력해주세요.'); return; }
        if (userId.trim().length < 3) { setError('아이디는 3자 이상이어야 합니다.'); return; }
        if (!/^[a-zA-Z0-9_]+$/.test(userId.trim())) { setError('아이디는 영문, 숫자, 언더바(_)만 사용 가능합니다.'); return; }
        if (!password) { setError('비밀번호를 입력해주세요.'); return; }
        if (password.length < 6) { setError('비밀번호는 6자 이상이어야 합니다.'); return; }
        if (password !== confirmPassword) { setError('비밀번호가 일치하지 않습니다.'); return; }
        if (!isAgreed) { setError('이용약관 및 개인정보처리방침에 동의해주세요.'); return; }

        const email = `${userId.trim()}@eaglemath.com`;

        setIsLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess(true);
        } catch (err) {
            console.error(err.code);
            switch (err.code) {
                case 'auth/email-already-in-use':
                    setError('이미 사용 중인 아이디입니다.');
                    break;
                case 'auth/weak-password':
                    setError('비밀번호는 6자 이상이어야 합니다.');
                    break;
                default:
                    setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 relative">
                {/* Back to Home Button */}
                <Link to="/" className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center text-slate-500 hover:text-[#1e3a8a] transition-colors font-bold z-10">
                    <ArrowLeft size={20} className="mr-2" />
                    홈으로
                </Link>
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 border border-slate-100 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">회원가입 완료!</h2>
                    <p className="text-slate-500 font-medium mb-8">
                        <span className="font-bold text-[#1e3a8a]">{userId}</span> 아이디로 가입되었습니다.<br />
                        이제 로그인해서 이용해주세요.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full py-4 bg-[#1e3a8a] text-white font-bold rounded-xl hover:bg-[#1e40af] transition-all"
                    >
                        로그인 하러 가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 relative">
            {/* Back to Home Button */}
            <Link to="/" className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center text-slate-500 hover:text-[#1e3a8a] transition-colors font-bold z-10">
                <ArrowLeft size={20} className="mr-2" />
                홈으로
            </Link>
            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 text-[#1e3a8a] animate-spin mb-4" />
                    <p className="text-[#1e3a8a] font-bold text-lg">가입 처리 중...</p>
                </div>
            )}

            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1e3a8a] text-white rounded-full mb-4 shadow-lg">
                        <UserPlus size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">회원가입</h2>
                    <p className="text-slate-500 mt-2 font-medium">독수리수학 학습자료실 계정을 만들어보세요.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSignup} className="space-y-5">
                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center space-x-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
                            <AlertCircle size={16} className="flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* 아이디 */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">아이디</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => { setUserId(e.target.value); setError(''); }}
                            placeholder="영문, 숫자, _ 사용 (3자 이상)"
                            className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent outline-none transition-all text-slate-800 font-medium"
                            autoComplete="username"
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">비밀번호</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                placeholder="6자 이상 입력하세요"
                                className="w-full px-5 py-4 pr-12 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent outline-none transition-all text-slate-800 font-medium"
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* 비밀번호 확인 */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">비밀번호 확인</label>
                        <div className="relative">
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                                placeholder="비밀번호를 다시 입력하세요"
                                className={`w-full px-5 py-4 pr-12 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent outline-none transition-all text-slate-800 font-medium ${
                                    confirmPassword && password !== confirmPassword
                                        ? 'border-red-300'
                                        : confirmPassword && password === confirmPassword
                                        ? 'border-green-300'
                                        : 'border-slate-200'
                                }`}
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {confirmPassword && password === confirmPassword && (
                            <p className="text-green-500 text-xs mt-1.5 flex items-center font-medium">
                                <CheckCircle2 size={13} className="mr-1" /> 비밀번호가 일치합니다
                            </p>
                        )}
                    </div>
                    {/* 이용약관 동의 */}
                    <div className="pt-2">
                        <label className="flex items-start space-x-3 cursor-pointer group">
                            <div className="relative flex items-center mt-0.5">
                                <input
                                    type="checkbox"
                                    checked={isAgreed}
                                    onChange={(e) => { setIsAgreed(e.target.checked); setError(''); }}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 transition-all checked:border-[#1e3a8a] checked:bg-[#1e3a8a]"
                                />
                                <span className="absolute text-white opacity-0 transition-opacity peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </span>
                            </div>
                            <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors leading-tight">
                                <span className="font-bold text-[#1e3a8a]">이용약관</span> 및 <span className="font-bold text-[#1e3a8a]">개인정보처리방침</span>에 동의합니다. <span className="text-red-500">*</span>
                            </span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 mt-2 bg-[#1e3a8a] text-white font-bold text-lg rounded-xl hover:bg-[#1e40af] active:scale-[0.98] transition-all shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                        <UserPlus size={20} />
                        <span>회원가입</span>
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-sm text-slate-500 font-medium">
                        이미 계정이 있으신가요?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-[#1e3a8a] font-bold hover:underline"
                        >
                            로그인
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
