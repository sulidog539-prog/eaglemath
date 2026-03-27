import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
    {
        id: 1,
        title: "학생 맞춤형 수업 시스템",
        description: <>
            모든 학생에게 같은 방식의 수업을 하지 않습니다.<br />
            정확한 실력 진단을 통해 <br className="md:hidden" />
            학생의 현재 수준과 약점을 분석하고,<br />
            그에 맞는 맞춤 커리큘럼을 제공합니다.
        </>,
        bgClass: "from-[#0f172a] via-[#0f172a]/90 to-transparent",
        image: "/images/home/hero_personalized.png",
        tabTitle: "수준별 수업",
        tag: "PERSONALIZED"
    },
    {
        id: 2,
        title: "철저한 관리 중심 학습 지도",
        description: `수학 실력은 관리에서 차이가 납니다.\n숙제, 오답 분석, 반복 학습까지 체계적으로 관리하고,\n매 수업마다 학습 상태를 점검하며\n필요한 부분은 즉시 보완하여 학습 공백을 최소화합니다.`,
        bgClass: "from-[#0f172a] via-[#0f172a]/90 to-transparent",
        image: "/images/home/hero_management.png",
        tabTitle: "관리 중심 학습",
        tag: "MANAGEMENT"
    },
    {
        id: 3,
        title: "학교별 내신 집중 대비 수업",
        description: <>
            인근 학교들의 시험 경향을 분석하여<br />
            학교별 맞춤 내신 대비 수업을 진행합니다.<br />
            기출 문제 분석, 예상 문제 훈련, 시험 전략 지도까지<br />
            실제 시험에서 점수로 이어지는 <br className="md:hidden" />
            실전 중심 수업을 제공합니다.
        </>,
        bgClass: "from-[#0f172a] via-[#0f172a]/90 to-transparent",
        image: "/images/home/hero_examprep.png",
        tabTitle: "내신 집중 대비",
        tag: "EXAM-PREP"
    },
    {
        id: 4,
        title: "전 과목 통합 관리",
        description: <>
            독수리수학과 함께 국어·영어·과학 등 주요 과목도<br />
            연계된 분원을 통해 수강할 수 있습니다.<br />
            학생의 학습 상황에 맞춰 과목별 학습을 체계적으로 연결하여<br />
            전 과목 학습 관리가 가능한 시스템을 제공합니다.
        </>,
        bgClass: "from-[#0f172a] via-[#0f172a]/90 to-transparent",
        image: "/images/home/hero_growth.png",
        tabTitle: <>전 과목 <br className="md:hidden" />통합 관리</>,
        tag: "INTEGRATED"
    }
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(-1);
    const [isPaused, setIsPaused] = useState(false);

    // Initial animation trigger
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide(0);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isPaused || currentSlide === -1) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // 5 seconds interval

        return () => clearInterval(timer);
    }, [isPaused, currentSlide]);

    return (
        <section
            className="relative h-[480px] overflow-hidden text-white bg-[#0f172a]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Sliding Container */}
            <div
                className="flex h-full transition-transform duration-[2500ms] ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
                        {/* Background Layer */}
                        {slide.image ? (
                            <div className="absolute inset-0">
                                {/* Base Blue Color */}
                                <div className="absolute inset-0 bg-[#0f172a]"></div>

                                {/* Image Container (Right Aligned) */}
                                <div className="absolute inset-y-0 right-0 w-full md:w-2/3 lg:w-1/2 flex justify-end">
                                    <img
                                        src={slide.image}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                    {/* Gradient Overlay for Blending */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>
                                </div>
                            </div>
                        ) : (
                            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgClass} opacity-80`}></div>
                        )}
                        <div className="absolute inset-0 bg-black/10"></div>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform origin-bottom-right"></div>
                        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-black/10 rounded-tr-full"></div>

                        {/* Content Container */}
                        <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center items-start">
                            <div className="max-w-3xl">
                                <h1
                                    className={`text-3xl md:text-[34px] lg:text-[38px] font-medium mb-6 md:mb-8 tracking-tight leading-snug text-slate-100 text-left whitespace-pre-line drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] transition-all duration-[2000ms] ease-out transform ${currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                        }`}
                                    style={{ transitionDelay: '400ms' }}
                                >
                                    {slide.title}
                                </h1>
                                <p
                                    className={`text-sm md:text-[15px] font-light text-slate-200/90 mb-8 md:mb-10 whitespace-pre-line leading-[1.8] tracking-normal border-l-4 border-[#fbbf24] pl-6 text-left transition-all duration-[2000ms] ease-out transform ${currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                        }`}
                                    style={{ transitionDelay: '800ms' }}
                                >
                                    {slide.description}
                                </p>

                                <div
                                    className={`flex justify-start transition-all duration-[2000ms] ease-out transform ${currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                        }`}
                                    style={{ transitionDelay: '1100ms' }}
                                >
                                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
                                        <Link to="/contact/counseling" className="px-5 md:px-6 py-2.5 md:py-3 bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1e3a8a] font-bold rounded shadow-lg transition-all transform hover:scale-105 flex items-center justify-center md:justify-start group text-xs md:text-sm">
                                            상담 신청하기 <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        {slide.id === 4 && (
                                            <Link to="/about/branches" className="px-5 md:px-6 py-2.5 md:py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm font-bold rounded shadow-lg transition-all transform hover:scale-105 flex items-center justify-center md:justify-start group text-xs md:text-sm">
                                                분원 안내 바로가기 <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Tabs Navigation */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#0f172a]/80 backdrop-blur-md border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex">
                        {slides.map((slide, index) => (
                            <button
                                key={slide.id}
                                onClick={() => setCurrentSlide(index)}
                                className={`flex-1 relative py-4 px-4 text-center md:text-left transition-all duration-300 border-t-4 ${index !== slides.length - 1 ? "after:content-[''] after:absolute after:right-0 after:top-4 after:bottom-4 after:w-px after:bg-white/20" : ''} ${currentSlide === index
                                    ? 'bg-white/5 border-[#fbbf24] text-white'
                                    : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <span className={`block text-sm md:text-base font-medium whitespace-pre-line leading-tight ${currentSlide === index ? 'text-[#fbbf24]' : ''}`}>
                                    {slide.tabTitle}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
