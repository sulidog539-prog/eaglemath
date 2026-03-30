import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Edit3, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db, auth } from '../firebase';
import AdminWrite from './AdminWrite';

const logs = [
    {
        id: 1,
        date: "2026.02.17",
        title: "학생들의 수학이 망해가는 과정",
        summary: "수학은 계단식 구조의 학문입니다. 기초가 무너지면 전체가 무너지는 수학의 특성과 개념 내재화의 중요성을 다룹니다.",
        content: (
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                <section>
                    <h4 className="font-bold text-slate-900 mb-1">1. 수학이 유독 어려운 이유</h4>
                    <p>수학은 계단식 구조의 학문입니다. 아래 단계가 무너지면 다음 단계를 올라갈 수 없습니다. 다른 과목은 일부를 몰라도 새롭게 시작할 수 있지만, 수학은 기초가 무너지면 전체가 무너집니다.</p>
                </section>
                <section>
                    <h4 className="font-bold text-slate-900 mb-1">2. 개념 이해가 핵심이다</h4>
                    <p>수학 개념은 나 자신의 언어로 해석될 때만 진짜 내 것이 됩니다. 억지로 외우면 지식이 쌓이지 않고 수학에서 멀어집니다. 내가 소화하고 이해한 개념만 실력으로 남습니다.</p>
                </section>
                <section>
                    <h4 className="font-bold text-slate-900 mb-1">3. 학생들이 수학을 포기하는 시점</h4>
                    <p>고등학교 1학년부터 현격한 난이도 상승이 있습니다. 포기하지 않고 학습을 이어간다면 결국 문리(文理)가 트는 시간이 반드시 옵니다.</p>
                </section>
                <section>
                    <h4 className="font-bold text-slate-900 mb-1">4. '문제풀이 중심'의 교육 현실</h4>
                    <p>패턴화된 암기식 접근은 정작 중요한 개념과 구조화를 방해합니다. 개념 중심의 학습만이 진짜 실력을 쌓는 길입니다.</p>
                </section>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-[#1e3a8a] font-bold text-sm mt-4">
                    "수학은 쌓이는 학문이다. 쌓이지 않으면 무너지고, 쌓으려면 내 언어로 이해해야 한다."
                </div>
            </div>
        )
    },
    {
        id: 2,
        date: "2026.02.10",
        title: "좋은 학원 어떻게 선택할까?",
        summary: "소통과 리포턴, 그리고 아이에게 맞는 적절한 과제 양의 설정이 학원 선택의 핵심입니다.",
        content: (
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                <section>
                    <h4 className="font-bold text-slate-900 mb-1">소통과 체크</h4>
                    <p>학원과 학부모 간의 커뮤니케이션이 원활해야 합니다. 독수리수학은 수업 후 아이의 학습 성과에 대한 리포팅을 보내드리며 양방향으로 체크합니다.</p>
                </section>
                <section>
                    <h4 className="font-bold text-slate-900 mb-1">자기주도학습과 과제 설정</h4>
                    <p>과도한 과제는 복습을 어렵게 만듭니다. 아이가 소환할 수 있는 양의 0.8로 시작해 1.2까지 늘려가며 적응시키는 것이 중요합니다.</p>
                </section>
                <section>
                    <h4 className="font-bold text-slate-900 mb-1">개별 맞춤 수업의 이유</h4>
                    <p>100명의 아이는 100가지의 경우가 있습니다. 일관된 판서식 수업보다 아이마다 다른 진도와 과제를 제공하는 맞춤형 수업이 압도적인 성과를 냅니다.</p>
                </section>
            </div>
        )
    },
    {
        id: 3,
        date: "2026.01.25",
        title: "성적이 들쭉날쭉 하다면?",
        summary: "수학 성적이 널뛰기를 한다면 개념이 흔들리고 있는 증거입니다. 교과서와 개념서 중심의 학습법을 제안합니다.",
        content: (
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                <p>수학 성적이 애매하다면 개념이 덜 잡힌 것입니다. 수능까지는 기회가 있습니다.</p>
                <section>
                    <h4 className="font-bold text-slate-900 mb-1">성공 사례: 수능 96점 SKY 진학</h4>
                    <p>수학 교과서와 개념서를 하루 3시간씩 읽게 하고 기출을 반복했습니다. 단순 오답 정리가 아닌, 풀이에 필요한 단서만 적어두는 방식으로 스스로 생각하는 힘을 길렀습니다.</p>
                </section>
                <p className="font-bold text-slate-800 mt-2">단기 성적보다 중요한 것은 개념의 내재화입니다. 끝까지 최선을 다하면 좋은 결과가 따를 것입니다.</p>
            </div>
        )
    }
];

export default function CounselingLogs() {
    const [openId, setOpenId] = useState(null);
    const [posts, setPosts] = useState(logs);
    const [isLoading, setIsLoading] = useState(true);
    const [isWriting, setIsWriting] = useState(false);
    const isAdmin = auth.currentUser?.email === 'admin@eaglemath.com';

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const q = query(collection(db, 'counseling'), orderBy('date', 'desc'));
            const querySnapshot = await getDocs(q);
            const firestoreData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Firestore string content rendered as paragraph
                content: (
                    <div className="space-y-6">
                        {doc.data().image && (
                            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 mb-6 max-w-2xl">
                                <img src={doc.data().image} alt={doc.data().title} className="w-full h-auto" />
                            </div>
                        )}
                        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                            {doc.data().content}
                        </div>
                    </div>
                )
            }));
            const merged = [...firestoreData, ...logs].sort((a, b) => new Date(b.date) - new Date(a.date));
            setPosts(merged);
        } catch (error) {
            console.error("Error fetching logs:", error);
            setPosts(logs);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSuccess = () => {
        setIsWriting(false);
        fetchPosts();
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="pt-28 pb-12 bg-white border-b border-slate-50">
                <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full mb-3 tracking-widest uppercase">Advice & Strategy</span>
                        <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">상담일기</h1>
                        <p className="text-slate-500 text-sm md:text-base max-w-2xl font-medium leading-relaxed">
                            독수리수학이 학부모님들과 나누었던 수학 교육의 고민과<br className="md:hidden" /> 확실한 성적 향상의 솔루션을 공유합니다.
                        </p>
                    </div>
                    {isAdmin && !isWriting && (
                        <div className="text-center md:text-right shrink-0">
                            <button onClick={() => setIsWriting(true)} className="inline-flex items-center px-6 py-3 bg-[#1e3a8a] text-white font-bold rounded-xl shadow-lg hover:bg-[#1e40af] transition-colors">
                                <Edit3 size={18} className="mr-2" /> 일기 쓰기
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Logs List */}
            <section className="py-8">
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    {/* Admin Write Inline Form */}
                    {isWriting && (
                        <AdminWrite type="counseling" onClose={() => setIsWriting(false)} onSuccess={handleSuccess} />
                    )}

                    <div className="divide-y divide-slate-100 border-t border-slate-100">
                        {isLoading ? (
                            <div className="py-20 text-center text-slate-400 font-bold flex flex-col items-center justify-center">
                                <Loader2 className="w-8 h-8 animate-spin text-[#1e3a8a] mb-4" />
                                불러오는 중...
                            </div>
                        ) : (
                            posts.map((log) => (
                            <div key={log.id} className="group">
                                <button
                                    onClick={() => setOpenId(openId === log.id ? null : log.id)}
                                    className="w-full text-left py-4 px-2 hover:bg-slate-50 transition-colors flex items-center justify-between"
                                >
                                    <div className="flex-grow flex flex-col md:flex-row md:items-center gap-2 md:gap-8 overflow-hidden">
                                        <span className="text-[11px] font-bold text-slate-300 w-20 shrink-0">{log.date}</span>
                                        <h3 className={`text-base md:text-lg font-black transition-colors shrink-0 ${openId === log.id ? 'text-blue-600' : 'text-slate-800'}`}>
                                            {log.title}
                                        </h3>
                                        <p className={`text-sm text-slate-400 font-medium truncate flex-grow ${openId === log.id ? 'opacity-0' : 'opacity-100'}`}>
                                            {log.summary}
                                        </p>
                                    </div>
                                    <div className="ml-4 text-slate-300 group-hover:text-blue-600 shrink-0">
                                        {openId === log.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </button>

                                {openId === log.id && (
                                    <div className="px-4 md:px-28 pb-10 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="max-w-3xl">
                                            {log.content}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )))}
                    </div>

                    {/* Notice */}
                    <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100/50 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                                <MessageCircle size={20} />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 mb-0.5 text-sm md:text-base">더 궁금한 점이 있으신가요?</h4>
                                <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                                    아이의 학습 상태에 맞는 구체적인 상담은 전화 또는 방문을 통해 언제든 가능합니다.
                                </p>
                            </div>
                        </div>
                        <Link to="/contact/counseling" className="px-8 py-3 bg-[#0f172a] text-white font-bold text-sm rounded-xl hover:bg-black transition-all shrink-0 shadow-lg shadow-slate-200">
                            상담 예약하기
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
