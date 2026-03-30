import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth, storage } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ChevronLeft, Loader2, Megaphone, CheckCircle2, Save, Image as ImageIcon, Loader } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function NoticeBoardWrite() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  // Custom Image Handler for Quill
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        setIsImageUploading(true);
        const storageRef = ref(storage, `notices/${Date.now()}_${file.name}`);
        try {
          const snapshot = await uploadBytes(storageRef, file);
          const url = await getDownloadURL(snapshot.ref);
          
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          const index = range ? range.index : quill.getLength();
          
          quill.insertEmbed(index, 'image', url);
          quill.setSelection(index + 1); // Move cursor after image
        } catch (error) {
          console.error('Image upload failed:', error);
          alert('이미지 업로드에 실패했습니다. (저장소 권한 확인 필요)');
        } finally {
          setIsImageUploading(false);
        }
      }
    };
  }, []);

  // Quill Modules Configuration
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [imageHandler]);

  const formats = [
    'header', 'font', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'align', 'list', 'bullet', 'link', 'image'
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
       <Loader2 className="w-10 h-10 text-[#172554] animate-spin" />
    </div>
  );

  // Check if admin
  if (!user || user.email !== 'admin@eaglemath.com') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
           <div className="text-center px-4">
             <h1 className="text-3xl font-black text-slate-900 mb-4">접근 불가</h1>
             <p className="text-slate-500 font-medium mb-8">죄송합니다. 관리자 권한이 있는 계정으로 로그인해주세요.</p>
             <div className="flex flex-col gap-3">
               <button onClick={() => navigate('/login')} className="px-8 py-3 bg-[#172554] text-white rounded-xl font-bold">로그인하러 가기</button>
               <button onClick={() => navigate('/')} className="px-8 py-3 bg-white text-slate-500 border border-slate-200 rounded-xl font-bold">홈으로</button>
             </div>
           </div>
        </div>
      );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content || content.trim() === '' || content === '<p><br></p>') {
        alert('내용을 입력해주세요.');
        return;
    }
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
        <div className="mb-6 flex justify-between items-center">
          <button 
            onClick={() => navigate('/resources/notice')}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors font-bold text-sm"
          >
            <ChevronLeft size={18} />
            목록으로 돌아가기
          </button>
          
          {isImageUploading && (
            <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full text-xs font-bold animate-pulse border border-blue-100">
               <Loader size={12} className="animate-spin" />
               이미지 업로드 중...
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden outline-none">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-slate-900 mb-1 leading-none">신규 공지사항 작성</h1>
              <p className="text-slate-500 font-medium text-sm mt-2 font-outfit">독수리 교육 그룹 최신 소식을 작성합니다.</p>
            </div>
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
                className="w-full text-xl font-bold text-slate-800 border-0 border-b-2 border-slate-100 py-3 focus:outline-none focus:border-[#172554] transition-all placeholder:text-slate-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="quill-editor-container">
              <ReactQuill 
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder="공지 내용을 입력하세요..."
                className="h-[500px] mb-12"
              />
            </div>
          </div>

          <div className="px-8 py-6 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between border-t border-slate-100 mt-4 md:mt-0">
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
                 disabled={isSubmitting || isImageUploading}
                 className="flex-1 md:flex-none px-10 py-3 bg-[#172554] text-white rounded-xl font-bold hover:bg-black transition-all shadow-md text-sm active:scale-95 flex items-center gap-2"
               >
                 {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                 공지 등록
               </button>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .quill-editor-container .ql-container {
          font-family: 'Noto Sans KR', sans-serif;
          font-size: 16px;
          border-bottom-left-radius: 1rem;
          border-bottom-right-radius: 1rem;
        }
        .quill-editor-container .ql-toolbar {
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
          background: #f8fafc;
          border-color: #f1f5f9;
        }
        .quill-editor-container .ql-editor {
          min-height: 400px;
        }
        .quill-editor-container .ql-editor.ql-blank::before {
          color: #cbd5e1;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}
