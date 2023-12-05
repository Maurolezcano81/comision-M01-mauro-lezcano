import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'

function App() {

  return (
    <>
      <BrowserRouter>
      
        <Routes>

          <Route path='/signup' element={<RegisterPage />} />

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
