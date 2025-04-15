import React, { useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import './Home.css';
import ProductCard from './ProductCard.jsx';
import MetaData from '../layout/MetaData.jsx';
import {getProduct} from '../../Actions/productAction.jsx'
import {useSelector , useDispatch} from 'react-redux';
import Loader from '../layout/Loader/Loader.jsx';
import { useAlert } from 'react-alert';
const Home = () => {
  // const alert = useAlert();
  const dispatch = useDispatch();

  const {loading , products , error , productsCount} = useSelector(state=>state.products);
  useEffect(()=>{
    // if(error){
    //   return alert.error(error);
    // }
    dispatch(getProduct());

  } , [dispatch ]);
  return (
  <>
  {loading? <Loader />:  <>
    <MetaData title='ECOMMERCE' />
      <div className='banner'>
        <p>Welcome to Ecommerce</p>
        <h1>Find Amazing products Below</h1>

        <a href='#container'>
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>


      <h2 className='homeHeading'>Featured Products</h2>

      <div className='container' id='container'>
        {products && products.map(product=>(
          <ProductCard key={product._id} product={product} />
        ))}
       </div>
    </>}
  </>
  );
};

export default Home;
