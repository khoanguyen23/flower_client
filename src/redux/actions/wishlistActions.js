import WishlistService from "../../services/WishlistService";

export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const DELETE_FROM_WISHLIST = "DELETE_FROM_WISHLIST";
export const DELETE_ALL_FROM_WISHLIST = "DELETE_ALL_FROM_WISHLIST";
export const FETCH_USER_WISHLIST_SUCCESS = "FETCH_USER_WISHLIST_SUCCESS";
export const FETCH_USER_WISHLIST_FAILURE = "FETCH_USER_WISHLIST_FAILURE";


// add to wishlist
export const addToWishlist = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Đã thêm vào yêu thích ", {
        appearance: "success",
        autoDismiss: true
      });
    }
    dispatch({ type: ADD_TO_WISHLIST, payload: item });
  };
};

// delete from wishlist
export const deleteFromWishlist = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Xóa khỏi yêu thích ", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: DELETE_FROM_WISHLIST, payload: item });
  };
};

//delete all from wishlist
export const deleteAllFromWishlist = addToast => {
  return dispatch => {
    if (addToast) {
      addToast("Xóa tất cả ", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: DELETE_ALL_FROM_WISHLIST });
  };
};

//get list wishlist from current user
export const fetchUserWishlist = (userId) => {
  return async (dispatch) => {
    try {
      //get API
      const wishlist = await WishlistService.getUserWishlist(userId);

      //dispatch action
      dispatch({ type: FETCH_USER_WISHLIST_SUCCESS, payload: wishlist });
    } catch (error) {
      dispatch({ type: FETCH_USER_WISHLIST_FAILURE, payload: error.message });
    }
  }
}
