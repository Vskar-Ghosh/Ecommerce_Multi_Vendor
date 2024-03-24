import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { FaList } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  get_admin_message,
  get_sellers,
  messageClear,
  send_message_seller_admin,
  updateSellerMessage,
} from "../../store/Reducers/chatReducer";
import { Link, useParams } from "react-router-dom";
import { BsEmojiSmile } from "react-icons/bs";
import { socket } from "../../utils/utils";

const ChatSeller = () => {
  const dispatch = useDispatch();
  const {
    sellers,
    activeSellers,
    seller_admin_message,
    currentSeller,
    successMessage,
  } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);

  const { sellerId } = useParams();
  const [text, setText] = useState("");
  const [reciveMessage, setReciveMessage] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    dispatch(get_sellers());
  }, []);

  const send = (e) => {
    e.preventDefault();
    dispatch(
      send_message_seller_admin({
        senderId: "",
        reciverId: sellerId,
        message: text,
        senderName: "Myshop support",
      })
    );
    setText("");
  };

  useEffect(() => {
    if (sellerId) {
      dispatch(get_admin_message(sellerId));
    }
  }, [sellerId]);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_message_admin_to_seller",
        seller_admin_message[seller_admin_message.length - 1]
      );
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    socket.on("recive_seller_message", (msg) => {
      setReciveMessage(msg);
    });
  }, []);

  useEffect(() => {
    if (reciveMessage) {
      if (
        reciveMessage.senderId === sellerId &&
        reciveMessage.reciverId === ""
      ) {
        dispatch(updateSellerMessage(reciveMessage));
      } else {
        toast.success(reciveMessage.senderName + " send a message");
      }
    }
  }, [reciveMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [seller_admin_message]);
  return (
    <div className=" px-2 lg:px-7 py-5">
      <div className=" w-full bg-[#283046] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className=" flex w-full h-full relative">
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "-left-[16px]" : "-left-[336px]"
            } md:left-0 md:relative transition-all`}
          >
            <div className=" w-full h-[calc(100vh-177px)] bg-[#252b3b] md:bg-transparent overflow-y-auto">
              <div className=" flex text-xl justify-between items-center p-4 md:p-0 md:px-0 md:pb-3 text-white">
                <h2>Sellers</h2>
                <span
                  onClick={() => setShow(!show)}
                  className=" block cursor-pointer md:hidden"
                >
                  <IoMdClose />
                </span>
              </div>
              {sellers.map((s, i) => (
                <Link
                  to={`/admin/dashboard/chat-seller/${s._id}`}
                  key={i}
                  className={` h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-md cursor-pointer ${
                    sellerId === s._id && "bg-slate-700"
                  }`}
                >
                  <div className=" relative">
                    <img
                      className=" w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                      src={s.image}
                      alt="sellerimage"
                    />
                    {activeSellers.some((a) => a.sellerId === s._id) && (
                      <div className=" w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    )}
                  </div>
                  <div className=" flex justify-center items-start flex-col w-full">
                    <div className=" flex justify-between items-center w-full">
                      <h2 className=" text-base font-semibold">{s.name}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className=" w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className=" flex justify-between items-center">
              {sellerId && (
                <div className=" flex justify-start items-center gap-3">
                  <div className=" relative">
                    <img
                      className=" w-[40px] h-[40px] border-green-500 border-2 max-w-[38px] p-[2px] rounded-full"
                      src={currentSeller.image}
                      alt="sellerimage"
                    />
                  </div>
                  <span className=" text-white">{currentSeller.name}</span>
                </div>
              )}
              <div
                onClick={() => setShow(!show)}
                className=" w-[35px] flex md:hidden h-[35px] rounded-md bg-slate-500 shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center text-white"
              >
                <span>
                  <FaList />
                </span>
              </div>
            </div>
            <div className=" py-4 ">
              <div className=" bg-slate-800 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                {sellerId ? (
                  seller_admin_message.map((m, i) => {
                    if (m.senderId === sellerId) {
                      return (
                        <div
                          ref={scrollRef}
                          className=" w-full flex justify-start items-center"
                        >
                          <div className=" flex justify-start items-start gap-2 md:px-3 py-2 max-w-[85%]">
                            <div>
                              <img
                                className=" w-[38px] h-[38px] border-white-500 border-2 max-w-[38px] p-[3px] rounded-full"
                                src="/images/admin.jpg"
                                alt="sellerimage"
                              />
                            </div>
                            <div className=" flex justify-center items-center flex-col w-full bg-yellow-500 shadow-lg shadow-yellow-500/50 text-white px-2 py-1 rounded-sm">
                              <span>{m.message}</span>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          ref={scrollRef}
                          className=" w-full flex justify-end items-center"
                        >
                          <div className=" flex justify-start items-start gap-2 md:px-3 py-2 max-w-[85%]">
                            <div className=" flex justify-center items-center flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white px-2 py-1 rounded-sm">
                              <span>{m.message}</span>
                            </div>
                            <div>
                              <img
                                className=" w-[38px] h-[38px] border-white-500 border-2 max-w-[38px] p-[3px] rounded-full"
                                src="/images/admin.jpg"
                                alt="sellerimage"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className=" w-full h-full flex justify-center items-center flex-col gap-2 text-white">
                    <span>
                      <BsEmojiSmile />
                    </span>
                    <span>Select Seller</span>
                  </div>
                )}
              </div>
            </div>
            <form onSubmit={send} className=" flex gap-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                readOnly={sellerId ? false : true}
                type="text"
                placeholder="input your message"
                className=" w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#d0d2d6]"
              />
              <button
                disabled={sellerId ? false : true}
                className=" bg-cyan-500 shadow-lg hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md flex justify-center items-center"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSeller;
