import React, { Fragment,  useRef, useState } from "react";
import { toastError, toastWarn } from "../../../utils/ToastUtil";
import googleIcon from "../../../resources/img/google-icon.png";
import showEye from "../../../resources/vectors/Show.svg";
import hideEye from "../../../resources/vectors/Hide.svg";
import { useHistory } from "react-router";

const Login = ({ isLogin, setIsLoading, login }) => {  

  const history = useHistory();

  const usernameInput = useRef();
  const passInput = useRef();
  const [isLoginPassVisible, setIsLoginPassVisible] = useState(false);

  const loginHandler = () => {
    setIsLoading(true);
    const loginUsernameOrEmail = usernameInput.current.value;
    const loginPass = passInput.current.value;
    if (loginUsernameOrEmail && loginPass) {
      login(loginUsernameOrEmail, loginPass)
        .then(() => {
          setIsLoading(false);
          setTimeout(() => {
            history.push("/");
          }, 50);
        })
        .catch((_err) => {
          setIsLoading(false);
          toastError("مشکلی پیش آمد دوباره امتحان کنید");
          //todo handle error
        });
    } else {
      setIsLoading(false);
      toastWarn("لطفا نام کاربری و پسورد درستی وارد کنید");
    }
  };

  const loginTogglePassShow = () => {
    if (isLoginPassVisible) setIsLoginPassVisible(false);
    else setIsLoginPassVisible(true);
  };

  return (
    <Fragment>
      <div className={`login ${isLogin ? "show" : "hide"}`}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="نام کاربری یا ایمیل"
            ref={usernameInput}
          />

          <div>
            <input
              className="pass-auth"
              type={isLoginPassVisible ? "text" : "password"}
              placeholder=" رمز عبور"
              ref={passInput}
            />
            <img
              src={isLoginPassVisible ? showEye : hideEye}
              onClick={loginTogglePassShow}
              alt=""
            />
          </div>

          <div className="auth-btns">
            <button className="submit" type="submit" onClick={loginHandler}>
              !تمام
            </button>
            <div className="google">
              <div>
                <img src={googleIcon} alt="" />
              </div>
              <p>ثبت نام با گوگل</p>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
