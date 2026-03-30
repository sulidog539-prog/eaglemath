import React from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
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
                            <Lock className="mr-3 text-[#1e3a8a]" size={36} />
                            개인정보처리방침
                        </h1>
                    </div>
                    <p className="text-slate-400 text-sm font-medium italic">최근 업데이트: 2024년 3월 23일</p>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 space-y-12 text-slate-700 leading-relaxed font-outfit">
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-100">제1조 (개인정보의 처리 목적)</h2>
                        <p>독수리수학학원(이하 "학원"이라 함)은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
                        <ul className="list-disc pl-5 mt-3 space-y-1">
                            <li>회원 가입 및 관리: 회원 식별, 비밀번호 찾기, 본인 확인</li>
                            <li>학습 자료실 이용: 학습 자료 열람기록 보관 및 서비스 제공</li>
                            <li>상담 신청 처리: 입학 및 학습 관련 상담 답변 및 기록</li>
                            <li>채용 지원 처리: 입사 지원 내용 검토 및 합격 여부 통보</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-100 font-outfit">제2조 (처리하는 개인정보의 항목)</h2>
                        <p>학원은 다음의 개인정보 항목을 처리하고 있습니다.</p>
                        <ul className="list-decimal pl-5 mt-3 space-y-3">
                            <li><strong>회원 가입 시:</strong> 아이디(ID), 비밀번호</li>
                            <li><strong>상담 신청 시:</strong> 학생명, 학년, 이메일, 연락처, 지점위치, 학교명, 알게 된 경로</li>
                            <li><strong>채용 지원 시:</strong> 성함, 생년월일, 연락처, 주소, 학력 및 경력 사항</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-100 font-outfit">제3조 (개인정보의 처리 및 보유 기간)</h2>
                        <p>학원은 법령에 따른 개인정보 보유·이용기간 또는 이용자로부터 개인정보를 수집시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>회원 정보: 회원 탈퇴 시까지</li>
                            <li>상담 신청 정보: 상담 종료일로부터 3년</li>
                            <li>채용 지원 정보: 채용 절차 종료일로부터 180일</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-100 font-outfit">제4조 (개인정보의 제3자 제공)</h2>
                        <p>학원은 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 이용자가 사전에 동의한 경우나 법령의 규정에 의거한 경우에는 예외로 합니다.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-100 font-outfit">제5조 (이용자의 권리와 의무)</h2>
                        <p>이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입해지(탈퇴)를 요청할 수 있습니다.</p>
                    </section>

                    <div className="pt-8 border-t border-slate-50">
                        <p className="text-sm font-bold text-[#1e3a8a] mb-2 font-outfit">개인정보 보호 책임자</p>
                        <p className="text-sm">성명: 김선도 | 연락처: 010-8229-7963 | 이메일: eaglemath@naver.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
