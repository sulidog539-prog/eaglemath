import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ChevronRight } from 'lucide-react';

const materials = [
    {
        id: 0,
        title: "신길중학교 2-1 중간고사 수학 내신대비 자료1",
        category: "학교별 내신대비",
        files: ["PDF"],
        isPublic: false
    }
];

export default function StudyMaterials() {
    const categories = ["기초학습", "학교별 내신대비", "수능대비"];

    return (
        <section id="resources" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">학습자료실</h2>
                        <p className="text-slate-600">수준별 맞춤 교재와 핵심 요약 자료를 확인하세요.</p>
                    </div>
                    <Link to="/resources/materials" className="mt-6 md:mt-0 text-blue-700 font-bold hover:underline flex items-center group">
                        MORE+ <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Table of Contents / Main List */}
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                    <div className="grid md:grid-cols-3 gap-x-12 gap-y-12">
                        {categories.map((cat) => (
                            <div key={cat} className="space-y-4">
                                <h3 className="text-lg font-bold text-[#1e3a8a] flex items-center border-b border-blue-100 pb-2">
                                    <span className="w-1.5 h-4 bg-[#fbbf24] mr-2 rounded-full"></span>
                                    {cat}
                                </h3>
                                <ul className="space-y-3">
                                    {materials.filter(m => m.category === cat).slice(0, 4).map((item) => (
                                        <li key={item.id} className="group flex items-center justify-between text-sm">
                                            <Link to="/resources/materials" className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center group">
                                                <ChevronRight className="w-3 h-3 mr-2 text-slate-300 group-hover:text-blue-400 transition-colors" />
                                                <span className="truncate max-w-[150px] md:max-w-xs">{item.title}</span>
                                            </Link>
                                            {!item.isPublic && (
                                                <Lock className="w-3 h-3 text-slate-300 ml-2" />
                                            )}
                                        </li>
                                    ))}
                                    {materials.filter(m => m.category === cat).length === 0 && (
                                        <li className="text-slate-400 text-xs italic">준비된 자료가 없습니다.</li>
                                    )}
                                    <li>
                                        <Link to="/resources/materials" className="text-xs font-bold text-blue-500 hover:text-blue-700 mt-2 inline-block">
                                            더보기
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
