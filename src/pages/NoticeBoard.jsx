import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, query, onSnapshot, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Search, Megaphone, Clock, User, Eye, ChevronLeft, ChevronRight, PenSquare, Loader2 } from 'lucide-react';

export default function NoticeBoard() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const isAdmin = user?.email === 'admin@eaglemath.com';

  const processSnapshot = (docs) => {
    const fetchedNotices = docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        rawDate: data.createdAt?.toDate?.() || new Date(),
        date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString('ko-KR') : '방금 전'
      };
    });
    return [...fetchedNotices].sort((a, b) => {
      if (a.pin !== b.pin) return b.pin ? 1 : -1;
      return b.rawDate - a.rawDate;
    });
  };

  useEffect(() => {
    const q = query(collection(db, 'notices'));

    // 1단계: 캐시에서 즉시 로드 (체감 속도 향상)
    getDocs(q).then((snapshot) => {
      if (!snapshot.empty) {
        setNotices(processSnapshot(snapshot.docs));
        setIsLoading(false);
      }
    }).catch(() => {});

    // 2단계: 실시간 업데이트 구독 (서버 최신 데이터 반영)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotices(processSnapshot(snapshot.docs));
      setIsLoading(false);
    }, (error) => {
      console.error("공지사항을 불러오는 중 에러 발생:", error);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredNotices = notices.filter(notice => 
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-900 mb-2">공지사항</h1>
            <p className="text-slate-500 font-medium font-outfit">독수리수학의 새로운 소식과 주요 공지를 확인하세요.</p>
          </div>
          {isAdmin && (
            <Link 
              to="/resources/notice/write"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#172554] text-white rounded-xl font-bold hover:bg-black transition-all shadow-md active:scale-95 self-center md:self-end"
            >
              <PenSquare size={18} />
              <span>공지 등록</span>
            </Link>
          )}
        </div>

        {/* Search Section */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex justify-start">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="제목 검색" 
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Notice List */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden min-h-[400px]">
          <div className="hidden md:grid grid-cols-[80px_1fr_120px_120px_100px] gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/50 text-sm font-bold text-slate-500 text-center">
            <div>번호</div>
            <div className="text-left">제목</div>
            <div>작성자</div>
            <div>날짜</div>
            <div>조회수</div>
          </div>

          <div className="divide-y divide-slate-50">
            {isLoading ? (
               <div className="flex flex-col items-center justify-center py-20">
                 <Loader2 className="w-10 h-10 text-[#172554] animate-spin mb-4" />
                 <p className="text-slate-500 font-bold">공지 로딩 중...</p>
               </div>
            ) : filteredNotices.length > 0 ? (
              filteredNotices.map((notice, index) => (
              <Link 
                key={notice.id} 
                to={`/resources/notice/${notice.id}`}
                className={`grid grid-cols-1 md:grid-cols-[80px_1fr_120px_120px_100px] gap-4 px-6 py-5 hover:bg-slate-50/60 transition-colors cursor-pointer group ${notice.pin ? 'bg-blue-50/20' : ''}`}
              >
                {/* Mobile: Pin Badge & Date */}
                <div className="md:hidden flex justify-between items-center mb-1">
                  {notice.pin ? (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-black rounded flex items-center gap-1 uppercase tracking-wider">
                      <Megaphone size={10} /> NOTICE
                    </span>
                  ) : <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{filteredNotices.length - index}</span>}
                  <span className="text-[11px] text-slate-400 font-medium">{notice.date}</span>
                </div>

                <div className="hidden md:flex items-center justify-center text-sm font-medium">
                  {notice.pin ? (
                    <Megaphone className="text-amber-500" size={18} />
                  ) : (
                    <span className="text-slate-400">{filteredNotices.length - index}</span>
                  )}
                </div>
                
                <div className="flex flex-col justify-center">
                  <h3 className={`text-slate-800 font-bold group-hover:text-[#172554] transition-colors line-clamp-1 ${notice.pin ? 'text-blue-900' : ''}`}>
                    {notice.title}
                  </h3>
                  {/* Mobile Info */}
                  <div className="md:hidden flex items-center gap-3 mt-2 text-xs text-slate-400 font-medium">
                    <span>{notice.author || '독수리수학'}</span>
                    <span>조회 {notice.views || 0}</span>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center text-sm text-slate-600 font-bold">
                  {notice.author || '독수리수학'}
                </div>

                <div className="hidden md:flex items-center justify-center text-sm text-slate-400 font-medium">
                  {notice.date}
                </div>

                <div className="hidden md:flex items-center justify-center text-sm text-slate-400 font-medium">
                  {notice.views || 0}
                </div>
              </Link>
            ))
            ) : (
              <div className="py-20 text-center bg-white">
                <p className="text-slate-400 font-medium font-outfit">등록된 공지사항이 없습니다.</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center mt-10 space-x-2">
            <button className="w-10 h-10 rounded-lg text-sm font-bold bg-[#172554] text-white shadow-md">1</button>
        </div>
      </div>
    </div>
  );
}
