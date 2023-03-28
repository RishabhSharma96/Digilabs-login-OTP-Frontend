import './App.css'
import LoginScreen from './Displays/LoginScreen'
import OtpScreen from './Displays/OtpScreen'
import SuccessScreen from './Displays/SuccessScreen'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <div style={{overflow:"hidden"}}>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/otp-verification" element={<OtpScreen />} />
          <Route path="/success" element={<SuccessScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
