import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
function App() {

  return (
    <>
      <BrowserRouter>
      
        <Routes>

          <Route path='/signup' element={<RegisterPage />} />
          <Route path='/signin' element={<LoginPage />} />


          <Route path='/' element={<HomePage />} />

          <Route path='/new/post' element={<CreatePost />} />

          <Route path='/edit/:postId' element={<EditPost />} />

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
