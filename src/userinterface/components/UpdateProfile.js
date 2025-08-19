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
import { getData, postData, generateOtp } from "../../backendservices/FetchNodeServices";

export default function UpdateProfile({ open, setOpen, openOtp, setOpenOtp, otpValue, setOtpValue, setMobileNum, setOpenMobile, openMobile, mobileNum }) {
    const theme = useTheme()
    const md = useMediaQuery('(max-width:1300px)')
    const sm = useMediaQuery('(max-width:790px)')
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const smatches = useMediaQuery(theme.breakpoints.down('sm'))
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)')

    const [buttonColor, setButtonColor] = useState('#12daa8')

    const handleChange = (value) => {
        setGender(value)
    }

    const [userList, setUserList] = useState({})
    const fetchUser = async () => {
        var user = {}
        try {
            user = JSON.parse(localStorage.getItem('user')) || {}
        } catch (e) {
            user = {}
        }

        const mobileNo = Object.keys(user)[0] || ''
        setMobile(mobileNo)

        if (mobileNum.length != 0) {
            setMobile(mobileNum)
        }

        if (open) {
            var res = await postData('userinterface/userinterface_fetch_user_by_mobile', { mobileno: mobileNo })
            setUserList(res.data)
            if (res.data) {
                if (res.data.emailid?.length > 0) {
                    setEmail(res.data.emailid)
                }

                var username = res.data.username?.split(' ') || []
                setTitle(username[0] || '')
                setFirstName(username[1] || '')
                setMiddleName(username[2] || '')
                setLastName(username[3] || '')
                setGender(res.data.gender)
            }
        }
    }
    useEffect(function () {
        fetchUser()
    }, [open == true, openMobile])

    const handleClick = async () => {
        var res = await postData('userinterface/update_user', { emailid: email, mobileno: mobile, username: `${title} ${firstName} ${middleName} ${lastName}`, gender, addressid: userList.addressid })
        setOpen(false)
    }

    const [title, setTitle] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState(null)

    const [errorF, setErrorF] = useState('')
    const [errorL, setErrorL] = useState('')
    const [errorM, setErrorM] = useState('')
    const [errorE, setErrorE] = useState('')
    const [touchedF, setTouchedF] = useState(false)
    const [touchedL, setTouchedL] = useState(false)
    const [touchedM, setTouchedM] = useState(false)
    const [touchedE, setTouchedE] = useState(false)

    useEffect(function () {
        if (touchedF && firstName.length === 0) {
            setErrorF('First Name is required')
        } else {
            setErrorF('')
        }
        if (touchedL && lastName.length === 0) {
            setErrorL('Last Name is required')
        } else {
            setErrorL('')
        }
        if (touchedM && mobile.length === 0) {
            setErrorM('Mobile Number is Required')
        } else {
            setErrorM('')
        }
        if (touchedE && email.length === 0) {
            setErrorE('Email is required')
        } else {
            setErrorE('')
        }
    }, [firstName, lastName, mobile, email, touchedF, touchedL, touchedE, touchedM,])
    return (<>
        <Dialog
            open={open}
            PaperProps={{ sx: { width: '800px', height: 'auto', background: '#191919', borderRadius: 2, } }}>
            <CloseIcon onClick={() => { setOpen(false) }} style={{ right: 6, position: 'absolute', top: 3, cursor: 'pointer', color: '#ffffff' }} />
            <div style={{ display: 'flex', width: '100%', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', }}>
                    <div style={{ display: 'flex', width: '95%', height: '100%', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', width: '100%', height: 40, alignItems: 'center', fontWeight: 700, fontSize: '100%', color: '#ffffff' }}>Update Profile</div>
                        <div style={{ width: '100%', height: sm ? 200 : 105, display: 'flex', justifyContent: 'space-between', flexDirection: sm ? 'column' : '' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: sm ? '100%' : '50%', height: 90, position: 'relative' }}>
                                <div style={{ width: '100%', fontSize: '100%', height: 40, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Title</div>
                                <Select displayEmpty onChange={(e) => setTitle(e.target.value)} value={title}
                                    sx={{ width: sm ? '100%' : '97%', height: 55, border: '1px solid #f6f6f6', backgroundColor: '#f6f6f6', borderRadius: 2.2, color: '#000000', pl: 1, fontSize: '120%', '.MuiSvgIcon-root': { color: 'transparent' }, '.MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                                    MenuProps={{ PaperProps: { sx: { backgroundColor: '#ffffff', color: '#000', borderRadius: 1.2, boxShadow: '0px 4px 12px rgba(0,0,0,0.15)', fontWeight: 600 } } }}>
                                    <MenuItem value="Mr" sx={{ fontWeight: 650, color: ' #000000', '&.Mui-selected': { backgroundColor: '#ffffff' }, '&.Mui-selected:hover': { backgroundColor: '#ffffff' }, '&:hover': { backgroundColor: '#ffffff' } }}>Mr</MenuItem>
                                    <MenuItem value="Mrs" sx={{ fontWeight: 650, color: ' #000000', '&.Mui-selected': { backgroundColor: '#ffffff' }, '&.Mui-selected:hover': { backgroundColor: '#ffffff' }, '&:hover': { backgroundColor: '#ffffff' } }}>Mrs</MenuItem>
                                    <MenuItem value="Miss" sx={{ fontWeight: 650, color: ' #000000', '&.Mui-selected': { backgroundColor: '#ffffff' }, '&.Mui-selected:hover': { backgroundColor: '#ffffff' }, '&:hover': { backgroundColor: '#ffffff' } }}>Miss</MenuItem>
                                    <MenuItem value="Ms" sx={{ fontWeight: 650, color: ' #000000', '&.Mui-selected': { backgroundColor: '#ffffff' }, '&.Mui-selected:hover': { backgroundColor: '#ffffff' }, '&:hover': { backgroundColor: '#ffffff' } }}>Ms</MenuItem>
                                    <MenuItem value="Dr" sx={{ fontWeight: 650, color: ' #000000', '&.Mui-selected': { backgroundColor: '#ffffff' }, '&.Mui-selected:hover': { backgroundColor: '#ffffff' }, '&:hover': { backgroundColor: '#ffffff' } }}>Dr</MenuItem>
                                    <MenuItem value="Prof" sx={{ fontWeight: 650, color: ' #000000', '&.Mui-selected': { backgroundColor: '#ffffff' }, '&.Mui-selected:hover': { backgroundColor: '#ffffff' }, '&:hover': { backgroundColor: '#ffffff' } }}>Prof</MenuItem>
                                </Select>
                                <ArrowDropDownIcon style={{ position: 'absolute', right: '6%', top: '50%', color: ' #666666', fontSize: '200%', pointerEvents: 'none' }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', width: sm ? '100%' : '50%', height: errorF ? 112 : 90, alignItems: sm ? '' : 'flex-end' }}>
                                <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>First Name</div>
                                <div style={{ width: sm ? '100%' : '97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: errorF ? '1px solid red' : '1px solid #f6f6f6' }}>
                                    <input onBlur={() => setTouchedF(true)} onChange={(e) => setFirstName(e.target.value)} value={firstName} className="placeholdercolor" type="text" placeholder="Enter First Name" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '105%', background: ' #f6f6f6' }} />
                                </div>
                                {errorF && (
                                    <Typography sx={{ width: sm ? '100%' : '97%', fontSize: '90%', color: '#f44336', fontWeight: 600 }} >
                                        {errorF}
                                    </Typography>
                                )}
                            </div>
                        </div>

                        <div style={{ width: '100%', height: sm ? 200 : 105, display: 'flex', justifyContent: 'space-between', flexDirection: sm ? 'column' : '', marginTop: sm ? 19 : 15 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: sm ? '100%' : '50%', height: 90 }}>
                                <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Middle Name</div>
                                <div style={{ width: sm ? '100%' : '97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: '1px solid #f6f6f6' }}>
                                    <input onChange={(e) => setMiddleName(e.target.value)} value={middleName} className="placeholdercolor" type="text" placeholder="Enter Middle Name" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '105%', background: '#f6f6f6' }} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', width: sm ? '100%' : '50%', height: errorL ? 112 : 90, alignItems: sm ? '' : 'flex-end' }}>
                                <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Last Name</div>
                                <div style={{ width: sm ? '100%' : '97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: errorL ? '1px solid red' : '1px solid #f6f6f6' }}>
                                    <input onBlur={() => setTouchedL(true)} onChange={(e) => setLastName(e.target.value)} value={lastName} className="placeholdercolor" type="text" placeholder="Enter Last Name" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '105%', background: '#f6f6f6' }} />
                                </div>
                                {errorL && (
                                    <Typography sx={{ width: sm ? '100%' : '97%', fontSize: '90%', color: '#f44336', fontWeight: 600 }} >
                                        {errorL}
                                    </Typography>
                                )}
                            </div>
                        </div>

                        <div style={{ width: '100%', height: sm ? 60 : 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: sm ? 5 : '' }}>
                            <div style={{ display: 'flex' }}><Radio checked={gender == 'Female'} onChange={() => handleChange('Female')} sx={{ color: '#ffffff', '&.Mui-checked': { color: ' #12daa8' } }} /><div style={{ display: 'flex', alignItems: 'center', color: '#ffffff', fontSize: '100%' }}>Female</div></div>
                            <div style={{ display: 'flex' }}><Radio checked={gender == 'Male'} onChange={() => handleChange('Male')} sx={{ color: '#ffffff', '&.Mui-checked': { color: ' #12daa8' } }} /><div style={{ display: 'flex', alignItems: 'center', color: '#ffffff', fontSize: '100%' }}>Male</div></div>
                            <div style={{ display: 'flex' }}><Radio checked={gender == 'Transgender'} onChange={() => handleChange('Transgender')} sx={{ color: '#ffffff', '&.Mui-checked': { color: ' #12daa8' } }} /><div style={{ display: 'flex', alignItems: 'center', color: '#ffffff', fontSize: '100%' }}>Transgender</div></div>
                            <div style={{ display: 'flex' }}><Radio checked={gender == 'I’d rather not say'} onChange={() => handleChange('I’d rather not say')} sx={{ color: '#ffffff', '&.Mui-checked': { color: ' #12daa8' } }} /><div style={{ display: 'flex', alignItems: 'center', color: '#ffffff', fontSize: '100%' }}>I’d rather not say</div></div>
                        </div>

                        <div style={{ width: '100%', height: sm ? 200 : 105, display: 'flex', justifyContent: 'space-between', flexDirection: sm ? 'column' : '', marginTop: sm ? '' : 15 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: sm ? '100%' : '50%', height: errorM ? 112 : 90 }}>
                                <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Mobile Number *</div>
                                <div style={{ width: sm ? '100%' : '97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: errorM ? '1px solid red' : '1px solid #f6f6f6', position: 'relative' }}>
                                    <input disabled onBlur={() => setTouchedM(true)} onChange={(e) => setMobile(e.target.value)} value={mobile} className="placeholdercolor" type="text" placeholder="Enter Mobile Number" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '105%', background: ' #f6f6f6' }} />
                                    <EditOutlinedIcon onClick={() => { setOpenMobile(true) }} style={{ position: 'absolute', right: '3%', top: '25%', fontSize: '150%', cursor: 'pointer' }} />
                                </div>
                                {errorM && (
                                    <Typography sx={{ width: sm ? '100%' : '97%', fontSize: '90%', color: '#f44336', fontWeight: 600 }} >
                                        {errorM}
                                    </Typography>
                                )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: sm ? '100%' : '50%', height: errorE ? 112 : 90 }}>
                                <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Email Id *</div>
                                <div style={{ width: sm ? '100%' : '97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: errorE ? '1px solid red' : '1px solid #f6f6f6', position: 'relative' }}>
                                    <input onBlur={() => setTouchedE(true)} onChange={(e) => setEmail(e.target.value)} value={email} className="placeholdercolor" type="text" placeholder="Enter Middle Name" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '105%', background: ' #f6f6f6' }} />
                                    <EditOutlinedIcon style={{ position: 'absolute', right: '3%', top: '25%', fontSize: '150%', cursor: 'pointer' }} />
                                </div>
                                {errorE && (
                                    <Typography sx={{ width: sm ? '100%' : '97%', fontSize: '90%', color: '#f44336', fontWeight: 600 }} >
                                        {errorE}
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