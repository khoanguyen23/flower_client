import uuid from "uuid/v4";
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART
} from "../actions/cartActions"; 

const initState = [];

const cartReducer = (state = initState, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return addToCart(state, action.payload);
      case DECREASE_QUANTITY:
        return decreaseQuantity(state, action.payload);
      case DELETE_FROM_CART:
        return deleteFromCart(state, action.payload);
      case DELETE_ALL_FROM_CART:
        return deleteAllFromCart();
      default:
        return state;
    }
  };

  const addToCart = (cartItems, product) => {
    if (product.variation === undefined) {
      const cartItem = cartItems.filter(item => item.id === product.id)[0];
      if (cartItem === undefined) {
        return [
          ...cartItems,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuid()
          }
        ];
      } else {
        return cartItems.map(item =>
          item.cartItemId === cartItem.cartItemId
            ? {
                ...item,
                quantity: product.quantity
                  ? item.quantity + product.quantity
                  : item.quantity + 1
              }
            : item
        );
      }
    } else {
      const cartItem = cartItems.filter(
        item =>
          item.id === product.id &&
          product.selectedProductColor &&
          product.selectedProductColor === item.selectedProductColor &&
          product.selectedProductSize &&
          product.selectedProductSize === item.selectedProductSize &&
          (product.cartItemId ? product.cartItemId === item.cartItemId : true)
      )[0];
  
      if (cartItem === undefined) {
        return [
          ...cartItems,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuid()
          }
        ];
      } else if (
        cartItem !== undefined &&
        (cartItem.selectedProductColor !== product.selectedProductColor ||
          cartItem.selectedProductSize !== product.selectedProductSize)
      ) {
        return [
          ...cartItems,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuid()
          }
        ];
      } else {
        return cartItems.map(item =>
          item.cartItemId === cartItem.cartItemId
            ? {
                ...item,
                quantity: product.quantity
                  ? item.quantity + product.quantity
                  : item.quantity + 1,
                selectedProductColor: product.selectedProductColor,
                selectedProductSize: product.selectedProductSize
              }
            : item
        );
      }
    }
  };
  
  
  const decreaseQuantity = (cartItems, product) => {
    if (product.quantity === 1) {
      return cartItems.filter(cartItem => cartItem.cartItemId !== product.cartItemId);
    } else {
      return cartItems.map(item =>
        item.cartItemId === product.cartItemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
  };
  
  const deleteFromCart = (cartItems, product) => {
    if (product.quantity === 1) {
      return remainingItems(cartItems, product);
    } else {
      return cartItems.map(item =>
        item.cartItemId === product.cartItemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
  };
  
  const remainingItems = (cartItems, product) =>
    cartItems.filter(item => item.cartItemId !== product.cartItemId);
  
  const deleteAllFromCart = () => {
    return [];
  };
  
  export default cartReducer;