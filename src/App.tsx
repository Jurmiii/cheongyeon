import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ClassIntroductionPage from './pages/Class/ClassIntroductionPage'
import ComponentPreview from './pages/ComponentPreview'
import MainPage from './pages/MainPage'
import ReservationPage from './pages/Reservation/ReservationPage'
import NoticeDetailPage from './pages/Notice/NoticeDetailPage'
import NoticePage from './pages/Notice/NoticePage'
import LoginPage from './pages/Login/LoginPage'
import BrandStoryPage from './pages/BrandStory/BrandStoryPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/preview" element={<ComponentPreview />} />
          <Route path="/class/introduction" element={<ClassIntroductionPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/event/notice" element={<NoticePage />} />
          <Route path="/event/notice/:noticeId" element={<NoticeDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/preview" replace />} />
          <Route path="/brandstory" element={<BrandStoryPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
