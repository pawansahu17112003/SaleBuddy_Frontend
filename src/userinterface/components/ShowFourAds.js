import { postData, serverURL } from "../../backendservices/FetchNodeServices"
import { useEffect, useState } from "react"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function ShowFourAds() {

    const theme = useTheme();
    const md = useMediaQuery('(max-width:1250px)');
    const sm = useMediaQuery('(max-width:700px)');
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');

    // const [ads, setAds] = useState(['s.webp','v.webp'])
    // const fetchAds = async () => {
    //     var response = await postData('userinterface/userinterface_fetch_ads', { imgno: 1 })
    //     if (response.status) {
    //         setAds(response.data)
    //     }
    //     else {
    //         alert(response.message)
    //     }
    // }
    // useEffect(function () {
    //     fetchAds()
    // }, [])

    const ads = [{ images: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1748778280/sam_z6_v6ubdl.png', logo: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1750754586/pngimg.com_-_samsung_logo_PNG8_ux4mdi.png', productname: 'Samsung Galaxy Z6', price: '40000', detail: 'Inclusive of all offers' },
    { images: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1750752903/iphone_16_pro_max_atwa5d.png', logo: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1750753410/apple_white_whru8e.png', productname: 'iPhone 16 Pro Max', price: '140000', detail: 'Bank Offers Available' },
    { images: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1749891014/312580_0_u3lpmc_tngxpo.webp', logo: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1750754047/Vivo-Logo-2009_xhzth9.png', productname: 'Vivo Y29 5G', price: '15000', detail: 'Including Bank Offers' },
    { images: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1750754415/oneplus_11_5g_r61gfu.png', logo: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1750754977/oneplus_nj3mzi.png', productname: 'One Plus 11 5G', price: '38000', detail: 'Easy EMI Available' }
    ]

    const showAds = () => {
        return ads.map((item) => {
            return <div style={{ borderRadius: 10, width: matches?'45%':'100%', height: matches?'80vw':md?'28vw':350, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(to bottom, #0b0b0f 0%, #1b1142 40%, #4d3ca7 65%, #2fa7e9 100%)', marginRight: 7, marginLeft: 7 }}>
                <div style={{ width: '95%', height: '95%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '15%' }}><img src={item.logo} style={{ maxWidth: '90%', maxHeight: '80%', borderRadius: 10 }} /></div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '10%', color: ' #f9fbff', fontSize: matches?'3.2vw':'1.3vw', fontWeight: 600 }}>{item.productname}</div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '55%' }}><img src={item.images} style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: 10,filter: 'drop-shadow(0 15px 20px rgba(0, 0, 0, 0.4))' }} /></div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '10%', color: ' #f9fbff' }}><div style={{ fontSize: matches?'3vw':'1.3vw' }}>Starting at</div> <div style={{ marginLeft: 5, fontSize:matches?'3.7vw':'1.5vw' }}>{'\u20B9'} <b>{item.price}</b></div></div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '10%', color: ' #f9fbff',fontSize:matches?'3vw':'1.1vw' }}>*{item.detail}</div>
                </div>
            </div>
        })
    }

    return (<div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: ' #191919', fontFamily: '"Inter", sans-serif' }} >
        <div style={{ width: md ? '90%' : '74%', display: 'flex', color: ' #ffffff', fontSize: md ? '1.6em' : '1.75em', marginBottom: '2%', marginTop: '2%' }}>Hot Deals Mobile</div>
        <div style={{ display: 'flex', width: md ? '95%' : '75%', justifyContent: 'center',flexWrap:matches?'wrap':'' }}>
            {showAds()}
        </div>
    </div>)
}