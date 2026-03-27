import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LogIn, Loader2, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || location.state?.from || "/";

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!userId.trim()) { setError('아이디를 입력해주세요.'); return; }
        if (!password) { setError('비밀번호를 입력해주세요.'); return; }

        // 내부적으로 아이디 + @eaglemath.com 형식으로 Firebase에 전달
        const email = `${userId.trim()}@eaglemath.com`;

        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = from;
        } catch (err) {
            console.error(err.code);
            switch (err.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    setError('아이디 또는 비밀번호가 올바르지 않습니다.');
                    break;
                case 'auth/too-many-requests':
                    setError('로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.');
                    break;
                default:
                    setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
            setIsLoading(false);
        }
    };

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
                    <p className="text-[#1e3a8a] font-bold text-lg">로그인 중...</p>
                </div>
            )}

            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1e3a8a] text-white rounded-full mb-4 shadow-lg">
                        <LogIn size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">독수리수학 로그인</h2>
                    <p className="text-slate-500 mt-2 font-medium">
                        {from.includes('free-board') ? '자유게시판' : '학습자료실'} 이용을 위해 로그인해주세요.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">
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
                            placeholder="아이디를 입력하세요"
                            className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent outline-none transition-all text-slate-800 font-medium"
                            autoComplete="username"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">비밀번호</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                placeholder="비밀번호를 입력하세요"
                                className="w-full px-5 py-4 pr-12 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent outline-none transition-all text-slate-800 font-medium"
                                autoComplete="current-password"
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 mt-2 bg-[#1e3a8a] text-white font-bold text-lg rounded-xl hover:bg-[#1e40af] active:scale-[0.98] transition-all shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                        <LogIn size={20} />
                        <span>로그인</span>
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-sm text-slate-500 font-medium">
                        계정이 없으신가요?{' '}
                        <Link to="/signup" className="text-[#1e3a8a] font-bold hover:underline">
                            회원가입
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
