import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, TrendingUp, Users } from 'lucide-react';
import HeroCarousel from '../components/Home/HeroCarousel';
import ResultsSlider from '../components/Home/ResultsSlider';
import StudyMaterials from '../components/Home/StudyMaterials';
import NoticePopup from '../components/Home/NoticePopup';

export default function Home() {
    return (
        <div className="flex flex-col relative">
            {/* Notice Popup */}
            <NoticePopup />

            {/* Hero Section */}
            <HeroCarousel />

            {/* Results Slider Section */}
            <div id="results">
                <ResultsSlider />
            </div>


            {/* Brand Introduction Section */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Text Content */}
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-tight">
                                독수리수학학원은?
                            </h2>
                            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                                <p className="font-bold text-slate-800 text-xl">
                                    독수리수학은 어떻게<br className="md:hidden" /> 압도적인 성과를 낼 수 있을까요?
                                </p>
                                <p>
                                    수학 공부의 근본적인 목표는 어디에 있을까요?<br />
                                    저희는 단순한 점수 향상이 아닌, <strong>수학적 사고력과 문제 해결 능력</strong>을 키워드립니다.
                                </p>
                                <p>
                                    체계적인 커리큘럼과 1:1 개인별 맞춤 학습 관리를 통해 학생들이 스스로 문제를 해결할 수 있는 능력을 길러드립니다. 초등부터 고등까지 전 과정을 아우르는 전문 교육을 제공합니다.
                                </p>
                            </div>
                        </div>

                        {/* Image Content */}
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -inset-4 bg-blue-50 rounded-3xl -rotate-2 -z-10"></div>
                            <img
                                src="/academy_intro.PNG"
                                alt="독수리수학학원 인테리어"
                                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover ring-8 ring-white"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Study Materials Section */}
            <StudyMaterials />

            {/* Call to Action */}
            <section className="bg-slate-50 py-20 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">이제 시작할 때입니다</h2>
                    <p className="text-slate-600 mb-10 text-lg leading-relaxed">
                        독수리수학에서 학생 맞춤 수업으로<br />
                        확실한 실력 향상을 경험하세요.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link to="/contact/admission" className="w-full sm:w-48 py-3.5 md:py-4 bg-[#0f172a] text-white font-bold rounded-none hover:bg-black transition-colors shadow-md text-center text-sm md:text-base">
                            입학안내
                        </Link>
                        <Link to="/contact/counseling" className="w-full sm:w-48 py-3.5 md:py-4 bg-white border-2 border-[#0f172a] text-[#0f172a] font-bold rounded-none hover:bg-slate-50 transition-colors shadow-md text-center text-sm md:text-base">
                            상담신청
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
