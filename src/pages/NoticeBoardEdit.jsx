import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ChevronLeft, Loader2, Save, Megaphone } from 'lucide-react';

export default function NoticeBoardEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAdmin = user?.email === 'admin@eaglemath.com';

  useEffect(() => {
    if (!isAdmin && !isLoading) {
      alert('관리자 권한이 필요합니다.');
      navigate('/resources/notice');
      return;
    }
    const fetchNotice = async () => {
      const docRef = doc(db, 'notices', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title || '');
        setContent(data.content || '');
        setIsPinned(data.pin || false);
      } else {
        alert('존재하지 않는 공지사항입니다.');
        navigate('/resources/notice');
      }
      setIsLoading(false);
    };
    if (user) fetchNotice();
  }, [id, user, navigate, isAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateDoc(doc(db, 'notices', id), {
        title,
        content,
        pin: isPinned,
        updatedAt: serverTimestamp()
      });
      navigate(`/resources/notice/${id}`);
    } catch (error) {
      console.error('수정 오류:', error);
      alert('수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#172554] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={() => navigate(`/resources/notice/${id}`)}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors font-bold text-sm"
          >
            <ChevronLeft size={18} />
            공지 보기로 돌아가기
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-slate-900 mb-1 leading-none">공지사항 수정</h1>
              <p className="text-slate-500 font-medium text-sm mt-2">내용을 수정한 후 저장하세요.</p>
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
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="공지 제목을 입력하세요"
              className="w-full text-xl font-bold text-slate-800 border-0 border-b-2 border-slate-100 py-3 focus:ring-0 focus:border-[#172554] outline-none transition-all placeholder:text-slate-300"
            />
            <textarea
              required
              rows="15"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="공지 내용을 입력하세요..."
              className="w-full text-base text-slate-600 border-none focus:ring-0 outline-none transition-all placeholder:text-slate-300 resize-none px-0"
            />
          </div>

          <div className="px-8 py-6 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-end border-t border-slate-100">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => navigate(`/resources/notice/${id}`)}
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
                <Save size={16} />
                저장하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
