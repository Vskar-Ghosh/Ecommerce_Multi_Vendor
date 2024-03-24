import React, { useEffect, useState } from "react";
import { BsImages } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FadeLoader, PropagateLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  messageClear,
  profile_image_upload,
  profile_info_add,
  update_seller_pass,
} from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { overRideStyle } from "../../utils/utils";
import { create_stripe_connect_account } from "../../store/Reducers/sellerReducer";

const Profiel = () => {
  const [state, setState] = useState({
    divison: "",
    district: "",
    shopName: "",
    sub: "",
  });

  const dispatch = useDispatch();
  const { userInfo, loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );
  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(profile_image_upload(formData));
    }
  };

  const add = (e) => {
    e.preventDefault();
    dispatch(profile_info_add(state));
  };

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [stateP, setStateP] = useState({
    email: userInfo.email,
    old_password: "",
    new_password: "",
  });

  const inputHandleP = (e) => {
    setStateP({
      ...stateP,
      [e.target.name]: e.target.value,
    });
  };

  const updatePass = (e) => {
    e.preventDefault();
    dispatch(update_seller_pass(stateP));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className=" px-2 lg:px-7 py-5">
      <div className=" w-full flex flex-wrap">
        <div className=" w-full md:w-6/12">
          <div className=" w-full bg-[#283046] rounded-md text-[#d0d2d5]">
            <div className=" flex justify-center items-center py-3">
              {userInfo?.image ? (
                <label
                  className=" h-[210px] w-[300px] relative p-3 cursor-pointer overflow-hidden"
                  htmlFor="img"
                >
                  <img
                    className=" w-full h-full"
                    src={userInfo.image}
                    alt="uploaded iamge"
                  />
                  {loader && (
                    <div className=" bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className=" flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-dashed hover:border-indigo-500 border-[#d0d2d6] relative"
                  htmlFor="img"
                >
                  <span>
                    <BsImages />
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    <div className=" bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input
                onChange={add_image}
                type="file"
                className=" hidden"
                id="img"
              />
            </div>
            <div className=" px-0 md:px-5 py-2">
              <div className=" flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                {/* <span className=" p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaEdit />
                </span> */}
                <div className=" flex gap-2">
                  <span>Name:</span>
                  <span>{userInfo.name} </span>
                </div>
                <div className=" flex gap-2">
                  <span>Email:</span>
                  <span>{userInfo.email} </span>
                </div>
                <div className=" flex gap-2">
                  <span>Role:</span>
                  <span>{userInfo.role} </span>
                </div>
                <div className=" flex gap-2">
                  <span>Status:</span>
                  <span>{userInfo.status} </span>
                </div>
                <div className=" flex gap-2">
                  <span>Payment Account:</span>
                  <p>
                    {userInfo.payment === "active" ? (
                      <span className=" bg-red-500 text-white text-sm cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                        {userInfo.payment}{" "}
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          dispatch(create_stripe_connect_account());
                          console.log("click in active for profile");
                        }}
                        className=" bg-blue-500 text-white text-sm cursor-pointer font-normal ml-2 px-2 py-0.5 rounded"
                      >
                        Click active{" "}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className=" px-0 md:px-5 py-2">
              {!userInfo?.shopInfo ? (
                <form onSubmit={add}>
                  <div className=" flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="shop">Shop Name</label>
                    <input
                      value={state.shopName}
                      onChange={inputHandle}
                      className=" px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      placeholder="shop name"
                      name="shopName"
                      id="shop"
                    />
                  </div>
                  <div className=" flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="divison">Divison</label>
                    <input
                      value={state.divison}
                      onChange={inputHandle}
                      className=" px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      placeholder="divison"
                      name="divison"
                      id="divison"
                    />
                  </div>
                  <div className=" flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="district">District</label>
                    <input
                      value={state.district}
                      onChange={inputHandle}
                      className=" px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      placeholder="product district"
                      name="district"
                      id="district"
                    />
                  </div>
                  <div className=" flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="sub">Sub District</label>
                    <input
                      value={state.sub}
                      onChange={inputHandle}
                      className=" px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      placeholder="sub district"
                      name="sub"
                      id="sub"
                    />
                  </div>
                  <button
                    disabled={loader ? true : false}
                    className=" bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                  >
                    {loader ? (
                      <PropagateLoader
                        color="#fff"
                        cssOverride={overRideStyle}
                      />
                    ) : (
                      "Update Info"
                    )}
                  </button>
                </form>
              ) : (
                <div className=" flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                  {/* <span className=" p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                    <FaEdit />
                  </span> */}
                  <div className=" flex gap-2">
                    <span>Shop Name:</span>
                    <span>{userInfo.shopInfo.shopName} </span>
                  </div>
                  <div className=" flex gap-2">
                    <span>Divison:</span>
                    <span>{userInfo.shopInfo.divison}</span>
                  </div>
                  <div className=" flex gap-2">
                    <span>District:</span>
                    <span>{userInfo.shopInfo.district}</span>
                  </div>
                  <div className=" flex gap-2">
                    <span>Sub District:</span>
                    <span>{userInfo.shopInfo.sub}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=" w-full md:w-6/12">
          <div className=" w-full pl-0 md:pl-7 md:mt-0 mt-6">
            <div className="  bg-[#283046] rounded-md text-[#d0d2d5] p-4">
              <h1 className=" text-[#d0d2d6] text-lg font-semibold">
                Change Password
              </h1>
              <form onSubmit={updatePass}>
                {/* <div className=" flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    className=" px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="email"
                    placeholder="email"
                    name="email"
                    id="email"
                  />
                </div> */}
                <div className=" flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="o_password">Old Password</label>
                  <input
                    onChange={inputHandleP}
                    value={state.old_password}
                    className=" px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    placeholder="old password"
                    name="old_password"
                    id="old_password"
                    required
                  />
                </div>
                <div className=" flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="n_password">New Password</label>
                  <input
                    onChange={inputHandleP}
                    value={state.new_password}
                    className=" px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    placeholder="new password"
                    name="new_password"
                    id="new_password"
                    required
                  />
                </div>
                <button className=" bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-7 py-2 mt-5">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiel;
