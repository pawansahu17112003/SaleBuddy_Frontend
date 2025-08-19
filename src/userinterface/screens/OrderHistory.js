import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useDispatch } from 'react-redux';
import { serverURL, postData } from '../../backendservices/FetchNodeServices';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OrderHistory() {

    const theme = useTheme()
    const md = useMediaQuery('(max-width:1300px)')
    const sm = useMediaQuery('(max-width:790px)')
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const smatches = useMediaQuery(theme.breakpoints.down('sm'))
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)')

    const [rcolor, setRcolor] = useState(false)
    var user = {}
    try {
        user = JSON.parse(localStorage.getItem('user')) || {}
    } catch (e) {
        user = {}
    }
    var mobileno = Object.keys(user)[0] || ''

    const [orderHistory, setOrderHistory] = useState([])
    const fetchOrderHistory = async () => {
        var res = await postData('userinterface/userinterface_fetch_orders_by_mobile', { mobileno })
        setOrderHistory(res.data)
    }

    useEffect(function () {
        fetchOrderHistory()
    }, [])

    // var data = [{
    //     productdetailid: 1, productname: 'SAMSUNG Galaxy S25 Ultra 5G', productstorage: '256GB', productcolorname: 'Titanium Blue', productram: '12GB',
    //     picture: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1748778565/s25_ultra_e1hcpg.png', ratings: 4, price: 78000.00,
    //     delivery: 'Standard Delivery by 1 July 2025 | Free', offerapply: 'Buy & Get Rs.2010 off (Discount auto applied in cart) Offer Applied'
    // },
    // {
    //     productdetailid: 1, productname: 'SAMSUNG Galaxy Z6', productstorage: '128GB', productcolorname: 'Titanium Blue', productram: '12GB',
    //     picture: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1748778280/sam_z6_v6ubdl.png', ratings: 3.6, price: 88000.00, offerprice: 80000.00,
    //     delivery: 'Standard Delivery by 1 July 2025 | Free'
    // }]

    return (<>
        <Header />
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', flexDirection: 'column', background: '#f9f9f9', fontFamily: '"Inter", sans-serif', minHeight: '100vh' }}>
            <div style={{ display: 'flex', width: '100%', height: 70, fontWeight: 700, fontSize: '140%', justifyContent: 'center', alignItems: 'center' }}>Order History</div>
            {orderHistory.map((item) => (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: matches ? '95%' : '75%', height: 200 }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: ' #ffffff', width: '100%', height: '90%' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '25%' }}>
                            <img src={`${serverURL}/images/${item?.picture}`} style={{ maxWidth: '70%', maxHeight: '90%' }} />
                        </div>
                        <div style={{ width: '75%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <div style={{ width: '90%', display: 'flex', alignItems: 'center', height: '49%', fontSize: '120%', fontWeight: 600 }}>{item?.productname}</div>
                            <div style={{ width: '95%', height: 1, background: ' #000000' }}></div>
                            <div style={{ width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', height: '49%' }}>
                                <div><b>Date:</b> {item.orderdate}</div>
                                <div><b>Time:</b> {item.ordertime}</div>
                                <div><b>Transaction ID:</b> {item.transactionid}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <Footer />
    </>)
}