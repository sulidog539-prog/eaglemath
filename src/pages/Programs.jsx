import React, { useState } from 'react';
import { BookOpen, GraduationCap, Users, Calendar, Clock, CheckCircle2, ArrowRight, UserCheck, LayoutGrid, Monitor, Award, Info, ClipboardCheck, Target, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const teachers = [
    {
        name: "이호길 T",
        edu: "연세대 공대",
        target: "장훈고 1학년",
        focus: ["교과서(YBM) + 부교재(학평기출) 완벽 연계", "장훈고 특유의 사고형 문항 집중 훈련", "실제 시험 기반 타임어택 훈련"],
        color: "bg-[#0f172a]"
    },
    {
        name: "김선도 T",
        edu: "공주한일고 · 고려대 경제",
        target: "영등포여고 1학년 / 수1·확통",
        focus: ["미래엔 교과서 + 올림포스 변형 대비", "서술형 감점 없는 완벽한 풀이 과정 관리", "수능 출제 빈도 높은 유형 중심 정리"],
        color: "bg-[#1e3a8a]"
    },
    {
        name: "이송주 T",
        edu: "고려대 수학과",
        target: "대영고 1학년 / 미적분·수2",
        focus: ["대영고 학교 프린트 연계 철저 반영", "실수 차단형 계산·과정 관리 시스템", "극한-미분-적분 연결 구조 마스터"],
        color: "bg-[#334155]"
    }
];

const satSubjects = [
    {
        id: "calculus",
        title: "미적분",
        teacher: "이송주 T",
        time: "일요일 15:00 ~ 18:00",
        note: "추가 개설 반은 별도 문의",
        curriculum: [
            "수열의 극한", "급수", "여러 가지 함수의 미분", "여러 가지 미분법",
            "도함수의 활용", "여러 가지 적분법", "정적분의 활용", "실전 종합 문제 + 고난도 유형 정리"
        ],
        summary: "미분·적분 계산력 + 그래프 해석력 + 킬러 접근법까지 정리"
    },
    {
        id: "math1",
        title: "수학 I",
        teacher: "김선도 T",
        time: "토요일 15:00 ~ 18:00",
        curriculum: [
            "지수와 로그", "지수함수와 로그함수", "삼각함수", "사인법칙과 코사인법칙",
            "등차수열", "등비수열", "수열의 합", "수학적 귀납법 + 실전 종합 정리"
        ],
        summary: "수능 출제 빈도 높은 유형 중심, 계산 실수 최소화 훈련"
    },
    {
        id: "math2",
        title: "수학 II",
        teacher: "이송주 T",
        time: "일요일 19:00 ~ 22:00",
        curriculum: [
            "함수의 극한", "함수의 연속", "미분계수와 도함수", "도함수의 활용 ①",
            "도함수의 활용 ②", "부정적분과 정적분", "정적분의 활용", "수능특강 고난도·실전 문제 정리"
        ],
        summary: "극한–미분–적분 연결 구조 완성 & 실전 적용력 강화"
    },
    {
        id: "prob",
        title: "확률과 통계",
        teacher: "김선도 T",
        time: "토요일 19:00 ~ 22:00",
        curriculum: [
            "순열과 조합", "이항정리", "확률의 뜻과 활용", "조건부확률",
            "이산확률분포", "정규분포", "통계적 추정 ①", "통계적 추정 ② + 실전 총정리"
        ],
        summary: "개개인의 취약 유형 분석 + 빠르고 정확한 실전 풀이 감각 형성"
    }
];

const tabs = [
    { id: 'instructors', label: '전문 강사진', icon: <Users size={18} /> },
    { id: 'regular', label: '정규반 안내', icon: <LayoutGrid size={18} /> },
    { id: 'sat', label: '수능 대비', icon: <Monitor size={18} /> },
    { id: 'school', label: '내신 대비', icon: <Award size={18} /> },
];

export default function Programs() {
    const [activeTab, setActiveTab] = useState('instructors');

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Unified with Middle/Elementary */}
            <section className="pt-24 pb-16 bg-[#0f172a] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#fbbf24] via-transparent to-transparent"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block px-3 py-1 bg-[#fbbf24] text-[#0f172a] text-[10px] font-black rounded-full mb-4 tracking-widest uppercase">Programs</span>
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                        입시 수학의 정점,<br />
                        <span className="text-[#fbbf24] font-bold">독수리수학</span> 프로그램
                    </h1>
                    <p className="text-slate-400 text-base max-w-2xl mx-auto font-medium leading-relaxed">
                        분야별 전문 강사진의 분석과 성과로 증명하는<br className="md:hidden" /> 최적화된 커리큘럼
                    </p>
                </div>
            </section>

            {/* Tab Navigation */}
            <div className="sticky top-14 lg:top-20 z-40 bg-white border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center space-x-1 sm:space-x-8 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 py-5 px-4 text-sm font-black transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-[#1e3a8a]' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                                {activeTab === tab.id && (
                                    <span className="absolute bottom-0 left-0 w-full h-1 bg-[#fbbf24] rounded-t-full"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="transition-all duration-300">
                {/* 1. Instructors Section */}
                {activeTab === 'instructors' && (
                    <section className="py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-2xl md:text-3xl font-black text-[#0f172a] mb-3 tracking-tight">Professional Instructors</h2>
                                <p className="text-slate-500 font-medium text-sm md:text-base">성적으로 증명하는 독수리수학 최정예 강사진을 소개합니다.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {teachers.map((t, idx) => (
                                    <div key={idx} className="group bg-slate-50 rounded-[2rem] p-8 hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-slate-100 flex flex-col items-center text-center">
                                        <div className={`w-16 h-16 rounded-2xl ${t.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                            <Users size={28} />
                                        </div>
                                        <h3 className="text-xl font-black text-[#0f172a] mb-1">{t.name}</h3>
                                        <p className="text-[#1e3a8a] text-sm font-bold mb-3">{t.edu}</p>
                                        <div className="inline-block px-3 py-0.5 bg-white border border-slate-200 rounded-full text-[10px] font-black text-slate-500 mb-6 uppercase tracking-wider">{t.target}</div>
                                        <div className="space-y-3 w-full text-left">
                                            {t.focus.map((f, fidx) => (
                                                <div key={fidx} className="flex items-start">
                                                    <div className="mt-1 mr-2.5 text-[#fbbf24]"><CheckCircle2 size={14} /></div>
                                                    <p className="text-slate-600 text-xs md:text-sm font-bold leading-relaxed">{f}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 1.5 Regular Class Section (New) */}
                {activeTab === 'regular' && (
                    <section className="py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                            {/* Class Info */}
                            <div className="text-center mb-16 px-4">
                                <h2 className="text-2xl md:text-3xl font-black text-[#0f172a] mb-8 tracking-tight">수업안내 및 표준시간표</h2>
                                <div className="space-y-4 text-slate-600 text-sm md:text-base font-bold leading-relaxed">
                                    <p>독수리수학 고등부 정규반은 현행 중심의 기본 과정과<br className="md:hidden" /> 깊이 있는 수능/내신 심화 과정으로 운영됩니다.</p>
                                    <p>내신 기간에는 학교별 집중 대비가 이루어지며,<br className="md:hidden" /> 정규 학기 동안은 개념과 실전을 균형 있게 학습하여<br className="md:hidden" /> 최상의 성적을 이끌어냅니다.</p>
                                </div>
                            </div>

                            {/* Timetable */}
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="w-1.5 h-8 bg-[#0f172a] rounded-full"></div>
                                <h3 className="text-2xl font-black text-[#0f172a]">고등부 표준시간표</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                {[
                                    { day: "월, 수, 금반", times: ["오후 6:00", "오후 7:00"], options: "주 3회 또는 주 2회 선택 가능" },
                                    { day: "화, 목반", times: ["오후 6:00"], options: "주 2회 수업" }
                                ].map((session, idx) => (
                                    <div key={idx} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                                        <h4 className="text-lg font-black text-[#1e3a8a] mb-6 flex items-center">
                                            <Calendar size={20} className="mr-2" />
                                            {session.day}
                                        </h4>
                                        <div className="space-y-4 mb-6">
                                            {session.times.map((time, tIdx) => (
                                                <div key={tIdx} className="flex items-center justify-between bg-white px-5 py-3.5 rounded-xl border border-slate-200/50 shadow-sm">
                                                    <span className="text-sm font-bold text-slate-700">{time} 시작반</span>
                                                    <span className="text-xs font-bold text-[#0f172a] bg-[#fbbf24] px-2.5 py-1 rounded-full">모집중</span>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xs md:text-sm font-bold text-slate-400">{session.options}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-[#0f172a]/5 p-8 rounded-2xl border border-[#0f172a]/10 mb-16 font-bold text-sm md:text-base text-[#1e3a8a]">
                                <ul className="space-y-3">
                                    <li className="flex items-center"><CheckCircle2 size={16} className="mr-2 text-[#fbbf24]" /> 주 3일 또는 주 2일 선택<br className="md:hidden" /> (맞춤형 시간표 구성 가능)</li>
                                    <li className="flex items-center"><CheckCircle2 size={16} className="mr-2 text-[#fbbf24]" /> 수업 구성: 2시간 정규수업<br className="md:hidden" /> + 1시간 개별 맞춤 클리닉</li>
                                    <li className="flex items-center"><CheckCircle2 size={16} className="mr-2 text-[#fbbf24]" /> 밀도 있는 수업으로 개념을 다지고<br className="md:hidden" /> 클리닉에서 약점 집중 보완</li>
                                </ul>
                            </div>

                            {/* Management System */}
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="w-1.5 h-8 bg-[#0f172a] rounded-full"></div>
                                <h3 className="text-2xl font-black text-[#0f172a]">학습 관리 시스템</h3>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { title: "(1) 월례고사", desc: "매달 정기 평가를 통해 학생의 성취도를 확인하고, 분석 자료와 함께 개별 피드백을 제공합니다.", icon: <ClipboardCheck size={28} /> },
                                    { title: "(2) 교재 진단평가", desc: "교재 완강 시 진단평가를 실시하여 성취도를 점검하고, 부족한 부분은 오답 클리닉을 통해 마스터합니다.", icon: <Target size={28} /> },
                                    { title: "(3) 복습 방식의 차별화", desc: "단순 반복이 아닌 실전 적용 능력을 배양하며, 누적 학습을 통해 상위 과정과의 연결성을 강화합니다.", icon: <Lightbulb size={28} /> }
                                ].map((item, idx) => (
                                    <div key={idx} className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/30 hover:bg-[#0f172a] transition-all duration-300">
                                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                                            <div className="w-14 h-14 bg-slate-50 text-[#1e3a8a] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#fbbf24] group-hover:text-[#0f172a] transition-colors">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-black text-[#0f172a] mb-2 group-hover:text-white transition-colors">{item.title}</h4>
                                                <p className="text-slate-500 text-sm md:text-base font-bold leading-relaxed group-hover:text-slate-400 transition-colors">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 2. SAT Program Section */}
                {activeTab === 'sat' && (
                    <section className="py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <span className="text-[#1e3a8a] font-black tracking-widest text-xs uppercase mb-3 block">High School seniors</span>
                                <h2 className="text-2xl md:text-3xl font-black text-[#0f172a] mb-4 italic uppercase">“수능 수학의 방향이 달라집니다”</h2>
                                <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl mx-auto">
                                    EBS 수능특강을 단순히 ‘풀기’만 하는 것이 아니라<br className="md:hidden" /> 실제 수능 점수로 연결하는 8주 집중 커리큘럼입니다.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {satSubjects.map((sub, idx) => (
                                    <div key={idx} className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 element-hover-scale">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-100 gap-4">
                                            <div>
                                                <h3 className="text-2xl font-black text-[#0f172a] flex items-center mb-1">
                                                    <BookOpen className="text-[#fbbf24] mr-3" size={24} />
                                                    {sub.title}
                                                </h3>
                                                <p className="text-[#1e3a8a] font-black text-sm md:text-base">{sub.teacher} | {sub.time}</p>
                                                {sub.note && <p className="text-slate-400 text-xs font-bold mt-1">※ {sub.note}</p>}
                                            </div>
                                            <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 self-start md:self-center">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Duration</span>
                                                <span className="text-xs md:text-sm font-black text-slate-700">8주 완성</span>
                                            </div>
                                        </div>

                                        <div className="overflow-hidden rounded-2xl border border-slate-100 mb-8">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-[#0f172a] text-white font-black tracking-widest uppercase text-xs">
                                                    <tr>
                                                        <th className="px-5 py-3.5 w-24 text-center">주차</th>
                                                        <th className="px-5 py-3.5">학습 내용</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sub.curriculum.map((item, i) => (
                                                        <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-5 py-3.5 font-black text-[#1e3a8a] text-center">{i + 1}주차</td>
                                                            <td className="px-5 py-3.5 font-bold text-slate-700">{item}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="bg-[#0f172a]/5 p-6 rounded-2xl border border-[#0f172a]/10">
                                            <div className="flex items-start">
                                                <div className="mt-1 mr-3 text-[#1e3a8a]">
                                                    <ArrowRight size={16} />
                                                </div>
                                                <p className="text-sm md:text-base font-black text-[#0f172a] leading-relaxed">
                                                    {sub.summary}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 3. School Prep Section */}
                {activeTab === 'school' && (
                    <section className="py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <span className="text-[#1e3a8a] font-black tracking-widest text-xs uppercase mb-3 block">Weekend Special Lecture</span>
                                <h2 className="text-2xl md:text-3xl font-black text-[#0f172a] mb-6 leading-tight tracking-tight">
                                    독수리수학 고등부 1학년<br />
                                    <span className="text-[#1e3a8a] italic underline decoration-[#fbbf24] underline-offset-4">학교별 내신대비 주말 특강</span>
                                </h2>
                                <div className="bg-slate-50 inline-block px-6 py-3 rounded-2xl border border-slate-100 mb-8">
                                    <p className="text-slate-900 font-black text-sm md:text-base">
                                        개강: <span className="text-[#1e3a8a]">2월 7일</span> (4주+4주=8주 집중 프로그램)
                                    </p>
                                </div>
                                <p className="text-slate-500 font-medium text-sm md:text-base">
                                    장훈고, 영등포여고, 대영고 등 주요 거점 학교별<br className="md:hidden" /> 완벽 맞춤 시스템으로 상위권을 선점합니다.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {[
                                    {
                                        school: "장훈고 1학년",
                                        teacher: "이호길 T",
                                        time: "매주 토요일 오전 11:00 ~ 14:00",
                                        materials: "YBM 교과서 + 학평기출 부교재",
                                        bg: "bg-[#0f172a]",
                                        details: [
                                            "출제 비중 높은 학평 킬러 중심 수업",
                                            "사고형 문항 집중 훈련 및 그림 해석 훈련",
                                            "시험 구성과 동일한 실전 테스트 + 타임어택"
                                        ]
                                    },
                                    {
                                        school: "영등포여고 1학년",
                                        teacher: "김선도 T",
                                        time: "매주 토요일 오전 11:00 ~ 14:00",
                                        materials: "미래엔 교과서 + 올림포스",
                                        bg: "bg-[#1e3a8a]",
                                        details: [
                                            "미래엔 예제/유제 및 올림포스 변형 집중",
                                            "영등포여고 특화 정밀 개념 적용 훈련",
                                            "서술형 감점 0% 도전 풀이 과정 관리"
                                        ]
                                    },
                                    {
                                        school: "대영고 1학년",
                                        teacher: "이송주 T",
                                        time: "매주 일요일 오전 11:00 ~ 14:00",
                                        materials: "미래엔 교과서 + 학교 프린트",
                                        bg: "bg-[#334155]", // Slate 700ish
                                        details: [
                                            "학교 프린트 연계 문항 철저 분석 반영",
                                            "계산 실수 차단 및 정확도 극대화 시스템",
                                            "평이한 난이도 속 100점 사수 손풀이 제공"
                                        ]
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="group bg-slate-50 rounded-[2.5rem] p-8 md:p-10 hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-slate-100 flex flex-col md:flex-row gap-8">
                                        <div className="md:w-1/3 w-full text-center md:text-left flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-200/50 pb-6 md:pb-0 md:pr-8">
                                            <h4 className="text-2xl font-black text-[#0f172a] mb-2 tracking-tighter">{item.school}</h4>
                                            <p className="text-[#1e3a8a] font-black mb-3 text-lg">{item.teacher}</p>
                                            <div className="space-y-1 mb-4">
                                                <div className="flex items-center justify-center md:justify-start text-slate-600 text-sm font-bold">
                                                    <Clock size={14} className="mr-2 text-[#fbbf24]" />
                                                    {item.time}
                                                </div>
                                                <div className="flex items-center justify-center md:justify-start text-slate-400 text-[10px] font-bold uppercase tracking-tighter">
                                                    <BookOpen size={12} className="mr-2" />
                                                    {item.materials}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:w-2/3 w-full space-y-4 flex flex-col justify-center">
                                            {item.details.map((d, didx) => (
                                                <div key={didx} className="flex items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow">
                                                    <div className="w-1.5 h-6 bg-[#1e3a8a] rounded-full mr-5 flex-shrink-0"></div>
                                                    <p className="text-slate-700 text-sm md:text-base font-black leading-snug">{d}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* Bottom Call to Action */}
            <section className="py-16 bg-[#0f172a] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-xl md:text-2xl font-black text-white mb-8">
                        성적이 바뀌는 입시 전략,<br className="sm:hidden" /> 지금 시작하세요.
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 px-4">
                        <Link to="/contact/counseling" className="px-8 py-3.5 md:py-4 bg-[#fbbf24] text-[#0f172a] font-black rounded-xl hover:bg-[#f59e0b] transition-colors shadow-lg text-sm md:text-base">
                            상담 신청하기
                        </Link>
                        <Link to="/contact/admission" className="px-8 py-3.5 md:py-4 bg-transparent border-2 border-white/30 text-white font-black rounded-xl hover:bg-white/10 transition-colors text-sm md:text-base">
                            입학 안내
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
