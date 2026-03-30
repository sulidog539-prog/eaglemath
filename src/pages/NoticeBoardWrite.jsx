import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { X, Save, CheckCircle2, Megaphone, ChevronLeft, Loader2 } from 'lucide-react';

export default function NoticeBoardWrite() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('수다'); // Not really used in Notice but matches structure
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
       <Loader2 className="w-10 h-10 text-[#172554] animate-spin" />
    </div>
  );

  // Security check redundant as Route is protected but good for UX
  if (!user || user.email !== 'admin@eaglemath.com') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
           <div className="text-center">
             <h1 className="text-2xl font-bold text-red-600 mb-2">접근 권한 없음</h1>
             <p className="text-slate-500">관리자만 공지사항을 작성할 수 있습니다.</p>
             <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-lg">홈으로</button>
           </div>
        </div>
      );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        await addDoc(collection(db, 'notices'), {
            title,
            content,
            author: '독수리수학',
            pin: isPinned,
            views: 0,
            createdAt: serverTimestamp()
        });
        
        navigate('/resources/notice');
    } catch (error) {
        console.error('Error adding notice: ', error);
        alert('등록 중 오류가 발생했습니다.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/resources/notice')}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors font-bold text-sm"
          >
            <ChevronLeft size={18} />
            목록으로 돌아가기
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-slate-900 mb-1 leading-none">신규 공지사항 작성</h1>
              <p className="text-slate-500 font-medium text-sm mt-2">전체 사용자에게 보여지는 공지사항을 작성합니다.</p>
            </div>
            {/* Pin Toggle */}
            <button
              type="button"
              onClick={() => setIsPinned(!isPinned)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                isPinned ? 'bg-amber-100 text-amber-700 border border-amber-200 shadow-sm' : 'bg-white text-slate-400 border border-slate-100'
              }`}
            >
              <Megaphone size={16} className={isPinned ? 'fill-amber-500' : ''} />
              <span>상단 고정 {isPinned ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <input 
                type="text" 
                placeholder="공지 제목을 입력하세요" 
                required
                className="w-full text-xl font-bold text-slate-800 border-0 border-b-2 border-slate-100 py-3 focus:ring-0 focus:border-[#172554] outline-none transition-all placeholder:text-slate-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <textarea 
                placeholder="공지 내용을 입력하세요..." 
                required
                rows="15"
                className="w-full text-base text-slate-600 border-none focus:ring-0 outline-none transition-all placeholder:text-slate-300 resize-none px-0"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="px-8 py-6 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
               <CheckCircle2 size={14} className="text-blue-500" />
               <span>작성된 공지는 모든 사용자에게 공개됩니다.</span>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
               <button 
                 type="button"
                 onClick={() => navigate('/resources/notice')}
                 className="flex-1 md:flex-none px-8 py-3 bg-white text-slate-500 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all text-sm"
               >
                 취소
               </button>
               <button 
                 type="submit"
                 disabled={isSubmitting}
                 className="flex-1 md:flex-none px-10 py-3 bg-[#172554] text-white rounded-xl font-bold hover:bg-black transition-all shadow-md text-sm active:scale-95 flex items-center gap-2"
               >
                 {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                 공지 등록
               </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
