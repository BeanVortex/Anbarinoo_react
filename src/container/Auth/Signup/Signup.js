import React, { useState, Fragment } from "react";
import { useHistory } from "react-router";
import { debounce } from "debounce";
import { toastError, toastWarn } from "../../../utils/ToastUtil";
import googleIcon from "../../../resources/img/google-icon.png";
import showEye from "../../../resources/vectors/Show.svg";
import hideEye from "../../../resources/vectors/Hide.svg";

const Signup = ({ isLogin, setIsLoading, signup }) => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  //validation fields check
  const [isUserNameOK, setIsUserNameOK] = useState(false);
  const [isEmailOK, setIsEmailOK] = useState(false);
  const [isPassLengthOK, setIsPassLengthOK] = useState(false);
  const [isPassSpecialOK, setIsPassSpecialOK] = useState(false);
  const [isPassNumberOK, setIsPassNumberOK] = useState(false);
  const [isPassUpperOK, setIsPassUpperOK] = useState(false);
  const [isPassLowerOK, setIsPassLowerOK] = useState(false);
  const [isSignupPassVisible, setIsSignupPassVisible] = useState(false);

  const signupTogglePassShow = () => {
    if (isSignupPassVisible) setIsSignupPassVisible(false);
    else setIsSignupPassVisible(true);
  };

  const signupHandler = () => {
    setIsLoading(true);
    if (
      isUserNameOK &&
      isEmailOK &&
      isPassSpecialOK &&
      isPassUpperOK &&
      isPassLowerOK &&
      isPassLengthOK &&
      isPassNumberOK
    ) {
      signup(email, username, pass)
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
      toastWarn("لطفا همه موارد ثبت نام را رعایت کنید");
    }
  };

  const signupUsernameChange = debounce((e) => {
    const length = e.target.value.length;
    if (length >= 5) {
      setUsername(e.target.value);
      setIsUserNameOK(true);
    } else {
      setUsername("");
      setIsUserNameOK(false);
    }
  }, 300);

  const signupPassChange = debounce((e) => {
    const val = e.target.value;

    if (val.length >= 6) {
      if (!isPassLengthOK) {
        setIsPassLengthOK(true);
        setPass(val);
      }
    } else setIsPassLengthOK(false);

    const uppercaseRg = /[A-Z]/;
    if (uppercaseRg.test(val)) {
      if (!isPassUpperOK) {
        setIsPassUpperOK(true);
        setPass(val);
      }
    } else setIsPassUpperOK(false);

    const lowercaseRg = /[a-z]/;
    if (lowercaseRg.test(val)) {
      if (!isPassLowerOK) {
        setIsPassLowerOK(true);
        setPass(val);
      }
    } else setIsPassLowerOK(false);

    const numRg = /[0-9]/;
    if (numRg.test(val)) {
      if (!isPassNumberOK) {
        setIsPassNumberOK(true);
        setPass(val);
      }
    } else setIsPassNumberOK(false);

    const specialRg = /[^a-zA-Z0-9]/;
    if (specialRg.test(val)) {
      if (!isPassSpecialOK) {
        setIsPassSpecialOK(true);
        setPass(val);
      }
    } else setIsPassSpecialOK(false);
  }, 300);

  const signupEmailChange = debounce((e) => {
    const emailRg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRg.test(e.target.value)) {
      setEmail(e.target.value);
      setIsEmailOK(true);
    } else {
      setEmail("");
      setIsEmailOK(false);
    }
  }, 300);

  return (
    <Fragment>
      <div className={`signup ${isLogin ? "hide" : "show"}`}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="نام کاربری"
            onChange={signupUsernameChange}
          />
          <input
            type="email"
            placeholder="    ایمیل"
            onChange={signupEmailChange}
          />
          <div>
            <input
              className="pass-auth"
              type={isSignupPassVisible ? "text" : "password"}
              placeholder=" رمز عبور"
              onChange={signupPassChange}
            />
            <img
              src={isSignupPassVisible ? showEye : hideEye}
              onClick={signupTogglePassShow}
              alt=""
            />
          </div>
          <ul className="validations">
            <li className={`${isUserNameOK ? "done" : ""}`}>
              نام کاربری حداقل 5 کاراکتر
            </li>
            <li className={`${isPassLengthOK ? "done" : ""}`}>
              رمز عبور حداقل 6 کاراکتر
            </li>
            <li className={`${isPassUpperOK ? "done" : ""}`}>
              رمز عبور دارای حداقل یک کاراکتر بزرگ انگلیسی
            </li>
            <li className={`${isPassLowerOK ? "done" : ""}`}>
              رمز عبور دارای حداقل یک کاراکتر کوچک انگلیسی
            </li>
            <li className={`${isPassNumberOK ? "done" : ""}`}>
              رمز عبور دارای حداقل یک عدد
            </li>
            <li className={`${isPassSpecialOK ? "done" : ""}`}>
              رمز عبور دارای حداقل یک کاراکتر خاص
            </li>
            <li className={`${isEmailOK ? "done" : ""}`}>ایمیل صحیح</li>
          </ul>
          <div className="auth-btns">
            <button className="submit" type="submit" onClick={signupHandler}>
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

export default Signup;
