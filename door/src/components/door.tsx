import React, { useState, useEffect } from "react";
import "../styles/door.sass";

import io from "socket.io-client";
interface Socket {
  emit: (event: string, data: any) => void;
  on: (event: string, callback: (data: any) => void) => void;
  disconnect: () => void;
}
let socket: Socket;
const { VITE_API_URL } = import.meta.env;

const Door = () => {
  const [openState, setOpenState] = useState(true);
  const [closeState, setCloseState] = useState(false);
  sessionStorage.removeItem("isAuth");
  useEffect(() => {
    socket = io(VITE_API_URL, { transports: ["websocket"] });

    socket.on("message", (data: any) => {
      console.log(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  function open() {
    setOpenState(!openState);
    setCloseState(!closeState);
    socket.emit("open", "open");
  }
  function close() {
    setOpenState(!openState);
    setCloseState(!closeState);
    socket.emit("close", "close");
  }

  return (
    <div className="btn-group">
      <div
        className={openState ? "btn-open-enable" : "btn-open-disable"}
        onClick={open}
      >
        OPEN
      </div>
      <div
        className={closeState ? "btn-close-enable" : "btn-close-disable"}
        onClick={close}
      >
        CLOSE
      </div>
    </div>
  );
};

export default Door;
