import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ChevronLeft, Loader2, Save } from 'lucide-react';

export default function FreeBoardEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('수다');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'freeBoardPosts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        // 본인 글이 아니면 돌아가기
        if (data.authorEmail !== user?.email) {
          alert('수정 권한이 없습니다.');
          navigate(`/resources/free-board/${id}`);
          return;
        }
        setTitle(data.title || '');
        setCategory(data.category || '수다');
        setContent(data.content || '');
      } else {
        alert('존재하지 않는 게시글입니다.');
        navigate('/resources/free-board');
      }
      setIsLoading(false);
    };
    if (user) fetchPost();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateDoc(doc(db, 'freeBoardPosts', id), {
        title,
        category,
        content,
        updatedAt: serverTimestamp()
      });
      navigate(`/resources/free-board/${id}`);
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
            onClick={() => navigate(`/resources/free-board/${id}`)}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors font-bold text-sm"
          >
            <ChevronLeft size={18} />
            돌아가기
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50">
            <h1 className="text-2xl font-black text-slate-900 mb-1">글 수정</h1>
            <p className="text-slate-500 font-medium text-sm">내용을 수정한 후 저장하세요.</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Category */}
            <div className="flex gap-4">
              {['수다', '질문', '정보'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all border ${
                    category === cat
                      ? 'bg-[#172554] text-white border-[#172554] shadow-md'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Title */}
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xl font-bold text-slate-800 border-0 border-b-2 border-slate-100 py-3 focus:ring-0 focus:border-[#172554] outline-none transition-all placeholder:text-slate-300"
              placeholder="제목을 입력하세요"
            />

            {/* Content */}
            <textarea
              required
              rows="12"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-base text-slate-600 border-none focus:ring-0 outline-none transition-all placeholder:text-slate-300 resize-none px-0"
              placeholder="내용을 입력하세요..."
            />
          </div>

          <div className="px-8 py-6 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-end border-t border-slate-100">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => navigate(`/resources/free-board/${id}`)}
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
