import ShowProductCart from "../components/CartComponent/ShowProductCart";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutOrder from "../components/checkout/CheckoutOrder";
import ShippingInfo from "../components/checkout/ShippingInfo";
import ProfilePage from "../components/checkout/ProfilePage";
import Address from "../components/checkout/Address";
import Delivery from "../components/checkout/Delivery";
import GST from "../components/checkout/GST";
import Contact from "../components/checkout/Contact";
import CheckOutHeader from "../components/checkout/CheckOutHeader";
import SubmittedAddress from "../components/checkout/SubmittedAddress";
import { postData } from "../../backendservices/FetchNodeServices";
import { useDispatch } from "react-redux";
import SelectedAddress from "../components/checkout/SelectedAddress";

export default function Checkout() {

    const theme = useTheme();
    const md = useMediaQuery('(max-width:1300px)');
    const sm = useMediaQuery('(max-width:700px)');
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');

    var dispatch = useDispatch()
    const [refresh, setRefresh] = useState('')
    const [userAddress, setUserAddress] = useState([])
    const [index, setIndex] = useState(0)
    const [addressId, setAddressId] = useState(null)
    // var user = useSelector((state) => state.user)
    // var mobileno = Object.keys(user)[0]

    var user = {}
    try {
        user = JSON.parse(localStorage.getItem('user')) || {}
    } catch (e) {
        user = {}
    }
    var mobileno = Object.keys(user)[0] || ''

    // var product = useSelector((state) => state.cart)
    // var productData = Object.values(product)

    var productData = []
    try {
        const product = JSON.parse(localStorage.getItem('cart'))
        productData = Object.values(product)
    }
    catch (e) { }

    const [title, setTitle] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mobile, setMobile] = useState(mobileno)
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState(null)
    const [nickName, setNickName] = useState('')
    const [pin, setPin] = useState('')
    const [address, setAddress] = useState('')
    const [landmark, setLandmark] = useState('')
    const [area, setArea] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')

    const [errorF, setErrorF] = useState('')
    const [errorL, setErrorL] = useState('')
    const [errorM, setErrorM] = useState('')
    const [errorE, setErrorE] = useState('')
    const [touchedF, setTouchedF] = useState(false)
    const [touchedL, setTouchedL] = useState(false)
    const [touchedM, setTouchedM] = useState(false)
    const [touchedE, setTouchedE] = useState(false)

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

    const handleSubmit = async () => {
        var err = false
        if (nickName.length == 0) {
            setErrorN('Address Nickname is Required')
            err = true
        }
        if (pin.length === 0) {
            setErrorP('Pin Code is required')
            err = true
        }
        if (address.length === 0) {
            setErrorA('Address is Required')
            err = true
        }
        if (landmark.length === 0) {
            setErrorLa('Landmark is required')
            err = true
        }
        if (area.length === 0) {
            setErrorAr('Locality / Sector / Area is Required')
            err = true
        }
        if (state.length === 0) {
            setErrorS('State is Required')
            err = true
        }
        if (city.length === 0) {
            setErrorC('City is Required')
            err = true
        }
        if (firstName.length === 0) {
            setErrorF('First Name is required')
            err = true
        }
        if (lastName.length === 0) {
            setErrorL('Last Name is required')
            err = true
        }
        if (mobile?.length === 0) {
            setErrorM('Mobile Number is Required')
            err = true
        }
        if (email?.length === 0) {
            setErrorE('Email is required')
            err = true
        }
        if (err === false) {
            var res = await postData('userinterface/userinterface_user_address_submit', { emailid: email, mobileno: mobile, address, state, city, pincode: pin, landmark, username: `${title} ${firstName} ${middleName} ${lastName}`, gender, area, nickname: nickName })
            if (res.status) {
                alert('Submit')
            }
            else {
                alert('Fail')
            }
        }
    }

    const fetchUserAddress = async () => {
        var res = await postData('userinterface/userinterface_chk_address', { mobileno })
        if (res.status) {
            setUserAddress(res.data)
            dispatch({ type: 'ADD_USER', payload: [mobileno, res.data] })
            localStorage.setItem('user', JSON.stringify({ [mobileno]: res.data }))
        }
    }

    useEffect(function () {
        fetchUserAddress()
    }, [])

    console.log('adressid',addressId)
    return (<>
        <div style={{ width: '100%', height: '100%', background: ' #f9f9f9', fontFamily: '"Inter", sans-serif' }}>
            <div>
                <CheckOutHeader />
            </div>
            <div style={{ width: '100%', minHeight: 500, display: 'flex', flexDirection: md ? 'column' : '', marginTop: 25 }}>
                <div style={{ width: md ? '100%' : '65%', display: 'flex', flexDirection: 'column' }}>
                    {userAddress?.length == 0 ? <><ShippingInfo />
                        <ProfilePage title={title} setTitle={setTitle} firstName={firstName} setFirstName={setFirstName} middleName={middleName} setMiddleName={setMiddleName} lastName={lastName} gender={gender} setGender={setGender} setLastName={setLastName} mobile={mobile} setMobile={setMobile} email={email} setEmail={setEmail}
                            errorF={errorF} setErrorF={setErrorF} touchedF={touchedF} setTouchedF={setTouchedF} errorL={errorL} setErrorL={setErrorL} touchedL={touchedL} setTouchedL={setTouchedL} errorM={errorM} setErrorM={setErrorM} touchedM={touchedM} setTouchedM={setTouchedM} errorE={errorE} setErrorE={setErrorE} touchedE={touchedE} setTouchedE={setTouchedE} />
                        <Address nickName={nickName} setNickName={setNickName} pin={pin} setPin={setPin} address={address} setAddress={setAddress} landmark={landmark} setLandmark={setLandmark} area={area} setArea={setArea} state={state} setState={setState} city={city} setCity={setCity}
                            errorN={errorN} setErrorN={setErrorN} touchedN={touchedN} setTouchedN={setTouchedN} errorP={errorP} setErrorP={setErrorP} touchedP={touchedP} setTouchedP={setTouchedP} errorA={errorA} setErrorA={setErrorA} touchedA={touchedA} setTouchedA={setTouchedA} errorLa={errorLa} setErrorLa={setErrorLa} touchedLa={touchedLa} setTouchedLa={setTouchedLa} errorAr={errorAr} setErrorAr={setErrorAr} touchedAr={touchedAr} setTouchedAr={setTouchedAr} errorS={errorS} setErrorS={setErrorS} touchedS={touchedS} setTouchedS={setTouchedS} errorC={errorC} setErrorC={setErrorC} touchedC={touchedC} setTouchedC={setTouchedC} />
                        <Contact /></> :
                        <SubmittedAddress addressId={addressId} setAddressId={setAddressId} index={index} setIndex={setIndex} userAddress={userAddress} fetchUserAddress={fetchUserAddress} />}
                    <Delivery refresh={refresh} setRefresh={setRefresh} productData={productData} />
                    <GST />
                </div>
                <div style={{ width: md ? '100%' : '35%', }}>
                    <CheckoutOrder index={index} userAddress={userAddress} status={userAddress.length >= 1 ? true : false} handleSubmit={handleSubmit} userStatus={userAddress?.length} productData={productData} />
                    <SelectedAddress addressId={addressId} setAddressId={setAddressId} />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    </>)
}