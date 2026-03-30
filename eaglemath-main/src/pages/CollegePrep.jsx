import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const newsItems = [
    {
        id: 1,
        title: "2028 대학입시(현 중3 적용) 개편 주요 내용",
        preview: "2028학년도 수능은 '공정성'과 '안정성'을 최우선으로 개편됩니다. 선택과목에 따른 유불리를 해소하기 위해 국어, 수학, 탐구 영역에서 선택과목을 폐지하고 모든 수험생이 동일한 통합형 과목에 응시하게 됩니다.",
        content: `
            <p class="mb-4 text-lg font-bold text-blue-900 border-l-4 border-blue-600 pl-4 py-1">"공정성과 안정성을 최우선으로 한 대입 개편"</p>
            <p class="mb-4">대입전형은 국가의 인재 양성 방향을 제시하며 국민의 신뢰가 중요한 제도입니다. 이번 개편안은 고교 교육과정과 수능의 연계성을 높이고, 실력에 따른 평등한 기회를 제공하는 데 목표를 둡니다.</p>

            <h4 class="text-lg font-bold mb-3 flex items-center">
                <span class="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                주목해야 할 두 가지 핵심 변화
            </h4>
            
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h5 class="font-bold text-[#1e3a8a] mb-2">1. 주요 영역 통합 평가 (국·수·영)</h5>
                    <p class="text-sm text-slate-600 mb-2">선택과목 없이 동일한 내용과 기준으로 평가됩니다.</p>
                    <ul class="text-sm text-slate-600 list-disc list-inside space-y-1">
                        <li><strong>수학:</strong> 대수, 미적분1, 확률과 통계 반영</li>
                        <li><strong>국어:</strong> 화법과 언어, 독서와 작문, 문학 포함</li>
                        <li><strong>영어:</strong> 영어1, 2 출제</li>
                    </ul>
                </div>

                <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h5 class="font-bold text-[#1e3a8a] mb-2">2. 사회·과학 탐구 통합 응시</h5>
                    <p class="text-sm text-slate-600">모든 응시자가 선택과목 없이 '통합사회'와 '통합과학'에 동일하게 응시합니다. 이는 지식의 깊이뿐 아니라 융합적 사고력을 중시하는 평가로의 전환을 의미합니다.</p>
                </div>
            </div>

            <div class="mt-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 class="font-bold mb-2">안정적인 수능 준비 지원</h4>
                <p class="text-sm text-slate-600 leading-relaxed">
                    영역별 평가 방식은 현행 그대로 유지되어 안정성을 꾀하며, EBS 50% 간접 연계 방식을 통해 공교육 중심으로 충분히 준비할 수 있도록 지원할 예정입니다.
                </p>
            </div>
        `,
        date: "2024.03.20",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "고교학점제란 무엇인가?",
        preview: "2025년부터 전면 시행되는 고교학점제. 기존 '단위'가 '학점'으로 바뀌고, 학생들이 대학처럼 직접 수강신청을 하여 시간표를 짜는 학생 주도적 교육과정입니다. 하지만 입시의 본질인 국·영·수 기초 학력의 중요성은 여전히 변하지 않습니다.",
        content: `
            <p class="mb-4">현재 중2 학부모님들이 가장 많이 궁금해하시는 '고교학점제'에 대해 알아봅니다.</p>
            
            <h4 class="text-lg font-bold mb-2">1. '단위'에서 '학점'으로 변경</h4>
            <p class="mb-4">기존 고등학교의 이수 단위인 '204단위'가 '192학점'으로 변경됩니다. (1시간 = 1학점). 졸업 이수 기준이 204시간에서 192시간으로 조정되는 것입니다.</p>

            <h4 class="text-lg font-bold mb-2">2. 학생 선택 중심 교육과정</h4>
            <p class="mb-4">가장 큰 변화는 학생들이 스스로 시간표를 짠다는 점입니다. 1학년 공통과목(국영수, 한국사, 통합사회, 통합과학)을 제외하고, 2~3학년때는 일반선택, 진로선택, 융합선택 과목 중 원하는 과목을 직접 선택하여 수강합니다.</p>

            <h4 class="text-lg font-bold mb-2">3. 미이수(I) 제도 도입</h4>
            <p class="mb-4">성취율 40% 미만인 경우 미이수(Incomplete) 처리가 될 수 있습니다. (실제 유급보다는 보충 지도를 통한 이수 지원이 목적입니다.)</p>

            <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100 my-8">
                <strong class="text-blue-900 text-lg block mb-4">💡 독수리수학의 입시 전략</strong>
                <p class="text-slate-700 mb-4">고교학점제로 과목 선택의 폭이 넓어지더라도, <strong>대학 입시의 본질은 '수학 능력'</strong>입니다.</p>
                <p class="text-slate-700">제도가 아무리 바뀌어도 국어, 영어, 수학 주요 과목의 학업 역량은 변하지 않는 핵심 평가 요소입니다. 정보에 휘둘리기보다 기본기를 탄탄히 다지는 것이 가장 확실한 전략입니다.</p>
            </div>
        `,
        date: "2023.10.17",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },

];

export default function CollegePrep() {
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-800 rounded-2xl mb-6 shadow-sm">
                        <GraduationCap size={32} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        2028 대입정보를<br className="md:hidden" /> <span className="text-[#1e3a8a]">한눈에 볼 수 있습니다</span>
                    </h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                        빠르게 변화하는 입시 환경, 정확한 정보와 분석으로 성공적인 대입 전략을 제시합니다.
                    </p>
                </div>

                {/* News List */}
                <div className="space-y-8">
                    {newsItems.map((item) => (
                        <div
                            key={item.id}
                            className={`bg-white rounded-[2rem] overflow-hidden border transition-all duration-300 ${expandedId === item.id
                                ? 'shadow-2xl border-blue-200 ring-1 ring-blue-100'
                                : 'shadow-sm border-slate-100 hover:shadow-lg'
                                }`}
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Thumbnail */}
                                <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden group cursor-pointer" onClick={() => toggleExpand(item.id)}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                                </div>

                                {/* Content Preview */}
                                <div className="p-8 md:w-2/3 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center space-x-2 mb-3">
                                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">입시뉴스</span>
                                            <span className="text-slate-400 text-xs font-medium">{item.date}</span>
                                        </div>
                                        <h3
                                            className="text-xl font-bold text-slate-900 mb-3 cursor-pointer hover:text-blue-800 transition-colors leading-snug"
                                            onClick={() => toggleExpand(item.id)}
                                        >
                                            {item.title}
                                        </h3>
                                        <p className={`text-slate-500 text-sm leading-relaxed mb-6 ${expandedId === item.id ? 'hidden' : 'block'}`}>
                                            {item.preview}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => toggleExpand(item.id)}
                                        className="flex items-center text-sm font-black text-[#1e3a8a] hover:text-blue-600 transition-colors group self-start"
                                    >
                                        {expandedId === item.id ? (
                                            <>
                                                CLOSE <ChevronUp size={16} className="ml-1" />
                                            </>
                                        ) : (
                                            <>
                                                VIEW MORE <ChevronDown size={16} className="ml-1 group-hover:translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Content */}
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedId === item.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-8 md:p-10 border-t border-slate-100 bg-slate-50/50">
                                    <div
                                        className="prose prose-slate max-w-none text-slate-700 leading-loose"
                                        dangerouslySetInnerHTML={{ __html: item.content }}
                                    />
                                    <div className="mt-8 pt-8 border-t border-slate-200 flex justify-center">
                                        <Link to="/contact/counseling" className="inline-flex items-center px-8 py-3 bg-[#1e3a8a] text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg shadow-blue-100 text-sm">
                                            <BookOpen size={16} className="mr-2" />
                                            맞춤형 입시 전략 상담 신청
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
