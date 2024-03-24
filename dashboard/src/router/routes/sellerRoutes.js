import { lazy } from "react";

const SellerDashboard = lazy(() =>
  import("../../views/seller/SellerDashboard")
);
const AddProduct = lazy(() => import("../../views/seller/AddProduct"));
const Products = lazy(() => import("../../views/seller/Products"));
const AddBanner = lazy(() => import("../../views/seller/AddBanner"));
const Banners = lazy(() => import("../../views/seller/Banners"));
const DiscountProducts = lazy(() =>
  import("../../views/seller/DiscountProducts")
);
const Orders = lazy(() => import("../../views/seller/Orders"));
const Payments = lazy(() => import("../../views/seller/Payments"));
const SelleToCustomer = lazy(() =>
  import("../../views/seller/SelleToCustomer")
);
const SellerToAdmin = lazy(() => import("../../views/seller/SellerToAdmin"));
const Profile = lazy(() => import("../../views/seller/Profiel"));
const EditProduct = lazy(() => import("../../views/seller/EditProduct"));
const OrderDetails = lazy(() => import("../../views/seller/OrderDetails"));
const Pending = lazy(() => import("../../views/Pending"));
const Deactive = lazy(() => import("../../views/Deactive"));

export const sellerRoutes = [
  {
    path: "/seller/account-pending",
    element: <Pending />,
    ability: "seller",
  },
  {
    path: "/seller/account-deactive",
    element: <Deactive />,
    ability: "seller",
  },
  {
    path: "/seller/dashboard",
    element: <SellerDashboard />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/add-product",
    element: <AddProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/edit-product/:productId",
    element: <EditProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/products",
    element: <Products />,
    role: "seller",
    status: "active",
  },
  // {
  //   path: "/seller/dashboard/discount-products",
  //   element: <DiscountProducts />,
  //   role: "seller",
  //   status: "active",
  // },
  {
    path: "/seller/dashboard/orders",
    element: <Orders />,
    visibility: ["active", "deactive"],
    role: "seller",
  },
  {
    path: "/seller/dashboard/order/details/:orderId",
    element: <OrderDetails />,
    visibility: ["active", "deactive"],
    role: "seller",
  },
  {
    path: "/seller/dashboard/payments",
    element: <Payments />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chat-support",
    role: "seller",
    element: <SellerToAdmin />,
    visibility: ["active", "deactive", "pending"],
  },
  {
    path: "/seller/dashboard/chat-customer/:customerId",
    element: <SelleToCustomer />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chat-customer",
    element: <SelleToCustomer />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/profile",
    element: <Profile />,
    role: "seller",
    visibility: ["active", "deactive", "pending"],
  },
  {
    path: "/seller/dashboard/add-banner/:productId",
    element: <AddBanner />,
    role: "seller",
    status: "active",
  },
];
