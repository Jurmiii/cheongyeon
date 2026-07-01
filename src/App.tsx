import { useEffect, useLayoutEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ClassIntroductionPage from './pages/Class/ClassIntroductionPage'
import SeasonClassPage from './pages/Class/SeasonClassPage'
import ComponentPreview from './pages/ComponentPreview'
import MainPage from './pages/MainPage'
import ReservationPageRoute from './pages/Reservation/ReservationPageRoute'
import NoticePage from './pages/Notice/NoticePage'
import FaqPage from './pages/Faq/FaqPage'
import EventPage from './pages/Event/EventPage'
import LoginPage from './pages/Login/LoginPage'
import SignupPage from './pages/Signup/SignupPage'
import ReservationEditPage from './pages/ReservationEdit/ReservationEditPage'
import StampPage from './pages/Stamp/StampPage'
import ContactPage from './pages/Contact/ContactPage'
import BrandStoryPage from './pages/BrandStory/BrandStoryPage'
import SpacePage from './pages/Space/SpacePage'
import LocationPage from './pages/Location'
import SeasonTeaPage from './pages/SeasonTea/SeasonTeaPage'
import CollectionPage from './pages/Collection/CollectionPage'
import TeaStoryPage from './pages/TeaStore/TeaStorePage'
import MyPageRoute from './pages/MyPage/MyPageRoute'

function RouteScrollReset() {
  const { key, pathname, search, hash } = useLocation()

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration

    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useLayoutEffect(() => {
    if (hash) {
      return
    }

    const previousScrollBehavior = document.documentElement.style.scrollBehavior

    document.documentElement.style.scrollBehavior = 'auto'
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    const restoreScrollBehaviorFrame = window.requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = previousScrollBehavior
    })

    return () => {
      window.cancelAnimationFrame(restoreScrollBehaviorFrame)
      document.documentElement.style.scrollBehavior = previousScrollBehavior
    }
  }, [key, pathname, search, hash])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteScrollReset />
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
          <Route path="/reservation" element={<ReservationPageRoute />} />
          <Route path="/reservation/apply" element={<ReservationPageRoute />} />
          <Route path="/reservation/edit" element={<ReservationEditPage />} />
          <Route path="/reservation-edit" element={<ReservationEditPage />} />
          <Route path="/reservation/notice" element={<NoticePage />} />
          <Route path="/reservation/notice/:noticeId" element={<Navigate to="/reservation/notice" replace />} />
          <Route path="/reservation/faq" element={<FaqPage />} />
          <Route path="/stamp" element={<StampPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mypage/stamp" element={<StampPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/event/ongoing" element={<EventPage />} />
          <Route path="/event/notice" element={<NoticePage />} />
          <Route path="/event/notice/:noticeId" element={<Navigate to="/event/notice" replace />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/notice/:noticeId" element={<Navigate to="/notice" replace />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/event/faq" element={<FaqPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/seasontea" element={<SeasonTeaPage />} />
          <Route path="/season-tea" element={<SeasonTeaPage />} />
          <Route path="/product/season-tea" element={<SeasonTeaPage />} />
          <Route path="/shop" element={<CollectionPage />} />
          <Route path="/shop/tea-story" element={<Navigate to="/product/tea-story" replace />} />
          <Route path="/product/tea-story" element={<TeaStoryPage />} />
          <Route path="/tea-story" element={<Navigate to="/product/tea-story" replace />} />
          <Route path="/tea-store" element={<Navigate to="/product/tea-story" replace />} />
          <Route path="/dev/tea-story" element={<Navigate to="/product/tea-story" replace />} />
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
