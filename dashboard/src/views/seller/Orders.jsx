import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { get_seller_orders } from "../../store/Reducers/orderReducer";
const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  const dispatch = useDispatch();
  const { myOrders, totalOrder } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      get_seller_orders({
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue,
        sellerId: userInfo._id,
      })
    );
  }, [parPage, currentPage, searchValue]);

  return (
    <div className=" px-2 lg:px-7 pt-5">
      <div className=" w-full p-4 bg-[#283046] rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <div className=" relative overflow-x-auto">
          <table className=" w-full text-sm text-left text-[#d0d2d6]">
            <thead className=" text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className=" py-3 px-4">
                  Ordr Id
                </th>
                <th scope="col" className=" py-3 px-4">
                  Price
                </th>
                <th scope="col" className=" py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className=" py-3 px-4">
                  Ordr Status
                </th>
                <th scope="col" className=" py-3 px-4">
                  Date
                </th>
                <th scope="col" className=" py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((d, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className=" py-3 px-4 font-medium whitespace-nowrap"
                  >
                    #{d._id}
                  </td>
                  <td
                    scope="row"
                    className=" py-3 px-4  font-medium whitespace-nowrap"
                  >
                    ${d.price}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d.paymetn_status}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4  font-medium whitespace-nowrap"
                  >
                    <span>{d.delivery_status}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4  font-medium whitespace-nowrap"
                  >
                    <span>{d.date}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4  font-medium whitespace-nowrap"
                  >
                    <Link
                      to={`/seller/dashboard/order/details/${d._id}`}
                      className=" p-[6px] w-[30px] flex justify-center items-center bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                    >
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalOrder <= parPage ? (
          ""
        ) : (
          <div className=" w-full flex justify-end mt-4 bottom-4 roght-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
