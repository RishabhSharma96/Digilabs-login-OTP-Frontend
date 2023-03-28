import React, { useState, useEffect } from 'react'
import foregroundImage from "../assets/Banner.png"
import BackgroundImage1 from "../assets/Banner-bg1.png"
import BackgroundImage2 from "../assets/Banner-bg2.png"
import { useNavigate, useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion'

import "../Styles/OtpArea.css"
import LoaderScreen from '../Displays/LoaderScreen'

function OtpSection() {

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [timer, setTimer] = useState(20);
    const [isTimer, setIsTimer] = useState(false);
    const [openLoader, setOpenLoader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setOpenLoader(false);
        }, 1700);
    }, [])

    const location = useLocation()
    const navigate = useNavigate()

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    useEffect(() => {
        setTimeout(() => {
            let x = timer;
            if (timer > 0)
                x = x - 1;

            if (timer == 0)
                setIsTimer(true);
            setTimer(x);
        }, 1000)
    }, [timer]);

    const hadleGoingBack = (e) => {
        e.preventDefault()
        navigate("/")
    }

    const handleOTPVerification = (e) => {
        e.preventDefault()

        const otpString = otp.join("")

        if (otpString === "111111") {
            localStorage.removeItem("localEmail");
            localStorage.removeItem("localPassword");
            toast.success("Login Successful !!")
            navigate("/success")
        }
        else {
            toast.error("OTP didnt match !!")
        }
    }

    if (openLoader)
        return <LoaderScreen />

    return (
        <div className='login-box otp-box'>
            <div className='login-main'>
                <motion.div
                    initial={{ opacity: 0, y: "+400px" }}
                    animate={{ opacity: 1, y: "0px" }}
                    exit={{ opacity: 0, y: "+400px" }}
                    transition={{ duration: 0.5 }}
                    className='left-content'>
                    <div className="row">
                        <div className="col text-center">
                            <h2 className='otp-heading'>Enter the verification code sent to you</h2>
                            <p className='otp-mail-data'>We sent to <span className='email'>
                                {location.state.email}</span>.If you don't see it,check your spam.</p>
                            <div className="otp-input">

                                {otp.map((data, index) => {
                                    return (
                                        <input
                                            className="otp-field"
                                            type="text"
                                            name="otp"
                                            maxLength="1"
                                            key={index}
                                            value={data}
                                            onChange={e => handleChange(e.target, index)}
                                            onFocus={e => e.target.select()}
                                        />
                                    );
                                })}

                            </div>
                            <button className='login-btn otp-btn'
                                onClick={handleOTPVerification}
                            >Verify My OTP</button>
                            <p>

                                <button disabled={!isTimer} className={!isTimer ? "info-grey" : "info"} onClick={() => {
                                    setTimer(20)
                                    setIsTimer(!isTimer)
                                }} >
                                    {!isTimer ? "Resend OTP in " : "Send OTP Now"}
                                </button>

                                <span className='info info-back' onClick={hadleGoingBack}>Back</span>
                                <br />
                                <span className='timer'>00:<span className={timer > 0 ? 'timer-blinker' : ""}>{timer}</span></span>
                            </p>
                        </div>
                    </div>
                </motion.div>
                <motion.div class="right-content">
                    <img src={foregroundImage} className="image1" />
                    <img src={BackgroundImage1} className="image2" />
                    <img src={BackgroundImage2} className="image3" />
                </motion.div>
            </div>

            <motion.div transition={{ duration: 0.8 }} animate={{ scale: 1 }} initial={{ scale: 0 }} className="footer-text">
                <span className='first'>Not Member?</span><span className='second'> Create Account</span>
            </motion.div>


        </div>
    )
}

export default OtpSection