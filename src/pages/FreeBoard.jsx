import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, query, limit, onSnapshot, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Search, PenSquare, MessageSquare, Eye, User, ChevronLeft, ChevronRight, Loader2, UserCheck } from 'lucide-react';

export default function FreeBoard() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('전체');
  const [showMyPosts, setShowMyPosts] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'freeBoardPosts'), limit(20));

    const process = (docs) => {
      const fetched = docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          rawDate: data.createdAt?.toDate?.() || new Date(),
          date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString('ko-KR') : '방금 전'
        };
      });
      return [...fetched].sort((a, b) => b.rawDate - a.rawDate);
    };

    // 1단계: 캐시에서 즉시 로드
    getDocs(q).then((snapshot) => {
      if (!snapshot.empty) {
        setPosts(process(snapshot.docs));
        setIsLoading(false);
      }
    }).catch(() => {});

    // 2단계: 실시간 업데이트
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(process(snapshot.docs));
      setIsLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === '전체' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.author || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMyPosts = !showMyPosts || (user && post.authorEmail === user.email);
    return matchesCategory && matchesSearch && matchesMyPosts;
  });

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">자유게시판</h1>
            <p className="text-slate-500 font-medium">독수리수학 가족들과 자유롭게 소통하는 공간입니다.</p>
          </div>
          <Link
            to="/resources/free-board/write"
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#172554] text-white rounded-xl font-bold hover:bg-black transition-all shadow-md active:scale-95"
          >
            <PenSquare size={18} />
            <span>글쓰기</span>
          </Link>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
            {/* 카테고리 탭 */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {['전체', '질문', '정보', '수다'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeCategory === cat ? 'bg-white text-[#172554] shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 내 글만 보기 버튼: 로그인 시에만 표시 */}
            {user && (
              <button
                onClick={() => setShowMyPosts(!showMyPosts)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                  showMyPosts
                    ? 'bg-[#172554] text-white border-[#172554] shadow-md'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700'
                }`}
              >
                <UserCheck size={16} />
                내 글만 보기
              </button>
            )}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="제목, 작성자로 검색"
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* 내 글만 보기 활성 배너 */}
        {showMyPosts && (
          <div className="mb-4 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2 text-blue-700 text-sm font-bold">
            <UserCheck size={16} />
            내가 작성한 글만 표시 중입니다.
            <button
              onClick={() => setShowMyPosts(false)}
              className="ml-auto text-blue-400 hover:text-blue-700 transition-colors text-xs font-bold underline"
            >
              전체 보기
            </button>
          </div>
        )}

        {/* Board List */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="hidden md:grid grid-cols-[80px_1fr_150px_120px_100px] gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/50 text-sm font-bold text-slate-500">
            <div className="text-center">번호</div>
            <div>제목</div>
            <div className="text-center">작성자</div>
            <div className="text-center">날짜</div>
            <div className="text-center">조회수</div>
          </div>

          <div className="divide-y divide-slate-50 min-h-[400px]">
            {isLoading ? (
               <div className="flex flex-col items-center justify-center py-20 bg-white">
                 <Loader2 className="w-10 h-10 text-[#172554] animate-spin mb-4" />
                 <p className="text-slate-500 font-bold">로딩 중...</p>
               </div>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/resources/free-board/${post.id}`}
                  className={`grid grid-cols-1 md:grid-cols-[80px_1fr_150px_120px_100px] gap-4 px-6 py-5 hover:bg-slate-50/80 transition-colors cursor-pointer group ${user && post.authorEmail === user.email ? 'bg-blue-50/30' : ''}`}
                >
                  {/* Mobile: Top Section */}
                  <div className="md:hidden flex justify-between items-center mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                      post.category === '질문' ? 'bg-amber-100 text-amber-700' :
                      post.category === '정보' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {post.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{post.date}</span>
                  </div>

                  <div className="hidden md:flex items-center justify-center text-sm text-slate-400 font-medium">
                    {filteredPosts.length - index}
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2">
                      <span className={`hidden md:inline px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                        post.category === '질문' ? 'bg-amber-100 text-amber-700' :
                        post.category === '정보' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {post.category}
                      </span>
                      <h3 className="text-slate-800 font-bold group-hover:text-blue-900 transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      {/* 내 글 배지 */}
                      {user && post.authorEmail === user.email && (
                        <span className="hidden md:inline text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">내 글</span>
                      )}
                      {post.comments > 0 && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-2 rounded-full">
                          <MessageSquare size={10} />
                          {post.comments}
                        </span>
                      )}
                    </div>
                    {/* Mobile: Author/Views */}
                    <div className="md:hidden flex items-center gap-3 mt-2 text-xs text-slate-400 font-medium">
                      <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                      <span className="flex items-center gap-1"><Eye size={12} /> {post.views}</span>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center justify-center text-sm text-slate-600 font-bold">
                    {post.author}
                  </div>

                  <div className="hidden md:flex items-center justify-center text-sm text-slate-400 font-medium">
                    {post.date}
                  </div>

                  <div className="hidden md:flex items-center justify-center text-sm text-slate-400 font-medium">
                    {post.views}
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-20 text-center bg-white w-full h-full">
                <p className="text-slate-400 font-medium">
                  {showMyPosts ? '내가 작성한 글이 없습니다.' : '등록된 게시글이 없습니다. 첫 번째 글의 주인공이 되어보세요!'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-10 space-x-2">
          <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-white hover:text-slate-800 transition-all">
            <ChevronLeft size={20} />
          </button>
          <button className="w-10 h-10 rounded-lg text-sm font-bold bg-[#172554] text-white shadow-md">1</button>
          <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-white hover:text-slate-800 transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
