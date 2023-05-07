import React, { useState, useRef } from "react";
import "../styles/login.sass";
import userImg from "../../public/user (1).png";
import userImgSm from "../../public/user.png";
import passwordImgSm from "../../public/lock.png";
import { requestWithConfig } from "../sevices/request";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState<string>(localStorage.getItem("username") as string);
  const [password, setPassword] = useState<string>(localStorage.getItem("password") as string);
  const [isUser, setIsUser] = useState(false);
  const [ischecked, setIschecked] = useState<boolean | undefined>(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    const res: any = await requestWithConfig({
      username:  username,
      password: password,
    });

    if (res.status === "OK") {
      setIsUser(true);
      if (ischecked) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      }
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
            defaultValue={localStorage.getItem("username") as string}
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
            defaultValue={localStorage.getItem("password") as string}
            ref={passwordRef}
            onChange={() =>
              passwordRef.current && setPassword(passwordRef.current.value)
            }
          />
        </div>
        <div className="input-checkbox">
          <div className="iuput-checkbox-label">記住我?</div>
          <input
            type="checkbox"
            ref={checkRef}
            onChange={() => setIschecked(checkRef.current?.checked)}
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
