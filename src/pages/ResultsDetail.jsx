import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trophy, Calendar, User, ArrowLeft, Share2, MessageCircle, Loader2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const resultsData = {
    1: {
        id: 1,
        date: "2025-09-27",
        title: "대영고등학교 1학년 2학기 중간고사 수학 만점",
        student: "윤지이",
        type: "성적 우수",
        image: "/congrats_yoon.PNG",
        content: null
    },
    4: {
        id: 4,
        date: "2025-12-21",
        title: "신길중3 황우진 학생 명덕외고 합격",
        student: "황우진",
        type: "합격 뉴스",
        image: "/congrats_hwang.PNG",
        content: "2025.12.21 신길중3 황우진 명덕외고 합격을 축하합니다"
    },
    5: {
        id: 5,
        date: "2025-12-21",
        title: "신길중3 채정우 학생 대원외고 합격",
        student: "채정우",
        type: "합격 뉴스",
        image: "/congrats_chae.PNG",
        content: "[출처] <독수리수학>신길중3 채정우 학생 대원외고 합격을 축하합니다"
    },
    2: {
        id: 2,
        date: "2025-06-13",
        title: "황소수학 편입 합격",
        student: "대방초6 이준우, 대방초4 임채은",
        type: "합격 뉴스",
        image: "/congrats_2025.PNG",
        content: null
    },
    3: {
        id: 3,
        date: "2025-06-13",
        title: "중간고사 100점",
        student: "중대부초3 김가빈",
        type: "성적 우수",
        image: "/congrats_2025.PNG",
        content: null
    }
};

export default function ResultsDetail() {
    const { id } = useParams();
    const [result, setResult] = useState(resultsData[id] || null);
    const [isLoading, setIsLoading] = useState(!resultsData[id]);

    useEffect(() => {
        const fetchDetail = async () => {
            if (resultsData[id]) {
                setResult(resultsData[id]);
                setIsLoading(false);
                return;
            }

            try {
                const docRef = doc(db, 'results', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setResult({ id: docSnap.id, ...docSnap.data() });
                }
            } catch (error) {
                console.error("Error fetching detail:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    // Handle string formatting for generic text content if no image/HTML structure
    const renderContent = () => {
        if (!result.content) {
            return (
                <div className="bg-slate-50 border-l-4 border-[#1e3a8a] p-8 rounded-r-xl mb-12 italic text-slate-700 leading-relaxed shadow-sm">
                    "수학은 단순한 암기가 아닙니다. 학생 스스로 원리를 깨우칠 때 진정한 성취감이 찾아옵니다."
                </div>
            );
        }
        return (
            <div className="whitespace-pre-line text-slate-600 leading-[1.8] text-lg">
                {result.content}
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-[#1e3a8a]" />
            </div>
        );
    }

    if (!result) {
        return (
            <div className="max-w-3xl mx-auto py-20 px-4 text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">소식을 찾을 수 없습니다.</h2>
                <Link to="/about/results" className="text-[#1e3a8a] font-bold hover:underline flex items-center justify-center space-x-2">
                    <ArrowLeft size={16} />
                    <span>목록으로 돌아가기</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Header / Meta */}
            <div className="bg-slate-50 border-b border-slate-100 py-12 px-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="max-w-3xl mx-auto relative z-10">
                    <Link to="/about/results" className="inline-flex items-center space-x-2 text-slate-400 hover:text-[#1e3a8a] transition-colors mb-6 font-medium">
                        <ArrowLeft size={16} />
                        <span>전체 목록</span>
                    </Link>

                    <div className="flex items-center space-x-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${result.type === '합격 뉴스' ? 'bg-blue-100 text-[#1e3a8a]' : 'bg-green-100 text-green-700'
                            }`}>
                            {result.type}
                        </span>
                        <div className="flex items-center space-x-2 text-slate-400 text-sm">
                            <Calendar size={14} />
                            <span>{result.date}</span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                        {result.title}
                    </h1>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-200/60">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white">
                                <Trophy size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">{result.student} 학생</p>
                                <p className="text-xs text-slate-500">독수리수학학원</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-slate-400 hover:text-[#1e3a8a] transition-colors"><Share2 size={20} /></button>
                            <button className="p-2 text-slate-400 hover:text-green-600 transition-colors"><MessageCircle size={20} /></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Principal content area */}
            <div className="max-w-4xl mx-auto py-12 px-4">
                <div className="prose prose-slate lg:prose-lg max-w-none">
                    {result.image ? (
                        <div className="flex justify-center mb-8">
                            <img
                                src={result.image}
                                alt={result.title}
                                className="max-w-full h-auto rounded-lg shadow-2xl border border-slate-100"
                            />
                        </div>
                    ) : (
                        renderContent()
                    )}

                    {/* Additional sections if needed */}
                </div>

                {/* Bottom Navigation */}
                <div className="mt-20 pt-10 border-t border-slate-100">
                    <Link
                        to="/about/results"
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center space-x-2 hover:bg-black transition-all shadow-lg"
                    >
                        <span>목록으로 돌아가기</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
