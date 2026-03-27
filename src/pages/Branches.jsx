import React, { useState, useRef } from 'react';
import { MapPin, ExternalLink, ChevronDown, Calculator, BookOpen, Languages, FlaskConical } from 'lucide-react';

const branches = [
    {
        id: 1,
        name: "독수리수학 신길본원",
        category: "math",
        address: "서울특별시 영등포구 신길로28가길 20 1층",
        mapImage: "/images/branches/map_shingil.png",
        kakaoLink: "https://kko.to/qpjP9CxeuA",
        blogLink: "https://blog.naver.com/PostList.naver?blogId=eaglemath&widgetTypeCall=true&topReferer=https%3A%2F%2Fpcmap.place.naver.com%2Fplace%2F1350607397%2Fhome%3Fbk_query%3D%25EB%258F%2585%25EC%2588%2598%25EB%25A6%25AC%25EC%2588%2598%25ED%2595%2599%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202602161854%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%25EB%258F%2585%25EC%2588%2598%25EB%25A6%25AC%25EC%2588%2598%25ED%2595%2599&trackingCode=naver_place&directAccess=true#"
    },
    {
        id: 3,
        name: "독수리수학 도림",
        category: "math",
        address: "서울특별시 영등포구 도신로 65 동연빌딩 2층",
        mapImage: "/images/branches/map_dorim.png",
        kakaoLink: "https://kko.to/bxYONmRmmH",
        blogLink: "https://blog.naver.com/PostList.naver?blogId=eagle_edu&widgetTypeCall=true&topReferer=https%3A%2F%2Fpcmap.place.naver.com%2Fplace%2F1234991240%2Fhome%3Fbk_query%3D%25EB%258F%2585%25EC%2588%2598%25EB%25A6%25AC%25EC%2588%2598%25ED%2595%2599%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202602161853%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%25EB%258F%2585%25EC%2588%2598%25EB%25A6%25AC%25EC%2588%2598%25ED%2595%2599&trackingCode=naver_place&directAccess=true#"
    },
    {
        id: 2,
        name: "독수리수학 뉴타운본원점",
        category: "math",
        address: "서울특별시 영등포구 신길로28길 25 121동 제지2층 제비206호",
        mapImage: "/images/branches/map_newtown.png",
        kakaoLink: "https://kko.to/he91H-FUSb",
        blogLink: "https://blog.naver.com/PostView.naver?blogId=eaglemath&logNo=223481463998&redirect=Dlog&widgetTypeCall=true&topReferer=https%3A%2F%2Fsearch.naver.com%2Fsearch.naver%3Fwhere%3Dnexearch%26sm%3Dtop_hty%26fbm%3D0%26ie%3Dutf8%26query%3D%25EB%258F%2585%25EC%2588%2598%25EB%25A6%25AC%25EC%2588%2598%25ED%2595%2599%2B%25EB%2589%25B4%25ED%2583%2580%25EC%259A%25B4%25EB%25B3%25B8%25EC%259B%2590%26ackey%3Dkmghe2a1&trackingCode=nx&directAccess=false#"
    },
    {
        id: 6,
        name: "독수리수학 연구소",
        category: "math",
        address: "경기 성남시 수정구 위례광장로 300 . 514-95호",
        mapImage: "",
        kakaoLink: "https://map.kakao.com/?q=%EA%B2%BD%EA%B8%B0%20%EC%84%B1%EB%82%A8%EC%8B%9C%20%EC%88%98%EC%A0%95%EA%B5%AC%20%EC%9C%84%EB%A1%80%EA%B4%91%EC%9E%A5%EB%A1%9C%20300",
        blogLink: ""
    },
    {
        id: 5,
        name: "리드인 독수리국어",
        category: "korean",
        address: "서울 영등포구 신길로29길 17 신길센트럴자이아파트 103동 상가B동 102호",
        mapImage: "",
        kakaoLink: "https://map.kakao.com/?q=%EC%84%9C%EC%9A%B8%20%EC%98%81%EB%93%B1%ED%8F%AC%EA%B5%AC%20%EC%8B%A0%EA%B8%B8%EB%A1%9C29%EA%B8%B8%2017",
        blogLink: "https://blog.naver.com/eaglemathedu",
        affiliated: false
    },
    {
        id: 7,
        name: "독수리수학영어전문관학원",
        category: "english",
        address: "서울 영등포구 신길로29길 17 제상가비동 제지1층 103호",
        mapImage: "",
        kakaoLink: "https://map.kakao.com/?q=%EC%84%9C%EC%9A%B8%20%EC%98%81%EB%93%B1%ED%8F%AC%EA%B5%AC%20%EC%8B%A0%EA%B8%B8%EB%A1%9C29%EA%B8%B8%2017",
        blogLink: "https://blog.naver.com/eagleenglish4968",
        affiliated: false
    },
    {
        id: 4,
        name: "독수리수학과학전문관학원",
        category: "science",
        address: "서울 영등포구 신길로29길 17 제상가비동 제지1층 103호",
        mapImage: "",
        kakaoLink: "https://map.kakao.com/?q=%EC%84%9C%EC%9A%B8%20%EC%98%81%EB%93%B1%ED%8F%AC%EA%B5%AC%20%EC%8B%A0%EA%B8%B8%EB%A1%9C29%EA%B8%B8%2017",
        blogLink: "https://blog.naver.com/eaglescience",
        affiliated: false
    }
];

const categories = [
    { id: 'math', name: '수학', icon: <Calculator className="w-5 h-5" /> },
    { id: 'korean', name: '국어', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'english', name: '영어', icon: <Languages className="w-5 h-5" /> },
    { id: 'science', name: '과학', icon: <FlaskConical className="w-5 h-5" /> },
];

export default function Branches() {
    const [hoveredId, setHoveredId] = useState(null);
    const [activeTab, setActiveTab] = useState('math');
    
    // Create refs for each subject section
    const sectionRefs = {
        math: useRef(null),
        korean: useRef(null),
        english: useRef(null),
        science: useRef(null)
    };

    const scrollToSection = (id) => {
        setActiveTab(id);
        const section = sectionRefs[id].current;
        if (section) {
            const navbarHeight = 80; // Approximate height of the fixed navbar
            const tabHeight = 70; // Height of our subject tab bar
            const offset = section.offsetTop - navbarHeight - tabHeight - 20;
            
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-[#0f172a] text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-[-10%] w-[40%] h-full bg-white/5 skew-x-[-20deg]"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">학원분원안내</h1>
                    <p className="text-lg md:text-xl text-blue-100/80 font-medium">독수리 교육 그룹은 각 과목별 전문 시스템을 통해<br className="md:hidden" /> 최상의 교육을 제공합니다</p>
                </div>
            </div>

            {/* Subject Tabs (Sticky) */}
            <div className="sticky top-[56px] lg:top-[80px] z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex justify-between items-center py-4 overflow-x-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => scrollToSection(cat.id)}
                                className={`flex items-center space-x-2 px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                                    activeTab === cat.id
                                        ? 'bg-[#1e3a8a] text-white shadow-lg shadow-blue-200'
                                        : 'text-slate-500 hover:bg-slate-100'
                                }`}
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.name} 전문관</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Branches List Container */}
            <div className="max-w-4xl mx-auto py-12 px-4 pb-32 space-y-20">
                {categories.map((cat) => (
                    <div 
                        key={cat.id} 
                        ref={sectionRefs[cat.id]}
                        className="scroll-mt-40"
                    >
                        {/* Section Header */}
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#1e3a8a] border border-slate-100">
                                {cat.icon}
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">{cat.name} 전문관 안내</h2>
                            <div className="h-px flex-1 bg-slate-200 hidden sm:block"></div>
                        </div>

                        <div className="grid gap-6">
                            {branches
                                .filter(b => b.category === cat.id)
                                .map((branch) => (
                                <div
                                    key={branch.id}
                                    className={`group relative bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl ${
                                        branch.affiliated === false
                                            ? 'border-2 border-violet-100 hover:border-violet-300'
                                            : 'border border-slate-100'
                                    }`}
                                    onMouseEnter={() => setHoveredId(branch.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >

                                    {/* Main Title Section */}
                                    {branch.blogLink ? (
                                        <a
                                            href={branch.blogLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block p-8 cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors duration-300">
                                                        <MapPin className="w-6 h-6" />
                                                    </div>
                                                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-[#1e3a8a] transition-colors">
                                                        {branch.name}
                                                    </h2>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center space-x-2 text-slate-400 group-hover:text-[#1e3a8a] transition-colors">
                                                        <span className="text-sm font-medium hidden sm:inline">네이버 블로그 보기</span>
                                                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Address */}
                                            <div className="mt-4 flex items-center text-slate-500 ml-1">
                                                <p className="font-medium">{branch.address}</p>
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="block p-8 cursor-pointer">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors duration-300">
                                                        <MapPin className="w-6 h-6" />
                                                    </div>
                                                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-[#1e3a8a] transition-colors">
                                                        {branch.name}
                                                    </h2>
                                                </div>
                                                {branch.name.includes('연구소') && (
                                                    <div className="flex items-center space-x-4">
                                                        <div className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold border border-slate-200">
                                                            연구시설
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Address */}
                                            <div className="mt-4 flex items-center text-slate-500 ml-1">
                                                <p className="font-medium">{branch.address}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Sliding Map Section */}
                                    <div
                                        className={`overflow-hidden transition-all duration-700 ease-in-out ${hoveredId === branch.id ? 'max-h-[500px] border-t border-slate-100' : 'max-h-0'
                                            }`}
                                    >
                                        <div className="p-8 pt-0">
                                            <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 relative group/map h-[320px] bg-slate-100 flex items-center justify-center">
                                                <div className="absolute inset-0 opacity-20 pointer-events-none">
                                                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                                        <defs>
                                                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="1" />
                                                            </pattern>
                                                        </defs>
                                                        <rect width="100%" height="100%" fill="url(#grid)" />
                                                        <path d="M0 100 L1000 100 M200 0 L200 1000 M500 0 L500 1000" stroke="#cbd5e1" strokeWidth="20" fill="none" />
                                                    </svg>
                                                </div>

                                                <div className="relative z-10 flex flex-col items-center text-center px-6">
                                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 text-[#1e3a8a]">
                                                        <MapPin className="w-8 h-8 fill-current opacity-80" />
                                                    </div>
                                                    <p className="text-slate-900 font-bold text-lg mb-2">{branch.name}</p>
                                                    <p className="text-slate-600 font-medium">{branch.address}</p>
                                                </div>

                                                <img
                                                    src={branch.mapImage}
                                                    alt={`${branch.name} 지도`}
                                                    className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover/map:scale-110 transition-transform duration-1000 opacity-0 group-hover:opacity-0"
                                                    onError={(e) => e.target.style.display = 'none'}
                                                />

                                                <div className="absolute bottom-6 right-6">
                                                    <a
                                                        href={branch.kakaoLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-6 py-3 bg-[#fee500] text-slate-900 font-bold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
                                                    >
                                                        <span className="w-2 h-2 bg-slate-900 rounded-full animate-pulse"></span>
                                                        <span>카카오 맵에서 확인</span>
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
