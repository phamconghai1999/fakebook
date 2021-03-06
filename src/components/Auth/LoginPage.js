/* eslint-disable react/jsx-no-target-blank */
import React, {useState} from "react";
import "./Login.css";
import "./Login-mobile.css";
import {Link} from "react-router-dom";
import authApi from "../../store/api/authApi";
// for login
import {useDispatch} from "react-redux";
import {signin} from "../../store/reducers/authSlice";
import {setUserData} from "../../store/reducers/userSlice";

function LoginPage() {
  const dispatch = useDispatch();

  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
  const [regData, setRegData] = useState(initialState);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [regModalState, setModalState] = useState("hidden");
  const [passwordType, setPasswordType] = useState("password");
  const handleChange = (e) => {
    setRegData({...regData, [e.target.name]: e.target.value});
  };
  const showRegisterModal = () => {
    setModalState("show");
  };
  const hideRegisterModal = () => {
    setModalState("hidden");
    setRegData(initialState);
  };

  const togglePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  const loginHandler = async () => {
    try {
      const response = await authApi.login(loginData);
      if (response.success) {
        dispatch(signin(response.accessToken));
        dispatch(setUserData(response.userData));
      } else {
        alert("Fail: " + response.message);
      }
    } catch (error) {
      console.log("Failed to login: " + error.message);
    }
  };

  const registerNewAccount = async (e) => {
    if (validateRegistration()) {
      try {
        const response = await authApi.register({
          name: regData.lastname + " " + regData.firstname,
          username: regData.username,
          password: regData.password,
          email: regData.email,
        });

        if (response.success) {
          alert("Register successfull !");
          setRegData(initialState);
          hideRegisterModal();
          setLoginData({
            username: regData.username,
            password: regData.password,
          });
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.log("Error registering: " + error);
      }
    } else {
      alert("Vui l??ng ??i???n ?????y ????? th??ng tin");
    }
  };

  const validateRegistration = () => {
    if (
      !regData.firstname ||
      !regData.lastname ||
      !regData.username ||
      !regData.password
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <React.Fragment>
      <div className='login-page'>
        <div className='login-page__brand'>
          <div className='login-page__brand-name'>fakebook</div>
          <div className='login-page__brand-quote'>
            Fakebook gi??p b???n k???t n???i v?? chia s??? v???i m???i ng?????i trong cu???c s???ng
            c???a b???n.
            <br />
            Fakebook l?? 1 trang web fake ????ng nh?? t??n c???a n??, mu???n bi???t th??m chi
            ti???t v??? ng?????i t???o, li??n h??? t???i{" "}
            <a href='https://www.facebook.com/anivia.1999' target='_blank'>
              ????y
            </a>
          </div>
        </div>
        <div className='login-page__body'>
          <div className='login-container'>
            <div className='lg-form'>
              <div className='lg-form__username'>
                <input
                  type='text'
                  className='lg-form__username-input'
                  placeholder='Email ho???c username'
                  value={loginData.username}
                  onChange={(e) => {
                    setLoginData({...loginData, username: e.target.value});
                  }}
                />
              </div>
              <div className='lg-form__password'>
                {/* <!-- <div className="lg-form__password focus"> --> */}
                <input
                  type={passwordType}
                  className='lg-form__password-input'
                  placeholder='M???t kh???u'
                  value={loginData.password}
                  onChange={(e) => {
                    setLoginData({...loginData, password: e.target.value});
                  }}
                />
                <div
                  className='lg-form__password-toggle'
                  onClick={() => {
                    togglePasswordType();
                  }}>
                  <i
                    className={
                      "far fa-eye" +
                      (passwordType === "password" ? "" : "-slash")
                    }></i>
                  {/* <!-- <i className="far fa-eye-slash"></i> --> */}
                </div>
              </div>
              <button
                className='lg-form__login-btn'
                onClick={() => {
                  loginHandler();
                }}>
                ????ng nh???p
              </button>
              <div className='lg-form__reset-password'>
                <Link to='#' className='lg-form__reset-password-link'>
                  Qu??n m???t kh???u?
                </Link>
              </div>
            </div>
            <div className='register-container'>
              <button
                className='register-btn'
                onClick={() => {
                  showRegisterModal();
                }}>
                T???o t??i kho???n m???i
              </button>
            </div>
          </div>
          <div className='login-page__body-create-page'>
            <Link to='#'>T???o Trang</Link>{" "}
            <span>
              d??nh cho ng?????i n???i ti???ng, th????ng hi???u ho???c doanh nghi???p.
            </span>
          </div>
        </div>
      </div>
      <div className={"reg-modal " + regModalState} id='reg-modal'>
        <div className='modal__overlay'></div>
        <div className='modal__main'>
          <div className='reg-modal__header'>
            <div className='reg-modal__header-title'>????ng k??</div>
            <div className='reg-modal__header-desc'>
              Nhanh ch??ng v?? d??? d??ng.
            </div>
          </div>
          <div
            className='reg-modal__exit-btn'
            onClick={() => {
              hideRegisterModal();
            }}>
            <i className='fas fa-times'></i>
          </div>
          <div className='reg-modal__body'>
            <div className='reg-modal__body-name '>
              <input
                type='text'
                name='lastname'
                className='reg-modal__body-input-lastname'
                placeholder='H???'
                required
                value={regData.lastname}
                onChange={(e) => handleChange(e)}
              />
              <input
                type='text'
                name='firstname'
                className='reg-modal__body-input-firstname'
                placeholder='T??n'
                value={regData.firstname}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className='reg-modal__body-username'>
              <input
                type='text'
                name='username'
                placeholder='Email or username'
                value={regData.username}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className='reg-modal__body-password'>
              <input
                type='password'
                name='password'
                placeholder='M???t kh???u m???i'
                value={regData.password}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className='reg-modal__body-birthday'>
              <div className='reg-modal__body-birthday-title'>Sinh nh???t</div>
              <span className='reg-modal__body-birthday-selector'>
                <select
                  name='birthday_day'
                  id='day'
                  title='Ng??y'
                  className='reg-modal__body-birthday-day'
                  aria-label='Ng??y'>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
                <select
                  name='birthday_month'
                  id='month'
                  title='Th??ng'
                  className='reg-modal__body-birthday-month'
                  aria-label='Th??ng'>
                  <option value='1'>Th??ng 1</option>
                  <option value='2'>Th??ng 2</option>
                  <option value='3'>Th??ng 3</option>
                  <option value='4'>Th??ng 4</option>
                  <option value='5'>Th??ng 5</option>
                  <option value='6'>Th??ng 6</option>
                  <option value='7'>Th??ng 7</option>
                  <option value='8'>Th??ng 8</option>
                  <option value='9'>Th??ng 9</option>
                  <option value='10'>Th??ng 10</option>
                  <option value='11'>Th??ng 11</option>
                  <option value='12'>Th??ng 12</option>
                </select>
                <select
                  name='birthday_year'
                  id='year'
                  title='Th??ng'
                  className='reg-modal__body-birthday-year'
                  aria-label='N??m'>
                  <option value='2022'>2022</option>
                  <option value='2021'>2021</option>
                  <option value='2020'>2020</option>
                  <option value='2019'>2019</option>
                  <option value='2018'>2018</option>
                  <option value='2017'>2017</option>
                  <option value='2016'>2016</option>
                  <option value='2015'>2015</option>
                  <option value='2014'>2014</option>
                  <option value='2013'>2013</option>
                  <option value='2012'>2012</option>
                  <option value='2011'>2011</option>
                </select>
              </span>
            </div>
            <div className='reg-modal__body-description'>
              B???ng c??ch nh???p v??o ????ng k??, b???n ?????ng ?? v???i ??i???u kho???n, Ch??nh s??ch
              d??? li???u v?? Ch??nh s??ch cookie c???a ch??ng t??i.
            </div>
            <button
              className='reg-modal__body-register-btn'
              onClick={() => {
                registerNewAccount();
              }}>
              ????ng k??
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LoginPage;
