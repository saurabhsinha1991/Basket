import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ProductTile from '../../component/ProductTile';
import { fetchProductsAsync, selectProduct, selectCart, addToCart } from './productSlice'

function Product() {
    const dispatch = useDispatch();
    const products = useSelector(selectProduct);
    const cart = useSelector(selectCart);

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, []);
    
    const _addToBasket = useCallback((item) => {
        dispatch(addToCart({ payload: item }))
    }, [dispatch]);

    return (
        <>
            <div className='page-header'>
                <h1>Product List View</h1>
            </div>
            <div className='basket'>{cart.length}</div>
            {products.map((item) => (
                <ProductTile
                    item={item}
                    addToBasket={_addToBasket}
                />
            ))}
        </>
    )
}

export default Product;
