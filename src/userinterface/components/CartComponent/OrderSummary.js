import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
export default function OrderSummary({ productData, setMobileNo, mobileNo, open, setOpenDialog, openOtp, setOpenOtp, otpValue, setOtpValue }) {

    const theme = useTheme();
    const md = useMediaQuery('(max-width:1200px)');
    const sm = useMediaQuery('(max-width:700px)');
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');

    const navigate = useNavigate()
    const [discount, setDiscount] = useState(false)
    const [color, setColor] = useState(' #00e9bf')
    //const user = useSelector((state) => state.user)
    var user = {}
    try {
        user = JSON.parse(localStorage.getItem('user')) || {}
    } catch (e) { }
    // const product = useSelector((state) => state.cart)
    var keys=0
    try{
    const product = JSON.parse(localStorage.getItem('cart'))
    keys = Object.keys(product)}
    catch(e){}

    var totalAmount = productData.reduce((p1, p2) => {
        var amt = p2.price * p2.qty
        return p1 + amt
    }, 0)

    var totalSaving = productData.reduce((p1, p2) => {
        var amt = p2.offerprice == 0 ? 0 : (p2.price - p2.offerprice) * p2.qty
        return p1 + amt
    }, 0)

    var netAmount = totalAmount - totalSaving

    const handleCheckout = () => {
        if (JSON.stringify(user) == '{}') {
            setOpenDialog(true)
        }
        else {
            navigate('/checkout')
        }
    }

    return (<>
        <div style={{ width: '100%', position: 'sticky', top: 50 }}>
            <div style={{ width: md ? '95%' : '65%', minHeight: discount ? 315 : 260, marginLeft: matches ? '' : 15, borderRadius: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', background: ' #ffffff', marginBottom: 30 }}>
                <div style={{ width: '90%', height: '85%', }}>
                    <div style={{ width: '100%', height: 35, fontSize: md ? '1.65vw' : '120%', fontWeight: 700, }}>
                        Order Summary ({keys !== 0 && `${keys.length} items`})
                    </div>
                    <div style={{ width: '100%', height: 45, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: md ? '1.65vw' : '' }}>
                        <div>Original Price</div><div>{'\u20B9'} {totalAmount}</div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ height: 45, display: 'flex', alignItems: 'center', fontSize: md ? '1.65vw' : '' }}>Savings</div>
                            {discount ?
                                (<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', height: 45, alignItems: 'center' }}>< RemoveCircleIcon onClick={() => setDiscount(false)} style={{ fontSize: '105%', marginLeft: 5, color: ' #088466' }} /> <div style={{ fontSize: md ? '1.65vw' : '' }}>{'\u20B9'} {totalSaving}</div></div>

                                </div>) :
                                (<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: 45, alignItems: 'center' }}><AddCircleIcon onClick={() => setDiscount(true)} style={{ fontSize: '105%', marginLeft: 5, color: ' #088466' }} /> <div style={{ fontSize: md ? '1.65vw' : '' }}>{'\u20B9'} {totalSaving}</div></div>)}
                        </div>
                        {discount ? (
                            <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ width: '100%', height: 0.5, background: ' #000000' }}></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%', height: 30 }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignitem: 'center', fontSize: md ? '1.25vw' : '80%' }}>Discount on MRP</div> <div style={{ display: 'flex', justifyContent: 'center', alignitem: 'center', fontSize: md ? '1.25vw' : '80%' }}>{'\u20B9'} {totalSaving}</div>
                                </div>
                                <div style={{ width: '100%', height: 0.5, background: ' #000000' }}></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%', height: 30 }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignitem: 'center', fontSize: md ? '1.25vw' : '80%' }}>Coupon Discount</div> <div style={{ display: 'flex', justifyContent: 'center', alignitem: 'center', fontSize: md ? '1.25vw' : '80%' }}>{'\u20B9'} 0</div>
                                </div>
                                <div style={{ width: '100%', height: 0.5, background: ' #000000' }}></div>
                            </div>) : (<></>)}
                    </div>
                    <div style={{ width: '100%', height: 45, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: md ? '1.65vw' : '' }}>
                        <div>Total</div><div>{'\u20B9'} {netAmount}</div>
                    </div>
                    <div style={{ width: '100%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div onClick={handleCheckout} onMouseEnter={() => { setColor(' #00b594') }} onMouseLeave={() => { setColor(' #00e9bf') }} style={{ width: '100%', height: '70%', background: color, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10, fontSize: '80%', fontWeight: 600, cursor: 'pointer' }}>Checkout</div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}