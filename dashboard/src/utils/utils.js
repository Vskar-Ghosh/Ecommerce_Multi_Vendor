import io from "socket.io-client";
import { base_url } from "./config";
export const overRideStyle = {
  display: "flex",
  margin: "0 auto",
  height: "24px",
  justifyContent: "center",
  alignItems: "center",
};

export const socket = io(base_url);
