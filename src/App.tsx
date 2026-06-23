import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ClassIntroductionPage from './pages/Class/ClassIntroductionPage'
import ComponentPreview from './pages/ComponentPreview'
import MainPage from './pages/MainPage'
import ReservationPage from './pages/Reservation/ReservationPage'
import NoticeDetailPage from './pages/Notice/NoticeDetailPage'
import NoticePage from './pages/Notice/NoticePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/preview" element={<ComponentPreview />} />
        <Route path="/class/introduction" element={<ClassIntroductionPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/event/notice" element={<NoticePage />} />
        <Route path="/event/notice/:noticeId" element={<NoticeDetailPage />} />
        <Route path="*" element={<Navigate to="/preview" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
