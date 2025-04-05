import './App.css'
import Header from './Component/layout/Header/Header'
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Webfont from 'webfontloader';
import Footer from './Component/layout/Footer/Footer';
import Home from './Component/Home/Home'

function App() {
  useEffect(() => {
    Webfont.load({
      google: {
        families: ['Roboto:400,700', 'Open Sans']
      }
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
