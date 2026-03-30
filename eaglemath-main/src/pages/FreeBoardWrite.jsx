import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { X, Save, Image, Paperclip, ChevronLeft, Loader2 } from 'lucide-react';

export default function FreeBoardWrite() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('수다');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
    }

    setIsSubmitting(true);
    try {
        await addDoc(collection(db, 'freeBoardPosts'), {
            title,
            category,
            content,
            author: auth.currentUser.email.split('@')[0], 
            authorEmail: auth.currentUser.email,
            views: 0,
            comments: 0,
            createdAt: serverTimestamp()
        });
        
        navigate('/resources/free-board');
    } catch (error) {
        console.error('Error adding document: ', error);
        alert('게시글 등록 중 오류가 발생했습니다.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation / Back Button */}
        <div className="mb-6">
          <button 
            onClick={() => navigate('/resources/free-board')}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors font-bold text-sm"
          >
            <ChevronLeft size={18} />
            목록으로 돌아가기
          </button>
        </div>

        {/* Write Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50">
            <h1 className="text-2xl font-black text-slate-900 mb-1">새 글 작성</h1>
            <p className="text-slate-500 font-medium font-outfit">독수리수학 가족들과 나누고 싶은 이야기를 적어주세요.</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Category Select */}
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

            {/* Title Input */}
            <div>
              <input 
                type="text" 
                placeholder="제목을 입력하세요" 
                required
                className="w-full text-xl font-bold text-slate-800 border-0 border-b-2 border-slate-100 py-3 focus:ring-0 focus:border-[#172554] outline-none transition-all placeholder:text-slate-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Content Input */}
            <div>
              <textarea 
                placeholder="내용을 입력하세요..." 
                required
                rows="12"
                className="w-full text-base text-slate-600 border-none focus:ring-0 outline-none transition-all placeholder:text-slate-300 resize-none px-0"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            {/* Attachments Section */}
            <div className="flex items-center gap-4 py-4 border-t border-slate-100">
               <button type="button" className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                 <Image size={18} className="text-slate-400" />
                 <span>이미지 첨부</span>
               </button>
               <button type="button" className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                 <Paperclip size={18} className="text-slate-400" />
                 <span>파일 첨부</span>
               </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-8 py-6 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between border-t border-slate-100">
            <span className="text-xs text-slate-400 font-medium italic">
               작성 중인 글은 임시 저장되지 않습니다. 신중히 작성해 주세요.
            </span>
            <div className="flex items-center gap-3 w-full md:w-auto">
               <button 
                 type="button"
                 onClick={() => navigate('/resources/free-board')}
                 className="flex-1 md:flex-none px-8 py-3 bg-white text-slate-500 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all text-sm"
               >
                 취소하기
               </button>
               <button 
                 type="submit"
                 disabled={isSubmitting}
                 className="flex-1 md:flex-none px-10 py-3 bg-[#172554] text-white rounded-xl font-bold hover:bg-black transition-all shadow-md text-sm active:scale-95 flex items-center gap-2"
               >
                 {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                 글쓰기
               </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
