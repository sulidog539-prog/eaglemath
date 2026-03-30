import React from 'react';
import {
    Zap,
    BookOpen,
    Target,
    CheckCircle2,
    ArrowRight,
    Star,
    ShieldCheck,
    ClipboardCheck,
    Trophy,
    Lightbulb,
    HelpCircle,
    UserCheck,
    ArrowUpRight,
    GraduationCap,
    FlaskConical,
    Telescope,
    Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

const programs = [
    {
        id: 1,
        tag: "영재교육원 대비",
        icon: <Telescope className="w-6 h-6" />,
        title: "영재교육원 대비반",
        desc: "교육청·대학 영재교육원 입학을 목표로 하는 창의·사고력 집중 프로그램입니다.",
        items: [
            { label: "교육청 영재교육원", detail: "수학·과학 영재 선발 시험 대비, 창의적 문제해결력 및 심화 사고력 집중 훈련" },
            { label: "대학 부설 영재교육원", detail: "각 대학 부설 영재원 선발 기준에 맞는 맞춤형 대비 커리큘럼 제공" },
            { label: "탐구 보고서·면접 대비", detail: "포트폴리오 작성, 구술 면접, 창의적 산출물 발표 훈련까지 종합 지원" }
        ],
        accent: "amber"
    },
    {
        id: 2,
        tag: "특목중 대비",
        icon: <GraduationCap className="w-6 h-6" />,
        title: "특목중(영재학교·과학중학교) 대비반",
        desc: "영재학교 및 과학중학교 입시에 최적화된 수학·과학 심화 커리큘럼입니다.",
        items: [
            { label: "수학 심화", detail: "중학 교과 수준을 넘어서는 올림피아드·경시 수준 문제 해결력 집중 강화" },
            { label: "과학 융합", detail: "물리·화학·생물·지구과학 통합 사고 및 실생활 탐구형 문제 적용 능력 향상" },
            { label: "입시 전략", detail: "학교별 선발 기준 분석, 자기소개서·면접 대비, 최근 기출 경향 정밀 분석" }
        ],
        accent: "blue"
    },
    {
        id: 3,
        tag: "특목고 대비",
        icon: <Award className="w-6 h-6" />,
        title: "특목고(과학고·외고·자사고) 대비반",
        desc: "과학고, 외고, 자사고 입시를 위한 내신·전형 전략부터 심화까지 전방위 프로그램입니다.",
        items: [
            { label: "과학고 대비", detail: "수학·과학 올림피아드 수준 심화, 자기소개서 및 면접 전략 집중 지도" },
            { label: "외고·국제고 대비", detail: "영어 내신 관리, 자기소개서 작성, 구술 면접 대비 토론·발표 훈련" },
            { label: "자사고·일반고 대비", detail: "중학 내신 완성 + 고교 과정 선행, 논리적 사고력 강화를 통한 경쟁력 제고" }
        ],
        accent: "indigo"
    }
];

const accentMap = {
    amber: {
        bgLight: "bg-amber-50",
        text: "text-amber-600",
        border: "border-amber-200",
        badge: "bg-amber-100 text-amber-700 border-amber-200",
        dot: "bg-amber-500"
    },
    blue: {
        bgLight: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
        badge: "bg-blue-100 text-blue-700 border-blue-200",
        dot: "bg-blue-500"
    },
    indigo: {
        bgLight: "bg-indigo-50",
        text: "text-indigo-600",
        border: "border-indigo-200",
        badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
        dot: "bg-indigo-500"
    }
};

const strengths = [
    { icon: <Target className="w-5 h-5" />, title: "목표별 맞춤 설계", desc: "영재원·특목중·특목고 각 전형에 맞는 개인화 로드맵 제공" },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "소수 정예 집중 지도", desc: "학생 1인 1인에 집중하는 소그룹 수업으로 완성도 극대화" },
    { icon: <ClipboardCheck className="w-5 h-5" />, title: "기출·최신 경향 분석", detail: "최근 3년 기출 데이터를 기반으로 출제 경향을 정밀 분석하여 반영" },
    { icon: <Lightbulb className="w-5 h-5" />, title: "사고력·창의력 훈련", desc: "단순 암기가 아닌 스스로 생각하고 풀어내는 힘을 기릅니다" }
];

export default function Hwangso() {

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-[#0f172a] pt-24 pb-16 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 -skew-x-12 transform origin-bottom-right"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-full mb-6 border border-amber-500/20">
                        <Trophy size={14} className="mr-1" />
                        상위권 진학을 위한 체계적 전략
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
                        특목대비 <span className="text-amber-400">전문 프로그램</span><br />
                        영재원 · 특목중 · 특목고
                    </h1>
                    <p className="text-gray-400 text-base max-w-3xl mx-auto font-medium leading-relaxed">
                        단순한 선행을 넘어, 학생의 사고력과 창의력을 근본부터 키웁니다.<br />
                        목표에 맞는 맞춤 전략으로 영등포·신길 지역 최고의 합격률을 자랑합니다.
                    </p>
                </div>
            </div>

            {/* Programs Section */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-gray-900 mb-4">주요 프로그램</h2>
                        <p className="text-gray-500 font-medium">학생의 목표에 맞는 전문 커리큘럼을 선택하세요</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {programs.map((prog) => {
                            const ac = accentMap[prog.accent];
                            return (
                                <div key={prog.id} className={`bg-white p-8 rounded-[2.5rem] border ${ac.border} shadow-xl shadow-gray-100/50 hover:shadow-2xl transition-all duration-300`}>
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border mb-6 ${ac.badge}`}>
                                        {prog.tag}
                                    </div>
                                    <div className={`w-14 h-14 ${ac.bgLight} ${ac.text} rounded-2xl flex items-center justify-center mb-6`}>
                                        {prog.icon}
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 mb-3 leading-snug">{prog.title}</h3>
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8">{prog.desc}</p>
                                    <div className="space-y-4">
                                        {prog.items.map((item, idx) => (
                                            <div key={idx} className="flex items-start space-x-3">
                                                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${ac.dot}`}></div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-800">{item.label}</p>
                                                    <p className="text-xs text-gray-500 font-medium leading-relaxed mt-0.5">{item.detail}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Strengths Section */}
            <section className="py-24 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-gray-900 mb-4">독수리수학 특목대비의 강점</h2>
                        <p className="text-gray-500 font-medium">오직 합격을 위한, 검증된 시스템</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {strengths.map((s, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg shadow-gray-200/30 text-center hover:border-amber-200 transition-colors">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl mb-5">
                                    {s.icon}
                                </div>
                                <h4 className="text-base font-black text-gray-900 mb-2">{s.title}</h4>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed">{s.desc || s.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <div className="bg-white py-24 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black text-gray-900 mb-6">목표로 가는 가장 빠른 길,<br className="md:hidden" /> 지금 시작하세요.</h2>
                    <p className="text-gray-500 font-medium mb-12">
                        학생의 현재 수준과 목표를 분석하여<br />최적의 특목대비 로드맵을 설계해 드립니다.
                    </p>
                    <Link to="/contact/counseling" className="inline-flex items-center px-12 py-5 bg-[#1e3a8a] text-white font-black rounded-2xl hover:bg-black transition-all group shadow-xl shadow-blue-100">
                        특목대비 상담 신청
                        <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
