import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
    return (
        <div className="bg-slate-50 min-h-screen py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-[#1e3a8a] transition-colors mb-4 font-bold">
                            <ArrowLeft size={18} className="mr-2" />
                            메인으로 돌아가기
                        </Link>
                        <h1 className="text-4xl font-black text-slate-900 flex items-center">
                            <ShieldCheck className="mr-3 text-[#1e3a8a]" size={36} />
                            이용약관
                        </h1>
                    </div>
                    <p className="text-slate-400 text-sm font-medium italic">시행일: 2024년 3월 1일</p>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 space-y-12 text-slate-700 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-100">제1조 (목적)</h2>
                        <p>이 약관은 독수리수학학원(이하 "학원"이라 함)이 운영하는 홈페이지(이하 "사이트")에서 제공하는 인터넷 관련 서비스(이하 "서비스")를 이용함에 있어 학원과 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-100">제2조 (용어의 정의)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>"사이트"란 학원이 서비스를 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 설정한 가상의 영업장을 말합니다.</li>
                            <li>"이용자"란 "사이트"에 접속하여 이 약관에 따라 학원이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                            <li>"회원"이라 함은 "사이트"에 개인정보를 제공하여 회원등록을 한 자로서, "사이트"의 정보를 지속적으로 제공받으며 "사이트"가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-100">제3조 (약관의 명시와 개정)</h2>
                        <p>학원은 이 약관의 내용과 상호, 영업소 소재지, 대표자의 성명, 사업자등록번호, 연락처 등을 이용자가 알 수 있도록 사이트의 초기 서비스 화면에 게시합니다. 학원은 약관의 규제 등에 관한 법률, 전자거래기본법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-100">제4조 (서비스의 제공 및 변경)</h2>
                        <p>학원은 다음과 같은 업무를 수행합니다.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>학원 안내 및 입학 상담 서비스</li>
                            <li>학습 자료실 운영 (회원 전용)</li>
                            <li>자유게시판 및 공지사항 운영</li>
                            <li>기타 학원이 정하는 업무</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-100">제5조 (게시물의 저작권)</h2>
                        <p>이용자가 게시한 게시물의 저작권은 게시한 이용자에게 귀속됩니다. 단, 학원은 사이트의 운영을 위해 해당 게시물을 복제, 수정, 편집하여 활용할 수 있습니다.</p>
                    </section>

                    <div className="pt-8 border-t border-slate-50">
                        <p className="text-sm text-center text-slate-400">Copyright © 독수리수학학원 All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
