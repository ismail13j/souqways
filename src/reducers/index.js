import loginReducer from "./authReducer/loginReducer";
import changePasswordReducer from "./authReducer/ChangePasswordReducer";
import forgotPasswordReducer from "./authReducer/forgotPasswordReducer";
import signUpReducer from "./authReducer/signupReducer";
import categoryReducer from "./dashboard/categoryReducer";
import orderReducer from "./dashboard/orderReducer";
import getWishListReducer from "./dashboard/getWishListReducer";
import getCartListReducer from "./dashboard/cartListReducer";
import searchReducer from "./dashboard/SearchReducer";
import RatingsAndReviewsReducer from "./dashboard/RatingsAndReviewsReducer";
import appState from "./appState/appState";
import Address from "./dashboard/address";
import notification from "./dashboard/notification";
const reducer = {
  loginReducer,
  categoryReducer,
  appState,
  changePasswordReducer,
  forgotPasswordReducer,
  getWishListReducer,
  signUpReducer,
  orderReducer,
  getCartListReducer,
  searchReducer,
  RatingsAndReviewsReducer,
  Address,
  notification,
};

export default reducer;
