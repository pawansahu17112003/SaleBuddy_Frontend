import ApplyCoupon from "../components/CartComponent/ApplyCoupon";
import OrderSummary from "../components/CartComponent/OrderSummary";
import ShowProductCart from "../components/CartComponent/ShowProductCart";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from "react";
import { useSelector } from "react-redux";
import Login from "../components/user/UserLogin";
import OTPComponent from "../components/user/OTPComponent";
export default function Cart() {

    const theme = useTheme();
    const md = useMediaQuery('(max-width:1200px)');
    const sm = useMediaQuery('(max-width:700px)');
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');
    const [open, setOpenDialog] = useState(false)
    const [openOtp, setOpenOtp] = useState(false)
    const [otpValue, setOtpValue] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [screen, setScreen] = useState('cart')
    const [refresh, setRefresh] = useState(false)
    //var product=useSelector((state)=>state.cart) 
    //var productData=Object.values(product)
    ///localstorage  
    var keys = 0
    var productData = []
    try {
        const product = JSON.parse(localStorage.getItem('cart'))
        productData = Object.values(product)
    }
    catch (e) { }
    return (<>
        <div style={{ width: '100%', height: '100%', background: ' #f9f9f9', fontFamily: '"Inter", sans-serif' }}>
            <div>
                <Header />
            </div>
            <div style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: md ? '95%' : '75%', height: '100%', display: 'flex', alignItems: 'center', fontSize: '140%', fontWeight: 700, }}>Your Cart</div>
            </div>
            <div style={{ width: '100%', minHeight: 500, display: 'flex', flexDirection: matches ? 'column' : '' }}>
                <div style={{ width: md ? '100%' : '65%', display: 'flex', flexDirection: 'column' }}>
                    <div><ApplyCoupon /></div>
                    <div><ShowProductCart refresh={refresh} setRefresh={setRefresh} productData={productData} /></div>
                </div>
                <div style={{ width: matches ? '100%' : '35%', }}>
                    <OrderSummary productData={productData} setMobileNo={setMobileNo} mobileNo={mobileNo} open={open} setOpenDialog={setOpenDialog} openOtp={openOtp} setOpenOtp={setOpenOtp} otpValue={otpValue} setOtpValue={setOtpValue} />
                    <Login setMobileNo={setMobileNo} mobileNo={mobileNo} open={open} setOpenDialog={setOpenDialog} openOtp={openOtp} setOpenOtp={setOpenOtp} otpValue={otpValue} setOtpValue={setOtpValue} />
                    <OTPComponent setMobileNo={setMobileNo} mobileNo={mobileNo} open={open} setOpenDialog={setOpenDialog} openOtp={openOtp} setOpenOtp={setOpenOtp} otpValue={otpValue} setOtpValue={setOtpValue} screen={screen} setScreen={setScreen} />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    </>)
}