import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc, increment, collection, addDoc, serverTimestamp, query, orderBy, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { ChevronLeft, User, Clock, Eye, MessageSquare, Share2, ThumbsUp, Send, Loader2, Pencil, Trash2, Check } from 'lucide-react';

export default function FreeBoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    // 1. 게시글 실시간 정보 가져오기
    const docRef = doc(db, 'freeBoardPosts', id);
    const unsubscribePost = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
        setIsLoading(false);
      } else {
        alert('존재하지 않는 게시글입니다.');
        navigate('/resources/free-board');
      }
    });

    // 2. 댓글 목록 실시간 정보 가져오기
    const commentsQuery = query(
      collection(db, 'freeBoardPosts', id, 'comments'),
      orderBy('createdAt', 'desc')
    );
    const unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toLocaleString('ko-KR') : '방금 전'
      }));
      setComments(fetchedComments);
    });

    // 조회수 증가 (백그라운드)
    updateDoc(docRef, {
      views: increment(1)
    }).catch(err => console.error("View increment error:", err));

    return () => {
      unsubscribePost();
      unsubscribeComments();
    };
  }, [id, navigate]);

  const isAuthor = user && post && user.email === post.authorEmail;
  // 좋아요: likes 필드는 유저 이메일 배열
  const likedByMe = user && Array.isArray(post?.likes) && post.likes.includes(user.email);
  const likeCount = Array.isArray(post?.likes) ? post.likes.length : (post?.likes || 0);
  const [copied, setCopied] = useState(false);

  const handleLike = async () => {
    if (!user) {
      alert('로그인 후 좋아요를 누를 수 있습니다.');
      navigate('/login');
      return;
    }
    const postRef = doc(db, 'freeBoardPosts', id);
    if (likedByMe) {
      await updateDoc(postRef, { likes: arrayRemove(user.email) });
    } else {
      await updateDoc(postRef, { likes: arrayUnion(user.email) });
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
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
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'freeBoardPosts', id));
      navigate('/resources/free-board');
    } catch (err) {
      console.error('삭제 오류:', err);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      const postRef = doc(db, 'freeBoardPosts', id);
      const commentsRef = collection(postRef, 'comments');

      // UI 즉각 반응 (입력필드 초기화 및 로딩 제거)
      const currentComment = newComment; 
      setNewComment('');
      setIsSubmittingComment(false);

      // 백그라운드에서 문서 추가
      addDoc(commentsRef, {
        content: currentComment,
        author: user.email.split('@')[0],
        authorEmail: user.email,
        createdAt: serverTimestamp()
      });

      // 게시글의 댓글수 업데이트 (백그라운드)
      updateDoc(postRef, {
        comments: increment(1)
      });
    } catch (err) {
      console.error("Error adding comment:", err);
      alert('댓글 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#172554] animate-spin" />
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => navigate('/resources/free-board')}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors font-bold text-sm"
          >
            <ChevronLeft size={18} />
            목록으로 돌아가기
          </button>
          {/* 수정/삭제 버튼 - 본인 글만 표시 */}
          {isAuthor && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/resources/free-board/${id}/edit`)}
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

        {/* Article Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-8">
          <div className="p-8 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                post.category === '질문' ? 'bg-amber-100 text-amber-700' : 
                post.category === '정보' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {post.category}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <User size={20} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{post.author}</div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mt-0.5">
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('ko-KR') : '방금 전'}</span>
                    <span className="flex items-center gap-1"><Eye size={12} /> {post.views}</span>
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
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-lg whitespace-pre-wrap min-h-[300px]">
              {post.content}
            </div>
          </div>

          <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 font-bold text-sm transition-all active:scale-95 ${
                    likedByMe
                      ? 'text-blue-600'
                      : 'text-slate-500 hover:text-blue-600'
                  }`}
                >
                  <ThumbsUp size={18} className={likedByMe ? 'fill-blue-500 text-blue-500' : ''} />
                  좋아요 {likeCount}
                </button>
                <button className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                  <MessageSquare size={18} />
                  댓글 {post.comments || 0}
                </button>
             </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
          <h3 className="text-lg font-black text-slate-900 mb-6">댓글 {comments.length}</h3>
          
          {/* Comment Form */}
          <div className="mb-10">
            <div className="relative">
              <textarea 
                placeholder={user ? "댓글을 남겨보세요..." : "로그인 후 댓글을 남길 수 있습니다."}
                disabled={!user}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm resize-none mb-4 min-h-[100px]"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <div className="flex justify-end">
                <button 
                  onClick={handleAddComment}
                  disabled={isSubmittingComment || !user}
                  className="flex items-center gap-2 px-8 py-3 bg-[#172554] text-white rounded-xl font-bold hover:bg-black transition-all shadow-md text-sm active:scale-95 disabled:opacity-50"
                >
                  {isSubmittingComment ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  <span>댓글 등록</span>
                </button>
              </div>
            </div>
          </div>

          {/* Comment List */}
          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex-shrink-0 flex items-center justify-center text-slate-400">
                    <User size={20} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-sm">{comment.author}</span>
                      <span className="text-[11px] text-slate-400 font-medium">{comment.date}</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center">
                <p className="text-slate-400 text-sm font-medium">아직 댓글이 없습니다. 첫 댓글을 남겨주세요!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
