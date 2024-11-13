import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { GrFacebookOption } from "react-icons/gr";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import Modal from "react-modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import SignUp from "./SignUp";
import { useDispatch } from "react-redux";
import { LoginWithFacebook, login, loginWithGoogle } from "../store/authSlice";

Modal.setAppElement("#root");

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
  email: "",
  password: "",
};

const SignIn = ({ isLoginModelOpen, setIsLoginModelOpen }) => {
  const [isSignUpModelOpen, setIsSignUpModelOpen] = useState(false);
  const [loginData, setLoginData] = useState(initialState);
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

  const responseFacebook = async (response) => {
    dispatch(LoginWithFacebook(response.accessToken,closeModal));
  //  closeModal();
  };

  const onSuccesGoogle = (response) => {
    dispatch(loginWithGoogle(response.tokenId,closeModal));
   // closeModal();
  };

  const onFailureGoogle = (response) => {
    console.log(response);
  };

  const closeModal = () => {
    setIsLoginModelOpen(!isLoginModelOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = () => {
    dispatch(login(loginData,closeModal));
  //  closeModal();
  };

  return (
    <Modal
      isOpen={isLoginModelOpen}
     // onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Sign In Modal"
    >
      <div className="flex justify-end">
        <IoIosCloseCircleOutline
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          onClick={() => setIsLoginModelOpen(!isLoginModelOpen)}
        />
      </div>
      <div
        className="bg-gray-100 text-gray-900 flex justify-center w-auto"
        style={{
          display: isSignUpModelOpen && "none",
        }}
      >
        <div className="m-0 bg-white sm:rounded-lg flex justify-center flex-1">
          <div className="mt-2 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center gap-3">
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Login with Google"
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
                  Or login with username
                </div>
              </div>
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Email"
                  defaultValue={loginData.email}
                  name="email"
                  onChange={handleChange}
                />
                <input
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  defaultValue={loginData.password}
                  name="password"
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
                  <span className="ml-3">Login</span>
                </button>
                <p className="mt-2 text-xs text-gray-600 text-center">
                  Don't have an account yet?
                  <button
                    className="border-b border-gray-500 border-dotted"
                    onClick={() => {
                      setIsSignUpModelOpen(true);
                    }}
                  >
                    Sign up
                  </button>
                  <SignUp
                    isSignUpModelOpen={isSignUpModelOpen}
                    setIsSignUpModelOpen={setIsSignUpModelOpen}
                    isLoginModelOpen={isLoginModelOpen}
                    setIsLoginModelOpen={setIsLoginModelOpen}
                  />
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

export default SignIn;
