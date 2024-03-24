import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import chatReducer from "./Reducers/chatReducer";
import produtReducer from "./Reducers/produtReducer";
import sellerReducer from "./Reducers/sellerReducer";
import orderReducer from "./Reducers/orderReducer";
import paymentReducer from "./Reducers/paymentReducer";
import dashboardIndexReducer from "./Reducers/dashboardIndexReducer";
import bannerReducer from "./Reducers/bannerReducer";
const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  product: produtReducer,
  seller: sellerReducer,
  chat: chatReducer,
  order: orderReducer,
  payment: paymentReducer,
  dashboardIndex: dashboardIndexReducer,
  banner: bannerReducer,
};
export default rootReducer;
