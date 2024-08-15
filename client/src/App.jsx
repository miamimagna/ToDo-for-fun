import {Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Content from './pages/Content';
import Footer from './pages/Footer';

function App() {
  const title = 'React';

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Content title={title}/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
