import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { BsImage } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { PropagateLoader } from "react-spinners";
import { overRideStyle } from "../../utils/utils";
import { toast } from "react-hot-toast";
import {
  categoryAdd,
  get_category,
  messageClear,
} from "../../store/Reducers/categoryReducer";
import { useSelector, useDispatch } from "react-redux";
import Search from "../components/Search";

const Category = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage, categorys } = useSelector(
    (state) => state.category
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  const [imageShow, setImageShow] = useState("");
  const [state, setState] = useState({
    name: "",
    image: "",
  });

  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };

  const add_category = (e) => {
    e.preventDefault();
    dispatch(categoryAdd(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear);
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear);
      setState({
        name: "",
        image: "",
      });
      setImageShow("");
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_category(obj));
  }, [searchValue, currentPage, parPage]);

  return (
    <div className=" px-2 lg:px-7 pt-5">
      <div className=" flex  lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md">
        <h1 className=" text-[#d0d2d6] font-semibold text-lg">Categorys</h1>
        <button
          onClick={() => setShow(true)}
          className=" bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-2 py-2 cursor-pointer text-white rounded-sm text-sm"
        >
          Add
        </button>
      </div>
      <div className=" flex flex-wrap w-full">
        <div className=" w-full lg:w-7/12">
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
                      No
                    </th>
                    <th scope="col" className=" py-3 px-4">
                      Image
                    </th>
                    <th scope="col" className=" py-3 px-4">
                      Name
                    </th>
                    <th scope="col" className=" py-3 px-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categorys.map((d, i) => (
                    <tr key={i}>
                      <td
                        scope="row"
                        className=" py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {i + 1}
                      </td>
                      <td
                        scope="row"
                        className=" py-1 px-4  font-medium whitespace-nowrap"
                      >
                        <img
                          className=" w-[45px] h-[45px]"
                          src={d.image}
                          alt="user"
                        />
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <span>{d.name} </span>
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4  font-medium whitespace-nowrap"
                      >
                        <div className=" flex justify-start items-center gap-4">
                          <Link className=" p-3 bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50">
                            <FaEdit />
                          </Link>
                          <Link className=" p-3 bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                            <FaTrash />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className=" w-full flex justify-end mt-4 bottom-4 roght-4">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={50}
                parPage={parPage}
                showItem={3}
              />
            </div>
          </div>
        </div>
        <div
          className={` w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[9999] top-0 transition-all duration-500`}
        >
          <div className=" w-full pl-5">
            <div className=" bg-[#283046] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d2d0d6] ">
              <div className=" flex justify-between items-center mb-4">
                <h1 className=" text-[#d2d0d6] font-semibold text-xl w-full text-center ">
                  Add Category
                </h1>
                <div
                  onClick={() => setShow(false)}
                  className=" block lg:hidden text-[#d0d2d6] cursor-pointer"
                >
                  <GrClose />
                </div>
              </div>
              <form onSubmit={add_category}>
                <div className=" flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="categoryNmae">Category Name</label>
                  <input
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    value={state.name}
                    type="text"
                    placeholder="category name"
                    id="name"
                    name="category_name"
                    className=" px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className=" flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-[#d0d2d6]"
                  >
                    {imageShow ? (
                      <img className=" w-full h-full" src={imageShow} />
                    ) : (
                      <>
                        <span>
                          <BsImage />
                        </span>
                        <span>Select Image</span>
                      </>
                    )}
                  </label>
                </div>
                <input
                  onChange={imageHandle}
                  type="file"
                  name="image"
                  id="image"
                  className=" hidden"
                  required
                />
                <div className=" mt-4">
                  <button
                    disabled={loader ? true : false}
                    className=" bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                  >
                    {loader ? (
                      <PropagateLoader
                        color="#fff"
                        cssOverride={overRideStyle}
                      />
                    ) : (
                      "Add Category"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
