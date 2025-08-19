import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
export default function Contact() {

    const theme = useTheme()
    const md = useMediaQuery('(max-width:1300px)')
    const sm = useMediaQuery('(max-width:790px)')
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const smatches = useMediaQuery(theme.breakpoints.down('sm'))
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)')

    const [change, setChange] = useState(false)

    const [email, setEmail] = useState('')
    const [errorE, setErrorE] = useState('')
    const [touchedE, setTouchedE] = useState(false)

    const [mobile, setMobile] = useState('')
    const [errorM, setErrorM] = useState('')
    const [touchedM, setTouchedM] = useState(false)

    useEffect(() => {
        if (touchedE && email.length === 0) {
            setErrorE('Email is Required')
        } else {
            setErrorE('')
        }
        if (touchedM && mobile.length === 0) {
            setErrorM('Mobile is Required')
        } else {
            setErrorM('')
        }
    }, [email, mobile, touchedM, touchedE])

    return (<>
        <div style={{ display: 'flex', width: '100%', justifyContent: md ? 'center' : 'flex-end', marginBottom: 10 }}>
            <div style={{ display: 'flex', width: md ? '95%' : '80%', justifyContent: 'center', alignItems: 'center', background: ' #ffffff', }}>
                <div style={{ display: 'flex', width: '95%', height: '95%', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: 40, fontWeight: 700, fontSize: '95%' }}>CONTACT INFORMATION</div>
                    {change ? <>
                        <div style={{ width: '100%', height: sm ? 200 : 105, display: 'flex', justifyContent: 'space-between', flexDirection: sm ? 'column' : '', marginTop: sm ? 5 : 15 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: sm ? '100%' : '50%', height: errorE ? 112 : 90 }}>
                                <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #000000', display: 'flex', alignItems: 'center' }}>Email*</div>
                                <div style={{ width: sm ? '100%' : '97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: errorE ? '1px solid red' : '1px solid #f6f6f6', position: 'relative' }}>
                                    <input onBlur={() => setTouchedE(true)} onChange={(e) => setEmail(e.target.value)} value={email} className="placeholdercolor" type='email' placeholder="Enter Email" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '105%', background: ' #f6f6f6' }} />
                                </div>
                                {errorE && (
                                    <Typography sx={{ width: sm ? '100%' : '97%', fontSize: '90%', color: '#f44336', fontWeight: 600 }} >
                                        {errorE}
                                    </Typography>
                                )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: sm ? '100%' : '50%', height: errorM ? 112 : 90 }}>
                                <div style={{ width: sm ? '100%' : '97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #000000', display: 'flex', alignItems: 'center' }}>Mobile*
                                </div>
                                <div style={{ width: sm ? '100%' : '97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: errorM ? '1px solid red' : '1px solid #f6f6f6', position: 'relative' }}>
                                    <input onBlur={() => setTouchedM(true)} onChange={(e) => setMobile(e.target.value)} value={mobile} className="placeholdercolor" type="number" placeholder="Enter Mobile" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '105%', background: ' #f6f6f6' }} />
                                </div>
                                {errorM && (
                                    <Typography sx={{ width: sm ? '100%' : '97%', fontSize: '90%', color: '#f44336', fontWeight: 600 }} >
                                        {errorM}
                                    </Typography>
                                )}
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 100, display: 'flex', alignItems: 'center' }}>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center', cursor:'pointer',background: '#12daa8', width: 150, height: '45%', fontWeight: 650, borderRadius: 8, color: '#000000', marginRight: 25, fontSize: '90%' }}>Save Details</div>
                            <div style={{ width: '100%', height: 55, display: 'flex', alignItems: 'center', color: '#088466', cursor: 'pointer' }}><u onClick={() => setChange(false)}>Cancel</u></div>
                        </div>
                    </> : <>
                        <div style={{ width: '100%', height: 40, display: 'flex' }}>
                            <div style={{ marginRight: 30 }}>Email : pawansahu17112003@gmail.com</div>
                            <div style={{ width: 1, height: '50%', background: '#000' }}></div>
                            <div style={{ marginLeft: 30 }}>Mobile : 8878464095</div>
                        </div>
                        <div style={{ width: '100%', height: 55, display: 'flex', alignItems: 'center', color: '#088466', cursor: 'pointer' }}><u onClick={() => setChange(true)}>Change</u></div></>}
                </div>
            </div>
        </div>
    </>)
}