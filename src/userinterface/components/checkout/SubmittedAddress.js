import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import UpdateAddress from '../UpdateAddress'
import { useParams } from 'react-router'
export default function SubmittedAddress({ userAddress, fetchUserAddress, setIndex, index,addressId,setAddressId }) {

    const theme = useTheme()
    const md = useMediaQuery('(max-width:1300px)')
    const sm = useMediaQuery('(max-width:790px)')
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const smatches = useMediaQuery(theme.breakpoints.down('sm'))
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)')

    const [addressOpen, setAddressOpen] = useState(false)
    const [addressSub, setAddressSub] = useState('')
    const params = useParams()

    const handleChangeAddress = (item) => {
        setAddressId(item.addressid)
        setAddressSub('CHANGE')
        setAddressOpen(true)
    }

    useEffect(function () {
        fetchUserAddress()
        setAddressId(userAddress[index].addressid)
    }, [addressOpen,index])

    return (<>
        <UpdateAddress addressOpen={addressOpen} addressSub={addressSub} addressId={addressId} setAddressOpen={setAddressOpen} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: md ? 'center' : 'flex-end', width: '100%', height:40, marginBottom: md ? '' : 30 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: md ? '95%' : '80%', height: '90%',fontWeight:600,fontSize:'120%' }}>Choose Address </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: md ? 'center' : 'flex-end', width: '100%', height: sm ? 'auto' : 200, marginBottom: md ? '' : 30 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: sm ? 'center' : 'space-between', width: md ? '95%' : '80%', height: '90%', flexDirection: sm ? 'column' : '' }}>
                {userAddress.map((item, i) => (
                    <div onClick={() => setIndex(i)} style={{ width: sm ? '100%' : '49%', height: sm ? 180 : '100%', background: '#ffffff', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', border: i == index ? ' 2px solid #12daa8' : '', boxSizing: 'border-box',marginTop:10 }}>
                        <div style={{ width: '90%', height: '90%' }}>
                            <div style={{ width: '100%', height: '15%', display: 'flex' }}>Shipping Address</div>
                            <div style={{ width: '100%', height: '15%', display: 'flex', fontWeight: 650 }}>House</div>
                            <div style={{ width: '100%', height: '40%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ width: '100%', height: 30 }}>{item?.address},{item.area}</div>
                                <div style={{ width: '100%', height: 30 }}>Near {item?.landmark},{item.pincode}</div>
                                <div style={{ width: '100%', height: 30 }}>{item.city} {item.state}</div>
                                <div style={{ width: '100%', height: 30 }}>Mobile No:{item.mobileno}</div>
                            </div>
                            <div style={{ width: '60%', height: '30%', justifyContent: 'space-between', display: 'flex' }}>
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', color: '#088466', cursor: 'pointer' }}><u onClick={() => { handleChangeAddress(item) }}>Change</u></div>
                                <div style={{ width: 1, height: "50%", background: '#000000', alignSelf: 'center' }}></div>
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', color: '#088466', cursor: 'pointer' }}><u onClick={() => { setAddressSub('ADD'); setAddressOpen(true) }}>Add Address</u></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>)
}