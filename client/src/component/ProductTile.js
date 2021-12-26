import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductTile.module.css';

function ProductTile({ item, addToBasket }) {
    const { name, price, description } = item;
    return (
        <div className={styles.product}>
            <div>
                <h4>{name}</h4>
                <p>{description}</p>
            </div>
            <div>{price}</div>
            <button onClick={() => addToBasket(item)} type='button' className={styles.addToBasket}>Add to basket</button>
        </div>
    )
};

ProductTile.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        addToBasket: PropTypes.func.isRequired,
    }).isRequired,
};

export default ProductTile;
