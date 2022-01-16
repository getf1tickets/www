import {
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_STORAGE } from '../utils/config';

export const CheckoutContext = createContext(null);

const useProvideContext = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [billingAddressId, setBillingAddressId] = useState(null);
  const [cartCache, setCartCache] = useLocalStorage(LOCAL_STORAGE.CHECKOUT_KEY);

  const addProduct = useCallback((product, quantity) => {
    const productIndex = cart.findIndex((p) => p.id === product.id);
    if (productIndex === -1) {
      setCartCache([...cart, { ...product, quantity }]);
    } else {
      const newCart = [...cart];
      newCart[productIndex].quantity += quantity;
      setCartCache(newCart);
    }
  }, [cart, setCartCache]);

  const deleteProduct = useCallback((productId) => {
    const productIndex = cart.findIndex((p) => p.id === productId);
    const newCart = [...cart];
    newCart.splice(productIndex, 1);
    setCartCache(newCart);
  }, [cart, setCartCache]);

  const increaseProductQuantity = useCallback((productId) => {
    const productIndex = cart.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
      const newCart = [...cart];
      newCart[productIndex].quantity += 1;
      setCartCache(newCart);
    }
  }, [cart, setCartCache]);

  const decreaseProductQuantity = useCallback((productId) => {
    const productIndex = cart.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
      const newCart = [...cart];
      newCart[productIndex].quantity -= 1;
      setCartCache(newCart);
    }
  }, [cart, setCartCache]);

  const nextActiveStep = useCallback(() => {
    setActiveStep(((activeStep + 1) % 3));
  }, [activeStep, setActiveStep]);

  const previousActiveStep = useCallback(() => {
    setActiveStep(((activeStep - 1) % 3));
  }, [activeStep, setActiveStep]);

  useEffect(() => {
    const sub = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(sub);
    setDiscount(0);
    setTotal(sub);
  }, [cart, setTotal, setSubtotal, setDiscount]);

  useEffect(() => {
    setCart(cartCache);
  }, [cartCache, setCart]);

  return {
    cart,
    subtotal,
    discount,
    total,
    activeStep,
    billingAddressId,
    nextActiveStep,
    previousActiveStep,
    setActiveStep,
    addProduct,
    deleteProduct,
    increaseProductQuantity,
    decreaseProductQuantity,
    setBillingAddressId,
  };
};

export default function CheckoutProvider({ children }) {
  const context = useProvideContext();
  return <CheckoutContext.Provider value={context}>{children}</CheckoutContext.Provider>;
}
