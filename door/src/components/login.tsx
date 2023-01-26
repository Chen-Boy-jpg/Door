import React, { useState, useRef } from "react";
import "../styles/login.sass";
import userImg from "../../public/user (1).png";
import userImgSm from "../../public/user.png";
import passwordImgSm from "../../public/lock.png";
import { requestWithConfig } from "../sevices/request";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [isUser, setIsUser] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    let res: any = await requestWithConfig({
      username: username,
      password: password,
    });
    if (res.status === "OK") {
      setIsUser(true);
      sessionStorage.setItem("isAuth", "pass");
    } else {
      console.log("Account or password incorrect");
    }
  }
  return (
    <div className="container">
      <div className="user-img">
        <img src={userImg} alt="" />
      </div>

      <div className="form-area">
        <div className="input-username">
          <img src={userImgSm} alt="" />
          <input
            type="text"
            placeholder="USERNAME"
            ref={usernameRef}
            onChange={(e) =>
              usernameRef.current && setUsername(usernameRef.current.value)
            }
          />
        </div>
        <div className="input-password">
          <img src={passwordImgSm} alt="" />
          <input
            type="password"
            placeholder="PASSWORD"
            ref={passwordRef}
            onChange={() =>
              passwordRef.current && setPassword(passwordRef.current.value)
            }
          />
        </div>
        <div className="login-btn">
          <button onClick={handleSubmit}>LOGIN</button>
          {isUser && <Navigate to="/door" replace={true} />}
        </div>
      </div>
    </div>
  );
};

export default Login;
