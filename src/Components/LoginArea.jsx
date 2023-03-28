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
    const [openLoader,setOpenLoader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setOpenLoader(false);
        }, 1700);
    }, [])

    const navigate = useNavigate()

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
        console.log(showPassword)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        const userEmail = email + "@heads.design"

        if (email === "" || password === "") {
            toast.error("Please enter all the credentials")
        }
        else {
            if (userEmail === "rishabh@heads.design" && password === "12345678") {
                localStorage.setItem("email", userEmail)
                localStorage.setItem("password", password)
                toast.success(`An OTP has been send to ${userEmail}`)
                navigate("/otp-verification", {
                    state: {
                        email: userEmail,
                    }
                })
            }
            else {
                toast.error("Credentials did not match")
            }
        }
    }

    if (openLoader)
    return <LoaderScreen />

    return (
        <div className='login-box'>
            <div className='login-main'>
                <motion.div transition={{duration:0.8}} animate={{ scale: 1 }} initial={{ scale: 0 }} className='left-content'>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <i className={showPassword ? "eye fa fa-eye" : "eye fa fa-eye-slash"} onClick={handleShowPassword}></i>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter your password'
                        className="passwordArea"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='login-btn' onClick={handleLogin}><p>Next</p> &nbsp;
                        <span><i className="arrow-right fa fa-solid fa-arrow-right" style={{ color: "white" }}></i></span>
                    </button>
                    <p className="forgetPasswordArea">Forgot your Password?</p>
                </motion.div>
                <motion.div transition={{duration:0.8}} animate={{ scale: 1 }} initial={{ scale: 0 }} class="right-content">
                    <img src={foregroundImage} className="image1" />
                    <img src={BackgroundImage1} className="image2" />
                    <img src={BackgroundImage2} className="image3" />
                </motion.div>
            </div>

            <motion.div transition={{duration:0.8}} animate={{ scale: 1 }} initial={{ scale: 0 }} className="footer-text">
                <span className='first'>Not Member?</span><span className='second'> Create Account</span>
            </motion.div>

        </div>
    )
}

export default LoginArea