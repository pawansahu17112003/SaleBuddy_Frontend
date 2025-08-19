import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import Radio from '@mui/material/Radio'

export default function Address({nickName, setNickName,pin, setPin,address, setAddress,landmark, setLandmark,area, setArea,state, setState,city, setCity,handleSubmit,
    errorN, setErrorN, touchedN, setTouchedN, errorP, setErrorP, touchedP, setTouchedP, errorA, setErrorA, touchedA, setTouchedA, errorLa, setErrorLa, touchedLa, setTouchedLa, errorAr, setErrorAr, touchedAr, setTouchedAr, errorS, setErrorS, touchedS, setTouchedS, errorC, setErrorC, touchedC, setTouchedC
}) {

    const theme = useTheme()
    const md = useMediaQuery('(max-width:1300px)')
    const sm = useMediaQuery('(max-width:790px)')
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const smatches = useMediaQuery(theme.breakpoints.down('sm'))
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)')

    const [check, setCheck] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)
    const handleChange = (value) => {
        setSelectedValue(value)
    }

    

    useEffect(() => {
        if (touchedN && nickName.length === 0) {
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
    return (<>
        <style>{`
        .placeholdercolor::placeholder {
          font-size: ${matches ? '80%' : '70%'}
          color: #aaa
        }
      `}</style>

        <div style={{ display: 'flex', width: '100%', alignItems: md ? 'center' : 'flex-end', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: md ? '95%' : '80%', height: '100%', background: ' #ffffff', marginTop: 20 }}>
                <div style={{ display: 'flex', width: '95%', height: '100%', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', width: '100%', height: 50, alignItems: 'center', fontWeight: 700, fontSize: '100%' }}>Address Details</div>
                    <div style={{ width: '100%', height: sm ? 200 : 105, display: 'flex', justifyContent: 'space-between', flexDirection: sm ? 'column' : '', marginTop: sm ? '' : 15 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: sm ? '100%' : '50%', height: errorN ? 112 : 90 }}>
                            <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #000000', display: 'flex', alignItems: 'center' }}>Address Nick Name*</div>
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
                            <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #000000', display: 'flex', alignItems: 'center' }}>Pin Code*
                            </div>
                            <div style={{ width: sm ? '100%' : '97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: errorP ? '1px solid red' : '1px solid #f6f6f6', position: 'relative' }}>
                                <input onBlur={() => setTouchedP(true)} onChange={(e) => setPin(e.target.value)} value={pin} className="placeholdercolor" type="number"  placeholder="Enter Pin Code" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '105%', background: ' #f6f6f6' }} />
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
                            <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #000000', display: 'flex', alignItems: 'center' }}>Address (Flat no., Building, Company, Street)*</div>
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
                            <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #000000', display: 'flex', alignItems: 'center' }}>Landmark*
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
                            <div style={{ width: '100%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #000000', display: 'flex', alignItems: 'center' }}>Locality / Sector / Area*
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
                            <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #000000', display: 'flex', alignItems: 'center' }}>State*</div>
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
                            <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #000000', display: 'flex', alignItems: 'center' }}>City*
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
                    <div style={{ width: '100%', height: sm ? 60 : 50, display: 'flex', marginTop: sm ? 15 : '', flexDirection: 'column' }}>
                        <div style={{ width: '100%', fontSize: '100%', height: 20, marginBottom: 'auto', color: ' #000000', display: 'flex', alignItems: 'center' }}>Address Type</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
                            <div style={{ display: 'flex' }}><Radio checked={selectedValue == 'Home'} onChange={() => handleChange('Home')} sx={{ color: '#000000', '&.Mui-checked': { color: ' #12daa8' } }} /><div style={{ display: 'flex', alignItems: 'center', color: '#000000', fontSize: '100%' }}>Home</div></div>
                            <div style={{ display: 'flex' }}><Radio checked={selectedValue == 'Work'} onChange={() => handleChange('Work')} sx={{ color: '#000000', '&.Mui-checked': { color: ' #12daa8' } }} /><div style={{ display: 'flex', alignItems: 'center', color: '#000000', fontSize: '100%' }}>Work</div></div>
                            <div style={{ display: 'flex' }}><Radio checked={selectedValue == 'Others'} onChange={() => handleChange('Others')} sx={{ color: '#000000', '&.Mui-checked': { color: ' #12daa8' } }} /><div style={{ display: 'flex', alignItems: 'center', color: '#000000', fontSize: '100%' }}>Others</div></div>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: 80, marginTop: sm ? 30 : 40, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ width: '90%', height: '40%' }}>Billing Address</div>
                        <div style={{ width: '90%', height: '60%', display: 'flex' }}>{check ? (<><CheckBoxOutlineBlankIcon onClick={() => { setCheck(false) }} style={{ color: ' #000000', fontSize: '140%', marginRight: 5 }} /></>) : (<><CheckBoxIcon onClick={() => { setCheck(true) }} style={{ color: ' #00e9bf', fontSize: '140%', marginRight: 5 }} /></>)}
                            <div style={{ color: ' #000000', fontSize: '110%', fontWeight: 600 }}>Same as Shipping address</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}