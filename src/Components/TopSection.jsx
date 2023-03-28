import React from 'react'
import logo from "../assets/Subtract.png"
import { motion } from 'framer-motion'
import "../Styles/TopSection.css"

export default function TopSection() {
  return (
    <motion.div transition={{duration:0.8}} animate={{ scale: 1 }} initial={{ scale: 0 }}  className='logo'>
        <img src={logo} alt="Company-logo" />
    </motion.div>
  )
}
