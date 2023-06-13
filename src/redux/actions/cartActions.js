import axios from 'axios';
import http from "../../http-common"
export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";


//add to cart
// export const addToCart = (
//   item,
//   addToast,
//   quantityCount,
//   selectedProductColor,
//   selectedProductSize
// ) => {
//   return dispatch => {
//     if (addToast) {
//       addToast("Đã thêm vào giỏ hàng ", { appearance: "success", autoDismiss: true });
//     }
//     dispatch({
//       type: ADD_TO_CART,
//       payload: {
//         ...item,
//         quantity: quantityCount,
//         selectedProductColor: selectedProductColor
//           ? selectedProductColor
//           : item.selectedProductColor
//           ? item.selectedProductColor
//           : null,
//         selectedProductSize: selectedProductSize
//           ? selectedProductSize
//           : item.selectedProductSize
//           ? item.selectedProductSize
//           : null
//       }
//     });
//   };
// };
export const addToCart = (item, addToast, quantityCount) => {
  return async (dispatch) => {
    try {
      const newItem = {
        ...item,
        quantityCount: quantityCount
      };

      const response = await http.post("/cart-items", newItem);
      const addedItem = response.data;

      if (addToast) {
        addToast("Đã thêm vào giỏ hàng ", { appearance: "success", autoDismiss: true });
      }

      dispatch({
        type: ADD_TO_CART,
        payload: addedItem,
      });
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng: ", error);
    }
  };
};

//decrease from cart
export const decreaseQuantity = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Mặt hàng giảm từ giỏ hàng", {
        appearance: "warning",
        autoDismiss: true
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
// export const decreaseQuantity = (item, addToast) => {
//   return async (dispatch) => {
//     try {
//       const response = await http.put(`/cart-items/${item.id}`, item);
//       const updatedItem = response.data;

//       if (addToast) {
//         addToast("Mặt hàng giảm từ giỏ hàng", {
//           appearance: "warning",
//           autoDismiss: true
//         });
//       }

//       dispatch({ type: DECREASE_QUANTITY, payload: updatedItem });
//     } catch (error) {
//       console.error("Lỗi khi giảm số lượng: ", error);
//     }
//   };
// };
//delete from cart
export const deleteFromCart = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Xóa khỏi giỏ hàng ", { appearance: "error", autoDismiss: true });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};
// export const deleteFromCart = (item, addToast) => {
//   return async (dispatch) => {
//     try {
//       await http.delete(`/cart-items/${item.id}`);

//       if (addToast) {
//         addToast("Xóa khỏi giỏ hàng ", { appearance: "error", autoDismiss: true });
//       }

//       dispatch({ type: DELETE_FROM_CART, payload: item });
//     } catch (error) {
//       console.error("Lỗi khi xóa khỏi giỏ hàng: ", error);
//     }
//   };
// };

//delete all from cart
export const deleteAllFromCart = addToast => {
  return dispatch => {
    if (addToast) {
      addToast("Xóa tất cả ", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};
// export const deleteAllFromCart = (addToast) => {
//   return async (dispatch) => {
//     try {
//       await http.delete("/cart-items");

//       if (addToast) {
//         addToast("Xóa tất cả ", {
//           appearance: "error",
//           autoDismiss: true
//         });
//       }

//       dispatch({ type: DELETE_ALL_FROM_CART });
//     } catch (error) {
//       console.error("Lỗi khi xóa tất cả: ", error);
//     }
//   };
// };

// get stock of cart item
export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  } else {
    return item.variation
      .filter(single => single.color === color)[0]
      .size.filter(single => single.name === size)[0].stock;
  }
};
