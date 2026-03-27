import React, { useState, useEffect, useRef } from 'react';
import { Users, Award, TrendingUp, CheckCircle2, Star } from 'lucide-react';

const RevealOnScroll = ({ children, direction = 'left', delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const { current } = domRef;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, []);

    const baseClasses = "transition-all duration-1000 ease-out transform";
    const initialTransform = direction === 'left' ? '-translate-x-20' : 'translate-x-20';

    return (
        <div
            ref={domRef}
            style={{ transitionDelay: `${delay}ms` }}
            className={`${baseClasses} ${isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${initialTransform}`
                }`}
        >
            {children}
        </div>
    );
};

export default function AcademyIntro() {
    const systems = [
        {
            number: "01",
            title: "소수정예 1:1 개별 맞춤 수업",
            description: "모든 학생은 수준과 학습 방식이 다릅니다. 독수리수학은 학생 개개인의 실력과 성향을 정확히 분석하고, 그에 맞춘 소수정예 개별 맞춤 수업을 진행합니다.",
            details: [
                "오답 관리, 질문 지도, 보완 학습까지 학생마다 다른 방식으로 접근",
                "여유 있는 정원 운영으로 한 명 한 명을 끝까지 책임지는 관리",
                "강남 8학군 SKY 출신의 검증된 강사진이 전문적인 수업 제공"
            ],
            icon: <Users className="w-8 h-8 text-[#1e3a8a]" />,
            image: "/images/intro/system_1.png",
            bg: "bg-white",
            revealDir: "left"
        },
        {
            number: "02",
            title: <>스스로 해결하는 힘을 기르는 <br className="md:hidden" />수업</>,
            description: "단순히 문제를 풀어주는 수업이 아니라, 학생이 스스로 해결하는 방법을 깨닫는 수업을 지향합니다.",
            details: [
                "자기 힘으로 문제를 해결하는 경험을 통한 학습 자신감 획득",
                "공부 방법을 몰라 어려움을 겪던 학생들을 위한 성적 향상 솔루션",
                "공부에 대한 흥미와 동기를 부여하는 근본적인 학습 습관 형성"
            ],
            icon: <Award className="w-8 h-8 text-[#1e3a8a]" />,
            image: "/images/intro/system_2.png",
            bg: "bg-slate-50",
            revealDir: "right"
        },
        {
            number: "03",
            title: "높은 재등록률로 증명된 만족도",
            description: "독수리수학은 90% 이상의 재등록률과 평균 3년 이상의 재원 기간을 유지하고 있습니다.",
            details: [
                "수업의 효과와 만족도가 학생과 학부모에게 꾸준히 검증됨",
                "장기간 함께하며 이루어내는 안정적인 실력 향상",
                "결과로 증명하는 독수리수학만의 프리미엄 교육 서비스"
            ],
            icon: <TrendingUp className="w-8 h-8 text-[#1e3a8a]" />,
            image: "/images/intro/system_3.png",
            bg: "bg-white",
            revealDir: "left"
        }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="bg-[#0f172a] text-white py-24 px-4 overflow-hidden relative">
                <div className="absolute top-0 right-[-10%] w-[40%] h-full bg-white/5 skew-x-[-20deg]"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">독수리수학 소개</h1>
                    <p className="text-lg md:text-xl text-blue-100/90 font-medium max-w-2xl mx-auto leading-relaxed">
                        독수리수학만의<br className="md:hidden" /> 차별화된 수업 시스템을 경험하세요
                    </p>
                </div>
            </div>

            {/* Introduction Overview */}
            <div className="py-20 px-4 bg-slate-50 border-b border-slate-100">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-[#0f172a] font-bold tracking-widest text-sm uppercase mb-4 block">PREMIUM EDUCATION SERVICE</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-snug">
                        저희는 학생의 성장과<br className="md:hidden" /> 본질적인 실력 향상에<br className="md:hidden" /> 집중합니다.
                    </h2>
                    <div className="w-20 h-1 bg-[#fbbf24] mx-auto mb-8"></div>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        독수리수학은 단순히 시험 성적을 올리는 기술만을 가르치지 않습니다.<br className="hidden md:block" />
                        학생 한 명 한 명이 수학에 대한 자신감을 갖고, 스스로 길을 찾아갈 수 있는<br className="hidden md:block" />
                        단단한 실력의 뿌리를 만들어주는 것이 독수리수학의 목표입니다.
                    </p>
                </div>
            </div>

            {/* 3 Pillars of Teaching System */}
            <div className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-12">
                        {systems.map((system, index) => (
                            <RevealOnScroll key={index} direction={system.revealDir}>
                                <div
                                    className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm ${system.bg} transition-all duration-500 hover:shadow-xl hover:border-blue-100 group`}
                                >
                                    {/* Content */}
                                    <div className="flex-1 w-full">
                                        <div className="mb-6 flex items-center gap-4">
                                            <div className="text-5xl font-black text-slate-100 group-hover:text-blue-50 transition-colors duration-500">{system.number}</div>
                                            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-50">
                                                {system.icon}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 group-hover:text-[#0f172a] transition-colors">
                                            {system.title}
                                        </h3>
                                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                            {system.description}
                                        </p>
                                        <ul className="space-y-4">
                                            {system.details.map((detail, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                                    <span className="text-slate-700 font-medium leading-relaxed">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Image Column */}
                                    <div className="flex-1 w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500 shadow-xl border border-slate-200">
                                        <img
                                            src={system.image}
                                            alt={system.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </div>

            {/* Final CTA Decoration */}
            <div className="py-20 px-4 bg-slate-900 text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">검증된 실력, 독보적인 관리</h2>
                    <p className="text-slate-400 text-lg mb-0 leading-relaxed">
                        독수리수학의 모든 수업은<br className="md:hidden" /> 결과와 만족으로 증명됩니다.<br />
                        정확한 진단에서 확실한 성적 향상까지,<br className="md:hidden" /> 전문가와 함께하세요.
                    </p>
                </div>
            </div>
        </div>
    );
}
