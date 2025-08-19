import { Dialog } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Select, MenuItem, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import Radio from '@mui/material/Radio'
import CloseIcon from '@mui/icons-material/Close';
import { getData, postData } from "../../backendservices/FetchNodeServices";

export default function UpdateAddress({ addressOpen, setAddressOpen, addressSub, addressId }) {
    const theme = useTheme()
    const md = useMediaQuery('(max-width:1300px)')
    const sm = useMediaQuery('(max-width:790px)')
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const smatches = useMediaQuery(theme.breakpoints.down('sm'))
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)')

    const [buttonColor, setButtonColor] = useState('#12daa8')

    var user = {}
    try {
        user = JSON.parse(localStorage.getItem('user')) || {}
    } catch (e) {
        user = {}
    }
    var mobileno = Object.keys(user)[0] || ''

    const [userList, setUserList] = useState({})

    const fetchUser = async () => {
        if (addressSub == 'ADD') {
            var res = await postData('userinterface/userinterface_fetch_user_by_mobile', { mobileno })
            setUserList(res.data)
            if (res.data.emailid.length > 0) {
                setEmail(res.data.emailid || '')
            }
            var username = res.data.username.split(' ')
            setTitle(username[0])
            setFirstName(username[1])
            setMiddleName(username[2])
            setLastName(username[3])
            setGender(res.data.gender)
        }
        else {
            var res = await postData('userinterface/userinterface_fetch_user_by_id', { addressid: addressId })
            setUserList(res.data)
            setNickName(res.data.nickname || '')
            setPin(res.data.pincode || '')
            setAddress(res.data.address || '')
            setLandmark(res.data.landmark || '')
            setArea(res.data.area || '')
            setState(res.data.state || '')
            setCity(res.data.city || '')
        }
    }

    useEffect(() => {
        if (addressOpen) {
            fetchUser()
        }
    }, [addressOpen, addressSub])


    const handleClick = async () => {
        if (addressSub == 'ADD') {
            var res = await postData('userinterface/userinterface_user_address_submit', { emailid: email, mobileno: mobile, address, state, city, pincode: pin, landmark, username: `${title} ${firstName} ${middleName} ${lastName}`, gender, area, nickname: nickName })
            setAddressOpen(false)
        }
        else {
            var res = await postData('userinterface/update_address', { address, state, city, pincode: pin, landmark, nickname: nickName, area, addressid: addressId })
            setAddressOpen(false)
        }
    }

    const [nickName, setNickName] = useState('')
    const [pin, setPin] = useState('')
    const [address, setAddress] = useState('')
    const [landmark, setLandmark] = useState('')
    const [area, setArea] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [title, setTitle] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mobile, setMobile] = useState(mobileno)
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState(null)

    const [errorN, setErrorN] = useState('')
    const [errorC, setErrorC] = useState('')
    const [errorP, setErrorP] = useState('')
    const [errorA, setErrorA] = useState('')
    const [errorLa, setErrorLa] = useState('')
    const [errorAr, setErrorAr] = useState('')
    const [errorS, setErrorS] = useState('')
    const [touchedN, setTouchedN] = useState(false)
    const [touchedP, setTouchedP] = useState(false)
    const [touchedA, setTouchedA] = useState(false)
    const [touchedLa, setTouchedLa] = useState(false)
    const [touchedAr, setTouchedAr] = useState(false)
    const [touchedS, setTouchedS] = useState(false)
    const [touchedC, setTouchedC] = useState(false)

    useEffect(() => {
        if (touchedN && nickName.length == 0) {
            setErrorN('Address Nickname is Required')
        } else {
            setErrorN('')
        }
        if (touchedP && pin.length === 0) {
            setErrorP('Pin Code is required')
        } else {
            setErrorP('')
        }
        if (touchedA && address.length === 0) {
            setErrorA('Address is Required')
        } else {
            setErrorA('')
        }
        if (touchedLa && landmark.length === 0) {
            setErrorLa('Landmark is required')
        } else {
            setErrorLa('')
        }
        if (touchedAr && area.length === 0) {
            setErrorAr('Locality / Sector / Area is Required')
        } else {
            setErrorAr('')
        }
        if (touchedS && state.length === 0) {
            setErrorS('State is Required')
        } else {
            setErrorS('')
        }
        if (touchedC && city.length === 0) {
            setErrorC('City is Required')
        } else {
            setErrorC('')
        }
    }, [nickName, pin, address, landmark, area, state, city, touchedP, touchedN, touchedA, touchedLa, touchedAr, touchedS, touchedC])

    const handleReset = () => {
        setNickName('')
        setPin('')
        setAddress('')
        setLandmark('')
        setArea('')
        setState('')
        setCity('')
    }

    return (<>
        <Dialog
            open={addressOpen}
            PaperProps={{ sx: { width: '800px', height: 'auto', background: '#191919', borderRadius: 2, } }}>
            <CloseIcon onClick={() => { setAddressOpen(false);handleReset() }} style={{ right: 6, position: 'absolute', top: 3, cursor: 'pointer', color: '#ffffff' }} />
            <div style={{ display: 'flex', width: '100%', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', }}>
                    <div style={{ display: 'flex', width: '95%', height: '100%', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', width: '100%', height: 40, alignItems: 'center', fontWeight: 700, fontSize: '100%', color: '#ffffff' }}>{addressSub} ADDRESS</div>
                        <div style={{ width: '100%', height: sm ? 200 : 105, display: 'flex', justifyContent: 'space-between', flexDirection: sm ? 'column' : '', marginTop: sm ? '' : 15 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: sm ? '100%' : '50%', height: errorN ? 112 : 90 }}>
                                <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Address Nick Name*</div>
                                <div style={{ width: sm ? '100%' : '97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: errorN ? '1px solid red' : '1px solid #f6f6f6', position: 'relative' }}>
                                    <input onBlur={() => setTouchedN(true)} onChange={(e) => setNickName(e.target.value)} value={nickName} className="placeholdercolor" type="text" placeholder="Enter Address Nick Name" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '105%', background: ' #f6f6f6' }} />
                                </div>
                                {errorN && (
                                    <Typography sx={{ width: sm ? '100%' : '97%', fontSize: '90%', color: '#f44336', fontWeight: 600 }} >
                                        {errorN}
                                    </Typography>
                                )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: sm ? '100%' : '50%', height: errorP ? 112 : 90 }}>
                                <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Pin Code*
                                </div>
                                <div style={{ width: sm ? '100%' : '97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: errorP ? '1px solid red' : '1px solid #f6f6f6', position: 'relative' }}>
                                    <input onBlur={() => setTouchedP(true)} onChange={(e) => setPin(e.target.value)} value={pin} className="placeholdercolor" type="number" placeholder="Enter Pin Code" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '105%', background: ' #f6f6f6' }} />
                                </div>
                                {errorP && (
                                    <Typography sx={{ width: sm ? '100%' : '97%', fontSize: '90%', color: '#f44336', fontWeight: 600 }} >
                                        {errorP}
                                    </Typography>
                                )}
                            </div>
                        </div>

                        <div style={{ width: '100%', height: sm ? 200 : 105, display: 'flex', justifyContent: 'space-between', flexDirection: sm ? 'column' : '', marginTop: sm ? 18 : 15 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: sm ? '100%' : '50%', height: errorA ? 112 : 90 }}>
                                <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Address (Flat no., Building)*</div>
                                <div style={{ width: sm ? '100%' : '97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: errorA ? '1px solid red' : '1px solid #f6f6f6', position: 'relative' }}>
                                    <input onBlur={() => setTouchedA(true)} onChange={(e) => setAddress(e.target.value)} value={address} className="placeholdercolor" type="text" placeholder="Flat No./Building/Society" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '105%', background: ' #f6f6f6' }} />
                                </div>
                                {errorA && (
                                    <Typography sx={{ width: sm ? '100%' : '97%', fontSize: '90%', color: '#f44336', fontWeight: 600 }} >
                                        {errorA}
                                    </Typography>
                                )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: sm ? '100%' : '50%', height: errorLa ? 112 : 90 }}>
                                <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Landmark*
                                </div>
                                <div style={{ width: sm ? '100%' : '97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: errorLa ? '1px solid red' : '1px solid #f6f6f6', position: 'relative' }}>
                                    <input onBlur={() => setTouchedLa(true)} onChange={(e) => setLandmark(e.target.value)} value={landmark} className="placeholdercolor" type="text" placeholder="Enter Landmark" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '105%', background: ' #f6f6f6' }} />
                                </div>
                                {errorLa && (
                                    <Typography sx={{ width: sm ? '100%' : '97%', fontSize: '90%', color: '#f44336', fontWeight: 600 }} >
                                        {errorLa}
                                    </Typography>
                                )}
                            </div>
                        </div>

                        <div style={{ width: '100%', height: 105, display: 'flex', justifyContent: 'space-between', flexDirection: sm ? 'column' : '', marginTop: sm ? 18 : 15 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: errorAr ? 112 : 90 }}>
                                <div style={{ width: '100%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Locality / Sector / Area*
                                </div>
                                <div style={{ width: '100%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: errorAr ? '1px solid red' : '1px solid #f6f6f6', position: 'relative' }}>
                                    <input onBlur={() => setTouchedAr(true)} onChange={(e) => setArea(e.target.value)} value={area} className="placeholdercolor" type="text" placeholder="Enter Locality/Sector/Area" style={{ width: '95%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '105%', background: ' #f6f6f6' }} />
                                </div>
                                {errorAr && (
                                    <Typography sx={{ width: sm ? '100%' : '97%', fontSize: '90%', color: '#f44336', fontWeight: 600 }} >
                                        {errorAr}
                                    </Typography>
                                )}
                            </div>
                        </div>

                        <div style={{ width: '100%', height: sm ? 200 : 105, display: 'flex', justifyContent: 'space-between', flexDirection: sm ? 'column' : '', marginTop: sm ? 5 : 15 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: sm ? '100%' : '50%', height: errorS ? 112 : 90 }}>
                                <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>State*</div>
                                <div style={{ width: sm ? '100%' : '97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: errorS ? '1px solid red' : '1px solid #f6f6f6', position: 'relative' }}>
                                    <input onBlur={() => setTouchedS(true)} onChange={(e) => setState(e.target.value)} value={state} className="placeholdercolor" type="text" placeholder="Enter State" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '105%', background: ' #f6f6f6' }} />
                                </div>
                                {errorS && (
                                    <Typography sx={{ width: sm ? '100%' : '97%', fontSize: '90%', color: '#f44336', fontWeight: 600 }} >
                                        {errorS}
                                    </Typography>
                                )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: sm ? '100%' : '50%', height: errorC ? 112 : 90 }}>
                                <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>City*
                                </div>
                                <div style={{ width: sm ? '100%' : '97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: errorC ? '1px solid red' : '1px solid #f6f6f6', position: 'relative' }}>
                                    <input onBlur={() => setTouchedC(true)} onChange={(e) => setCity(e.target.value)} value={city} className="placeholdercolor" type="text" placeholder="Enter City" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '105%', background: ' #f6f6f6' }} />
                                </div>
                                {errorC && (
                                    <Typography sx={{ width: sm ? '100%' : '97%', fontSize: '90%', color: '#f44336', fontWeight: 600 }} >
                                        {errorC}
                                    </Typography>
                                )}
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 105, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <Button onClick={handleClick} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%', width: '80%', color: '#000000', fontWeight: 600, background: '#12DAA8' }}>Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    </>)
}