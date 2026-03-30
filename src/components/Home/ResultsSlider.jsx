import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const resultsData = [
    { id: 1, date: "2025.09.27", title: "대영고 1학년 2학기 중간고사 수학 만점", student: "윤*이", type: "성적 우수" },
    { id: 4, date: "2025.12.21", title: "신길중3 황우진 학생 명덕외고 합격", student: "황*진", type: "합격 뉴스" },
    { id: 5, date: "2025.12.21", title: "신길중3 채정우 학생 대원외고 합격", student: "채*우", type: "합격 뉴스" },
    { id: 2, date: "2025.06.13", title: "황소수학 편입 합격", student: "대방초6 이*우, 대방초4 임*은", type: "합격 뉴스" },
    { id: 3, date: "2025.06.13", title: "중간고사 100점", student: "중대부초3 김*빈", type: "성적 우수" }
];

const results = [...resultsData].sort((a, b) => new Date(b.date.replace(/\./g, '-')) - new Date(a.date.replace(/\./g, '-')));

export default function ResultsSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % results.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrentIndex((currentIndex + 1) % results.length);
    const prev = () => setCurrentIndex((currentIndex - 1 + results.length) % results.length);

    return (
        <section className="py-10 bg-slate-100 border-y border-slate-200 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-5">
                    <Link to="/about/results" className="flex items-center space-x-3 group">
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 group-hover:border-[#1e3a8a] transition-colors">
                            <Trophy className="w-5 h-5 text-slate-500 group-hover:text-[#1e3a8a]" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <h2 className="text-lg font-bold text-slate-700 uppercase tracking-tight group-hover:text-[#1e3a8a] transition-colors">성적 & 합격 소식</h2>
                            <ExternalLink size={14} className="text-slate-300 group-hover:text-[#1e3a8a] transition-colors" />
                        </div>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link to="/about/results" className="text-sm font-bold text-slate-400 hover:text-[#1e3a8a] transition-colors hidden sm:block">
                            전체보기
                        </Link>
                        <div className="flex space-x-2">
                            <button onClick={prev} className="p-2 rounded border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-600 shadow-sm">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button onClick={next} className="p-2 rounded border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-600 shadow-sm">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="relative h-16 sm:h-14 overflow-hidden bg-white border border-slate-200 rounded-xl shadow-md">
                    {results.map((result, index) => (
                        <div
                            key={result.id}
                            className={`absolute inset-0 px-6 flex items-center justify-between transition-all duration-500 ease-in-out ${index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-0.5 sm:space-y-0 sm:space-x-4 overflow-hidden">
                                <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase whitespace-nowrap self-start sm:self-center">
                                    {result.type}
                                </span>
                                <div className="flex items-center space-x-2 overflow-hidden">
                                    <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap hidden md:block">{result.date}</span>
                                    <h3 className="text-base font-bold text-slate-800 truncate max-w-sm md:max-w-md lg:max-w-4xl">
                                        {result.title}
                                    </h3>
                                </div>
                            </div>
                            <div className="text-slate-500 text-xs font-medium whitespace-nowrap ml-4 hidden sm:block">
                                {result.student}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
