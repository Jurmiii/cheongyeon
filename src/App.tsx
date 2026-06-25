import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ClassIntroductionPage from './pages/Class/ClassIntroductionPage'
import SeasonClassPage from './pages/Class/SeasonClassPage'
import ComponentPreview from './pages/ComponentPreview'
import MainPage from './pages/MainPage'
import ReservationPage from './pages/Reservation/ReservationPage'
import NoticePage, { NoticeDetailPage } from './pages/Notice/NoticePage'
import EventPage from './pages/Event/EventPage'
import LoginPage from './pages/Login/LoginPage'
import SignupPage from './pages/Signup/SignupPage'
import ReservationEditPage from './pages/ReservationEdit/ReservationEditPage'
import StampPage from './pages/Stamp/StampPage'
import BrandStoryPage from './pages/BrandStory/BrandStoryPage'
import SpacePage from './pages/Space/SpacePage'
import LocationPage from './pages/Location'
import SeasonTeaPage from './pages/SeasonTea/SeasonTeaPage'
import CollectionPage from './pages/Collection/CollectionPage'
import MyPageRoute from './pages/MyPage/MyPageRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/preview" element={<ComponentPreview />} />
          <Route path="/components" element={<ComponentPreview />} />
          <Route path="/about" element={<BrandStoryPage />} />
          <Route path="/about/story" element={<BrandStoryPage />} />
          <Route path="/class/introduction" element={<ClassIntroductionPage />} />
          <Route path="/class" element={<ClassIntroductionPage />} />
          <Route path="/class/general" element={<ClassIntroductionPage />} />
          <Route path="/class/season" element={<SeasonClassPage />} />
          <Route path="/class/season-class" element={<SeasonClassPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/reservation/apply" element={<ReservationPage />} />
          <Route path="/reservation/edit" element={<ReservationEditPage />} />
          <Route path="/stamp" element={<StampPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/event/ongoing" element={<EventPage />} />
          <Route path="/event/notice" element={<NoticePage />} />
          <Route path="/event/notice/:noticeId" element={<NoticeDetailPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/notice/:noticeId" element={<NoticeDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/seasontea" element={<SeasonTeaPage />} />
          <Route path="/season-tea" element={<SeasonTeaPage />} />
          <Route path="/product/season-tea" element={<SeasonTeaPage />} />
          <Route path="/shop" element={<CollectionPage />} />
          <Route path="/shop/tea-story" element={<CollectionPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/product/collection" element={<CollectionPage />} />
          <Route path="/mypage" element={<MyPageRoute />} />
          <Route path="/my-page" element={<MyPageRoute />} />
          <Route path="/store" element={<LocationPage />} />
          <Route path="/brand/space" element={<SpacePage />} />
          <Route path="/space" element={<SpacePage />} />
          <Route path="/brandstory" element={<BrandStoryPage />} />
          <Route path="/brand/story" element={<BrandStoryPage />} />
          <Route path="/brand/location" element={<LocationPage />} />
          <Route path="/brand-story" element={<BrandStoryPage />} />
          <Route path="*" element={<Navigate to="/preview" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
