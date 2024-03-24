import React, { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { RiProductHuntLine } from "react-icons/ri";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_admin_dashboard_index_data } from "../../store/Reducers/dashboardIndexReducer";
import moment from "moment";
import seller from "../../assets/seller .png";
const AdminDashboard = () => {
  const dispatch = useDispatch();

  const {
    recentMessage,
    recentOrders,
    totalSale,
    totalOrder,
    totalProduct,
    totalSeller,
  } = useSelector((state) => state.dashboardIndex);
  const { userInfo } = useSelector((state) => state.auth);
  const state = {
    series: [
      {
        name: "Orders",
        data: [22, 33, 44, 55, 66, 66, 77, 88, 77, 33, 22],
      },
      {
        name: "Revenue",
        data: [22, 33, 24, 55, 76, 62, 77, 28, 37, 33, 22],
      },
      {
        name: "Sellers",
        data: [11, 33, 44, 55, 26, 46, 77, 44, 97, 99, 52],
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#f0f0f0",
        width: 0.5,
        dashboard: 0,
      },
      xaxis: {
        categories: [
          "jan",
          "Feb",
          "Mar",
          "Apl",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              "jan",
              "Feb",
              "Mar",
              "Apl",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
    },
  };

  useEffect(() => {
    dispatch(get_admin_dashboard_index_data());
  }, []);
  return (
    <div className=" px-2 md:px-7 py-5">
      <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className=" flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className=" flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className=" text-3xl font-bold">${totalSale}</h2>
            <span className=" text-md font-medium">Total Sales</span>
          </div>
          <div className=" w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <BsCurrencyDollar className=" text-[#28c76f]" />
          </div>
        </div>
        <div className=" flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className=" flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className=" text-3xl font-bold">{totalProduct}</h2>
            <span className=" text-md font-medium">Products</span>
          </div>
          <div className=" w-[46px] h-[47px] rounded-full bg-[#e000e81f] flex justify-center items-center text-xl">
            <RiProductHuntLine className=" text-[#cd00e8]" />
          </div>
        </div>
        <div className=" flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className=" flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className=" text-3xl font-bold">{totalSeller}</h2>
            <span className=" text-md font-medium">Sellers</span>
          </div>
          <div className=" w-[46px] h-[47px] rounded-full bg-[#00cfe81f] flex justify-center items-center text-xl">
            <FaUser className=" text-[#00cfe8]" />
          </div>
        </div>
        <div className=" flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className=" flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className=" text-3xl font-bold">{totalOrder}</h2>
            <span className=" text-md font-medium">Orders</span>
          </div>
          <div className=" w-[46px] h-[47px] rounded-full bg-[#7367f01f] flex justify-center items-center text-xl">
            <AiOutlineShoppingCart className=" text-[#7367f0]" />
          </div>
        </div>
      </div>

      <div className=" w-full p-4 bg-[#283046] rounded-md mt-6 ">
        <div className=" flex justify-between items-center">
          <h2 className=" font-semibold text-lg text-[#d0d2d6] pb-3">
            Recent Orders
          </h2>
          <Link
            to="/admin/dashboard/orders"
            className=" font-semibold text-sm text-[#d0d2d6]"
          >
            View All
          </Link>
        </div>
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
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((d, i) => (
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
                    <Link to={`/admin/dashboard/order/details/${d._id}`}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className=" w-full flex flex-wrap mt-7">
        {/* <div className=" w-full lg:w-7/12 lg:pr-3">
          <div className=" w-full bg-[#283046] p-4 rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div> */}
        <div className=" w-full  mt-6 lg:mt-0">
          <div className=" w-full bg-[#283046] p-4 rounded-md text-[#d0d2d6]">
            <div className=" flex justify-between items-center">
              <h2 className=" font-semibold text-lg text-[#d0d2d6] pb-3">
                Recent Seller Message
              </h2>
              <Link
                to="/admin/dashboard/chat-seller"
                className=" font-semibold text-sm text-[#d0d2d6]"
              >
                View All
              </Link>
            </div>
            <div className=" flex flex-col gap-2 pt-6 text-[#d0d3d6]">
              <ol className=" relative border-1 border-slate-600 ml-4">
                {recentMessage.map((m, i) => (
                  <li className=" mb-3 ml-6">
                    <div className=" flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full z-10">
                      {m.senderId === userInfo._id ? (
                        <img
                          className=" rounded-full w-full h-full shadow-lg"
                          src={userInfo.image}
                          alt="admin"
                        />
                      ) : (
                        <img
                          className=" rounded-full w-full h-full shadow-lg"
                          src={seller}
                          alt="admin"
                        />
                      )}
                    </div>
                    <div className=" p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                      <div className=" flex justify-between items-center mb-2">
                        <Link className=" text-md font-normal">
                          {m.senderName}
                        </Link>
                        <time className=" mb-1 text-sm font-normal sm:order-last sm:mb-0">
                          {moment(m.createdAt).startOf("hour").fromNow()}
                        </time>
                      </div>
                      <div className=" p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                        {m.message}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
