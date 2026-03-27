import React from 'react';
import {
    PhoneCall,
    ClipboardCheck,
    CreditCard,
    ShoppingBag,
    Flag,
    ChevronRight,
    CheckCircle2,
    Calendar,
    Clock,
    UserCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
    {
        id: 1,
        title: "상담 신청",
        subtitle: "Consultation Request",
        icon: <PhoneCall size={28} />,
        description: "홈페이지의 상담 신청 폼을 작성하시거나 학원으로 직접 전화(010-8229-7963)를 주시면 접수가 완료됩니다.",
        color: "bg-blue-600"
    },
    {
        id: 2,
        title: "레벨테스트 후 상담",
        subtitle: "Level Test & Guidance",
        icon: <ClipboardCheck size={28} />,
        description: "학생의 현재 학습 상태 및 취약 영역에 대한 정밀 테스트를 진행하며, 결과에 따른 맞춤형 학습 진단과 수강 가능한 반을 안내해 드립니다.",
        color: "bg-indigo-600"
    },
    {
        id: 3,
        title: "수강 등록",
        subtitle: "Registration",
        icon: <CreditCard size={28} />,
        description: "상담을 통해 결정된 반에 대해 수강료를 납부하시면 정식 등록이 완료됩니다. 신용카드 및 계좌이체 등 다양한 결제 수단을 지원합니다.",
        color: "bg-slate-800"
    },
    {
        id: 4,
        title: "교재 구입",
        subtitle: "Textbook Purchase",
        icon: <ShoppingBag size={28} />,
        description: "배정된 반의 수준에 맞는 전담 교재를 수강 시작 전일까지 온라인 또는 인근 서점을 통해 구입하시기 바랍니다.",
        color: "bg-blue-500"
    },
    {
        id: 5,
        title: "오리엔테이션 및 수업 시작",
        subtitle: "First Class & OT",
        icon: <Flag size={28} />,
        description: "첫 등원 시 학원 시설 및 시스템에 대한 오리엔테이션을 진행한 후 배정된 반에서 본격적인 수업을 시작하게 됩니다. 개별 맞춤 클리닉 배정도 함께 이루어집니다.",
        color: "bg-blue-700"
    }
];

export default function Admission() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-slate-900 text-white relative overflow-hidden text-center">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full mb-4 tracking-widest uppercase">Admission</span>
                    <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
                        독수리수학 입학 안내
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
                        성공적인 입시를 위한 첫 걸음,<br className="md:hidden" /> 체계적인 입학 절차를 통해<br className="md:hidden" /> 최적의 학습 환경을 제안합니다.
                    </p>
                </div>
            </section>

            {/* Quick Step Timeline */}
            <section className="py-20 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {steps.map((step, idx) => (
                            <div key={step.id} className="relative flex flex-col items-center group">
                                {/* Connector Line */}
                                {idx < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-slate-200 z-0">
                                        <div className="absolute top-1/2 right-0 -translate-y-1/2 text-slate-300">
                                            <ChevronRight size={16} />
                                        </div>
                                    </div>
                                )}

                                <div className={`w-20 h-20 rounded-3xl ${step.color} shadow-lg flex items-center justify-center text-white mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                                    {step.icon}
                                    <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center text-xs font-black border-2 border-slate-100 shadow-sm">
                                        0{step.id}
                                    </div>
                                </div>
                                <h3 className="text-sm font-black text-slate-900 text-center mb-1">{step.title}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">{step.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Content Section */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="space-y-16">
                        {steps.map((step) => (
                            <div key={step.id} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start group">
                                <div className="flex-shrink-0 flex md:flex-col items-center">
                                    <div className={`w-16 h-16 rounded-2xl ${step.color} bg-opacity-10 text-slate-900 border border-slate-200 flex items-center justify-center group-hover:bg-opacity-100 group-hover:text-white transition-all duration-300`}>
                                        {React.cloneElement(step.icon, { size: 32 })}
                                    </div>
                                    <div className="md:w-px md:h-full bg-slate-100 hidden md:block mt-6 min-h-[60px]" />
                                </div>

                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`text-xs font-black px-2 py-0.5 rounded ${step.color} text-white`}>STEP 0{step.id}</span>
                                        <h4 className="text-xl md:text-2xl font-black text-slate-900">
                                            {step.title}
                                        </h4>
                                    </div>
                                    <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Call to Action */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px]" />
                </div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black mb-8 leading-tight">
                        자녀의 수학 고민, <br className="sm:hidden" />독수리수학이 해답이 되어 드립니다.
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/contact/counseling" className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 text-base text-center">
                            지금 바로 상담 신청하기
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
