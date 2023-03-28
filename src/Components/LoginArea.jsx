import React, { useState, useEffect } from 'react'
import foregroundImage from "../assets/Banner.png"
import BackgroundImage1 from "../assets/Banner-bg1.png"
import BackgroundImage2 from "../assets/Banner-bg2.png"
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion'
import LoaderScreen from '../Displays/LoaderScreen'
import TextTransition, { presets } from "react-text-transition";
import "../Styles/LoginArea.css"

function LoginArea() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [openLoader, setOpenLoader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setOpenLoader(false);
        }, 1700);
    }, [])

    const [storeMail, setstoreMail] = useState("")
    const [storePassword, setstorePassword] = useState("")
    const navigate = useNavigate();


    const handleShowPassword = () => {
        setShowPassword(!showPassword)
        console.log(showPassword)
    }

    const handleLogin = () => {

        if ((email == "" && password == "") && (storeMail == "" && storePassword == "")) {
            toast.error("Please enter all the credentials")
            return;
        }
        var userEmail = email + "@heads.design";
        localStorage.setItem("localEmail", JSON.stringify(email));
        localStorage.setItem("localPassword", JSON.stringify(password));

        var storeMailAddress = storeMail
        storeMailAddress = storeMailAddress + "@heads.design"
        if (userEmail === "rishabh@heads.design" && password === "rishabh") {
            toast.success(`An OTP has been send to ${userEmail}`)
            setEmail("");
            navigate('/otp-verification', {
                state: {
                    email,
                    password
                }
            })
        }
        else if (storeMailAddress === "rishabh@heads.design" && storePassword === "rishabh") {
            setEmail("");
            setPassword("");
            navigate('/otp-verification', {
                state: {
                    email,
                    password
                }
            })
        }
        else
            toast.error("Credentials did not match")
    }


    useEffect(() => {
        var a = JSON.parse(localStorage.getItem('localEmail'));
        var b = JSON.parse(localStorage.getItem('localPassword'));
        setstoreMail(a);
        setstorePassword(b);
        console.log(storeMail);
        console.log(storePassword);
    }, []);


    if (openLoader)
        return <LoaderScreen />

    return (
        <div className='login-box'>
            <div className='login-main'>
                <motion.div transition={{ duration: 0.8 }} animate={{ scale: 1 }} initial={{ scale: 0 }} className='left-content'>
                    <p data-text="Welcome to Systempackage" className="login-heading"><strong>
                        Welcome to Systempackage
                    </strong></p>
                    <div className="email-end">
                        @heads.design
                        &nbsp; <i className='fa fa-angle-down'></i></div>
                    <input
                        type="text"
                        placeholder='Enter your email'
                        className="emailArea"
                        value={storeMail != "" ? storeMail : email}
                        onChange={(e) => storeMail != "" ? setstoreMail(e.target.value) : setEmail(e.target.value)}
                    />
                    <i className={showPassword ? "eye fa fa-eye" : "eye fa fa-eye-slash"} onClick={handleShowPassword}></i>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter your password'
                        className="passwordArea"
                        value={storePassword != "" ? storePassword : password}
                        onChange={(e) => storePassword != "" ? setstorePassword(e.target.value) : setPassword(e.target.value)}
                    />
                    <button className='login-btn' onClick={handleLogin}><p>Next</p> &nbsp;
                        <span><i className="arrow-right fa fa-solstoreMailAddress fa-arrow-right" style={{ color: "white" }}></i></span>
                    </button>
                    <p className="forgetPasswordArea">Forgot your Password?</p>
                </motion.div>
                <motion.div transition={{ duration: 0.8 }} animate={{ scale: 1 }} initial={{ scale: 0 }} class="right-content">
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

export default LoginArea