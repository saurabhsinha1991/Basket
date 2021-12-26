import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../component/Header';
import { editQty, selectCart, removeItem, selectSubTotal, selectPromoAmount, selectBasketTotal, validatePromoAsync, selectPromoError, selectCardNumber, setCreditCard, checkoutAsync, selectCheckoutMsg } from '../../reducer/globalSlice';
import styles from './checkout.module.css';

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(selectCart);
    const subTotal = useSelector(selectSubTotal);
    const promoAmount = useSelector(selectPromoAmount);
    const basketTotal = useSelector(selectBasketTotal);
    const promoError = useSelector(selectPromoError);
    const cardNo = useSelector(selectCardNumber);
    const checkoutMsg = useSelector(selectCheckoutMsg);
    
    const [promoText, setPromoText] = useState('');
    
    useEffect(() => {
        if (checkoutMsg.length > 0) {
            navigate('/summary');
        }
    }, [checkoutMsg]);
    
    const _onChangeField = useCallback((e, item) => {
        dispatch(editQty({ ...item, qty: Number(e.target.value) }));
    }, [dispatch, editQty]);
    
    const _onRemove = useCallback((item) => {
        dispatch(removeItem(item));
    }, [dispatch, removeItem]);
    
    const _onApply = useCallback(() => {
        dispatch(validatePromoAsync(promoText));
    }, [promoText]);
    
    const _onCheckout = useCallback(() => {
        const data = {
            basket: cart.map(({ sku, qty }) => ({ sku, quantity: qty })),
            cardNumber: cardNo,
        };
        dispatch(checkoutAsync(data));
    }, [cart, cardNo]);

    
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
                    <div>
                        <input
                            type='text'
                            className={`${styles.promoText} ${promoError.length > 0 ? styles.error: ''}`}
                            value={promoText}
                            onChange={(e) => setPromoText(e.target.value)}
                        />
                        <span className={styles.errorText}>{promoError}</span>
                    </div>
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
                <div className={styles.promoContainer}>
                    <div className={styles.labelPromo}>Please Enter your card number</div>
                    <div>
                        <input
                            type='text'
                            className={`${styles.promoText}`}
                            value={cardNo}
                            onChange={(e) => dispatch(setCreditCard(e.target.value))}
                            type="number"
                        />
                    </div>
                </div>
                <div className={styles.textRight}>
                    <button
                        type='button'
                        className={styles.cta}
                        onClick={_onCheckout}
                    >Checkout</button>
                </div>
            </div>
        </>
    )
}

export default Checkout;