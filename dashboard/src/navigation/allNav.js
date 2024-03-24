import {
  AiFillDashboard,
  AiOutlinePlus,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiCategory, BiLoaderCircle } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { BsChat, BsCurrencyDollar } from "react-icons/bs";
import { CiChat1 } from "react-icons/ci";
import { RiProductHuntLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: <AiFillDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Orders",
    icon: <AiOutlineShopping />,
    role: "admin",
    path: "/admin/dashboard/orders",
  },
  {
    id: 3,
    title: "Category",
    icon: <BiCategory />,
    role: "admin",
    path: "/admin/dashboard/category",
  },
  {
    id: 4,
    title: "Sellers",
    icon: <FiUser />,
    role: "admin",
    path: "/admin/dashboard/sellers",
  },
  {
    id: 5,
    title: "Payment request",
    icon: <BsCurrencyDollar />,
    role: "admin",
    path: "/admin/dashboard/payment-request",
  },
  {
    id: 6,
    title: "Deactive Sellers",
    icon: <FiUser />,
    role: "admin",
    path: "/admin/dashboard/deactive-sellers",
  },
  {
    id: 7,
    title: "Sellers Request",
    icon: <BiLoaderCircle />,
    role: "admin",
    path: "/admin/dashboard/sellers-request",
  },
  {
    id: 8,
    title: "Chat Seller",
    icon: <CiChat1 />,
    role: "admin",
    path: "/admin/dashboard/chat-seller",
  },
  {
    id: 9,
    title: "Dashboard",
    icon: <AiFillDashboard />,
    role: "seller",
    path: "/seller/dashboard",
  },
  {
    id: 10,
    title: "Add Product",
    icon: <AiOutlinePlus />,
    role: "seller",
    path: "/seller/dashboard/add-product",
  },
  {
    id: 11,
    title: "All Product",
    icon: <RiProductHuntLine />,
    role: "seller",
    path: "/seller/dashboard/products",
  },

  // {
  //   id: 12,
  //   title: "Discount Product",
  //   icon: <RiProductHuntLine />,
  //   role: "seller",
  //   path: "/seller/dashboard/discount-products",
  // },
  {
    id: 12,
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    role: "seller",
    path: "/seller/dashboard/orders",
  },
  {
    id: 13,
    title: "Payments",
    icon: <BsCurrencyDollar />,
    role: "seller",
    path: "/seller/dashboard/payments",
  },
  {
    id: 14,
    title: "Chat Customer",
    icon: <BsChat />,
    role: "seller",
    path: "/seller/dashboard/chat-customer",
  },
  {
    id: 15,
    title: "Chat Support",
    icon: <CiChat1 />,
    role: "seller",
    path: "/seller/dashboard/chat-support",
  },
  {
    id: 16,
    title: "Profile",
    icon: <FiUser />,
    role: "seller",
    path: "/seller/dashboard/profile",
  },
];
