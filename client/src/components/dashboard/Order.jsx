import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { get_order } from "../../store/reducers/orderReducer";

const Order = () => {
  const { myOrder } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { orderId } = useParams();

  useEffect(() => {
    dispatch(get_order(orderId));
  }, [orderId]);
  return (
    <div className=" bg-white p-5">
      <h2 className=" text-slate-600 font-semibold">
        #{myOrder._id}, <span className=" pl-1">{myOrder.date}</span>
      </h2>
      <div className=" grid grid-cols-3 gap-3">
        <div className=" flex flex-col gap-1">
          <h2 className=" text-slate-600 font-semibold">
            Deliver to: {myOrder.shippingInfo?.name}
          </h2>
          <p>
            <span className=" bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              Home
            </span>
            <span className=" text-slate-600 text-sm">
              {myOrder.shippingInfo?.address} {myOrder.shippingInfo?.province}{" "}
              {myOrder.shippingInfo?.area}{" "}
            </span>
          </p>
          <p className=" text-slate-600 text-sm font-semibold">
            Email to {userInfo.email}
          </p>
        </div>
        <div className=" text-slate-600">
          <h2>Price: ${myOrder.price} include shipping fee</h2>
          <p>
            Payment status:{" "}
            <span
              className={` py-[1px] text-xs px-3 ${
                myOrder.paymetn_status === "paid"
                  ? " bg-green-100 text-green-800"
                  : " bg-red-100 text-red-800"
              } rounded-md`}
            >
              {myOrder.paymetn_status}
            </span>
          </p>
          <p>
            Order status:{" "}
            <span
              className={` py-[1px] text-xs px-3 ${
                myOrder.delivery_status === "paid"
                  ? " bg-indigo-100 text-indigo-800"
                  : " bg-red-100 text-red-800"
              } rounded-md`}
            >
              {myOrder.delivery_status}
            </span>
          </p>
        </div>
      </div>
      <div className=" mt-3">
        <h2 className=" text-slate-600 text-lg pb-2">Products</h2>
        <div className=" flex gap-5 flex-col">
          {myOrder.products?.map((p, i) => (
            <div key={i}>
              <div className=" flex gap-5 justify-start items-center text-slate-600">
                <div className=" flex gap-2">
                  <img
                    className=" w-[55px] h-[55px]"
                    src={p.images[0]}
                    alt="imgs"
                  />
                  <div className=" flex text-sm flex-col justify-start items-start">
                    <Link>{p.name}</Link>
                    <p>
                      <span>Brand: {p.brand}</span>
                      <span>Qunatity: {p.quantity}</span>
                    </p>
                  </div>
                </div>
                <div className=" pl-4 ">
                  <h2 className=" text-md text-orange-500">
                    ${p.price - Math.floor((p.price * p.discount) / 100)}
                  </h2>
                  <p className=" line-through">${p.price}</p>
                  <p>-{p.discount}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
