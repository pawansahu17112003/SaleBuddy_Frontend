import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { postData, serverURL } from '../../../backendservices/FetchNodeServices';
import { useNavigate } from 'react-router';
import zIndex from '@mui/material/styles/zIndex';
export default function CheckoutOrder({ status, productData, handleSubmit, userAddress, userData, index }) {

    const theme = useTheme();
    const md = useMediaQuery('(max-width:1200px)');
    const sm = useMediaQuery('(max-width:700px)');
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');

    const [discount, setDiscount] = useState(false)
    const [color, setColor] = useState(' #00e9bf')
    //const product = useSelector((state) => state.cart)
    const product = JSON.parse(localStorage.getItem('cart'))
    const navigate = useNavigate()
    // const user = useSelector((state) => state.user)
    // var userData = Object.values(user)[index]
    // const keys = Object.keys(product)

    var keys = []
    var userData = {}  
    try {
        const userJson = localStorage.getItem('user')
        const user = JSON.parse(userJson)
        keys = Object.keys(user)
        const userMobile = keys[0]
        userData = user[userMobile][index] || {}  

    } catch (e) { }

    var productData = []
    var productkey = 0
    try {
        const product = JSON.parse(localStorage.getItem('cart'))
        productData = Object.values(product)
        productkey = Object.keys(product)
    }
    catch (e) { }

    const { error, isLoading, Razorpay } = useRazorpay()

    var totalAmount = productData.reduce((p1, p2) => {
        var amt = p2.price * p2.qty
        return p1 + amt
    }, 0)

    var totalSaving = productData.reduce((p1, p2) => {
        var amt = p2.offerprice == 0 ? 0 : (p2.price - p2.offerprice) * p2.qty
        return p1 + amt
    }, 0)

    var netAmount = totalAmount - totalSaving

    const handlePayment = async () => {
        if (!status)
            handleSubmit()
        else
            await handleRazorPayment()
    }

    // let productdetailsid = productData.map(item => item.productdetailsid).join(',')
    // let price = productData.map(item => item.price).join(',')
    // let offerprice = productData.map(item => item.offerprice).join(',')
    // let membershipprice = productData.map(item => item.membershipprice).join(',')
    // let qty = productData.map(item => item.qty).join(',')

    const handleRazorPayment = async () => {
        const options = {
            key: "rzp_test_GQ6XaPC6gMPNwH",
            amount: netAmount * 100,

            currency: "INR",
            name: "SalesBuddy",
            image: `${serverURL}/images/logo.png`,
            description: "Test Transaction",
            //order_id: "order_9A33XWu170gUtm", // Generate order_id on server
            handler: async (response) => {
                // console.log(response);
                const transactionid = response.razorpay_payment_id;
                //alert("Payment Successful!");
                var d = new Date();
                var cd = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
                var ct = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                var body = {
                    orderdate: cd,
                    ordertime: ct,
                    totalamount: netAmount,
                    mobileno: userData?.mobileno,  // Fixed this line
                    emailid: userData?.emailid,    // Fixed this line
                    status: 'true',
                    paymentmode: 'Online',
                    transactionid: transactionid
                }
                var res = await postData('orders/orders_submit', body)
                if (res.status) {
                    var bdy = {
                        orderid: res.orderid,
                        mobileno: userData?.mobileno,  // Fixed this line
                        deliverystatus: 'Not-Delivered',
                        address: `${userData?.address} ${userData?.landmark} ${userData?.area} ${userData?.pincode}`,  // Fixed this line
                        city: userData?.city,    // Fixed this line
                        state: userData?.state,  // Fixed this line
                        paymentstatus: 'true',
                        cart: productData
                    }
                    var response = await postData('orders/insert_orderdetails', bdy)
                }
                else {
                    alert('Fail')
                }
                // var res = await postData('userinterface/userinterface_user_orderdetails_submit', { mobileno: userData[index]?.mobileno, productdetailsid, price, offerprice, amount: membershipprice, qty, deliverystatus: 'false', address: `${userData[index].address} ${userData[index].landmark} ${userData[index].area} ${userData[index].pincode}`, city: userData[index].city, state: userData[index].state, paymentstatus: 'true', transactionid })
                // if (res.status) {
                //     alert('Submit Order Details')
                // }
                // else {
                //     alert('Fail')
                // }
                // navigate('/')
            },
            prefill: {
                name: userData?.username,
                email: userData?.emailid,
                contact: userData?.mobileno,
            },
            theme: {
                color: "#F37254",
            },
        };

        const razorpayInstance = new Razorpay(options);
        razorpayInstance.open();
    }
    return (<>
        <div style={{ width: '100%',  display: 'flex', justifyContent: md ? 'center' : '',zIndex:20 }}>
            <div style={{ width: md ? '95%' : '65%', background: ' #ffffff', minHeight: discount ? 315 : 260, marginLeft: md ? '' : 15, borderRadius: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 30, marginTop: matches ? 30 : '' }}>
                <div style={{ width: '90%', height: '85%', }}>
                    <div style={{ width: '100%', height: 35, fontSize: md ? '110%' : '120%', fontWeight: 700, }}>
                        Order Summary ({productkey !== 0 && `${productkey.length} items`})
                    </div>
                    <div style={{ width: '100%', height: 45, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: md ? '100%' : '' }}>
                        <div>Original Price</div><div>{'\u20B9'} {totalAmount}</div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ height: 45, display: 'flex', alignItems: 'center', fontSize: md ? '100%' : '' }}>Savings</div>
                            {discount ?
                                (<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', height: 45, alignItems: 'center' }}>< RemoveCircleIcon onClick={() => setDiscount(false)} style={{ fontSize: '105%', marginLeft: 5, color: ' #088466' }} /> <div style={{ fontSize: md ? '100%' : '' }}>{'\u20B9'} {totalSaving}</div></div>

                                </div>) :
                                (<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: 45, alignItems: 'center' }}><AddCircleIcon onClick={() => setDiscount(true)} style={{ fontSize: '105%', marginLeft: 5, color: ' #088466' }} /> <div style={{ fontSize: md ? '100%' : '' }}>{'\u20B9'} {totalSaving}</div></div>)}
                        </div>
                        {discount ? (
                            <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ width: '100%', height: 0.5, background: ' #000000' }}></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%', height: 30 }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignitem: 'center', fontSize: md ? '100%' : '80%' }}>Discount on MRP</div> <div style={{ display: 'flex', justifyContent: 'center', alignitem: 'center', fontSize: md ? '100%' : '80%' }}>{'\u20B9'} {totalSaving}</div>
                                </div>
                                <div style={{ width: '100%', height: 0.5, background: ' #000000' }}></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%', height: 30 }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignitem: 'center', fontSize: md ? '100%' : '80%' }}>Coupon Discount</div> <div style={{ display: 'flex', justifyContent: 'center', alignitem: 'center', fontSize: md ? '100%' : '80%' }}>{'\u20B9'} 0</div>
                                </div>
                                <div style={{ width: '100%', height: 0.5, background: ' #000000' }}></div>
                            </div>) : (<></>)}
                    </div>
                    <div style={{ width: '100%', height: 45, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: md ? '100%' : '' }}>
                        <div>Total</div><div>{'\u20B9'} {netAmount}</div>
                    </div>
                    <div style={{ width: '100%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div onMouseEnter={() => { setColor(' #00b594') }} onMouseLeave={() => { setColor(' #00e9bf') }} style={{ width: '100%', height: '70%', background: color, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10, fontSize: '80%', fontWeight: 600, cursor: 'pointer' }} onClick={handlePayment}>Proceed To Payment</div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}