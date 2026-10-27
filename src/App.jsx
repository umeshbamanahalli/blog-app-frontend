import 'bootstrap/dist/css/bootstrap.min.css';
import About from './pages/About';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import { ErrorBoundary } from 'react-error-boundary';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddPost from './components/AddPost';
import UserDashboard from './pages/UserDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostPage from './pages/PostPage';
import Categories from './pages/Categories';
import UpdatePost from './pages/UpdatePost';

function App() {
  return (
    // <ErrorBoundary FallbackComponent={ErrorPage} onReset={() => window.location.reload()}>
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        {/* 🌐 PUBLIC ROUTES (Accessible by everyone) */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path='/categories/:categoryId' element={<Categories />}/>

        {/* 🔒 PROTECTED ROUTES (Only accessible when logged in) */}
        <Route path="/user" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-blog" element={<AddPost />} />
          <Route path='update-blog/:postId' element={<UpdatePost />}/>
          {/* Add update route if needed */}
          {/* <Route path="update-blog/:postId" element={<UpdateBlog />} /> */}
        </Route>

        {/* 404 Catch-All Route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;