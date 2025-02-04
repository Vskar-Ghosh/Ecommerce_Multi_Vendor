import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get_category } from "../../store/Reducers/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  get_product,
  messageClear,
  update_product,
  product_image_update,
} from "../../store/Reducers/produtReducer";
import { PropagateLoader } from "react-spinners";
import { overRideStyle } from "../../utils/utils";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { categorys } = useSelector((state) => state.category);
  const { product, loader, successMessage, errorMessage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        parPage: "",
        page: "",
      })
    );
  }, []);

  useEffect(() => {
    dispatch(get_product(productId));
  }, [productId]);

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [state, setState] = useState({
    name: "",
    brand: "",
    description: "",
    discount: "",
    price: "",
    stock: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(categorys);
    }
  };

  const [imageShow, setIamgeShow] = useState([]);

  const changeImage = (img, files) => {
    if (files.length > 0) {
      dispatch(
        product_image_update({
          oldImage: img,
          newImage: files[0],
          productId,
        })
      );
    }
  };

  useEffect(() => {
    setState({
      name: product.name,
      brand: product.brand,
      description: product.description,
      discount: product.discount,
      price: product.price,
      stock: product.stock,
    });
    setCategory(product.category);
    setIamgeShow(product.images);
  }, [product]);
  useEffect(() => {
    setAllCategory(categorys);
  }, [categorys]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const update = (e) => {
    e.preventDefault();
    state.productId = productId;
    dispatch(update_product(state));
  };
  return (
    <div className=" px-2 lg:px-7 pt-5">
      <div className=" w-full p-4 bg-[#283046] rounded-md">
        <div className=" flex justify-between items-center pb-4">
          <h1 className=" text-[#d0d2d6] text-xl font-semibold">
            Edit Product
          </h1>
          <Link
            className=" bg-blue-500  hover:shadow-blue-500/50 hover:shadow-lg rounded-sm px-7 py-2 my-2"
            to="/sellers/dashboard/products"
          >
            Products
          </Link>
        </div>
        <div>
          <form onSubmit={update}>
            <div className=" flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className=" flex flex-col w-full gap-1">
                <label htmlFor="name">Product Name</label>
                <input
                  className=" px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  placeholder="product name"
                  name="name"
                  id="name"
                />
              </div>
              <div className=" flex flex-col w-full gap-1">
                <label htmlFor="brand">Product Brand</label>
                <input
                  className=" px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.brand}
                  type="text"
                  placeholder="product brand"
                  name="brand"
                  id="brand"
                />
              </div>
            </div>
            <div className=" flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className=" flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  onClick={() => setCateShow(!cateShow)}
                  className=" px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={category}
                  type="text"
                  placeholder="--select category--"
                  id="category"
                />
                <div
                  className={` absolute top-[101%] bg-slate-800 w-full transition-all ${
                    cateShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className=" w-full px-4 py-2 fixed">
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      className=" px-3 py-2 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className=" pt-14"></div>
                  <div className=" flex justify-start items-start flex-col h-[200px] overflow-y-scroll">
                    {allCategory.length > 0 &&
                      allCategory.map((c, i) => (
                        <span
                          className={` px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                            category === c.name && "bg-indigo-500"
                          }`}
                          onClick={() => {
                            setCateShow(false);
                            setCategory(c.name);
                            setSearchValue("");
                            setAllCategory(categorys);
                          }}
                        >
                          {c.name}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
              <div className=" flex flex-col w-full gap-1">
                <label htmlFor="stock">Stock</label>
                <input
                  className=" px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.stock}
                  type="number"
                  min="0"
                  placeholder="product stock"
                  name="stock"
                  id="stock"
                />
              </div>
            </div>
            <div className=" flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className=" flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  className=" px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.price}
                  type="number"
                  min="0"
                  placeholder="product price"
                  name="price"
                  id="price"
                />
              </div>
              <div className=" flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  className=" px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.discount}
                  type="number"
                  placeholder="% discount"
                  name="discount"
                  id="discount"
                />
              </div>
            </div>
            <div className=" flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="description">Description</label>
              <textarea
                rows={4}
                className=" px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.description}
                type="textarea"
                placeholder="description"
                name="description"
                id="description"
              ></textarea>
            </div>
            <div className=" grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
              {imageShow &&
                imageShow.length > 0 &&
                imageShow.map((img, i) => (
                  <div>
                    <label className=" h-[180px]" htmlFor={i}>
                      <img src={img} className=" h-full" alt="product image" />
                    </label>
                    <input
                      onChange={(e) => changeImage(img, e.target.files)}
                      type="file"
                      id={i}
                      className="hidden"
                    />
                  </div>
                ))}
            </div>
            <div className=" flex">
              <button
                disabled={loader ? true : false}
                className=" bg-blue-500 w-[220px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overRideStyle} />
                ) : (
                  "Update Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
