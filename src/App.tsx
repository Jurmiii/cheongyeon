import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ComponentPreview from './pages/MainPage'
import MainPage from './pages/MainPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/preview" element={<ComponentPreview />} />
        <Route path="*" element={<Navigate to="/preview" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
