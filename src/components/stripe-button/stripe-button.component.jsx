import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import './stripe-button.styles.scss';


const StripeCheckoutButton =({price})=>{
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HYDAoEUaj69QAzoWSnM2GYr1tHVgzB8497i4soddSId5TEeKYh1stNTlajBCsS6PpgluGRYPCwUmy4fyaM34zpk00etu3vLN9';

const onToken = token =>{
    console.log(token);
    alert("Payment Successful")
}
    return(
        <StripeCheckout
        label= 'Pay Now'
        name= 'CRWN Clothing Ltd.'
        billingAddress
        shippingAddress
        image = 'https://sendeyo.com/up/d/f3eb2117da'
        description = {`Your total is $${price}`}
        amount  = {priceForStripe}
        panelLabel = 'Pay Now'
        token = {onToken}
        stripeKey = {publishableKey}
        />
    );
};
export default StripeCheckoutButton;