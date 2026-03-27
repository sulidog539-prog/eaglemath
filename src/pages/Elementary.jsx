import React, { useState } from 'react';
import {
    GraduationCap,
    BookOpen,
    Target,
    CheckCircle2,
    ArrowRight,
    Star,
    Users,
    ClipboardCheck,
    Trophy,
    Award,
    Clock,
    Calendar,
    Lightbulb,
    AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const content = {
    features: {
        title: "수업특징",
        icon: <Star className="w-5 h-5" />,
        items: [
            {
                title: "수준별 맞춤 진도",
                desc: "정밀 진단을 토대로 운영되는 1:1 맞춤 진도표를 통해, 부족한 개념은 보완하고 강점은 심화로 확장하여 체계적으로 성장시킵니다.",
                points: ["정밀 진단 기반 로드맵", "1:1 맞춤 진도표 운영", "취약 보완 및 심화 확장"]
            },
            {
                title: "단계적 커리큘럼",
                desc: "단순 문제풀이를 넘어 원리 이해부터 고난도 문제 해결까지, 학습의 뼈대를 튼튼히 다지는 3단계 과정을 운영합니다.",
                points: ["기초: 원리 및 정의 이해", "대비: 단원평가/서술형 훈련", "심화: 상위권 도약 고난도 해결"]
            },
            {
                title: "개별 클리닉 시스템",
                desc: "수업 중 발생하는 학습 공백을 클리닉 시간을 통해 즉시 점검하고 보완하여, 실수 없는 완벽한 성적 향상을 이끌어냅니다.",
                points: ["개별 약점 즉시 보완", "학습 공백 Zero화", "안정적 성적 향상 견인"]
            }
        ],
        specialStrategies: [
            {
                title: "학교 진도 선행 학습",
                desc: "수업 전에 미리 개념을 접해 자신감을 상승시킵니다.",
                icon: <ArrowRight size={14} />
            },
            {
                title: "단원평가 & 중간·기말 대비",
                desc: "기출 문제와 학교 유형 분석을 통한 밀착 대비를 진행합니다.",
                icon: <ArrowRight size={14} />
            },
            {
                title: "심화 수학 훈련",
                desc: "사고력과 응용력을 길러 최상위권 성적을 확보합니다.",
                icon: <ArrowRight size={14} />
            }
        ]
    },
    textbooks: {
        title: "교재선택",
        icon: <BookOpen className="w-5 h-5" />,
        philosophy: "독수리수학은 학생의 성격, 성향, 현재 수준을 정밀하게 분석하여 최적의 교재를 매칭합니다. 단순히 인기 있는 문제집이 아닌, 우리 아이에게 가장 효과적인 교재를 선택하여 학습 효율을 극대화합니다.",
        pathways: [
            {
                level: "기초 단계",
                books: "디딤돌 원리 → 기본+응용 / 기본+유형",
                target: "개념 이해가 필요한 학생"
            },
            {
                level: "중급 단계",
                books: "최상위S (선택적)",
                target: "응용/유형과 심화를 잇는 중간 단계"
            },
            {
                level: "심화 단계",
                books: "최상위 수학",
                target: "상위권 도약을 원하는 학생"
            }
        ],
        note: "'최상위S'나 '최상위'를 풀 때는 같은 시간이라도 '기본+응용'보다 푸는 문제의 수가 적어 학습능력을 체크해 하루 분량을 정합니다.",
        extra: "학생의 취약 부분에 따라 원장이 직접 선별한 부교재와 자체 프린트물이 추가로 제공됩니다."
    },
    schedule: {
        title: "수업안내 및 표준시간표",
        icon: <Clock className="w-5 h-5" />,
        timetable: {
            title: "정규반 표준시간표 안내",
            sessions: [
                {
                    day: "월, 수, 금반",
                    starts: ["오후 2:00", "오후 3:00", "오후 4:00"],
                    options: "주 3회 또는 주 2회 선택 가능"
                },
                {
                    day: "화, 목반",
                    starts: ["오후 3:00", "오후 5:00"],
                    options: "기본 주 2회 수업"
                }
            ],
            notes: [
                "주 3일 또는 주 2일 선택 (수학 6타임 구성)",
                "수업 구성: 2시간 정규수업 + 1시간 맞춤형 클리닉"
            ]
        },
        tracks: [
            {
                name: "황소 편입 대비 과정",
                period: "최상위권 대상",
                desc: "황소수학 편입을 목표로 하는 학생들을 위한 최고 난이도 과정입니다.",
                details: ["최상위 + 왕수학 + 독수리자체교재"],
                note: "* 구체적인 일정은 황소수학 전용 페이지에서 확인할 수 있습니다"
            },
            {
                name: "현행&심화 과정",
                period: "상위권 대상",
                desc: "학교 진도와 함께 심화 학습을 병행하여 탄탄한 실력을 쌓는 과정입니다.",
                details: ["디딤돌 기본응용 + 최상위S + 독수리자체교재"]
            },
            {
                name: "현행&선행 과정",
                period: "일반 대상",
                desc: "현행 과정을 완벽히 이해하고 다음 학기를 미리 준비하는 과정입니다.",
                details: ["디딤돌 + 개념플러스유형 + 독수리자체교재"]
            },
            {
                name: "KMA 학력평가 대비반",
                period: "4주 과정",
                desc: "KMA 한국수학학력평가를 체계적으로 준비하는 집중 대비 프로그램입니다.",
                details: ["실전 모의고사 + 약점 분석 리포트"],
                note: "* 구체적인 일정은 KMA 전용 페이지에서 확인할 수 있습니다"
            }
        ],
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
    }
};

export default function Elementary() {
    const [activeTab, setActiveTab] = useState('features');

    const tabs = [
        { id: 'features', label: content.features.title, icon: content.features.icon },
        { id: 'textbooks', label: content.textbooks.title, icon: content.textbooks.icon },
        { id: 'schedule', label: content.schedule.title, icon: content.schedule.icon }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-[#0f172a] pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full mb-4 border border-blue-500/20">
                        초등부 프로그램
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                        수학의 기초를 탄탄하게,<br />
                        <span className="text-blue-400">자기주도 학습</span>의 시작
                    </h1>
                    <p className="text-gray-400 text-base max-w-2xl mx-auto font-medium">
                        단순한 문제 풀이를 넘어,<br className="md:hidden" /> 스스로 생각하고 해결하는 힘을 길러줍니다.<br />
                        독수리수학만의 세밀한 지도로 수학에 날개를 답니다.
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
                    <div className="space-y-16">
                        {/* Intro Philosophy */}
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
                                수학은 하루아침에 오르지 않습니다.<br />
                                <span className="text-blue-600">체계적인 시스템과 맞춤형 지도</span>가 정답입니다.
                            </h3>
                            <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed">
                                꾸준한 반복 학습과 단계적 훈련, 그리고 아이의 현재 수준에 맞는
                                최적의 학습 전략을 통해<br />
                                제대로 된 성장을 만들어냅니다.
                            </p>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            {content.features.items.map((item, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 hover:scale-[1.02] transition-transform group">
                                    <div className="w-12 h-12 bg-blue-50 text-[#1e3a8a] rounded-2xl flex items-center justify-center mb-6 font-bold text-xl group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                                        {item.desc}
                                    </p>
                                    <ul className="space-y-3">
                                        {item.points.map((pt, pIdx) => (
                                            <li key={pIdx} className="flex items-center text-xs font-bold text-[#1e3a8a]">
                                                <CheckCircle2 size={14} className="mr-2 border-none" />
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Special Strategies */}
                        <div className="max-w-5xl mx-auto bg-slate-50 p-10 rounded-[3rem] border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Target size={120} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
                                <div className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></div>
                                학생들을 위한 특별 대비 전략
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {content.features.specialStrategies.map((strategy, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <h4 className="text-[#1e3a8a] font-bold text-sm mb-2">{strategy.title}</h4>
                                        <p className="text-gray-500 text-xs font-medium leading-relaxed">{strategy.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'textbooks' && (
                    <div className="max-w-5xl mx-auto space-y-12">
                        {/* Philosophy */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-200">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Lightbulb size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">맞춤형 교재 매칭 시스템</h3>
                                    <p className="text-gray-600 text-sm font-medium leading-relaxed">
                                        {content.textbooks.philosophy}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pathways */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                <div className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></div>
                                학습 단계별 교재 로드맵
                            </h3>
                            {content.textbooks.pathways.map((pathway, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-200 hover:shadow-xl transition-shadow">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <div className="md:w-32">
                                            <span className="inline-block px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-full">
                                                {pathway.level}
                                            </span>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-base font-bold text-gray-900 mb-2">{pathway.books}</p>
                                            <p className="text-sm font-medium text-gray-500">{pathway.target}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Note */}
                        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                            <div className="flex items-start space-x-3">
                                <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm font-bold text-amber-900 leading-relaxed">
                                    {content.textbooks.note}
                                </p>
                            </div>
                        </div>

                        {/* Extra */}
                        <div className="bg-blue-600 p-8 rounded-[2rem] text-white flex items-center shadow-xl shadow-blue-200">
                            <div className="mr-6 hidden md:block">
                                <Award size={40} className="text-blue-200" />
                            </div>
                            <p className="text-sm font-bold leading-relaxed">
                                <span className="text-blue-200">PLUS!</span><br />
                                {content.textbooks.extra}
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'schedule' && (
                    <div className="space-y-16">
                        {/* Curriculum Categories (Tracks) - Restored */}
                        <div className="max-w-5xl mx-auto">
                            <div className="flex items-center space-x-3 mb-10">
                                <div className="w-1.5 h-8 bg-[#1e3a8a] rounded-full"></div>
                                <h3 className="text-2xl font-bold text-gray-900">수업 안내</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-8 mb-16">
                                {content.schedule.tracks.map((track, idx) => (
                                    <div key={idx} className="bg-white overflow-hidden rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 flex flex-col md:flex-row hover:border-blue-200 transition-all group">
                                        <div className="md:w-1/4 bg-[#0f172a] p-8 text-white flex flex-col justify-center">
                                            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">{track.period}</span>
                                            <h4 className="text-lg font-bold mb-3">{track.name}</h4>
                                            <p className="text-gray-400 text-xs font-medium leading-relaxed">
                                                {track.desc}
                                            </p>
                                        </div>
                                        <div className="md:w-3/4 p-8 flex flex-col justify-center items-start bg-white group-hover:bg-blue-50/30 transition-colors space-y-4">
                                            <div className="flex flex-col w-full space-y-2">
                                                {track.details.map((detail, dIdx) => (
                                                    <div key={dIdx} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl border border-gray-100/50 w-full">
                                                        <Trophy size={16} className="text-blue-600 flex-shrink-0" />
                                                        <span className="text-sm font-bold text-gray-700 whitespace-nowrap">{detail}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            {track.note && (
                                                <p className="text-xs text-gray-400 italic w-full text-left">{track.note}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Timetable Section */}
                        <div className="max-w-5xl mx-auto">
                            <div className="flex items-center space-x-3 mb-10">
                                <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
                                <h3 className="text-2xl font-bold text-gray-900">{content.schedule.timetable.title}</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                {content.schedule.timetable.sessions.map((session, idx) => (
                                    <div key={idx} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                                        <h4 className="text-lg font-bold text-blue-700 mb-6 flex items-center">
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
                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                <ul className="space-y-2">
                                    {content.schedule.timetable.notes.map((note, idx) => (
                                        <li key={idx} className="flex items-center text-sm font-bold text-blue-800">
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
            </div>

            {/* Bottom CTA */}
            <div className="bg-slate-50 py-24 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">수학 실력의 완독,<br className="md:hidden" /> 독수리수학에서 시작하세요.</h2>
                    <p className="text-gray-500 text-sm font-medium mb-12">
                        아이의 현재 실력을 진단하고 최적의 학습 로드맵을 제안해 드립니다.
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
