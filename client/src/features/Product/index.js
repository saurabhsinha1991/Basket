import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Header from '../../component/Header';
import ProductTile from '../../component/ProductTile';
import { selectCart, addToCart } from '../../reducer/globalSlice';
import { fetchProductsAsync, selectProduct } from './productSlice'

function Product() {
    const dispatch = useDispatch();
    const products = useSelector(selectProduct);
    const cart = useSelector(selectCart);

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, []);
    
    const _addToBasket = useCallback((item) => {
        dispatch(addToCart({ ...item, qty: 1 }))
    }, [dispatch]);

    return (
        <>
            <Header title='Product List View' />
            <div className='container'>
                <div className='right-align'>
                    <button type="button" className='dark-button'>
                        <span>Basket</span>
                        <span>{cart.length}</span>
                    </button>
                </div>
                <div className='product-container'>
                    {products.map((item) => (
                        <ProductTile
                            item={item}
                            addToBasket={_addToBasket}
                            isAdded={cart.filter(c => c.sku === item.sku).length > 0}
                        />
                    ))}
                </div>
                <div className='right-align'>
                    <Link disabled={cart.length === 0 ? 'disabled': ''} to='/checkout' type="button" className='dark-button'>
                        <span>Proceed To Checkout</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Product;
