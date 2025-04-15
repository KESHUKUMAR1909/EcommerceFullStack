import React, { useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../Actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import MetaData from '../layout/MetaData.jsx'
const categories = [
    "Laptop",
    "Footwear",
    "Buttom", "tops", "Attire", "SmartPhones"
]
const Products = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams(); // ✅ grab keyword from URL

    const [price, setPrice] = useState([0, 25000]);
    // console.log(keyword);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("")
    const [ratings , setRatings] = useState(0);
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProduct(keyword, currentPage, price, category , ratings));
    }, [dispatch, keyword, currentPage, price, category,ratings]);
    let count = filteredProductsCount;
    console.log(filteredProductsCount)

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData  title="PRODUCTS------ECOMMERCE"
                    />
                    <h2 className="productsHeading">Products</h2>
                    <div className="products">
                        {products &&
                            products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>
                    <div className='filterBox'>
                        <Typography>Price</Typography>
                        <Slider value={price} onChange={priceHandler} valueLabelDisplay='auto' aria-label='range-slider' min={0} max={25000} />
                        <Typography>Categories</Typography>
                        <ul className='categoryBox'>
                            {categories.map((category) => (
                                <li
                                    className='category-link'
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>

                            ))}
                           
                        </ul>

                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating)=>{
                                    setRatings(newRating);
                                }}
                                aria-labelledby='continuous-slider'
                                min={0}
                                max={5}
                                valueLabelDisplay='auto'
                            />
                        </fieldset>
                    </div>


                    {resultPerPage < productsCount && (

                        <div className='paginationBox'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText='Next'
                                prevPageText='Prev'
                                firstPageText='1st'
                                lastPageText='Last'
                                itemClass='page-item'
                                linkClass='page-link'
                                activeClass='pageItemActive'
                                activeLinkClass='pageLinkActive'
                            />
                        </div>
                    )}


                </>
            )}
        </>
    );
};

export default Products;
