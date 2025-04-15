import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST
  } from '../Constants/productConstant';
  
  const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case ALL_PRODUCT_REQUEST:
        return {
          loading: true,
          products: [],
        };
  
      case ALL_PRODUCT_SUCCESS:
        return {
          loading: false,
          products: action.payload.products,
          productsCount: action.payload.productsCount,
          resultPerPage:action.payload.resultPerPage,
          filteredProductsCount:action.payload.filteredProductsCount
        };
  
      case ALL_PRODUCT_FAIL:
        return {
          loading: false,
          error: action.payload,
          products: [],
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case PRODUCT_DETAILS_SUCCESS:
        return {
          loading: false,
          product: action.payload, // ✅ this sets the product
        };
  
      case PRODUCT_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,   // ✅ error comes from payload
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  
  export default productReducer;
  