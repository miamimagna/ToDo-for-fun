import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Content from './pages/Content';
import Footer from './components/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';

function App() {
  const title = 'React';

  return (
    <>
      <Routes>
        <Route path="/signup" element={<><Header logged={false} signup={true}/><SignUp/></>} />
        <Route path="/login" element={<><Header logged={false} signup={false}/><Login/></>} />
        <Route path="/" element={
          <ProtectedRoute element={<><Header logged={true}/><Content title={title}/></>} />
        } />
        <Route
          path="/profile"
          element={
            <ProtectedRoute element={<><Header logged={true}/><Profile/></>} />
          }
        /> 
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
