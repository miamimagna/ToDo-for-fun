import {Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './pages/Header';
import Content from './pages/Content';
import Footer from './pages/Footer';

function App() {
  const title = 'React';

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Content title={title}/>}>
        </Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
