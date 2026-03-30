import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Languages, FlaskConical, BookOpen, ChevronRight } from 'lucide-react';

const subjects = [
    {
        id: 'math',
        name: '독수리 수학',
        description: '수학적 사고력과 문제 해결 능력의 완성',
        icon: <Calculator className="w-8 h-8" />,
        color: 'from-blue-600 to-indigo-700',
        lightColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        path: '/about/branches'
    },
    {
        id: 'english',
        name: '독수리 영어',
        description: '1:1 밀착 관리로 완성하는 독해와 문법',
        icon: <Languages className="w-8 h-8" />,
        color: 'from-emerald-500 to-teal-600',
        lightColor: 'bg-emerald-50',
        textColor: 'text-emerald-700',
        path: '/about/branches'
    },
    {
        id: 'science',
        name: '독수리 과학',
        description: '실험과 원리 이해를 통한 과학 성적 향상',
        icon: <FlaskConical className="w-8 h-8" />,
        color: 'from-purple-500 to-violet-600',
        lightColor: 'bg-purple-50',
        textColor: 'text-purple-700',
        path: '/about/branches'
    },
    {
        id: 'korean',
        name: '독수리 국어',
        description: '리드인과 함께하는 문해력과 독서 습관',
        icon: <BookOpen className="w-8 h-8" />,
        color: 'from-orange-500 to-rose-600',
        lightColor: 'bg-orange-50',
        textColor: 'text-orange-700',
        path: '/about/branches'
    }
];

export default function SubjectShowcase() {
    return (
        <section className="py-24 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">수학을 넘어 전 과목 1등으로</h2>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto text-center">
                        독수리 교육 그룹은 각 과목별 최고 전문가들이 <br className="hidden md:block" /> 1:1 맞춤형 지도로 압도적인 성취를 만들어냅니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {subjects.map((subject) => (
                        <div 
                            key={subject.id}
                            className="group relative p-8 rounded-3xl border border-slate-100 bg-white hover:border-transparent hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover Backdrop Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}></div>
                            
                            {/* Icon Box */}
                            <div className={`w-16 h-16 ${subject.lightColor} ${subject.textColor} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                                {subject.icon}
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#1e3a8a] transition-colors">{subject.name}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8 min-h-[40px]">
                                    {subject.description}
                                </p>
                                
                                <Link 
                                    to={subject.path} 
                                    className="inline-flex items-center text-sm font-bold text-slate-400 group-hover:text-[#1e3a8a] transition-all group-hover:translate-x-1"
                                >
                                    전문관 안내 보기 <ChevronRight className="ml-1 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                                </Link>
                            </div>

                            {/* Decorative Accent */}
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${subject.color} opacity-5 -mr-8 -mt-8 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
