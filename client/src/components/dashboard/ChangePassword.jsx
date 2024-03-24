import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  messageClear,
  update_pass,
} from "../../store/reducers/customerAuthReducer";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { successMessage, errorMessage, userInfo } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    email: userInfo.email,
    old_password: "",
    new_password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const updatePass = (e) => {
    e.preventDefault();
    dispatch(update_pass(state));
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
    <div className=" p-4 bg-white">
      <h2 className=" text-xl text-slate-600 pb-5">Change Password</h2>
      <form onSubmit={updatePass}>
        <div className=" flex flex-col gap-1 mb-2">
          <label htmlFor="old_password">Old Password</label>
          <input
            onChange={inputHandle}
            value={state.old_password}
            type="password"
            id="old_password"
            name="old_password"
            placeholder="old password"
            required
            className=" outline-none px-3 py-1 border rounded-md text-slate-600"
          />
        </div>
        <div className=" flex flex-col gap-1 mb-2">
          <label htmlFor="new_password">New Password</label>
          <input
            onChange={inputHandle}
            value={state.new_password}
            type="password"
            id="new_password"
            name="new_password"
            placeholder="new password"
            className=" outline-none px-3 py-1 border rounded-md text-slate-600"
            required
          />
        </div>
        <div>
          <button className=" px-8 py-2 bg-purple-500 shadow-lg hover:shadow-purple-500/30 text-white rounded-md">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
