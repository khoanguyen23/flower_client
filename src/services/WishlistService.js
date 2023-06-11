import axios from 'axios';

const WishlistService = {
    // ...
  
    getUserWishlist: async (userId) => {
      try {
        const response = await axios.get(`/api/wishlist/${userId}`); // Thay đổi đường dẫn API tương ứng với backend của bạn
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
  };
  
  export default WishlistService;