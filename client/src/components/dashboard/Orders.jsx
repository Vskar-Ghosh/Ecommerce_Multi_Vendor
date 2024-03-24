import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { get_orders } from "../../store/reducers/orderReducer";

const Orders = () => {
  const [state, setState] = useState("all");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { myOrders, order } = useSelector((state) => state.order);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      get_orders({
        status: state,
        customerId: userInfo.id,
      })
    );
  }, [state]);

  const redirect = (ord) => {
    let items = 0;
    for (let i = 0; i < ord.length; i++) {
      items = ord.products[i].quantity + items;
    }
    navigate("/payment", {
      state: {
        price: ord.price,
        items,
        orderId: ord._id,
      },
    });
  };
  return (
    <div className=" bg-white p-4 rounded-md">
      <div className=" flex justify-between items-center">
        <h2 className=" text-xl font-semibold text-slate-600">My Orders</h2>
        <select
          className=" outline-none px-3 py-1 border rounded-md text-slate-600"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="all">--order status---</option>
          <option value="placed">Placed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="warehouse">Warehouse</option>
        </select>
      </div>
      <div className=" pt-4">
        <div className=" relative overflow-x-auto">
          <table className=" w-full text-sm text-left text-gray-500">
            <thead className=" text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className=" px-6 py-3" scope="col">
                  Order Id
                </th>
                <th className=" px-6 py-3" scope="col">
                  Price
                </th>
                <th className=" px-6 py-3" scope="col">
                  Payment Status
                </th>
                <th className=" px-6 py-3" scope="col">
                  Order Status
                </th>
                <th className=" px-6 py-3" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((o, i) => (
                <tr key={i} className=" bg-white border-b">
                  <td
                    className=" px-6 py-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    {o._id}
                  </td>
                  <td
                    className=" px-6 py-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    ${o.price}
                  </td>
                  <td
                    className=" px-6 py-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    {o.paymetn_status}
                  </td>
                  <td
                    className=" px-6 py-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    {o.delivery_status}
                  </td>
                  <td className=" px-6 py-4 " scope="row">
                    <Link to={`/dashboard/order/details/${o._id}`}>
                      <span className=" bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded">
                        view
                      </span>
                    </Link>
                    {o.paymetn_status !== "paid" && (
                      <span
                        onClick={() => redirect(o)}
                        className=" bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded cursor-pointer"
                      >
                        Pay Now
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
