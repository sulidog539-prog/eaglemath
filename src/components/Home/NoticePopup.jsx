import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function NoticePopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollDir, setScrollDir] = useState(0);
    const STORAGE_KEY = 'notice_popup_hide_until_v2';

    useEffect(() => {
        const hideUntil = localStorage.getItem(STORAGE_KEY);
        const now = new Date().getTime();

        if (!hideUntil || now > parseInt(hideUntil)) {
            // Show popup with a short delay for better UX
            const timer = setTimeout(() => setIsOpen(true), 1500);

            let lastScrollY = window.pageYOffset;
            let ticking = false;
            let stopTimer = null;

            const handleScroll = () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const currentScrollY = window.pageYOffset;
                        const diff = currentScrollY - lastScrollY;

                        if (Math.abs(diff) > 2) {
                            const moveAmount = Math.max(-30, Math.min(30, diff * 0.4));
                            setScrollDir(moveAmount);
                        }

                        if (stopTimer) clearTimeout(stopTimer);
                        stopTimer = setTimeout(() => setScrollDir(0), 150);

                        lastScrollY = currentScrollY;
                        ticking = false;
                    });
                    ticking = true;
                }
            };

            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
                clearTimeout(timer);
                if (stopTimer) clearTimeout(stopTimer);
            };
        }
    }, []);

    const closePopup = () => setIsOpen(false);

    const hideFor24Hours = () => {
        const oneDayInMs = 24 * 60 * 60 * 1000;
        const expiry = new Date().getTime() + oneDayInMs;
        localStorage.setItem(STORAGE_KEY, expiry.toString());
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 md:absolute md:inset-x-0 md:top-10 z-[100] flex items-center md:items-start justify-center p-4 pointer-events-none">
            <div
                className={`relative bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-w-lg w-full overflow-hidden pointer-events-auto transition-all duration-[2000ms] cubic-bezier(0.34, 1.56, 0.64, 1) ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-90'}`}
                style={{
                    transform: `translateY(${scrollDir}px)`,
                    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
            >
                {/* Poster Content */}
                <a
                    href="https://blog.naver.com/eaglescience/224212428416"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group relative"
                >
                    <img
                        src="/notice-poster.png"
                        alt="Notice Poster"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/600x800?text=Notice+Poster+Missing';
                        }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </a>

                {/* Action Bar */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-t border-slate-800">
                    <button
                        onClick={hideFor24Hours}
                        className="text-xs md:text-sm font-medium hover:text-blue-400 transition-colors flex items-center gap-2"
                    >
                        <span className="w-4 h-4 border border-white/30 rounded flex items-center justify-center text-[10px]">✓</span>
                        24시간 동안 보지 않기
                    </button>
                    <button
                        onClick={closePopup}
                        className="text-xs md:text-sm font-bold hover:text-slate-300 transition-colors px-4 py-1"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}
