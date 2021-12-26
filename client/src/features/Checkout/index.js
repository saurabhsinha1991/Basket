import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../component/Header';
import { editQty, selectCart, removeItem, selectSubTotal, selectPromoAmount, selectBasketTotal } from '../../reducer/globalSlice';
import styles from './checkout.module.css';

function Checkout() {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const subTotal = useSelector(selectSubTotal);
    const promoAmount = useSelector(selectPromoAmount);
    const basketTotal = useSelector(selectBasketTotal);
    
    const [promoText, setPromoText] = useState('');
    
    const _onChangeField = useCallback((e, item) => {
        dispatch(editQty({ ...item, qty: Number(e.target.value) }));
    }, [dispatch, editQty]);
    
    const _onRemove = useCallback((item) => {
        dispatch(removeItem(item));
    }, [dispatch, removeItem]);
    
    const _onApply = useCallback(() => {
        debugger;
    }, [promoText]);
    
    return (
        <>
            <Header title='Basket / Checkout View' />
            <div className='container'>
                <div className={styles.checkoutHeader}>
                    <Link to='/' type="button" className='dark-button'>
                        <span>Continue Shopping</span>
                    </Link>
                    <button type="button" className='dark-button'>
                        <span>Basket</span>
                        <span>{cart.length}</span>
                    </button>
                </div>
                <div>
                    {cart.map((item) => (
                        <div className={styles.cartItem}>
                            <div className={styles.name}>{item.name}</div>
                            <input
                                type='number'
                                min='1'
                                className={styles.text}
                                value={item.qty}
                                onChange={(e) => _onChangeField(e, item)}
                            />
                            <div className={styles.price}>{Number(item.qty * item.price).toFixed(2)}</div>
                            <button
                                type='button'
                                className={styles.cta}
                                onClick={() => _onRemove(item)}
                            >Remove</button>
                        </div>
                    ))}
                </div>
                <div className={styles.promoContainer}>
                    <div className={styles.labelPromo}>Enter Promo Code</div>
                    <input
                        type='text'
                        className={styles.promoText}
                        value={promoText}
                        onChange={(e) => setPromoText(e.target.value)}
                    />
                    <button
                        type='button'
                        className={styles.cta}
                        onClick={_onApply}
                    >Apply</button>
                </div>
                <div className={styles.summaryContainer}>
                    <div className={styles.summary}>
                        <div className={styles.label}>SubTotal</div>
                        <div className={styles.value}>{subTotal}</div>
                    </div>
                    <div className={styles.summary}>
                        <div className={styles.label}>Promotional discount amount</div>
                        <div className={styles.value}>{promoAmount}</div>
                    </div>
                    <div className={styles.summary}>
                        <div className={styles.label}>Basket Total</div>
                        <div className={styles.value}>{basketTotal}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;