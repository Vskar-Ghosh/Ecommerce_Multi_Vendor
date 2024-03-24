import React from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <div className=" w-full">
      <Headers />
      <div className=" w-[85%] flex flex-wrap mx-auto py-10">
        <div className=" flex justify-center items-center w-full flex-col gap-10">
          <h2 className=" text-5xl text-slate-800 italic font-bold">
            Contact Us
          </h2>

          <div className=" w-[70%] bg-[#ff866e] rounded-md ">
            <div className=" w-full p-10 relative flex flex-wrap md:flex-col md:items-center justify-between gap-5">
              <div className=" w-2/5 text-center">
                <h1 className=" text-2xl font-bold capitalize">
                  Our customer service phone number
                </h1>
                <p className=" text-xl font-semibold">+88-01zzzzzzzzz,</p>
              </div>
              <div className=" w-2/5 text-center">
                <h1 className=" text-2xl font-bold capitalize">
                  Our corporate office phone number
                </h1>
                <p className=" text-xl font-semibold">+88-01zzzzzzzzz,</p>
              </div>
              <div className=" w-2/5 text-center">
                <h1 className=" text-2xl font-bold capitalize">
                  Our corporate sales team phone number
                </h1>
                <p className=" text-xl font-semibold">+88-01zzzzzzzzz,</p>
              </div>
              <div className=" w-2/5 text-center ">
                <h1 className=" text-2xl font-bold capitalize">
                  Connect with us
                </h1>
                <ul className=" flex justify-center items-center mt-2 gap-3">
                  <li>
                    <a
                      className=" w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                      href="#"
                    >
                      <FaFacebookF />
                    </a>
                  </li>
                  <li>
                    <a
                      className=" w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                      href="#"
                    >
                      <AiOutlineTwitter />
                    </a>
                  </li>
                  <li>
                    <a
                      className=" w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                      href="#"
                    >
                      <FaLinkedin />
                    </a>
                  </li>
                  <li>
                    <a
                      className=" w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                      href="#"
                    >
                      <AiFillGithub />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
