import { Button, Dialog } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect, useRef } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { postData } from "../../../backendservices/FetchNodeServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
export default function OTPComponent({ mobileNo, setMobileNo, openOtp, setOpenOtp, otpValue, setOtpValue, number, screen, setScreen }) {

    const theme = useTheme();
    var dispatch = useDispatch()
    var navigate = useNavigate()
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));

    const [seconds, setSeconds] = useState(30);
    const [submit, setSubmit] = useState('#12daa8');

    const otpcount = 4;
    const [inputArr, setInputArr] = useState(new Array(otpcount).fill(''));
    const ref = useRef([]);
    const currentOtp = inputArr.join('')
    const handleCheckOtp = async () => {
        alert(otpValue, currentOtp)
        if (otpValue == currentOtp) {
            var response = await postData('userinterface/userinterface_chk_mobile_email', { mobileno: mobileNo })
            if (response.status) {
                dispatch({ type: 'ADD_USER', payload: [mobileNo, response.data] })
            }
            else {
                var res = postData('userinterface/userinterface_submit_mobile', { mobileno: mobileNo })
                dispatch({ type: 'ADD_USER', payload: [mobileNo, { mobileno: mobileNo }] })
            }
            setOpenOtp(false)
            if (screen == 'cart') {
                navigate('/checkout')
            }
        }
        else { alert("Invalid Otp") }
    }

    useEffect(() => {
        if (seconds > 0 && openOtp) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer)
        }
    }, [seconds, openOtp])

    useEffect(() => {
        if (openOtp) {
            const timer = setTimeout(() => {
                ref.current[0]?.focus()
            }, 10)
            return () => clearTimeout(timer)
        }
    }, [openOtp])
    const handleOTPClose = () => { setOpenOtp(false) }
    const handleChange = (e, i) => {
        const value = e.target.value;

        if (value && !/^\d$/.test(value)) return;

        const newArr = [...inputArr]
        newArr[i] = value
        setInputArr(newArr)

        if (value) ref.current[i + 1]?.focus();
    };

    const handleKeyDown = (e, i) => {
        if (e.key === 'Backspace' && !inputArr[i]) {
            ref.current[i - 1]?.focus();
        }
    };

    return (<>
        <style>
            {`
          .placeholdercolor::placeholder {
            font-size: 100%;
            color: #aaa;
          } 
        `}
        </style>
        <Dialog
            open={openOtp}
            PaperProps={{ sx: { width: '565px', height: '426px', background: ' #191919', borderRadius: 2 } }}>
            <CloseIcon onClick={handleOTPClose} style={{ color: 'white', right: 6, position: 'absolute', top: 3, cursor: 'pointer' }} />
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: smatches ? '90%' : '70%', height: '80%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ width: '100%', height: '10%', fontSize: '120%', fontWeight: 700, color: ' #ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>VERIFY WITH OTP</div>
                    <div style={{ width: '100%', height: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '100%', color: ' #ffffff' }}>Sent to {mobileNo}</div>
                    <div style={{ width: '80%', height: '25%', display: 'flex', justifyContent: 'space-evenly' }}>
                        {inputArr.map((input, i) => (
                            <input
                                key={i}
                                type="text"
                                inputMode="numeric"
                                style={{ width: '16%', height: '65%', textAlign: 'center', backgroundColor: '#191919', border: '1px solid #353535', color: 'white', fontSize: '1.2rem', borderRadius: '4px' }}
                                value={input}
                                ref={el => ref.current[i] = el}
                                onChange={e => handleChange(e, i)}
                                onKeyDown={e => handleKeyDown(e, i)}
                            />
                        ))}
                    </div>
                    <div style={{ width: '100%', height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '100%', fontWeight: 600, color: ' #ffffff' }}>
                        {seconds === 0 ? (
                            <div style={{ fontSize: '100%' }}> Didn't receive OTP? <u style={{ color: ' #00e9bf', fontSize: '90%', cursor: 'pointer' }}>Resend OTP</u> </div>
                        ) : (
                            `Resend OTP in 00:${seconds.toString().padStart(2, '0')}`
                        )}
                    </div>
                    <Button
                        onClick={handleCheckOtp}
                        disabled={currentOtp.length !== 4}
                        onMouseEnter={() => setSubmit('#00b594')}
                        onMouseLeave={() => setSubmit('#12daa8')}
                        style={{ width: '90%', height: '17%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: currentOtp.length === 4 ? submit : '#353535', borderRadius: 10, color: currentOtp.length === 4 ? '#000' : '#a1a1a1', fontSize: '90%', fontWeight: 600, cursor: currentOtp.length === 4 ? 'pointer' : 'not-allowed' }}>
                        Submit OTP
                    </Button>
                </div>
            </div>
        </Dialog>
    </>);
}