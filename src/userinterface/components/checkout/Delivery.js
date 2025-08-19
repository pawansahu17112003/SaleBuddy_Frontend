import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useDispatch } from 'react-redux';
import { serverURL } from '../../../backendservices/FetchNodeServices';
import { useState } from 'react';

export default function Delivery({ productData, refresh, setRefresh }) {

    const theme = useTheme()
    const md = useMediaQuery('(max-width:1300px)')
    const sm = useMediaQuery('(max-width:790px)')
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const smatches = useMediaQuery(theme.breakpoints.down('sm'))
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)')

    const [rcolor, setRcolor] = useState(false)

    var data = [{
        productdetailid: 1, productname: 'SAMSUNG Galaxy S25 Ultra 5G', productstorage: '256GB', productcolorname: 'Titanium Blue', productram: '12GB',
        picture: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1748778565/s25_ultra_e1hcpg.png', ratings: 4, price: 78000.00,
        delivery: 'Standard Delivery by 1 July 2025 | Free', offerapply: 'Buy & Get Rs.2010 off (Discount auto applied in cart) Offer Applied'
    },
    {
        productdetailid: 1, productname: 'SAMSUNG Galaxy Z6', productstorage: '128GB', productcolorname: 'Titanium Blue', productram: '12GB',
        picture: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1748778280/sam_z6_v6ubdl.png', ratings: 3.6, price: 88000.00, offerprice: 80000.00,
        delivery: 'Standard Delivery by 1 July 2025 | Free'
    }]

    return (<>

        <div style={{ display: 'flex', width: '100%', alignItems: md ? 'center' : 'flex-end', flexDirection: 'column', marginTop: 20 }}>
            <div style={{ display: 'flex', width: md?'94%':'79%', fontWeight: 650, fontSize: '110%' }}>Delivery Options</div>
            {productData.map((item) => (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: md ? '95%' : '80%', height: 270 }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: ' #ffffff', width: '100%', height: '90%' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '25%' }}>
                            <img src={`${serverURL}/images/${item?.picture}`} style={{ maxWidth: '70%', maxHeight: '90%' }} />
                        </div>
                        <div style={{ width: '75%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <div style={{ width: '90%', display: 'flex', alignItems: 'center', height: '49%', fontSize: '120%', fontWeight: 600 }}>{item?.productname} ({item?.productram} RAM, {item?.productstorage} Storage) {item?.productcolorname}</div>
                            <div style={{ width: '95%', height: 1, background: ' #000000' }}></div>
                            <div style={{ width: '90%', display: 'flex', alignItems: 'center', height: '49%' }}>
                                <RadioButtonCheckedIcon style={{ marginRight: 20, color: '#00e9bf' }} />Standard Delivery by 22 July 2025 | Free
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>)
}