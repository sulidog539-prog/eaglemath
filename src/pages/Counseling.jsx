import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ChevronDown, Send, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Counseling() {
    const [formData, setFormData] = useState({
        studentName: '',
        grade: '',
        email: '',
        content: '',
        branch: '',
        schoolName: '',
        contact: '',
        type: '',
        referral: '',
        referralDetail: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.studentName.trim()) newErrors.studentName = '학생명을 입력해주세요.';
        if (!formData.grade.trim()) newErrors.grade = '학년을 입력해주세요.';
        if (!formData.content.trim()) newErrors.content = '상담내용을 입력해주세요.';
        if (!formData.branch) newErrors.branch = '지점을 선택해주세요.';
        if (!formData.contact.trim()) newErrors.contact = '연락처를 입력해주세요.';
        if (!formData.type) newErrors.type = '상담구분을 선택해주세요.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'content' && value.length > 1000) return;

        // 연락처(contact) 자동 하이픈 로직
        if (name === 'contact') {
            const phoneNumber = value.replace(/[^0-9]/g, '');
            let formattedNumber = '';
            
            if (phoneNumber.length <= 3) {
                formattedNumber = phoneNumber;
            } else if (phoneNumber.length <= 7) {
                formattedNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
            } else {
                formattedNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
            }
            
            setFormData(prev => ({ ...prev, [name]: formattedNumber }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            try {
                // EmailJS 연동 정보
                const serviceId = 'service_fmr8m2b';
                const templateId = 'template_t5jnith';
                const publicKey = 'GEih1O4Sd8hqoSlKc';

                // 이메일로 보낼 데이터 정리
                const templateParams = {
                    studentName: formData.studentName,
                    grade: formData.grade,
                    email: formData.email,
                    content: formData.content,
                    branch: formData.branch,
                    schoolName: formData.schoolName,
                    contact: formData.contact,
                    type: formData.type,
                    referral: formData.referral,
                    referralDetail: formData.referralDetail,
                    time: new Date().toLocaleString('ko-KR')
                };

                await emailjs.send(serviceId, templateId, templateParams, publicKey);
                
                setSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.error('Email sending failed:', error);
                alert('상담 신청 중 오류가 발생했습니다. 다시 시도해 주세요.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    if (submitted) {
        return (
            <div className="max-w-4xl mx-auto py-24 px-4 text-center">
                <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-4">상담 신청이 완료되었습니다</h2>
                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                        작성하신 상담 내용이 **010-8229-7963**으로 전달되었습니다.<br />
                        확인 후 빠른 시일 내에 연락드리겠습니다.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-8 py-4 bg-[#1e3a8a] text-white font-bold rounded-xl hover:bg-[#1e40af] transition-colors"
                    >
                        메인으로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Heading */}
                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">입력사항</h1>
                    <p className="text-slate-500 font-medium">
                        더 나은 상담을 위해 아래 정보를 정확히 입력해 주세요.<br className="md:hidden" /> ( <span className="text-red-500 font-bold">*</span> 은 필수 입력 항목입니다 )
                    </p>
                </div>

                {/* Unified Form Container */}
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden relative">
                        {/* Decorative side accent */}
                        <div className="absolute top-0 left-0 w-2 h-full bg-[#1e3a8a]"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {/* Left Column Area */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        학생명 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="studentName"
                                        placeholder="학생 이름을 입력하세요"
                                        className={`w-full px-5 py-4 rounded-2xl border ${errors.studentName ? 'border-red-500' : 'border-slate-100'} bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all outline-none`}
                                        value={formData.studentName}
                                        onChange={handleChange}
                                    />
                                    {errors.studentName && <p className="text-red-500 text-xs mt-2 flex items-center"><AlertCircle size={14} className="mr-1" /> {errors.studentName}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        학년 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="grade"
                                        placeholder="예: 초6, 중2, 고1 등"
                                        className={`w-full px-5 py-4 rounded-2xl border ${errors.grade ? 'border-red-500' : 'border-slate-100'} bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all outline-none`}
                                        value={formData.grade}
                                        onChange={handleChange}
                                    />
                                    {errors.grade && <p className="text-red-500 text-xs mt-2 flex items-center"><AlertCircle size={14} className="mr-1" /> {errors.grade}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        이메일
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="example@email.com"
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all outline-none"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        상담내용 <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="content"
                                        placeholder="상담을 원하시는 내용을 자세히 적어주세요 (1000자 이내)"
                                        rows="10"
                                        className={`w-full px-5 py-4 rounded-2xl border ${errors.content ? 'border-red-500' : 'border-slate-100'} bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all outline-none resize-none`}
                                        value={formData.content}
                                        onChange={handleChange}
                                    ></textarea>
                                    <div className="flex justify-between mt-2">
                                        {errors.content ? <p className="text-red-500 text-xs flex items-center"><AlertCircle size={14} className="mr-1" /> {errors.content}</p> : <div></div>}
                                        <p className={`text-xs font-medium ${formData.content.length >= 1000 ? 'text-red-500' : 'text-slate-400'}`}>
                                            {formData.content.length} / 1000
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column Area */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        지점위치 <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative group">
                                        <select
                                            name="branch"
                                            className={`w-full px-5 py-4 rounded-2xl border ${errors.branch ? 'border-red-500' : 'border-slate-100'} bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all outline-none appearance-none cursor-pointer group-hover:bg-slate-50`}
                                            value={formData.branch}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>지점을 선택하세요</option>
                                            <option value="신길본점">신길본점</option>
                                            <option value="도림본원점">도림본원점</option>
                                            <option value="독수리수학과학전문관학원">독수리수학과학전문관학원</option>
                                            <option value="독수리수학영어전문관학원">독수리수학영어전문관학원</option>
                                            <option value="리드인 독수리국어">리드인 독수리국어</option>
                                            <option value="독수리수학 연구소">독수리수학 연구소</option>
                                            <option value="뉴타운본원점">뉴타운본원점</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-slate-600 transition-colors" size={20} />
                                    </div>
                                    {errors.branch && <p className="text-red-500 text-xs mt-2 flex items-center"><AlertCircle size={14} className="mr-1" /> {errors.branch}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        학교명
                                    </label>
                                    <input
                                        type="text"
                                        name="schoolName"
                                        placeholder="학교명을 입력하세요"
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all outline-none"
                                        value={formData.schoolName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        연락처 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="contact"
                                        placeholder="010-0000-0000"
                                        className={`w-full px-5 py-4 rounded-2xl border ${errors.contact ? 'border-red-500' : 'border-slate-100'} bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all outline-none`}
                                        value={formData.contact}
                                        onChange={handleChange}
                                    />
                                    {errors.contact && <p className="text-red-500 text-xs mt-2 flex items-center"><AlertCircle size={14} className="mr-1" /> {errors.contact}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        상담구분 <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative group">
                                        <select
                                            name="type"
                                            className={`w-full px-5 py-4 rounded-2xl border ${errors.type ? 'border-red-500' : 'border-slate-100'} bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all outline-none appearance-none cursor-pointer group-hover:bg-slate-50`}
                                            value={formData.type}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>상담구분을 선택하세요</option>
                                            <option value="교습비(수강료) 문의">교습비(수강료) 문의</option>
                                            <option value="학습관련 문의">학습관련 문의</option>
                                            <option value="입학 문의">입학 문의</option>
                                            <option value="기타 문의">기타 문의</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-slate-600 transition-colors" size={20} />
                                    </div>
                                    {errors.type && <p className="text-red-500 text-xs mt-2 flex items-center"><AlertCircle size={14} className="mr-1" /> {errors.type}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Referral Section (Inside main box) */}
                        <div className="mt-12 pt-10 border-t border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                                <span className="w-1.5 h-6 bg-[#1e3a8a] mr-3 rounded-full"></span>
                                알게 된 경로
                            </h3>
                            <div className="flex flex-wrap gap-8 items-center pl-4">
                                {['블로그', '교직원소개', '친구소개', '기타'].map((option) => (
                                    <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="referral"
                                            value={option}
                                            checked={formData.referral === option}
                                            onChange={handleChange}
                                            className="w-5 h-5 text-[#1e3a8a] focus:ring-[#1e3a8a] border-slate-300"
                                        />
                                        <span className="text-slate-700 font-bold group-hover:text-[#1e3a8a] transition-colors">{option}</span>
                                    </label>
                                ))}
                            </div>

                            {formData.referral === '기타' && (
                                <div className="mt-8 pl-4 animate-slideDown">
                                    <label className="block text-sm font-bold text-slate-600 mb-3">기타 사유를 적어주세요</label>
                                    <input
                                        type="text"
                                        name="referralDetail"
                                        placeholder="상세 내용을 입력하세요"
                                        className="w-full max-w-xl px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all outline-none"
                                        value={formData.referralDetail}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* 개인정보 동의 체크박스 */}
                    <div className="flex justify-center mt-8">
                        <label className="flex items-center space-x-3 cursor-pointer group px-6 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-[#1e3a8a] transition-all">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={isAgreed}
                                    onChange={(e) => setIsAgreed(e.target.checked)}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 transition-all checked:border-[#1e3a8a] checked:bg-[#1e3a8a]"
                                />
                                <span className="absolute text-white opacity-0 transition-opacity peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </span>
                            </div>
                            <span className="text-sm text-slate-600 font-bold group-hover:text-slate-900 transition-colors">
                                개인정보 수집 및 이용에 동의합니다. <span className="text-red-500">*</span>
                            </span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting || !isAgreed}
                            className={`group w-full max-w-lg py-5 ${isSubmitting || !isAgreed ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#0f172a] hover:bg-black'} text-white font-bold text-xl rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-3`}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>신청 중...</span>
                                </>
                            ) : (
                                <>
                                    <span>상담 신청하기</span>
                                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
