import React, {useEffect, useState} from 'react'
import logo from "../assets/Subtract.png"
import "../Styles/SuccessStyles.css"
import { motion } from 'framer-motion'
import LoaderScreen from './LoaderScreen.jsx'

function SuccessScreen() {

    const [openLoader, setOpenLoader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setOpenLoader(false);
        }, 1700);
    }, [])

    if (openLoader)
        return <LoaderScreen />

    return (
        <div>
            <div className='success-div'>
                <motion.div
                    transition={{ duration: 0.8 }} animate={{ scale: 1.5 }} initial={{ scale: 0 }}
                    className="success-screen">
                    <img className='success-image' src={logo} alt="" />
                    <p className='success-text'>Success!</p>
                </motion.div>
            </div>
        </div>
    )
}

export default SuccessScreen