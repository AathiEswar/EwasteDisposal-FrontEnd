import React, { useEffect, useState } from "react";
import PopUpAdmin from "./PopUpAdmin";
import PopUpOtp from "./PopUpOtp";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import "./styles.scss";
import PopUpVerifyOtp from "./PopUpVerifyOtp";

import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomerCard({ item }) {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [theotp, setTheOtp] = useState();
  const [status, setstatus] = useState("success");
  const { user } = useUser();

  // function notifySuccess(){
  //   toast.success("OTP Is Verified", {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: false,
  //     progress: undefined,
  //     theme: "dark",
  //     className: "bg-pri-black",

  //     transition: Slide,
  //   });
  // };

  async function handleRequesAccept(userId) {
    console.log("handle admin req");
    const centerEmail = user.primaryEmailAddress.emailAddress;
    const adminId = user.id
    await axios.post("/adminreq", { userId, centerEmail , adminId});
  }

  async function handleOtp(userId, userEmail) {
    setIsOtpSent(!isOtpSent);
    await axios.post("/handleotp", { userId, userEmail });
  }

  async function handleOTPverification(adminEnteredOTP, userEmail, userId) {
    await axios
      .post("/otpverify", { adminEnteredOTP, userEmail })
      .then((res) => {
        console.log(res.data);
        if (res.data == "success") {
          handleRequesAccept(userId);
          alert("otp is verified")
        }
        else if(res.data == "wrong"){
          alert("Incorrect otp");
        }
        else{
          alert("otp is either already sent or expired")
        }
      });
  }

  return (
    <div className="h-fit items-center gap-[2vw] shadow-3xl p-4 rounded-lg bg-sec-black max-w-[320px] border-accent border-2">
      <p className="font-montserrat font-semibold  text-white">
        <span className=""> {item[0]?.fullName} </span>
      </p>
      {/* <p className="font-montserrat font-semibold  text-white">
    Id:{" "}
      <span className="">
        {" "}
        {item[0]?.id}{" "}
      </span>
    </p> */}
      <p className="font-montserrat font-semibold  text-white">
        <span className=""> {item[0]?.primaryEmailAddress.emailAddress} </span>
      </p>
      <p className="font-montserrat font-semibold  text-white">
        <span className="text-accent"> {item[1]} </span>̥
      </p>

      <div className="flex justify-between">
        <PopUpAdmin
          handleRequesAccept={handleRequesAccept}
          userId={item[0].id}
        />

        {!isOtpSent && (
          <PopUpOtp
            handleOtp={handleOtp}
            userId={item[0].id}
            userEmail={item[0].primaryEmailAddress.emailAddress}
          />
        )}
      </div>

      {isOtpSent && (
        <div className="form__group field flex w-full gap-10">
          <input
            type="input"
            className="form__field"
            name="name"
            id="name"
            required
            onChange={(event) => {
              setTheOtp(event.target.value);
            }}
          />
          <label for="name" class="form__label">
            OTP
          </label>
          <PopUpVerifyOtp
            handleOTPverification={handleOTPverification}
            userEmail={item[0].primaryEmailAddress.emailAddress}
            theotp={theotp}
            userId={item[0].id}
          />
        </div>
      )}
      {/* <button onClick={notifySuccess}>Notify!</button> */}
      {/* <ToastContainer
        progressStyle={{
          backgroundColor: "#25a18e",
        }}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        theme="dark"
        transition:Slide
      /> */}
    </div>
  );
}

export default CustomerCard;
