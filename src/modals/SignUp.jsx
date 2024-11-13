import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { GrFacebookOption } from "react-icons/gr";
import { gapi } from "gapi-script";
import Modal from "react-modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import OtpVerification from "./OtpVerification";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  LoginWithFacebook,
  register,
  loginWithGoogle,
} from "../store/authSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const initialState = {
  name: "",
  username: "",
  email: "",
  password: "",
  phone_number: "",
  confirm_password: "",
};

const SignUp = ({
  isSignUpModelOpen,
  setIsSignUpModelOpen,
  isLoginModelOpen,
  setIsLoginModelOpen,
}) => {
  const [isOtpModalOpen, setIsOtpModal] = useState(false);
  const [registerData, setRegisterData] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const onSuccesGoogle = (response) => {
    dispatch(loginWithGoogle(response.tokenId,closeModal));
  //  closeModal();
  };

  const onFailureGoogle = (response) => {
    console.log(response);
  };

  const responseFacebook = async (response) => {
    dispatch(LoginWithFacebook(response.accessToken,closeModal));
  //  closeModal();
  };

  const closeModal = () => {
    setIsSignUpModelOpen(!isSignUpModelOpen);
    setIsLoginModelOpen(false);
  };

  const submitHandler = () => {
    dispatch(register(registerData,setIsOtpModal));
    // setIsOtpModal(!isOtpModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Modal
      isOpen={isSignUpModelOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Sign up Modal"
    >
      <OtpVerification
        isOtpModalOpen={isOtpModalOpen}
        closeModal={closeModal}
      />
      <div className="flex justify-end">
        <IoIosCloseCircleOutline
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          onClick={closeModal}
        />
      </div>
      <div
        className=" bg-gray-100 text-gray-900 flex justify-center w-full"
        style={{
          display: isOtpModalOpen && "none",
        }}
      >
        <div className="m-0 bg-white sm:rounded-lg flex justify-center flex-1">
          <div className="mt-0 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
            <div className="w-full flex-1 mt-2">
              <div className="flex flex-col items-center gap-2">
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="SignUp with Google"
                  onSuccess={onSuccesGoogle}
                  onFailure={onFailureGoogle}
                  cookiePolicy={"single_host_origin"}
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                />

                <div className="w-full max-w-xs shadow transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                  <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                    autoLoad={false}
                    fields="name,email,picture"
                    textButton="SignUp with Facebook"
                    callback={responseFacebook}
                    cssClass="w-full shadow py-2 flex justify-center items-center text-gray-800 transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                    icon={
                      <GrFacebookOption className="text-blue-600 text-2xl" />
                    }
                  />
                </div>
              </div>
              <div className="my-2 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign up with e-mail
                </div>
              </div>
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full my-1 px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Name"
                  defaultValue={registerData.name}
                  name="name"
                  onChange={handleChange}
                />
                <input
                  className="w-full my-1 px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Username"
                  defaultValue={registerData.username}
                  name="username"
                  onChange={handleChange}
                />
                <input
                  className="w-full my-1 px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  defaultValue={registerData.email}
                  name="email"
                  onChange={handleChange}
                />
                <input
                  className="w-full my-1 px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Mobile"
                  defaultValue={registerData.phone_number}
                  name="phone_number"
                  onChange={handleChange}
                />
                <input
                  className="w-full my-1 px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  defaultValue={registerData.password}
                  name="password"
                  onChange={handleChange}
                />
                <input
                  className="w-full my-1 px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Confirm Password"
                  defaultValue={registerData.confirm_password}
                  name="confirm_password"
                  onChange={handleChange}
                />
                <button
                  className="mt-5 tracking-wide font-semibold text-gray-100 w-full py-2 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none border border-primary-500 hover:bg-primary-500 hover:text-white px-6  text-primary-500"
                  onClick={submitHandler}
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy={7} r={4} />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-2 text-xs text-gray-600 text-center">
                  Already have an account?
                  <button
                    className="border-b border-gray-500 border-dotted"
                    onClick={() =>
                      setIsSignUpModelOpen(false) && setIsLoginModelOpen(true)
                    }
                  >
                    Log in
                  </button>
                </p>
                <p className="mt-2 text-xs text-gray-600 text-center">
                  I agree to abide by templatana's
                  <Link
                    to="/"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service
                  </Link>
                  and its
                  <Link
                    to="/"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SignUp;
