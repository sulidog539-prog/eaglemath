import React, { useState } from 'react';
import { Users, Briefcase, GraduationCap, Trophy, CheckCircle, Mail, MapPin, Phone, Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Recruitment() {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    contact: '',
    subject: '',
    fields: [], // 초등, 중등, 고등, 행정
    address: '',
    education: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const updatedFields = checked 
        ? [...formData.fields, value]
        : formData.fields.filter(f => f !== value);
      setFormData(prev => ({ ...prev, fields: updatedFields }));
    } else if (name === 'contact') {
      // 핸드폰 번호 자동 하이픈
      const phoneNumber = value.replace(/[^0-9]/g, '');
      let formattedNumber = '';
      if (phoneNumber.length <= 3) formattedNumber = phoneNumber;
      else if (phoneNumber.length <= 7) formattedNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
      else formattedNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
      setFormData(prev => ({ ...prev, [name]: formattedNumber }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.subject) {
      alert('필수 항목(성함, 연락처, 지원과목)을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const serviceId = 'service_fmr8m2b';
      const templateId = 'template_ymcjyrg';
      const publicKey = 'GEih1O4Sd8hqoSlKc';

      const templateParams = {
        name: formData.name,
        birthDate: formData.birthDate,
        contact: formData.contact,
        subject: formData.subject,
        fields: formData.fields.join(', '),
        address: formData.address,
        education: formData.education,
        time: new Date().toLocaleString('ko-KR')
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Email sending failed:', error);
      alert('지원서 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-slate-50 min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">지원서 제출 완료</h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              독수리수학에 지원해주셔서 감사합니다.<br />
              제출해주신 서류를 꼼꼼히 검토한 후 개별적으로 연락드리겠습니다.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-10 py-4 bg-[#172554] text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg"
            >
              메인으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-[#172554] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-blue-200 uppercase bg-blue-900/50 rounded-full border border-blue-700/50">
            Recruitment
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            독수리수학과 함께할 <span className="text-blue-400">인재</span>를 모집합니다
          </h1>
          <p className="text-base md:text-lg text-blue-200/80 max-w-2xl mx-auto font-normal leading-relaxed">
            최고의 학습 시스템과 열정적인 동료들이 있는 곳에서<br />
            꿈을 함께 실현해 나갈 역량 있는 선생님들을 기다립니다.
          </p>
        </div>
      </section>

      {/* Recruitment Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">채용 절차</h2>
            <div className="w-20 h-1.5 bg-[#172554] mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-100 -translate-y-1/2 z-0"></div>
            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {[
                { step: "01", title: "서류전형", desc: "이력서 및 자기소개서 검토" },
                { step: "02", title: "1차면접", desc: "인성 및 기본 역량 평가" },
                { step: "03", title: "2차면접(시범강의)", desc: "교사 역량 및 시현 테스트" },
                { step: "04", title: "최종합격", desc: "처우 협의 및 입사 확정" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#172554] text-white rounded-full flex items-center justify-center text-xl font-black mx-auto mb-6 border-4 border-white shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Qualification Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
            <div className="pt-8">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">지원 자격 및 우대사항</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 bg-blue-100 p-1 rounded-full text-[#172554]">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">지원 자격</h4>
                    <p className="text-slate-600 font-medium">4년제 대학 졸업 이상 (졸업예정자 가능)</p>
                    <p className="text-slate-600 font-medium font-outfit">해당 분야 및 과목의 교과 분석 및 학생 지도 가능자</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1 bg-blue-100 p-1 rounded-full text-[#172554]">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1 font-outfit">우대 사항</h4>
                    <p className="text-slate-600 font-medium font-outfit">유관업무 경력자</p>
                    <p className="text-slate-600 font-medium font-outfit">학생 관리에 강점이 있으며 열정이 넘치시는 분</p>
                    <p className="text-slate-600 font-medium font-outfit">기초부터 심화까지 수준별 맞춤 지도 역량 보유자</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-2 h-full bg-[#172554]"></div>
              <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center space-x-2 pl-2">
                <Mail className="text-[#172554] w-6 h-6" />
                <span>선생님 지원서</span>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6 pl-2">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">성함 <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#172554] focus:border-transparent outline-none transition-all placeholder:text-slate-300" 
                      placeholder="성함 입력" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">생년월일</label>
                    <input 
                      type="date" 
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#172554] focus:border-transparent outline-none transition-all" 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">연락처 <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      required 
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#172554] focus:border-transparent outline-none transition-all" 
                      placeholder="010-0000-0000" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">지원 과목 <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select 
                        required 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#172554] focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">과목 선택</option>
                        <option value="수학">수학</option>
                        <option value="국어">국어</option>
                        <option value="영어">영어</option>
                        <option value="과학">과학</option>
                        <option value="행정">행정</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 font-outfit">▼</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">지원 분야 (중복 선택 가능)</label>
                  <div className="flex flex-wrap gap-4 p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                    {['초등', '중등', '고등', '행정'].map((field) => (
                      <label key={field} className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          value={field}
                          checked={formData.fields.includes(field)}
                          onChange={handleChange}
                          className="w-5 h-5 rounded-lg border-slate-300 text-[#172554] focus:ring-[#172554] transition-all" 
                        />
                        <span className="text-slate-600 font-bold group-hover:text-slate-900 transition-colors">{field}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">거주지 주소</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#172554] focus:border-transparent outline-none transition-all placeholder:text-slate-300" 
                    placeholder="예: 서울 영등포구 신길동" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">학력 및 주요 경력 사항</label>
                  <textarea 
                    rows="6" 
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#172554] focus:border-transparent outline-none transition-all resize-none placeholder:text-slate-300" 
                    placeholder="대학교 / 전공 / 졸업 여부 / 관련 경력 등을 적어주세요."
                  ></textarea>
                </div>

                {/* 개인정보 동의 체크박스 */}
                <div className="pt-2">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                checked={isAgreed}
                                onChange={(e) => setIsAgreed(e.target.checked)}
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 transition-all checked:border-[#172554] checked:bg-[#172554]"
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

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting || !isAgreed}
                    className={`w-full py-5 rounded-2xl font-black text-xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center space-x-3 ${
                      isSubmitting || !isAgreed ? 'bg-slate-400 cursor-not-allowed text-slate-100' : 'bg-[#172554] text-white hover:bg-black'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>제출 중...</span>
                      </>
                    ) : (
                      <>
                        <span>지원서 제출하기</span>
                        <Send size={20} />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-400 font-medium mt-4">
                    제출해주신 개인정보는 채용 목적으로만 사용되며 안전하게 보호됩니다.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12">
          <div className="flex items-center space-x-2 text-slate-600 font-bold">
            <Phone size={18} className="text-[#172554]" />
            <span>채용 문의: 010-8229-7963</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600 font-bold">
            <Mail size={18} className="text-[#172554]" />
            <span>이메일: eaglemath@naver.com</span>
          </div>
        </div>
      </section>
    </div>
  );
}
