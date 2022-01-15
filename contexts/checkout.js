import {
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

export const CheckoutContext = createContext(null);

const useProvideContext = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const addProduct = useCallback((product, quantity) => {
    const productIndex = cart.findIndex((p) => p.id === product.id);
    if (productIndex === -1) {
      setCart([...cart, { ...product, quantity }]);
    } else {
      setCart((oldArray) => {
        const newArray = [...oldArray];
        newArray[productIndex].quantity += quantity;
        return newArray;
      });
    }
  }, [cart, setCart]);

  const deleteProduct = useCallback((productId) => {
    const productIndex = cart.findIndex((p) => p.id === productId);
    setCart((oldArray) => {
      const newArray = [...oldArray];
      newArray.splice(productIndex, 1);
      return newArray;
    });
  }, [cart, setCart]);

  const increaseProductQuantity = useCallback((productId) => {
    const productIndex = cart.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
      setCart((oldArray) => {
        const newArray = [...oldArray];
        newArray[productIndex].quantity += 1;
        return newArray;
      });
    }
  }, [cart, setCart]);

  const decreaseProductQuantity = useCallback((productId) => {
    const productIndex = cart.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
      setCart((oldArray) => {
        const newArray = [...oldArray];
        newArray[productIndex].quantity -= 1;
        return newArray;
      });
    }
  }, [cart, setCart]);

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

  return {
    cart,
    subtotal,
    discount,
    total,
    activeStep,
    nextActiveStep,
    previousActiveStep,
    addProduct,
    deleteProduct,
    increaseProductQuantity,
    decreaseProductQuantity,
  };
};

export default function CheckoutProvider({ children }) {
  const context = useProvideContext();
  return <CheckoutContext.Provider value={context}>{children}</CheckoutContext.Provider>;
}
