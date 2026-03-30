import React, { useState } from 'react';
import {
    GraduationCap,
    BookOpen,
    Target,
    CheckCircle2,
    ArrowRight,
    Star,
    ShieldCheck,
    ClipboardCheck,
    Trophy,
    BaggageClaim,
    FileText,
    Zap,
    Clock,
    Calendar,
    Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';

const content = {
    features: {
        title: "수업특징",
        icon: <Star className="w-5 h-5" />,
        items: [
            {
                title: "1:1 밀착 개별진도 수업",
                desc: "판서식 수업이 아닌, 학생 개개인의 이해도에 맞춘 1:1 진도를 나갑니다. 모르는 부분을 그냥 넘어가지 않고 완벽히 이해할 때까지 지도합니다.",
                points: ["수준별 맞춤 교재 선정", "개인차를 고려한 설명과 피드백", "학생별 질문 난이도 조절"]
            },
            {
                title: "고등 수학으로 이어지는 심화 학습",
                desc: "중등 과정은 고등 수학의 기초입니다. 단순 암기나 연산이 아닌, 고등부까지 연결되는 논리적 사고력과 개념의 깊이를 더합니다.",
                points: ["고등 연계 개념 집중 보강", "서술형 풀이 과정 엄격 관리", "증명 중심의 원리 이해"]
            },
            {
                title: "철저한 오답 관리 시스템",
                desc: "틀린 문제는 왜 틀렸는지 분석하고, 비슷한 유형을 다시는 틀리지 않도록 '오답 클리닉'을 통해 완벽하게 마스터합니다.",
                points: ["1:1 오답 노트 작성 지도", "유사 문항 무한 반복 훈련", "주간/월간 학습 성취도 점검"]
            }
        ]
    },
    textbooks: {
        title: "교재선택",
        icon: <BookOpen className="w-5 h-5" />,
        desc: "독수리수학은 시중 우수 교재와 자체 보충 자료를 결합하여 학생의 실력을 최상으로 끌어올립니다.",
        levels: [
            {
                name: "개념 중심 (Concept)",
                target: "기초를 탄탄히 다져야 하는 학생",
                examples: "개념원리, 개념+유형(라이트), 만렙 AM 등"
            },
            {
                name: "유형/응용 (Standard)",
                target: "다양한 문제 풀이가 필요한 학생",
                examples: "쎈(SSEN), RPM, 쎈B, 일품 등"
            },
            {
                name: "심화 (Advanced)",
                target: "상위권 및 특목고를 목표로 하는 학생",
                examples: "블랙라벨, 최상위 수학, 에이급 수학 등"
            }
        ],
        extra: "학교별 내신 기출 분석 자료와 독수리수학이 직접 선별한 프린트물이 함께 제공됩니다."
    },
    schedule: {
        title: "수업안내 및 표준시간표",
        icon: <Clock className="w-5 h-5" />,
        info: {
            title: "중등부 정규반 수업안내",
            desc1: "독수리수학 중등부 정규반은 현행 중심의 기본 과정과 빠른 고등 진입을 위한 심화 과정으로 나누어 운영됩니다.",
            desc2a: "내신 시험 기간에는 체계적인 집중 시험 대비가 이루어지며, 정규 학기 동안은 기본과 심화를 균형 있게 학습해",
            desc2b: "고등 수학 학습에 자연스럽게 연결될 수 있도록 지도합니다."
        },
        timetable: {
            title: "중등부 표준시간표",
            sessions: [
                {
                    day: "월, 수, 금반",
                    starts: ["오후 6:00", "오후 7:00"],
                    options: "주 3회 또는 주 2회 선택 가능"
                },
                {
                    day: "화, 목반",
                    starts: ["오후 6:00", "오후 7:00"],
                    options: "주 2회 수업"
                }
            ],
            notes: [
                "주 3일 또는 주 2일 선택 (수학 6타임 구성)",
                "수업 구성: 2시간 정규수업 + 1시간 맞춤형 클리닉",
                "밀도 있는 수업으로 개념을 다지고 클리닉에서 약점 보완"
            ]
        },
        management: [
            {
                title: "(1) 월례고사",
                desc: "매달 정기 평가를 통해 학생의 성취도를 확인하고, 학부모님께 개별 피드백을 제공합니다."
            },
            {
                title: "(2) 교재 진단평가",
                desc: "교재 완강 시 진단평가를 실시하여 완성도를 점검하고, 부족한 부분은 클리닉 및 복습 과정에서 보완합니다."
            },
            {
                title: "(3) 복습 방식의 차별화",
                desc: "단순 반복이 아닌, 다음 과정 진도를 나가면서 자연스럽게 누적 학습 효과를 극대화하여 아이의 흥미를 지켜줍니다."
            }
        ]
    },
    exams: {
        title: "내신대비",
        icon: <ShieldCheck className="w-5 h-5" />,
        desc: "출제 유형을 암기하는 것이 아니라, 문제를 이해하고 해석하는 능력을 기릅니다. 학교별 맞춤 전략으로 성적을 증명합니다.",
        schools: ["신길중", "대영중", "문창중", "윤중중", "강남중", "대방중", "영원중"],
        process: [
            { title: "1단계: 응용력 강화 커리큘럼", desc: "기본 유형에서 C단계 수준까지 실력을 끌어올리고, 서술형 및 사고 과정 설명 수업을 통해 응용력을 강화합니다." },
            { title: "2단계: 기출-변형 집중 프로그램", desc: "최근 3개년 학교별 기출 문제를 전수 분석하고, 변형 가능성이 높은 문항을 집중적으로 훈련합니다." },
            { title: "3단계: 고난도 문항 완전 정복", desc: "단원별 고난도 예상 문항을 매주 풀이하고, '고난도 향상 클리닉'을 통해 1:1로 약점을 즉시 보완합니다." },
            { title: "4단계: 시험 직전 파이널 전략", desc: "시험 2주 전부터 실전 시뮬레이션 모의고사를 진행하고, 개인별 맞춤 피드백과 예상문제 패키지로 최종 점검합니다." }
        ]
    },
    admissions: {
        title: "특목고입시",
        icon: <Zap className="w-5 h-5" />,
        desc: "과학고, 외고, 자사고 합격을 위해 중등 심화부터 고등 상위권 실력까지 로드맵을 설계합니다.",
        features: [
            {
                title: "심화 사고력 배양",
                desc: "특목고 진학 후에도 무너지지 않는 깊이 있는 사고력을 기르는 데 집중합니다."
            },
            {
                title: "입시 로드맵 설계",
                desc: "학생의 목표 학교에 맞춘 학생부 관리 조언과 수학 실력 완성 일정을 관리합니다."
            }
        ],
        badge: "특목고/자사고 합격생 배출 노하우 보유"
    }
};

export default function Middle() {
    const [activeTab, setActiveTab] = useState('features');

    const tabs = [
        { id: 'features', label: content.features.title, icon: content.features.icon },
        { id: 'textbooks', label: content.textbooks.title, icon: content.textbooks.icon },
        { id: 'schedule', label: content.schedule.title, icon: content.schedule.icon },
        { id: 'exams', label: content.exams.title, icon: content.exams.icon },
        { id: 'admissions', label: content.admissions.title, icon: content.admissions.icon }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-[#0f172a] pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-full mb-4 border border-indigo-500/20">
                        중등부 프로그램
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                        중등 내신 만점부터<br />
                        <span className="text-indigo-400">대입의 성공</span>까지 연결되는 힘
                    </h1>
                    <p className="text-gray-400 text-base max-w-2xl mx-auto font-medium">
                        중학교 시기는 수학의 결이 바뀌는 중요한 때입니다.<br />
                        독수리수학은 탄탄한 중등 실력을 바탕으로 고등 수학의 승자를 만듭니다.
                    </p>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="sticky top-20 bg-white border-b border-gray-100 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-center -mb-px overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-6 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-[#1e3a8a] text-[#1e3a8a] bg-blue-50/50'
                                    : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                {activeTab === 'features' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {content.features.items.map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 hover:scale-[1.02] transition-transform group">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center mb-6 font-bold text-xl group-hover:bg-indigo-700 group-hover:text-white transition-colors">
                                    0{idx + 1}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                                    {item.desc}
                                </p>
                                <ul className="space-y-3">
                                    {item.points.map((pt, pIdx) => (
                                        <li key={pIdx} className="flex items-center text-xs font-bold text-indigo-600">
                                            <CheckCircle2 size={14} className="mr-2" />
                                            {pt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'textbooks' && (
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-indigo-50 p-10 rounded-[3rem] mb-12 text-center border border-indigo-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">중등 수학 교재 라인업</h3>
                            <p className="text-gray-600 text-sm font-medium leading-relaxed">
                                {content.textbooks.desc}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {content.textbooks.levels.map((level, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-lg shadow-gray-100 hover:border-indigo-200 transition-colors">
                                    <div className="md:w-56 min-w-[14rem] text-center md:text-left mb-4 md:mb-0">
                                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 uppercase tracking-widest">
                                            {level.name.split(' ')[1].replace(/[()]/g, '')}
                                        </span>
                                        <h4 className="text-base font-bold text-gray-900 mt-2">{level.name.split(' ')[0]}</h4>
                                    </div>
                                    <div className="flex-grow md:pl-10 text-center md:text-left">
                                        <p className="text-sm font-bold text-gray-600 mb-2">대상: {level.target}</p>
                                        <p className="text-xs font-medium text-gray-400 italic">주요 교재: {level.examples}</p>
                                    </div>
                                    <div className="mt-4 md:mt-0">
                                        <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-700">
                                            <BaggageClaim size={24} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 bg-[#1e3a8a] p-8 rounded-[2rem] text-white flex items-center shadow-xl shadow-blue-200">
                            <div className="mr-6 hidden md:block">
                                <FileText size={40} className="text-blue-300" />
                            </div>
                            <p className="text-sm font-bold leading-relaxed">
                                <span className="text-blue-300">PLUS!</span><br />
                                {content.textbooks.extra}
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'schedule' && (
                    <div className="space-y-12">
                        {/* Class Info Section */}
                        <div className="max-w-4xl mx-auto text-center mb-16 px-4">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
                                {content.schedule.info.title}
                            </h3>
                            <div className="space-y-0 text-gray-600 text-sm md:text-base font-medium leading-relaxed">
                                <p>{content.schedule.info.desc1}</p>
                                <p>
                                    {content.schedule.info.desc2a}<br />
                                    {content.schedule.info.desc2b}
                                </p>
                            </div>
                        </div>

                        {/* Timetable Section */}
                        <div className="max-w-5xl mx-auto">
                            <div className="flex items-center space-x-3 mb-10">
                                <div className="w-1.5 h-8 bg-indigo-600 rounded-full"></div>
                                <h3 className="text-2xl font-bold text-gray-900">{content.schedule.timetable.title}</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                {content.schedule.timetable.sessions.map((session, idx) => (
                                    <div key={idx} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                                        <h4 className="text-lg font-bold text-indigo-700 mb-6 flex items-center">
                                            <Calendar size={20} className="mr-2" />
                                            {session.day}
                                        </h4>
                                        <div className="space-y-4 mb-6">
                                            {session.starts.map((time, tIdx) => (
                                                <div key={tIdx} className="flex items-center justify-between bg-white px-5 py-3 rounded-xl border border-slate-200/50 shadow-sm">
                                                    <span className="text-sm font-bold text-gray-700">{time} 시작반</span>
                                                    <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">모집중</span>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-sm font-bold text-slate-500">{session.options}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                                <ul className="space-y-2">
                                    {content.schedule.timetable.notes.map((note, idx) => (
                                        <li key={idx} className="flex items-center text-sm font-bold text-indigo-800">
                                            <CheckCircle2 size={16} className="mr-2 flex-shrink-0" />
                                            {note}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Management System Section */}
                        <div className="max-w-5xl mx-auto pt-12">
                            <div className="flex items-center space-x-3 mb-10">
                                <div className="w-1.5 h-8 bg-[#0f172a] rounded-full"></div>
                                <h3 className="text-2xl font-bold text-gray-900">학습 관리시스템</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                {content.schedule.management.map((item, idx) => (
                                    <div key={idx} className="group bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/30 hover:bg-[#0f172a] transition-all duration-300">
                                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                {idx === 0 ? <ClipboardCheck size={28} /> : idx === 1 ? <Target size={28} /> : <Lightbulb size={28} />}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-white transition-colors">{item.title}</h4>
                                                <p className="text-gray-500 text-sm font-medium leading-relaxed group-hover:text-gray-400 transition-colors">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'exams' && (
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-3 mb-16">
                            {content.exams.schools.map((school, idx) => (
                                <span key={idx} className="px-5 py-2 bg-slate-50 border border-slate-200 text-slate-600 font-bold rounded-full text-sm">
                                    #{school}
                                </span>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {content.exams.process.map((step, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="w-16 h-16 bg-white border-2 border-indigo-100 shadow-lg rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="text-lg font-black text-indigo-700">0{idx + 1}</span>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h4>
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed px-4">
                                        {step.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-20 p-12 bg-indigo-900 rounded-[3.5rem] text-center text-white shadow-2xl shadow-indigo-200">
                            <h3 className="text-2xl md:text-3xl font-bold mb-6">중등 내신, 결과로 증명합니다.</h3>
                            <p className="text-indigo-200 text-sm md:text-base font-medium mb-10 max-w-2xl mx-auto">
                                매년 배출되는 평균 90점 이상의 우수한 성적과 만점 사례들.<br />
                                독수리수학의 내신 전략이 아이의 자신감을 바꿉니다.
                            </p>
                            <a href="/about/results" className="inline-flex items-center px-8 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
                                성적 우수 사례 보기
                            </a>
                        </div>
                    </div>
                )}

                {activeTab === 'admissions' && (
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full mb-6 border border-indigo-100">
                                {content.admissions.badge}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">특목고/자사고 입시 전형 대비</h2>
                            <p className="text-gray-500 text-sm md:text-base font-medium">{content.admissions.desc}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {content.admissions.features.map((feature, idx) => (
                                <div key={idx} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-[4rem] flex items-center justify-center text-indigo-600 transition-transform group-hover:scale-110">
                                        <ClipboardCheck size={28} />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-4">{feature.title}</h4>
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 p-8 bg-blue-50/50 rounded-3xl border border-blue-100 text-center">
                            <p className="text-sm font-bold text-blue-800 leading-relaxed italic">
                                "특목고 입시는 단순히 문제를 잘 푸는 것을 넘어, 어려운 문제를 끝까지 물고 늘어지는 끈기와 창의적 발상에서 결정됩니다."
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom CTA */}
            <div className="bg-slate-50 py-24 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">확실한 성적 향상,<br className="md:hidden" /> 지금 상담 받아보세요.</h2>
                    <p className="text-gray-500 text-sm font-medium mb-12">
                        현재 학습 수준을 진단하고, 목표하는 고등학교 진학을 위한 중등 로드맵을 제안해 드립니다.
                    </p>
                    <Link to="/contact/counseling" className="inline-flex items-center px-8 md:px-10 py-3.5 md:py-4 bg-[#1e3a8a] text-white font-bold rounded-2xl hover:bg-black transition-all group shadow-xl shadow-blue-200 text-sm md:text-base">
                        상담 신청하기
                        <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
