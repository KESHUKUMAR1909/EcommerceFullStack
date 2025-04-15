import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../Actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import ReviewCard from './ReviewCard.jsx';
import Loader from '../layout/Loader/Loader.jsx'
// import Loader from '../Loader/Loader'; // Assuming you have a Loader component
import MetaData from '../layout/MetaData.jsx';
const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { product, loading, error } = useSelector((state) => state.productDetails);

    useEffect(() => {
        const loginAndFetchProduct = async () => {
            try {
                // Dummy login (for testing purpose only)
                await axios.post(
                    '/api/v1/login',
                    {
                        email: 'Keshukumar1909@gmail.com',
                        password: '12345678',
                    },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    }
                );

                console.log('✅ Logged in successfully');
                dispatch(getProductDetails(id));
            } catch (err) {
                console.error('❌ Login failed:', err.response?.data || err.message);
            }
        };

        loginAndFetchProduct();
    }, [dispatch, id]);

    const options = {
        edit: false,
        color: 'rgba(20,20,20,0.1)',
        activeColor: 'tomato',
        size: window.innerWidth < 600 ? 20 : 25,
        value: product?.ratings || 0,
        isHalf: true,
    };

    if (loading) return <Loader />; // or <Loader />

    if (error) return <div>Error: {error}</div>;

    return (
        <>
        <MetaData  title={`${product.name}----ECOMMERCE`}/>
            <div className="ProductDetails">
                <div className="carouselContainer">
                    <Carousel>
                        {product.images &&
                            product.images.map((item, i) => (
                                <img
                                    className="CarouselImage"
                                    key={i}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                            ))}
                    </Carousel>
                </div>

                <div className="productInfo">
                    <div className="detailsBlock-1">
                        <h2>{product?.name}</h2>
                        <p>Product # {product?._id}</p>
                    </div>

                    <div className="detailsBlock-2">
                        <ReactStars {...options} />
                        <span>({product?.numOfReviews || 0} Reviews)</span>
                    </div>

                    <div className="detailsBlock-3">
                        <h1>{` ₹${product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button>-</button>
                                <input value="1" type="number" />
                                <button>+</button>
                            </div>
                            <button>Add To Cart</button>
                        </div>
                        <p>
                            Status:{' '}
                            <b className={product.stock < 1 ? 'redColor' : 'greenColor'}>
                                {product.stock < 1 ? 'Out Of Stock' : 'In Stock'}
                            </b>
                        </p>
                    </div>

                    <div className="detailsBlock-4">
                        <p>Description: {product.description}</p>
                    </div>

                    <button className="submitReview">Submit Review</button>
                </div>
            </div>

            <h3 className="reviewsHeading">REVIEWS</h3>

            <div className="reviews">
                {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))
                ) : (
                    <p className="noReviews">No Reviews Yet</p>
                )}
            </div>
        </>
    );
};

export default ProductDetails;
