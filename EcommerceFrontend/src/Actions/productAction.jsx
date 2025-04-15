import axios from 'axios';
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST
} from '../Constants/productConstant';

// 📦 Get All Products
export const getProduct = (keyword="" , currentPage=1 , price=[0,25000] , category , ratings=0) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    let link;
    if(category){
    link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&catgory=${category}&ratings[gte]=${ratings}`;
    }else{
      link= `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
    }
    const { data } = await axios.get(link);
    // console.log('All Products:', data);

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data, 
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// 📦 Get Single Product Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/products/${id}`);
    // console.log('Product Details:', data.product);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product, 
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL, // ✅ Fixed error type here
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ❌ Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
