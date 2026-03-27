import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebase';
import { Loader2, X, Upload } from 'lucide-react';

export default function AdminWrite({ type, onSuccess, onClose }) {
    const [isLoading, setIsLoading] = useState(false);
    
    // 파일 업로드 관련
    const [imageFile, setImageFile] = useState(null);

    // 공통 필드
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    // 성적·합격 (results) 필드
    const [student, setStudent] = useState('');
    const [resultType, setResultType] = useState('성적 우수');

    // 상담일기 (counseling) & 기출문제(exam) 필드
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');

    // 학습자료실 (resources) 필드
    const [category, setCategory] = useState('기초학습');
    const [subCategory, setSubCategory] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [fileName, setFileName] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    // 권한 체크 (관리자만)
    const isAdmin = auth.currentUser?.email === 'admin@eaglemath.com';

    if (!isAdmin) {
        return null;
    }

    const getTitle = () => {
        switch (type) {
            case 'results': return '새 성적/합격 소식 등록';
            case 'counseling': return '새 상담일기 작성';
            case 'exam': return '새 기출문제 분석 작성';
            case 'resources': return '새 학습자료 등록';
            default: return '글쓰기';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const commonData = {
                title,
                date,
                selectedDate: new Date(date),
                createdAt: serverTimestamp(),
                author: 'admin',
            };

            let uploadedImageUrl = null;
            if (imageFile) {
                const storageRef = ref(storage, `${type}/${Date.now()}_${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                uploadedImageUrl = await getDownloadURL(storageRef);
            }

            let specifics = {};
            if (type === 'results') {
                specifics = { student, type: resultType, content };
            } else if (type === 'counseling') {
                specifics = { summary, content };
            } else if (type === 'exam') {
                specifics = { summary, content, fileUrl, fileName };
            } else if (type === 'resources') {
                specifics = { category, subCategory, fileUrl, files: [fileName], isPublic, content };
            }

            // 모든 타입에 대해 이미지가 있다면 추가
            if (uploadedImageUrl) {
                specifics.image = uploadedImageUrl;
            }

            // Instant registration with background sync
            addDoc(collection(db, type), { ...commonData, ...specifics });
            
            if (onSuccess) onSuccess();
            if (onClose) onClose();
        } catch (error) {
            console.error("Error writing document: ", error);
            alert('글 등록 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 p-8 mb-12 relative overflow-hidden transition-all animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1e3a8a]"></div>
            
            <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors p-2 hover:bg-slate-50 rounded-full">
                <X size={24} />
            </button>
            
            <h2 className="text-2xl font-black text-slate-900 mb-8 pb-4 border-b border-slate-100">{getTitle()}</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* 공통: 제목 & 날짜 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-3">
                        <label className="block text-sm font-bold text-slate-700 mb-2">제목</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none" placeholder="제목을 입력하세요" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">날짜</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 outline-none" />
                    </div>
                </div>

                {/* 성적·합격 (results) 전용 필드 */}
                {type === 'results' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">구분</label>
                            <select value={resultType} onChange={(e) => setResultType(e.target.value)} className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 outline-none">
                                <option value="성적 우수">성적 우수</option>
                                <option value="합격 뉴스">합격 뉴스</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">학생 정보</label>
                            <input type="text" value={student} onChange={(e) => setStudent(e.target.value)} required className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 outline-none" placeholder="예) 대영고 1학년 윤지이" />
                        </div>
                    </div>
                )}

                {/* 사진 첨부 (모든 게시판 공통) */}
                <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <label className="block text-sm font-black text-slate-700 mb-4 flex items-center gap-2">
                        <Upload size={16} /> 사진 첨부 (이미지 파일만 가능)
                    </label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setImageFile(e.target.files[0])} 
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-black file:bg-[#1e3a8a] file:text-white hover:file:bg-[#1e40af] cursor-pointer" 
                    />
                    {imageFile && <p className="mt-3 text-xs text-blue-600 font-bold">선택된 파일: {imageFile.name}</p>}
                </div>

                {/* 본문/요약 필드 (상담, 기출, 성적, 자료실 모두 공통) */}
                {(type === 'counseling' || type === 'exam' || type === 'results' || type === 'resources') && (
                    <div className="space-y-6">
                        {(type === 'counseling' || type === 'exam') && (
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">간략 요약</label>
                                <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} required className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 outline-none" placeholder="글의 핵심 내용을 한 줄로 요약해주세요" />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">상세 내용 (본문)</label>
                            <textarea 
                                value={content} 
                                onChange={(e) => setContent(e.target.value)} 
                                rows={type === 'results' ? 6 : 12} 
                                className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white transition-all outline-none" 
                                placeholder="상세 내용을 자유롭게 입력하세요..."
                            ></textarea>
                        </div>
                    </div>
                )}

                {/* 기출분석 & 학습자료실 전용 파일 링크 */}
                {(type === 'exam' || type === 'resources') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">다운로드 파일명 (표시용)</label>
                            <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl bg-white outline-none" placeholder="예) PDF, HWP, ZIP 등" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">외부 링크 URL (Google Drive 등)</label>
                            <input type="url" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl bg-white outline-none" placeholder="파일을 다운받을 수 있는 전체 주소" />
                        </div>
                    </div>
                )}

                {/* 학습자료실 전용 카테고리 필드 */}
                {type === 'resources' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">대분류</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 outline-none">
                                <option value="기초학습">기초학습</option>
                                <option value="학교별 내신대비">학교별 내신대비</option>
                                <option value="수능대비">수능대비</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">중분류(학교급)</label>
                            <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 outline-none">
                                <option value="">없음(공통)</option>
                                <option value="중등">중등</option>
                                <option value="고등">고등</option>
                            </select>
                        </div>
                        <div className="flex items-center pt-8">
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="w-6 h-6 rounded-lg border-slate-300 text-[#1e3a8a] focus:ring-[#1e3a8a] transition-all" />
                                <span className="text-sm font-black text-slate-700 group-hover:text-[#1e3a8a]">비회원에게도 공개</span>
                            </label>
                        </div>
                    </div>
                )}

                <div className="pt-8 border-t border-slate-100 flex justify-end items-center space-x-4">
                    <button type="button" onClick={onClose} className="px-8 py-4 font-bold text-slate-500 hover:text-slate-900 transition-colors">
                        취소하기
                    </button>
                    <button type="submit" disabled={isLoading} className="flex items-center px-12 py-4 bg-[#1e3a8a] text-white font-black rounded-xl hover:bg-[#1e40af] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50">
                        {isLoading ? <><Loader2 className="w-5 h-5 animate-spin mr-3" /> 저장 요청 중...</> : '내용 등록하기'}
                    </button>
                </div>
            </form>
        </div>
    );
}
