import React from 'react';
import { useAppContext } from '../context/AppContext';


const ProductItem = ({ id, title, image, rating, price, imgStyle }) => {
    // const [isAdded, setIsAdded] = useState(false); // Local state to track if the product is added



    const { state, dispatch } = useAppContext();

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            payload: { id, title, image, rating, price, imgStyle },
        });
    };






    // const addProduct = () => {
    //     setIsAdded(true); // Update local state when product is added
    //     // Optionally, add functionality for cart
    // };

    return (
        <>
            <div className="product-item card p-3 shadow-sm d-flex justify-content-center flex-column align-items-center">
                <h4>{title}</h4>
                <strong>Rs. {price}</strong>
                <p>
                    {Array(rating).fill().map((_, i) => (
                        <span key={i}>⭐</span>
                    ))}
                </p>
                <div className="product-image d-flex justify-content-center align-items-center">
                    <img
                        src={image}
                        className="card-img-top img-fluid"
                        alt={title}
                        style={{ ...imgStyle, width: "250px", height: "250px"}} // Merge styles
                    />
                </div>
                <button
                    className='btn btn-warning mt-3'
                    onClick={addToBasket}
                    // onClick={addProduct}
                >
                    Add Product
                </button>
            </div>
        </>
    );
};

export default ProductItem;
