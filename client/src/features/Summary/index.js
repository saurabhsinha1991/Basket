import React from "react";
import { useSelector } from "react-redux";
import Header from "../../component/Header";
import { selectCheckoutMsg, selectCheckoutStatus } from "../../reducer/globalSlice";

function Summary() {
    const checkoutStatus = useSelector(selectCheckoutStatus);
    const checkoutMessage = useSelector(selectCheckoutMsg);
    return (
        <div>
            <Header title={checkoutStatus === 'success' ? 'Successful Checkout': 'Failed Checkout' } />
            <p style={{padding: '0 15px'}}>{checkoutMessage}</p>
        </div>
    )
}

export default Summary;
