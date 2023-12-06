import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <>
      <BrowserRouter>
      
        <Routes>

          <Route path='/signup' element={<RegisterPage />} />
          <Route path='/signin' element={<LoginPage />} />

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
