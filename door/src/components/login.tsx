import React from "react";
import "../styles/login.sass";
import userImg from "../../public/user (1).png";
import userImgSm from "../../public/user.png";
import passwordImgSm from "../../public/lock.png";
const Login = () => {
  return (
    <div className="container">
      <div className="user-img">
        <img src={userImg} alt="" />
      </div>

      <div className="form-area">
        <div className="input-username">
          <img src={userImgSm} alt="" />
          <input type="text" placeholder="USERNAME" />
        </div>
        <div className="input-password">
          <img src={passwordImgSm} alt="" />
          <input type="text" placeholder="PASSWORD" />
        </div>
        <div className="login-btn">
          <button>LOGIN</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
