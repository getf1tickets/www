import { useContext } from 'react';
import { CheckoutContext } from '../contexts/checkout';

const useCheckout = () => useContext(CheckoutContext);

export default useCheckout;
