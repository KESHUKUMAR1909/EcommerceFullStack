import './App.css'
import Header from './Component/layout/Header/Header'
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Webfont from 'webfontloader';
import Footer from './Component/layout/Footer/Footer';
import Home from './Component/Home/Home';
import ProductDetails from './Component/Product/ProductDetails';
import Products from './Component/Product/Products.jsx'
import Search from './Component/Product/Search.jsx'
import LoginSignUp from './Component/User/LoginSignUp.jsx';
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
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/products' element={<Products />}/>
        <Route path='/products/:keyword' element={<Products />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/login' element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
