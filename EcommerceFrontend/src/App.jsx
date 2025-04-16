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
import store from './store.jsx'
import { loadUser } from './Actions/userAction.jsx';
import { useSelector } from 'react-redux';
import UserOptions from './Component/layout/Header/UserOptions.jsx'
function App() {
  const {isAuthenticated , user} = useSelector(state=>state.user);

  useEffect(() => {
    Webfont.load({
      google: {
        families: ['Roboto:400,700', 'Open Sans']
      }
    });
    store.dispatch(loadUser())
  }, []);

  return (
    <Router>
   
    
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
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
