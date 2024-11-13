import React, { useRef, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { verifyMobileOtp ,resendOtp} from "../store/authSlice";

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

const OtpVerification = ({ isOtpModalOpen, closeModal }) => {
  const inputRefs = useRef([]);
  const [otpValue, setOtpValue] = useState(Array(6).fill(""));
  const signupData = useSelector((state) => state.auth.signup);

  const dispatch = useDispatch();

  const setFocus = (index) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyUp = (index, e) => {
    if (e.keyCode >= 48 && e.keyCode <= 57) {
      const newOtpValue = [...otpValue];
      newOtpValue[index] = e.key;
      setOtpValue(newOtpValue);
      setFocus(index);
    } else if (e.keyCode === 8 && index > 0) {
      const newOtpValue = [...otpValue];
      newOtpValue[index - 1] = "";
      setOtpValue(newOtpValue);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOnChange = (index, e) => {
    if (e.target.value !== "") {
      const newOtpValue = [...otpValue];
      newOtpValue[index] = e.target.value[e.target.value.length - 1];
      setOtpValue(newOtpValue);
      setFocus(index);
    } else {
      const newOtpValue = [...otpValue];
      newOtpValue[index] = "";
      setOtpValue(newOtpValue);
    }
  };

  const submitOtp = () => {
    const data = {
      phone_number: signupData.phone_number,
      otp: Number(otpValue.join("")),
    };

    dispatch(verifyMobileOtp(data, closeModal));
  };

  const resendOtpVerify = (e) => {
    e.preventDefault();
    dispatch(
      resendOtp({
        email: signupData.email,
        phone_number: signupData.phone_number,
      })
    );
  };

  return (
    <Modal
      isOpen={isOtpModalOpen}
      // onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Otp Verification Modal"
    >
      <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="font-semibold text-3xl">
            <p>Mobile Verification</p>
          </div>
          <div className="flex flex-row text-sm font-medium text-gray-400">
            <p>We have sent a code to your mobile number ******{signupData?.phone_number?.slice(-4)}</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              {otpValue.map((value, index) => (
                <div key={index} className="sm:w-12 sm:h-12 w-10 h-10">
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    name=""
                    id=""
                    maxLength="1"
                    value={value}
                    onKeyUp={(e) => handleKeyUp(index, e)}
                    onChange={(e) => handleOnChange(index, e)}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-5">
              <div>
                <button
                  className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none border-primary-500 hover:bg-primary-500 hover:text-white px-6 py-2 text-primary-500"
                  onClick={submitOtp}
                >
                  Verify Account
                </button>
              </div>
              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't receive code?</p>{" "}
                <button
                  className="flex flex-row items-center text-blue-600"
                  onClick={resendOtpVerify}
                >
                  Resend
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OtpVerification;
