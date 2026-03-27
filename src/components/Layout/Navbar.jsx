import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, GraduationCap, BookOpen, Calendar, Phone, Info, ShieldCheck, Users } from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const navItems = [
    {
        title: "독수리수학소개",
        path: "/about",
        icon: <Info size={18} />,
        submenu: [
            { title: "학원소개", path: "/about/intro" },
            { title: "학원분원안내", path: "/about/branches" },
            { title: "성적 & 합격 소식", path: "/about/results" },
        ]
    },
    {
        title: "초/중등부",
        path: "/elementary-middle",
        icon: <GraduationCap size={18} />,
        submenu: [
            { title: "초등", path: "/elementary" },
            { title: "중등", path: "/middle" },
            { title: "특목대비", path: "/elementary/hwangso" },
            { title: "KMA", path: "/kma" },
        ]
    },
    {
        title: "고등부",
        path: "/high-school",
        icon: <BookOpen size={18} />,
        submenu: [
            { title: "2028 대입", path: "/high-school/2028-admission" },
            { title: "고등", path: "/high-school/programs" },
        ]
    },
    {
        title: "학습자료",
        path: "/resources",
        icon: <BookOpen size={18} />,
        submenu: [
            { 
                title: "게시판", 
                path: "/resources/board",
                nested: [
                    { title: "공지사항", path: "/resources/notice" },
                    { title: "자유게시판", path: "/resources/free-board" },
                ]
            },
            { title: "상담일기", path: "/resources/counseling-logs" },
            { title: "기출문제 분석", path: "/resources/exam-analysis" },
            { title: "학습자료실", path: "/resources/materials" },
        ]
    },
    {
        title: "예약&문의",
        path: "/contact",
        icon: <Phone size={18} />,
        submenu: [
            { title: "입학안내", path: "/contact/admission" },
            { title: "상담신청", path: "/contact/counseling" },
        ]
    },
    {
        title: "파트너제휴",
        path: "/partnership",
        icon: <Users size={18} />,
        submenu: [
            { title: "신규선생님 채용", path: "/partnership/recruitment" },
        ]
    }
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
        setActiveDropdown(null);
    }, [location.pathname]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('nav')) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleDropdownToggle = (title, e) => {
        // Prevent default link behavior if it's a click on the category itself and has a submenu
        e.preventDefault();
        e.stopPropagation();
        setActiveDropdown(prev => prev === title ? null : title);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
            setIsAdmin(user?.email === 'admin@eaglemath.com');
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('isAuthenticated');
            window.location.href = '/';
        } catch (err) {
            console.error('로그아웃 오류:', err);
        }
    };

    return (
        <nav className="bg-white border-b border-slate-100 shadow-sm fixed w-full top-0 z-50">
            {/* Top Navy Blue Line Decoration */}
            <div className="h-1 w-full bg-[#172554]"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex justify-between h-14 lg:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center md:static absolute left-1/2 -translate-x-1/2 h-14 lg:h-auto md:left-0 md:translate-x-0">
                        <Link to="/" className="flex items-center space-x-2">
                            <img src="/logo_official.png" alt="독수리수학" className="h-7 lg:h-10 w-auto" />
                        </Link>
                    </div>

                    {/* Desktop Menu & Action Buttons */}
                    <div className="hidden lg:flex items-center space-x-4 xl:space-x-8 h-full">
                        <div className="flex space-x-1 xl:space-x-4 h-full items-center">
                            {navItems.map((item) => (
                                <div
                                    key={item.title}
                                    className="relative group h-full flex items-center"
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {item.submenu ? (
                                        <div
                                            className="px-3 py-2 text-slate-800 font-medium hover:text-blue-900 flex items-center space-x-1 transition-colors relative cursor-pointer"
                                            onClick={(e) => handleDropdownToggle(item.title, e)}
                                        >
                                            <span className={`${activeDropdown === item.title ? 'text-blue-900' : ''}`}>{item.title}</span>
                                            <ChevronDown size={14} className={`text-slate-400 transition-colors ${activeDropdown === item.title ? 'text-blue-900 rotate-180' : 'group-hover:text-blue-900'}`} />
                                            {/* Bottom Highlight Line */}
                                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#1e3a8a] transform transition-transform duration-200 origin-left ${activeDropdown === item.title ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className="px-3 py-2 text-slate-800 font-medium hover:text-blue-900 flex items-center space-x-1 transition-colors relative whitespace-nowrap"
                                            onClick={() => setActiveDropdown(null)}
                                        >
                                            <span>{item.title}</span>
                                            {/* Bottom Highlight Line */}
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1e3a8a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                                        </Link>
                                    )}

                                    {/* Level 1 Dropdown */}
                                    {item.submenu && (
                                        <div className={`absolute top-full left-0 w-56 bg-white shadow-xl rounded-b-lg py-2 border border-slate-100 transition-all duration-200 transform ${activeDropdown === item.title
                                            ? 'opacity-100 visible translate-y-0'
                                            : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
                                            }`}>
                                            {item.submenu.map((sub) => (
                                                <div key={sub.title} className="relative group/sub">
                                                    {sub.nested ? (
                                                        <div className="block px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-900 flex justify-between items-center transition-colors cursor-default">
                                                            <span className="font-medium">{sub.title}</span>
                                                            <ChevronRight size={14} className="text-slate-400" />
                                                        </div>
                                                    ) : (
                                                        <Link
                                                            to={sub.path}
                                                            className="block px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-900 flex justify-between items-center transition-colors"
                                                            onClick={() => setActiveDropdown(null)}
                                                        >
                                                            <span className="font-medium">{sub.title}</span>
                                                        </Link>
                                                    )}

                                                    {/* Level 2 Dropdown (Nested) */}
                                                    {sub.nested && (
                                                        <div className="absolute top-0 left-full w-48 bg-white shadow-xl rounded-r-lg rounded-b-lg py-2 border border-slate-100 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 -ml-1 mt-0 transform translate-x-2 group-hover/sub:translate-x-0">
                                                            {sub.nested.map((nestedItem) => (
                                                                <Link
                                                                    key={nestedItem.title}
                                                                    to={nestedItem.path}
                                                                    className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-900 transition-colors"
                                                                    onClick={() => setActiveDropdown(null)}
                                                                >
                                                                    {nestedItem.title}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Login/Logout Button */}
                        <div className="pl-4 border-l border-slate-200">
                            {isAuthenticated ? (
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={handleLogout}
                                        className="px-5 py-2 text-sm font-bold text-slate-600 border border-slate-300 rounded hover:bg-slate-50 transition-all shadow-sm"
                                    >
                                        로그아웃
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="px-5 py-2 text-sm font-bold text-white bg-[#172554] rounded hover:bg-black transition-all shadow-sm"
                                >
                                    로그인
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div
                        className="lg:hidden flex items-center ml-auto"
                        onMouseEnter={() => setIsMenuOpen(true)}
                    >
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-600 hover:text-blue-900 focus:outline-none"
                        >
                            <span className="sr-only">Open menu</span>
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Drawer */}
                    {/* Backdrop */}
                    {isMenuOpen && (
                        <div
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        ></div>
                    )}

                    {/* Drawer */}
                    <div
                        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                        onMouseLeave={() => setIsMenuOpen(false)}
                    >
                        <div className="flex flex-col h-full overflow-y-auto">
                            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                                <span className="font-bold text-lg text-[#172554]">메뉴</span>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 text-slate-500 hover:text-slate-800"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex-1 py-4">
                                {navItems.map((item) => (
                                    <div
                                        key={item.title}
                                        className="border-b border-slate-50 last:border-0"
                                        onMouseEnter={() => {
                                            if (item.submenu) setActiveDropdown(item.title);
                                        }}
                                    >
                                        {item.submenu ? (
                                            <div>
                                                <button
                                                    onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                                                    className="w-full px-6 py-4 flex justify-between items-center text-slate-700 hover:bg-slate-50 hover:text-blue-900 transition-colors"
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-slate-400">{item.icon}</span>
                                                        <span className="font-medium">{item.title}</span>
                                                    </div>
                                                    <ChevronDown
                                                        size={16}
                                                        className={`text-slate-400 transition-transform duration-200 ${activeDropdown === item.title ? 'rotate-180' : ''}`}
                                                    />
                                                </button>

                                                {/* Mobile Submenu Accordion */}
                                                <div className={`bg-slate-50 overflow-hidden transition-all duration-300 ${activeDropdown === item.title ? 'max-h-96' : 'max-h-0'}`}>
                                                    {item.submenu.map((sub) => (
                                                        <div key={sub.title}>
                                                            {sub.nested ? (
                                                                <div className="px-10 py-3 text-sm text-slate-600 font-medium">
                                                                    {sub.title}
                                                                    <div className="mt-2 pl-2 border-l-2 border-slate-200 space-y-2">
                                                                        {sub.nested.map((nested) => (
                                                                            <Link
                                                                                key={nested.title}
                                                                                to={nested.path}
                                                                                className="block py-1 text-slate-500 hover:text-blue-900"
                                                                                onClick={() => setIsMenuOpen(false)}
                                                                            >
                                                                                {nested.title}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <Link
                                                                    to={sub.path}
                                                                    className="block px-10 py-3 text-sm text-slate-600 hover:text-blue-900 hover:bg-slate-100 transition-colors"
                                                                    onClick={() => setIsMenuOpen(false)}
                                                                >
                                                                    {sub.title}
                                                                </Link>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <Link
                                                to={item.path}
                                                className="w-full px-6 py-4 flex items-center space-x-3 text-slate-700 hover:bg-slate-50 hover:text-blue-900 transition-colors"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <span className="text-slate-400">{item.icon}</span>
                                                <span className="font-medium">{item.title}</span>
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 bg-slate-50 border-t border-slate-100">
                                {isAuthenticated ? (
                                    <div className="space-y-4">
                                        {isAdmin && (
                                            <div className="flex items-center justify-center space-x-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                                                <ShieldCheck size={16} className="text-amber-600" />
                                                <span className="text-xs font-black text-amber-700 uppercase tracking-wider">Admin Mode</span>
                                            </div>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full py-3 text-center text-slate-600 font-bold border border-slate-300 rounded-lg hover:bg-white transition-colors shadow-sm"
                                        >
                                            로그아웃
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="block w-full py-3 text-center text-white font-bold bg-[#172554] rounded-lg hover:bg-blue-900 transition-colors shadow-sm"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        로그인
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Admin Badge - Floating Desktop Version */}
            {isAdmin && (
                <div className="hidden lg:flex fixed bottom-10 right-10 z-[100] items-center space-x-3 px-4 py-3 bg-white/95 backdrop-blur-sm border border-amber-200 rounded-2xl shadow-2xl hover:translate-y-[-4px] transition-all cursor-default group select-none">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-100 transition-colors">
                        <ShieldCheck size={24} />
                    </div>
                    <div className="flex flex-col pr-2">
                        <div className="flex items-center space-x-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">System Active</span>
                        </div>
                        <span className="text-sm font-black text-slate-800">Admin Mode</span>
                    </div>
                </div>
            )}
        </nav>
    );
}
