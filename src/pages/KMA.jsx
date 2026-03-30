import React from 'react';
import {
    Trophy,
    Calendar,
    CheckCircle2,
    ArrowRight,
    Star,
    Zap,
    ClipboardCheck,
    BarChart3,
    Award,
    Clock,
    Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const content = {
    overview: {
        title: "KMA 한국수학학력평가",
        subtitle: "전국 단위의 객관적인 실력 검증",
        desc: "KMA(Korea Mathematics Assessment)는 한국공업표준협회가 후원하고 한국수학학력평가연구원이 주관하는 전국 단위 수학 학력평가입니다. 단순 연산력을 넘어 응용력과 사고력을 종합적으로 평가합니다.",
        benefits: [
            { icon: <BarChart3 className="text-blue-600" />, title: "객관적 지표 제공", desc: "전국 응시생 중 내 아이의 위치를 백분율과 표준점수로 정확히 파악합니다." },
            { icon: <Target className="text-red-600" />, title: "단원별 성취도 진단", desc: "취약 단원과 강점 단원을 분석하여 향후 학습 방향을 제시합니다." },
            { icon: <Zap className="text-amber-600" />, title: "시험 실전 감각 배양", desc: "실제 고사장에서의 응시 경험을 통해 시험에 대한 긴장감을 극복하고 자신감을 얻습니다." }
        ]
    },
    prepClass: {
        title: "KMA 대비반 프로그램 안내",
        desc: "독수리수학은 단순 문제 풀이를 넘어, 고득점과 상급 입상을 위한 전략적 지도를 수행합니다.",
        programInfo: {
            target: "초·중등 수학 실력 향상을 목표로 하는 학생",
            schedule: "매주 토요일 오전 10시 ~ 오후 1시",
            duration: "4주 과정 (총 4회)"
        },
        features: [
            {
                title: "시험 범위 단원 심화 개념 정립",
                desc: "KMA 출제 범위의 핵심 개념을 완벽히 이해하고 다양한 유형을 연습합니다."
            },
            {
                title: "실전 모의고사 별도 진행",
                desc: "실제 평가 환경과 동일한 시간·난이도로 구성된 모의고사를 매회 실시합니다."
            },
            {
                title: "영역별 약점 분석 리포트 제공",
                desc: "학생 개개인의 취약 영역을 정밀 분석하여 맞춤형 학습 방향을 제시합니다."
            }
        ],
        curriculum: [
            {
                session: "1회",
                content: "기출유형 분석 + 실전 모의고사 ①",
                focus: "시간 관리 & 계산 정확도 향상"
            },
            {
                session: "2회",
                content: "응용·서술형 집중 + 실전 모의고사 ②",
                focus: "사고력 문제 접근법 훈련"
            },
            {
                session: "3회",
                content: "취약 단원 집중 클리닉 + 모의고사 ③",
                focus: "단원별 실수 유형 점검"
            },
            {
                session: "4회",
                content: "종합 실전 모의고사 + 해설 총정리",
                focus: "실전 완성 & 오답 정복"
            }
        ]
    },
    schedule: {
        title: "평가 일정 및 시상",
        calendar: [
            { period: "상반기 (6월)", event: "매년 6월 중순 토요일 시행", focus: <>1학기 전 과정 <br className="md:hidden" />및 심화</> },
            { period: "하반기 (11월)", event: "매년 11월 중순 토요일 시행", focus: <>2학기 전 과정 <br className="md:hidden" />및 창의 사고력</> }
        ],
        awards: ["대상", "최우수상", "우수상", "장려상", "성적우수 학교 및 지도자상"]
    }
};

export default function KMA() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-[#1e3a8a] pt-24 pb-16 px-4 text-white">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-400/20 text-blue-300 text-xs font-bold rounded-full mb-6 border border-blue-400/30">
                        <Award size={16} className="mr-2" />
                        전국 수학 학력평가 대비반
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
                        KMA 만점 도전, <br />
                        <span className="text-blue-300">실력은 준비된 자</span>의 것입니다
                    </h1>
                    <p className="text-blue-100 text-base max-w-3xl mx-auto font-medium leading-relaxed opacity-90">
                        전국 단위 평가를 통해<br className="md:hidden" /> 아이의 객관적인 수학 위치를 확인하고,<br />
                        수학적 성취감과 자신감을 심어주는<br className="md:hidden" /> 최적의 기회를 만드세요.
                    </p>
                </div>
            </div>

            {/* Overview Section */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{content.overview.title}</h2>
                        <p className="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed text-sm">
                            {content.overview.desc}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {content.overview.benefits.map((benefit, idx) => (
                            <div key={idx} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 text-center hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all group">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform">
                                    {benefit.icon}
                                </div>
                                <h4 className="text-xl font-black text-slate-900 mb-4">{benefit.title}</h4>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                    {benefit.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prep Section */}
            <section className="py-24 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{content.prepClass.title}</h2>
                        <p className="text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed text-sm">
                            {content.prepClass.desc}
                        </p>
                    </div>

                    {/* Program Info List */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 mb-16">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="text-blue-600 font-bold mr-3">•</span>
                                <div>
                                    <span className="font-bold text-slate-900">대상:</span>
                                    <span className="text-slate-700 ml-2">{content.prepClass.programInfo.target}</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 font-bold mr-3">•</span>
                                <div>
                                    <span className="font-bold text-slate-900">수업 일정:</span>
                                    <span className="text-slate-700 ml-2">{content.prepClass.programInfo.schedule}</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 font-bold mr-3">•</span>
                                <div>
                                    <span className="font-bold text-slate-900">수업 기간:</span>
                                    <span className="text-slate-700 ml-2">{content.prepClass.programInfo.duration}</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {content.prepClass.features.map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-200 hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 font-bold text-xl">
                                    0{idx + 1}
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h4>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Curriculum Table */}
                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
                            <div className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></div>
                            수업 구성 예시 (4주 커리큘럼)
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-slate-200">
                                        <th className="text-left py-4 px-6 text-sm font-bold text-slate-700 bg-slate-50">회차</th>
                                        <th className="text-left py-4 px-6 text-sm font-bold text-slate-700 bg-slate-50">주요 내용</th>
                                        <th className="text-left py-4 px-6 text-sm font-bold text-slate-700 bg-slate-50">학습 포인트</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {content.prepClass.curriculum.map((item, idx) => (
                                        <tr key={idx} className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors">
                                            <td className="py-5 px-6">
                                                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                                                    {item.session}
                                                </span>
                                            </td>
                                            <td className="py-5 px-6 text-sm font-bold text-slate-700">{item.content}</td>
                                            <td className="py-5 px-6 text-sm font-medium text-slate-500">{item.focus}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Schedule & Awards */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Schedule */}
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center">
                                <Calendar className="mr-3 text-blue-600" />
                                평가 일정
                            </h3>
                            <div className="space-y-4">
                                {content.schedule.calendar.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div>
                                            <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2 inline-block">
                                                {item.period}
                                            </span>
                                            <h4 className="text-lg font-black text-slate-900">{item.event}</h4>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-bold text-slate-400 block mb-1">집중 단원</span>
                                            <span className="text-sm font-bold text-slate-700">{item.focus}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Awards */}
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center">
                                <Trophy className="mr-3 text-amber-500" />
                                시상 부문
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {content.schedule.awards.map((award, idx) => (
                                    <div key={idx} className="px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl shadow-sm flex items-center space-x-3 hover:border-amber-200 transition-colors">
                                        <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center font-black text-sm">
                                            {idx + 1}
                                        </div>
                                        <span className="text-base font-black text-slate-800">{award}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 p-8 bg-amber-50 rounded-3xl border border-amber-100 italic">
                                <p className="text-sm font-bold text-amber-900 leading-relaxed">
                                    "KMA 시상의 영광은 꾸준한 노력과 정확한 가이드가 만날 때 이루어집니다. 독수리수학이 그 영광의 길을 함께합니다."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <div className="bg-slate-50 py-24 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">우리 아이의 진짜 수학 실력,<br className="md:hidden" /> 지금 확인하세요.</h2>
                    <p className="text-slate-500 font-medium mb-12 leading-relaxed">
                        KMA 학력평가 대비를 통해 현재 학습 수준을 점검하고,<br />
                        더 높은 목표를 향한 확실한 학습 동기를 부여해 드립니다.
                    </p>
                    <Link to="/contact/counseling" className="inline-flex items-center px-12 py-5 bg-[#1e3a8a] text-white font-black rounded-2xl hover:bg-black transition-all group shadow-xl shadow-blue-100">
                        KMA 대비반 상담 신청
                        <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
