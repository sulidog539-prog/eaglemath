import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Left: Academy Info */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6 underline decoration-[#fbbf24] decoration-2 underline-offset-8">독수리수학학원</h3>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                            학생별 수준과 목표에 맞춘 1:1 맞춤형 수업으로<br />
                            개념 이해부터 문제 해결까지 빈틈없이 지도합니다.<br />
                            개별 관리와 정확한 피드백을 통해<br />
                            확실한 성적 향상을 만들어냅니다.
                        </p>
                    </div>

                    {/* Middle: Contact & Location */}
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">연락처</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center space-x-2">
                                    <Phone size={16} className="text-[#fbbf24]" />
                                    <span>010-8229-7963</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">오시는 길</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start space-x-2">
                                    <MapPin size={16} className="mt-1 flex-shrink-0 text-[#fbbf24]" />
                                    <span>서울 영등포구 신길로28가길 20 1층</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Official Channels */}
                    <div className="md:text-right">
                        <h4 className="text-lg font-semibold text-white mb-4">공식 채널</h4>
                        <ul className="space-y-3 text-sm flex flex-col md:items-end">
                            <li>
                                <a href="https://blog.naver.com/eaglemath" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-bold flex items-center group">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                                    독수리수학 공식 블로그
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-[11px] leading-6 text-slate-500 text-center md:text-left">
                            <p>
                                대표자: 김선도 | 학원등록번호: 제6144호 | 사업자등록번호: 176-85-02656<br />
                                주소: 서울 영등포구 신길로28가길 20 1층 | 이메일: eaglemath@naver.com
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                            <Link to="/terms" className="hover:text-white transition-colors">이용약관</Link>
                            <span className="w-px h-3 bg-slate-700"></span>
                            <Link to="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center text-[10px] text-slate-600 font-medium tracking-wider uppercase">
                    &copy; {new Date().getFullYear()} Eagle Math Academy. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
