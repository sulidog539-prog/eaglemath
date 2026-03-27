import React, { useState, useEffect } from 'react';
import { ExternalLink, Calendar, ChevronRight, Calculator, BookOpen, Languages, FlaskConical } from 'lucide-react';

const blogConfigs = [
    { id: 'math', name: '수학', blogId: 'eaglemath', icon: <Calculator className="w-5 h-5" /> },
    { id: 'korean', name: '국어', blogId: 'eaglemathedu', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'english', name: '영어', blogId: 'eagleenglish4968', icon: <Languages className="w-5 h-5" /> },
    { id: 'science', name: '과학', blogId: 'eaglescience', icon: <FlaskConical className="w-5 h-5" /> }
];

export default function BlogPosts() {
    const [activeTab, setActiveTab] = useState('math');
    const [posts, setPosts] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const currentBlogId = blogConfigs.find(b => b.id === activeTab).blogId;
        
        // Return if already fetched
        if (posts[activeTab]) return;

        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const RSS_TO_JSON_API = `https://api.rss2json.com/v1/api.json?rss_url=https://rss.blog.naver.com/${currentBlogId}`;
                const response = await fetch(RSS_TO_JSON_API);
                const data = await response.json();
                
                if (data.status === 'ok') {
                    setPosts(prev => ({
                        ...prev,
                        [activeTab]: data.items.slice(0, 5) // Show top 5 posts
                    }));
                }
            } catch (error) {
                console.error(`Failed to fetch blog posts for ${activeTab}:`, error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [activeTab, posts]);

    const decodeHtml = (html) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    const currentPosts = posts[activeTab] || [];

    return (
        <section className="py-16 bg-slate-50 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                        독수리{blogConfigs.find(b => b.id === activeTab).name} 최신 소식
                    </h2>
                </div>

                {/* Subject Tabs */}
                <div className="flex justify-center mb-10 overflow-x-auto no-scrollbar pb-2">
                    <div className="inline-flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
                        {blogConfigs.map((config) => (
                            <button
                                key={config.id}
                                onClick={() => setActiveTab(config.id)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                                    activeTab === config.id
                                        ? 'bg-[#1e3a8a] text-white shadow-md'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                }`}
                            >
                                <span>{config.icon}</span>
                                <span>{config.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Posts List (Table of Contents Style) */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden min-h-[460px] flex flex-col">
                    {isLoading ? (
                        <div className="flex-1 flex flex-col p-8 space-y-6">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="animate-pulse flex items-center space-x-6 pb-6 border-b border-slate-50 last:border-0">
                                    <div className="h-6 bg-slate-100 w-16 rounded"></div>
                                    <div className="flex-1 h-6 bg-slate-100 rounded"></div>
                                    <div className="h-6 bg-slate-100 w-24 rounded"></div>
                                </div>
                            ))}
                        </div>
                    ) : currentPosts.length > 0 ? (
                        <div className="divide-y divide-slate-50">
                            {currentPosts.map((post, index) => (
                                <a 
                                    key={index}
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col md:flex-row md:items-center p-5 md:p-6 hover:bg-blue-50/50 transition-all duration-300"
                                >
                                    {/* Subject Badge */}
                                    <div className="hidden md:flex flex-shrink-0 w-20 items-center justify-center">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#fbbf24] bg-[#fbbf24]/10 px-2 py-1 rounded">
                                            {activeTab}
                                        </span>
                                    </div>

                                    {/* Title Section */}
                                    <div className="flex-1 md:px-6">
                                        <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-[#1e3a8a] transition-colors mb-2 md:mb-0">
                                            {decodeHtml(post.title)}
                                        </h3>
                                    </div>

                                    {/* Date and Arrow */}
                                    <div className="flex items-center justify-between md:justify-end md:w-40 text-slate-400">
                                        <div className="flex items-center space-x-2 text-xs font-medium">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{post.pubDate.split(' ')[0]}</span>
                                        </div>
                                        <ChevronRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform group-hover:text-[#1e3a8a]" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-20 text-slate-400">
                            <p>작성된 글이 없습니다.</p>
                        </div>
                    )}

                    {/* Blog Footer Link */}
                    <div className="mt-auto bg-slate-50/50 p-4 border-t border-slate-100 text-center">
                        <a 
                            href={`https://blog.naver.com/${blogConfigs.find(b => b.id === activeTab).blogId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-bold text-slate-500 hover:text-[#1e3a8a] flex items-center justify-center group"
                        >
                            해당 전문관 블로그 전체보기 <ExternalLink className="ml-2 w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
