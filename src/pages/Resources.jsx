import React, { useState, useEffect } from 'react';
import { FileText, Download, Lock, ChevronRight, GraduationCap, Archive, Award, Layers, Edit3, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db, auth } from '../firebase';
import AdminWrite from './AdminWrite';

const materials = [
    {
        id: 0,
        title: "신길중학교 2-1 중간고사 수학 내신대비 자료1",
        category: "학교별 내신대비",
        subCategory: "중등",
        files: ["PDF"],
        fileUrl: "/materials/shingil_math_2-1.pdf",
        isPublic: false,
        date: "2024.03.15"
    }
];

export default function Resources() {
    const [activeFilter, setActiveFilter] = useState({ main: "전체", sub: null });
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [items, setItems] = useState(materials);
    const [isLoading, setIsLoading] = useState(true);
    const [isWriting, setIsWriting] = useState(false);

    const isAdmin = auth.currentUser?.email === 'admin@eaglemath.com';

    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const q = query(collection(db, 'resources'), orderBy('date', 'desc'));
            const querySnapshot = await getDocs(q);
            const firestoreData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            const merged = [...firestoreData, ...materials].sort((a, b) => new Date(b.date) - new Date(a.date));
            setItems(merged);
        } catch (error) {
            console.error("Error fetching resources:", error);
            setItems(materials);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleSuccess = () => {
        setIsWriting(false);
        fetchItems();
    };

    const filteredMaterials = activeFilter.main === "전체"
        ? items
        : items.filter(m => {
            if (activeFilter.sub) {
                return m.category === activeFilter.main && m.subCategory === activeFilter.sub;
            }
            return m.category === activeFilter.main;
        });

    const handleCategoryClick = (cat) => {
        setActiveFilter({ main: cat.name, sub: null });
        if (cat.subs) {
            setExpandedCategory(expandedCategory === cat.name ? null : cat.name);
        } else {
            setExpandedCategory(null);
        }
    };

    const categories = [
        { name: "전체", icon: <Archive size={18} /> },
        { name: "기초학습", icon: <Layers size={18} /> },
        {
            name: "학교별 내신대비",
            icon: <Award size={18} />,
            subs: ["중등", "고등"]
        },
        { name: "수능대비", icon: <GraduationCap size={18} /> }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">학습자료실</h1>
                        <p className="text-lg text-slate-500 font-medium">독수리수학 재원생을 위한 고품격 학습 자료입니다.</p>
                    </div>
                    {isAdmin && !isWriting && (
                        <div className="text-center md:text-right shrink-0">
                            <button onClick={() => setIsWriting(true)} className="inline-flex items-center px-6 py-3 bg-[#1e3a8a] text-white font-bold rounded-xl shadow-lg hover:bg-[#1e40af] transition-colors">
                                <Edit3 size={18} className="mr-2" /> 자료 등록
                            </button>
                        </div>
                    )}
                </div>

                {isWriting && (
                    <AdminWrite type="resources" onClose={() => setIsWriting(false)} onSuccess={handleSuccess} />
                )}

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filter */}
                    <div className="lg:w-72 flex-shrink-0">
                        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sticky top-32">
                            <h3 className="font-bold text-slate-800 mb-8 flex items-center px-2">
                                <span className="w-1.5 h-6 bg-[#1e3a8a] mr-3 rounded-full"></span>
                                카테고리
                            </h3>
                            <nav className="space-y-4">
                                {categories.map((cat) => (
                                    <div key={cat.name} className="relative group">
                                        <button
                                            onClick={() => handleCategoryClick(cat)}
                                            className={`w-full text-left px-5 py-4 rounded-2xl text-[15px] font-bold flex items-center justify-between transition-all ${activeFilter.main === cat.name && !activeFilter.sub
                                                ? 'bg-[#1e3a8a] text-white shadow-lg shadow-blue-200'
                                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <span className={`mr-3 ${activeFilter.main === cat.name && !activeFilter.sub ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`}>
                                                    {cat.icon}
                                                </span>
                                                {cat.name}
                                            </div>
                                            {cat.subs && <ChevronRight size={16} className={`transition-transform duration-300 ${expandedCategory === cat.name ? 'rotate-90' : ''}`} />}
                                        </button>

                                        {/* Sub-menu controlled by state */}
                                        {cat.subs && (
                                            <div className={`overflow-hidden transition-all duration-500 ease-in-out pl-6 space-y-2 mt-2 ${expandedCategory === cat.name ? 'max-h-40 opacity-100 py-2' : 'max-h-0 opacity-0'
                                                }`}>
                                                {cat.subs.map(sub => (
                                                    <button
                                                        key={sub}
                                                        onClick={() => setActiveFilter({ main: cat.name, sub: sub })}
                                                        className={`w-full text-left px-5 py-3 rounded-xl text-sm font-bold flex items-center transition-all ${activeFilter.main === cat.name && activeFilter.sub === sub
                                                            ? 'bg-slate-100 text-[#1e3a8a]'
                                                            : 'text-slate-400 hover:text-[#1e3a8a] hover:bg-slate-50'
                                                            }`}
                                                    >
                                                        <span className="w-1 h-1 bg-current rounded-full mr-3 opacity-40"></span>
                                                        {sub}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow space-y-6">
                        {/* Filter Status */}
                        <div className="bg-white px-8 py-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center text-sm font-bold text-slate-500">
                                <span className="text-[#1e3a8a] mr-2">{activeFilter.main}</span>
                                {activeFilter.sub && (
                                    <>
                                        <ChevronRight size={14} className="mx-2 opacity-50" />
                                        <span className="text-[#1e3a8a]">{activeFilter.sub}</span>
                                    </>
                                )}
                            </div>
                            <span className="text-xs text-slate-400 font-medium">총 {filteredMaterials.length}건</span>
                        </div>

                        {/* Materials List */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                            <div className="divide-y divide-slate-100">
                                {isLoading ? (
                                    <div className="py-32 text-center flex flex-col items-center justify-center">
                                        <Loader2 className="w-10 h-10 animate-spin text-[#1e3a8a] mb-4" />
                                        <p className="text-slate-400 font-bold">자료를 불러오는 중입니다...</p>
                                    </div>
                                ) : filteredMaterials.map((item) => (
                                    <div key={item.id} className="p-8 md:p-10 hover:bg-slate-50 transition-all group relative">
                                        <div className="absolute top-0 left-0 w-1.5 h-0 bg-[#1e3a8a] group-hover:h-full transition-all duration-300"></div>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex-grow">
                                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                                    <span className="text-[10px] font-extrabold text-[#1e3a8a] uppercase tracking-widest px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                                                        {item.category}
                                                    </span>
                                                    {item.subCategory && (
                                                        <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-full">
                                                            {item.subCategory}
                                                        </span>
                                                    )}
                                                    <span className="text-[11px] text-slate-400 font-bold">
                                                        {item.date}
                                                    </span>
                                                    {!item.isPublic && (
                                                        <span className="flex items-center text-[10px] text-amber-600 font-extrabold bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                                                            <Lock className="w-3 h-3 mr-1.5" /> 재원생 전용
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#1e3a8a] transition-colors leading-tight mb-3">
                                                    {item.title}
                                                </h3>
                                                {item.image && (
                                                    <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 mb-4 max-w-lg">
                                                        <img src={item.image} alt={item.title} className="w-full h-auto" />
                                                    </div>
                                                )}
                                                {item.content && (
                                                    <p className="text-sm text-slate-500 font-medium leading-relaxed whitespace-pre-wrap">
                                                        {item.content}
                                                    </p>
                                                )}
                                            </div>
                                            <a
                                                href={item.fileUrl}
                                                download
                                                className="flex items-center justify-center bg-[#0f172a] text-white font-bold text-sm px-8 py-4 rounded-2xl hover:bg-black hover:scale-105 active:scale-95 shadow-lg shadow-slate-200 transition-all"
                                            >
                                                <Download className="w-4 h-4 mr-2.5" />
                                                <span>다운로드 ({item.files.join(', ')})</span>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                                {!isLoading && filteredMaterials.length === 0 && (
                                    <div className="py-32 text-center">
                                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <FileText className="w-10 h-10 text-slate-200" />
                                        </div>
                                        <p className="text-slate-400 font-extrabold text-lg">준비된 자료가 없습니다.</p>
                                        <p className="text-slate-300 text-sm mt-2">다른 카테고리를 선택해 보세요.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
