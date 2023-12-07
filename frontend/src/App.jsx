import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
function App() {

  return (
    <>
      <BrowserRouter>
      
        <Routes>

          <Route path='/signup' element={<RegisterPage />} />
          <Route path='/signin' element={<LoginPage />} />


          <Route path='/' element={<HomePage />} />

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
