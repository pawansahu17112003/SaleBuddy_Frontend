import { useEffect, useState } from "react";
import { postData } from "../../../backendservices/FetchNodeServices";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function SelectedAddress({ addressId }) {

    const [selectedAddress, setSelectedAddress] = useState([])
    const theme = useTheme();
    const md = useMediaQuery('(max-width:1200px)');
    const sm = useMediaQuery('(max-width:700px)');
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)')

    const fetchSelected = async () => {
        var res = await postData('userinterface/userinterface_fetch_user_by_id', { addressid: addressId })
        setSelectedAddress(res.data)
    }

    useEffect(function () {
        fetchSelected()
    }, [addressId])

    console.log('select', selectedAddress)
    return (<>
        <div style={{ width: '100%', display: 'flex', justifyContent: md ? 'center' : '', marginBottom: md ? 30 : '' }}>
            <div style={{ width: md ? '95%' : '65%', background: ' #ffffff', marginLeft: md ? '' : 15, borderRadius: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 30, marginTop: matches ? 30 : '' }}>
                <div style={{ width: '90%', height: '90%' }}>
                    <div style={{ width: '100%', height: '15%', display: 'flex' }}>Selected Address</div>
                    <div style={{ width: '100%', height: '15%', display: 'flex', fontWeight: 650 }}>House</div>
                    <div style={{ width: '100%', height: '40%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ width: '100%', height: 30 }}>{selectedAddress?.address},{selectedAddress?.area}</div>
                        <div style={{ width: '100%', height: 30 }}>Near {selectedAddress?.landmark},{selectedAddress?.pincode}</div>
                        <div style={{ width: '100%', height: 30 }}>{selectedAddress?.city} {selectedAddress?.state}</div>
                        <div style={{ width: '100%', height: 30 }}>Mobile No:{selectedAddress?.mobileno}</div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}