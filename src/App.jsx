import { Routes, Route } from 'react-router-dom'
import PaletaPreview from './componetes/PaletaPreview'
import Index from './pages/Externas/LagingPage/Index'
import Ubicaciones from './pages/Externas/Ubicaciones/Ubicaciones'
import CalendarView from './pages/Externas/Calendario/CalendarView'
import Login from './pages/Internas/Login/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/paletas" element={<PaletaPreview />} />
      <Route path="/ubicaciones" element={<Ubicaciones />} />
      <Route path="/calendario" element={<CalendarView />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
