import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Resources from './pages/Resources';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AcademyIntro from './pages/AcademyIntro';
import Branches from './pages/Branches';
import ResultsArchive from './pages/ResultsArchive';
import ResultsDetail from './pages/ResultsDetail';
import Counseling from './pages/Counseling';
import Elementary from './pages/Elementary';
import Middle from './pages/Middle';
import Hwangso from './pages/Hwangso';
import KMA from './pages/KMA';
import CollegePrep from './pages/CollegePrep';
import Programs from './pages/Programs';
import Admission from './pages/Admission';
import CounselingLogs from './pages/CounselingLogs';
import ExamAnalysis from './pages/ExamAnalysis';
import Recruitment from './pages/Recruitment';
import FreeBoard from './pages/FreeBoard';
import NoticeBoard from './pages/NoticeBoard';
import NoticeBoardWrite from './pages/NoticeBoardWrite';
import NoticeBoardDetail from './pages/NoticeBoardDetail';
import NoticeBoardEdit from './pages/NoticeBoardEdit';
import FreeBoardWrite from './pages/FreeBoardWrite';
import FreeBoardDetail from './pages/FreeBoardDetail';
import FreeBoardEdit from './pages/FreeBoardEdit';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

// Firebase Auth 기반 ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = useState({ checked: false, user: null });
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState({ checked: true, user });
      if (user) {
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        localStorage.removeItem('isAuthenticated');
      }
    });
    return () => unsubscribe();
  }, []);

  if (!authState.checked) {
    // Firebase 인증 상태 확인 중: 깜빡임 방지를 위해 빈 화면 표시
    return <div className="min-h-screen bg-slate-50" />;
  }

  if (!authState.user) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  return children;
};

// 관리자 전용 Route
const AdminRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  if (loading) return null;
  if (!user || user.email !== 'admin@eaglemath.com') {
    alert('관리자 권한이 필요합니다.');
    return <Navigate to="/" replace />;
  }
  return children;
};

// Placeholder for other pages to prevent 404s during demo
const PagePlaceholder = ({ title }) => (
  <div className="max-w-7xl mx-auto px-4 py-20">
    <h1 className="text-4xl font-bold text-slate-900 mb-6">{title}</h1>
    <p className="text-lg text-slate-600">준비 중인 페이지입니다.</p>
  </div>
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* About Routes */}
          <Route path="about" element={<PagePlaceholder title="독수리수학 소개" />} />
          <Route path="about/intro" element={<AcademyIntro />} />
          <Route path="about/branches" element={<Branches />} />
          <Route path="about/results" element={<ResultsArchive />} />
          <Route path="about/results/:id" element={<ResultsDetail />} />

          {/* Elem/Middle Routes */}
          <Route path="elementary-middle" element={<PagePlaceholder title="초/중등부" />} />
          <Route path="elementary" element={<Elementary />} />
          <Route path="elementary/hwangso" element={<Hwangso />} />
          <Route path="middle" element={<Middle />} />
          <Route path="kma" element={<KMA />} />

          {/* High School Routes */}
          <Route path="high-school" element={<PagePlaceholder title="고등부" />} />
          <Route path="high-school/2028-admission" element={<CollegePrep />} />
          <Route path="high-school/programs" element={<Programs />} />

          {/* Resources Routes */}
          <Route path="resources" element={<PagePlaceholder title="학습자료" />} />
          <Route path="resources/board" element={<PagePlaceholder title="게시판" />} />
          <Route path="resources/notice" element={<NoticeBoard />} />
          <Route path="resources/notice/:id" element={<NoticeBoardDetail />} />
          <Route path="resources/notice/:id/edit" element={
            <AdminRoute>
              <NoticeBoardEdit />
            </AdminRoute>
          } />
          <Route path="resources/notice/write" element={
            <AdminRoute>
              <NoticeBoardWrite />
            </AdminRoute>
          } />
          <Route path="resources/free-board" element={<FreeBoard />} />
          <Route path="resources/free-board/:id" element={<FreeBoardDetail />} />
          <Route path="resources/free-board/:id/edit" element={
            <ProtectedRoute>
              <FreeBoardEdit />
            </ProtectedRoute>
          } />
          <Route path="resources/free-board/write" element={
            <ProtectedRoute>
              <FreeBoardWrite />
            </ProtectedRoute>
          } />
          <Route path="resources/counseling-logs" element={<CounselingLogs />} />
          <Route path="resources/exam-analysis" element={<ExamAnalysis />} />
          <Route path="resources/materials" element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          } />

          {/* Contact Routes */}
          <Route path="contact" element={<PagePlaceholder title="예약 & 문의" />} />
          <Route path="contact/admission" element={<Admission />} />
          <Route path="contact/counseling" element={<Counseling />} />

          {/* Partnership Routes */}
          <Route path="partnership" element={<PagePlaceholder title="파트너제휴" />} />
          <Route path="partnership/recruitment" element={<Recruitment />} />

          {/* Legal Routes */}
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />

          {/* 404 */}
          <Route path="*" element={<PagePlaceholder title="페이지를 찾을 수 없습니다" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
