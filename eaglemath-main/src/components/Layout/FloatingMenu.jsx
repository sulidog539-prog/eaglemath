import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, GraduationCap, Phone, ChevronUp } from 'lucide-react';

export default function FloatingMenu() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [scrollDir, setScrollDir] = useState(0); // -1 for up, 1 for down

    useEffect(() => {
        // Entry animation delay - longer delay so it's noticed after page load
        const timer = setTimeout(() => setIsMounted(true), 800);

        let lastScrollY = window.pageYOffset;
        let ticking = false;
        let stopTimer = null;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.pageYOffset;

                    // Visibility toggle for TOP button
                    if (currentScrollY > 300) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }

                    // Inertia/Following effect - dynamic offset
                    const diff = currentScrollY - lastScrollY;
                    if (Math.abs(diff) > 2) {
                        // Limit the max movement magnitude
                        const moveAmount = Math.max(-40, Math.min(40, diff * 0.5));
                        setScrollDir(moveAmount);
                    }

                    // Smoothly reset direction after stop
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
    }, []);

    const menuItems = [
        { label: "분원안내", path: "/about/branches", icon: <MapPin size={18} /> },
        { label: "입학안내", path: "/contact/admission", icon: <GraduationCap size={18} /> },
        { label: "상담신청", path: "/contact/counseling", icon: <Phone size={18} /> },
    ];

    return (
        <div className={`fixed right-0 top-1/2 z-[60] hidden lg:flex flex-col items-end transition-all duration-[2500ms] cubic-bezier(0.34, 1.56, 0.64, 1) ${isMounted ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
            style={{
                transform: `translateY(calc(-50% + ${scrollDir}px))`,
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 2.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}>
            <div className="flex flex-col bg-white shadow-[-10px_0_30px_rgba(30,58,138,0.1)] border border-slate-200 rounded-l-2xl overflow-hidden">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`group flex flex-col items-center justify-center w-20 h-20 transition-all duration-500 ${index !== menuItems.length - 1 ? 'border-b border-slate-100' : ''
                            } hover:bg-[#1e3a8a] text-slate-600 hover:text-white`}
                    >
                        <div className="mb-1 transform group-hover:-translate-y-1 transition-transform duration-300">
                            {item.icon}
                        </div>
                        <span className="text-[11px] font-bold tracking-tight">{item.label}</span>
                    </Link>
                ))}
            </div>

            {/* Scroll-dependent Back to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`mt-4 w-12 h-12 bg-slate-900/90 backdrop-blur-sm text-white rounded-l-xl hover:bg-black transition-all duration-500 flex items-center justify-center group shadow-lg ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
                    }`}
                title="맨 위로"
            >
                <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            </button>
        </div>
    );
}
