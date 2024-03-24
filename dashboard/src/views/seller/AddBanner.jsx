import React, { useEffect, useState } from "react";
import { BiSolidCloudUpload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  add_banner,
  get_banner,
  messageClear,
  update_banner,
} from "../../store/Reducers/bannerReducer";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { overRideStyle } from "../../utils/utils";

const AddBanner = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [imageShow, setImageShow] = useState("");
  const [image, setImage] = useState("");

  const { successMessage, errorMessage, loader, banners, banner } = useSelector(
    (state) => state.banner
  );

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImage(files[0]);
      setImageShow(URL.createObjectURL(files[0]));
    }
  };

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("image", image);
    dispatch(add_banner(formData));
  };

  const update = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    dispatch(update_banner({ info: formData, bannerId: banner._id }));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());

      setImageShow("");
      setImage("");
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    dispatch(get_banner(productId));
  }, [productId]);
  return (
    <div className=" px-2 lg:px-7 pt-5">
      <div className=" w-full p-4 bg-[#283046] rounded-md">
        <div className=" flex justify-between items-center pb-4">
          <h1 className=" text-[#d0d2d6] text-xl font-semibold">Add Banner</h1>
          <Link
            className=" bg-blue-500  hover:shadow-blue-500/50 hover:shadow-lg rounded-sm px-7 py-2 my-2"
            to="/seller/dashboard/banners"
          >
            Banners
          </Link>
        </div>
        <div>
          {!banner && (
            <form onSubmit={add}>
              <div className=" mb-6">
                <label
                  className=" flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500/50 w-full text-[#d0d2d6]"
                  htmlFor="image"
                >
                  <span className=" text-4xl">
                    <BiSolidCloudUpload />
                  </span>
                  <span>Select banner images</span>
                </label>
                <input
                  required
                  onChange={imageHandle}
                  className=" hidden"
                  type="file"
                  id="image"
                />
              </div>
              {imageShow && (
                <div className=" mb-4">
                  <img
                    className=" w-full h-auto"
                    src={imageShow}
                    alt="bannerImg"
                  />
                </div>
              )}

              <button
                disabled={loader ? true : false}
                className=" bg-blue-500 w-[220px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overRideStyle} />
                ) : (
                  "Add Banner"
                )}
              </button>
            </form>
          )}
          {banner && (
            <div>
              {
                <div className=" mb-4">
                  <img
                    className=" w-full h-auto"
                    src={banner.banner}
                    alt="bannerImg"
                  />
                </div>
              }
              <form onSubmit={update}>
                <div className=" mb-6">
                  <label
                    className=" flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500/50 w-full text-[#d0d2d6]"
                    htmlFor="image"
                  >
                    <span className=" text-4xl">
                      <BiSolidCloudUpload />
                    </span>
                    <span>Select banner images</span>
                  </label>
                  <input
                    required
                    onChange={imageHandle}
                    className=" hidden"
                    type="file"
                    id="image"
                  />
                </div>
                {imageShow && (
                  <div className=" mb-4">
                    <img
                      className=" w-full h-auto"
                      src={imageShow}
                      alt="bannerImg"
                    />
                  </div>
                )}

                <button
                  disabled={loader ? true : false}
                  className=" bg-blue-500 w-[220px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                >
                  {loader ? (
                    <PropagateLoader color="#fff" cssOverride={overRideStyle} />
                  ) : (
                    "Update Banner"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
