import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { doc, onSnapshot, updateDoc, increment, deleteDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ChevronLeft, User, Clock, Eye, Megaphone, Share2, Loader2, Pencil, Trash2, Check } from 'lucide-react';

export default function NoticeBoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [notice, setNotice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = user?.email === 'admin@eaglemath.com';
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = window.location.href;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!window.confirm('정말로 이 공지사항을 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'notices', id));
      navigate('/resources/notice');
    } catch (err) {
      console.error('삭제 오류:', err);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    // onSnapshot을 사용하여 캐시된 데이터를 즉각 활용 (로딩 속도 극대화)
    const docRef = doc(db, 'notices', id);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setNotice({ id: docSnap.id, ...docSnap.data() });
        setIsLoading(false);
      } else {
        alert('존재하지 않는 공지사항입니다.');
        navigate('/resources/notice');
      }
    }, (error) => {
      console.error('Error fetching notice:', error);
      setIsLoading(false);
    });

    // 조회수 증가는 백그라운드에서 별도로 실행
    updateDoc(docRef, {
      views: increment(1)
    }).catch(err => console.error("View increment error:", err));

    return () => unsubscribe();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#172554] animate-spin" />
      </div>
    );
  }

  if (!notice) return null;

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => navigate('/resources/notice')}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors font-bold text-sm"
          >
            <ChevronLeft size={18} />
            목록으로 돌아가기
          </button>
          {/* 관리자 수정/삭제 버튼 */}
          {isAdmin && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/resources/notice/${id}/edit`)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <Pencil size={14} />
                수정
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-red-500 border border-red-100 rounded-xl hover:bg-red-50 transition-colors"
              >
                <Trash2 size={14} />
                삭제
              </button>
            </div>
          )}
        </div>

        {/* Notice Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-100">
            {notice.pin && (
              <div className="flex items-center gap-2 mb-4">
                 <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-black rounded flex items-center gap-1 uppercase tracking-wider">
                   <Megaphone size={10} /> NOTICE
                 </span>
              </div>
            )}
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 leading-tight">
              {notice.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <User size={20} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{notice.author || '독수리수학'}</div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mt-0.5">
                    <span className="flex items-center gap-1"><Clock size={12} /> {notice.createdAt?.toDate ? notice.createdAt.toDate().toLocaleDateString('ko-KR') : '방금 전'}</span>
                    <span className="flex items-center gap-1"><Eye size={12} /> {notice.views || 0}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <button
                 onClick={handleShare}
                 className={`p-2 px-4 border rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2 ${
                   copied ? 'border-green-200 text-green-600 bg-green-50' : 'border-slate-200 text-slate-600'
                 }`}
               >
                 {copied ? <Check size={16} /> : <Share2 size={16} />}
                 <span>{copied ? '링크 복사됨!' : '공유'}</span>
               </button>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-lg whitespace-pre-wrap min-h-[400px]">
              {notice.content}
            </div>
          </div>

          <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-center text-slate-400 text-xs font-bold uppercase tracking-widest">
            Eaglemath Official Announcement
          </div>
        </div>
      </div>
    </div>
  );
}
