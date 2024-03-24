import cardReducer from "./reducers/cardReducer";
import orderReducer from "./reducers/orderReducer";
import customerAuthReducer from "./reducers/customerAuthReducer";
import homeReducer from "./reducers/homeReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import chatReducer from "./reducers/chatReducer";
const rootReducer = {
  home: homeReducer,
  auth: customerAuthReducer,
  card: cardReducer,
  order: orderReducer,
  dashboard: dashboardReducer,
  chat: chatReducer,
};
export default rootReducer;
