import Footer from '../Footer'
import Header from '../Header'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Select, MenuItem, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import Radio from '@mui/material/Radio'

export default function ProfilePage({ number }) {

    const theme = useTheme()
    const md = useMediaQuery('(max-width:1300px)')
    const sm = useMediaQuery('(max-width:790px)')
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const smatches = useMediaQuery(theme.breakpoints.down('sm'))
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)')

    const [firstName, setFirstName] = useState('')
    const [errorF, setErrorF] = useState('')
    const [touchedF, setTouchedF] = useState(false)

    const [middleName, setMiddleName] = useState('')

    const [lastName, setLastName] = useState('')
    const [errorL, setErrorL] = useState('')
    const [touchedL, setTouchedL] = useState(false)

    const [selectedValue, setSelectedValue] = useState(null)
    const [buttonColor, setButtonColor] = useState('#12daa8')

    const handleChange = (value) => {
        setSelectedValue(value)
    }

    useEffect(() => {
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
    }, [firstName, lastName, touchedF, touchedL])

    return (<>

        <style>{`
        .placeholdercolor::placeholder {
          font-size: ${matches ? '80%' : '100%'}
          color: #aaa
        }
      `}</style>

        <div style={{ width: '100%', height: '100%', background: ' #191919', fontFamily: '"Inter", sans-serif' }}>
            <Header />
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ width: sm?'95%': 770, height: 80, fontSize: sm ? '100%' : '100%', fontWeight: 400, color: '#ffffff', display: 'flex', alignItems: 'center' }}>My Account <ArrowForwardIosIcon style={{ fontSize: '80%' }} /> My Profile Page </div>
                <div style={{ width:sm?'95%': 770, height: 80, display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '160%', color: ' #ffffff' }}>My Profile Page</div>
                <div style={{ width:sm?'95%': 770, height: sm?200:105, display: 'flex', justifyContent: 'space-between',flexDirection:sm?'column':'' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: sm?'100%':'50%', height: 90, position: 'relative' }}>
                        <div style={{ width: '100%', fontSize: '100%', height: 40, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Title</div>
                        <Select displayEmpty
                            sx={{ width: sm?'100%':'97%', height: 55, border: '1px solid #ffffff', backgroundColor: '#191919', borderRadius: 2.2, color: '#bebebeff', pl: 1, fontSize: '120%', '.MuiSvgIcon-root': { color: 'transparent' }, '.MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                            MenuProps={{ PaperProps: { sx: { backgroundColor: '#191919', color: '#fff', borderRadius: 1, boxShadow: 'none', fontWeight: 600 } } }}>
                            <MenuItem value="Mr" sx={{ fontWeight: 650, '&.Mui-selected': { backgroundColor: '#191919' }, '&.Mui-selected:hover': { backgroundColor: '#191919' }, '&:hover': { backgroundColor: '#191919' } }}>Mr</MenuItem>
                            <MenuItem value="Mrs" sx={{ fontWeight: 650, '&.Mui-selected': { backgroundColor: '#191919' }, '&.Mui-selected:hover': { backgroundColor: '#191919' }, '&:hover': { backgroundColor: '#191919' } }}>Mrs</MenuItem>
                            <MenuItem value="Miss" sx={{ fontWeight: 650, '&.Mui-selected': { backgroundColor: '#191919' }, '&.Mui-selected:hover': { backgroundColor: '#191919' }, '&:hover': { backgroundColor: '#191919' } }}>Miss</MenuItem>
                            <MenuItem value="Ms" sx={{ fontWeight: 650, '&.Mui-selected': { backgroundColor: '#191919' }, '&.Mui-selected:hover': { backgroundColor: '#191919' }, '&:hover': { backgroundColor: '#191919' } }}>Ms</MenuItem>
                            <MenuItem value="Dr" sx={{ fontWeight: 650, '&.Mui-selected': { backgroundColor: '#191919' }, '&.Mui-selected:hover': { backgroundColor: '#191919' }, '&:hover': { backgroundColor: '#191919' } }}>Dr</MenuItem>
                            <MenuItem value="Prof" sx={{ fontWeight: 650, '&.Mui-selected': { backgroundColor: '#191919' }, '&.Mui-selected:hover': { backgroundColor: '#191919' }, '&:hover': { backgroundColor: '#191919' } }}>Prof</MenuItem>
                        </Select>
                        <KeyboardArrowDownIcon style={{ position: 'absolute', right: '6%', top: '48%', color: ' #666666', fontSize: '250%', pointerEvents: 'none' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', width: sm?'100%':'50%', height: errorF ? 112 : 90, alignItems: sm?'':'flex-end' }}>
                        <div style={{ width: sm?'100%':'97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>First Name</div>
                        <div style={{ width: sm?'100%':'97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: errorF ? '1px solid red' : '1px solid #f6f6f6' }}>
                            <input onBlur={() => setTouchedF(true)} onChange={(e) => setFirstName(e.target.value)} value={firstName} className="placeholdercolor" type="text" placeholder="Enter First Name" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '120%' }} />
                        </div>
                        {errorF && (
                            <Typography sx={{width: sm?'100%':'97%', fontSize: '90%', color: '#f44336', }} >
                                {errorF}
                            </Typography>
                        )}
                    </div>
                </div>

                <div style={{ width:sm?'95%': 770, height: sm?200:105, display: 'flex', justifyContent: 'space-between',flexDirection:sm?'column':'',marginTop:sm?19:15 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: sm?'100%':'50%', height: 90 }}>
                        <div style={{ width: sm?'100%':'97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Middle Name</div>
                        <div style={{ width: sm?'100%':'97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: '1px solid #f6f6f6' }}>
                            <input onChange={(e) => setMiddleName(e.target.value)} value={middleName} className="placeholdercolor" type="text" placeholder="Enter Middle Name" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '120%' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', width: sm?'100%':'50%', height: errorL ? 112 : 90, alignItems: sm?'':'flex-end' }}>
                        <div style={{ width: sm?'100%':'97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Last Name</div>
                        <div style={{ width: sm?'100%':'97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: errorL ? '1px solid red' : '1px solid #f6f6f6' }}>
                            <input onBlur={() => setTouchedL(true)} onChange={(e) => setLastName(e.target.value)} value={lastName} className="placeholdercolor" type="text" placeholder="Enter Last Name" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '120%' }} />
                        </div>
                        {errorL && (
                            <Typography sx={{ width: sm?'100%':'97%', fontSize: '90%', color: '#f44336', }} >
                                {errorL}
                            </Typography>
                        )}
                    </div>
                </div>

                <div style={{width:sm?'95%': 770, height: sm?60:50, display: 'flex', justifyContent: 'space-between',alignItems:'center',marginTop:sm?5:'' }}>
                    <div style={{ display: 'flex' }}><Radio checked={selectedValue == 'Female'} onChange={() => handleChange('Female')} sx={{ color: '#ffffff', '&.Mui-checked': { color: ' #12daa8' } }} /> <div style={{ display: 'flex', alignItems: 'center', color: '#ffffff', fontSize: '100%' }}>Female</div></div>
                    <div style={{ display: 'flex' }}><Radio checked={selectedValue == 'Male'} onChange={() => handleChange('Male')} sx={{ color: '#ffffff', '&.Mui-checked': { color: ' #12daa8' } }} /><div style={{ display: 'flex', alignItems: 'center', color: '#ffffff', fontSize: '100%' }}>Male</div></div>
                    <div style={{ display: 'flex' }}><Radio checked={selectedValue == 'Transgender'} onChange={() => handleChange('Transgender')} sx={{ color: '#ffffff', '&.Mui-checked': { color: ' #12daa8' } }} /><div style={{ display: 'flex', alignItems: 'center', color: '#ffffff', fontSize: '100%' }}>Transgender</div></div>
                    <div style={{ display: 'flex' }}><Radio checked={selectedValue == 'I’d rather not say'} onChange={() => handleChange('I’d rather not say')} sx={{ color: '#ffffff', '&.Mui-checked': { color: ' #12daa8' } }} /><div style={{ display: 'flex', alignItems: 'center', color: '#ffffff', fontSize: '100%' }}>I’d rather not say</div></div>
                </div>

                <div style={{ width:sm?'95%': 770, height: sm?200:105, display: 'flex', justifyContent: 'space-between',flexDirection:sm?'column':'',marginTop:sm?'':15 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: sm?'100%':'50%', height: 90, position: 'relative' }}>
                        <div style={{ width: sm?'100%':'97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Mobile Number *</div>
                        <div style={{width: sm?'100%':'97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: '1px solid #f6f6f6' }}>
                            <input className="placeholdercolor" type="text" placeholder="Enter Mobile Number"  style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '120%' }} />
                            <EditOutlinedIcon style={{ position: 'absolute', right: '7%', top: '55%', fontSize: '150%', pointerEvents: 'none', cursor: 'pointer' }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: sm?'100%':'50%', height: 90, position: 'relative' }}>
                        <div style={{ width: sm?'100%':'97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Email Id *</div>
                        <div style={{ width: sm?'100%':'97%', height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: '1px solid #f6f6f6' }}>
                            <input className="placeholdercolor" type="text" placeholder="Enter Middle Name" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '120%' }} />
                        </div>
                        <EditOutlinedIcon style={{ position: 'absolute', right: '7%', top: '55%', fontSize: '150%', pointerEvents: 'none', cursor: 'pointer' }} />
                    </div>
                </div>

                <div style={{ width:sm?'95%': 770, height: sm?200:105, display: 'flex', justifyContent: 'space-between',flexDirection:sm?'column':'',marginTop:sm?19:15 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: sm?'100%':'50%', height: 90 }}>
                        <div style={{ width: sm?'100%':'97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Date of Birth</div>
                        <div style={{ width: sm?'100%':'97%', height: 55, background: ' #191919', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: '1px solid #f6f6f6' }}>
                            <input type="date" min="1900-01-01" max="2099-12-31"
                                style={{ width: '90%', height: '90%', border: '0', outline: 'none', fontSize: '120%', background: 'transparent', color: '#ffffff', fontFamily: 'inherit', appearance: 'none', WebkitAppearance: 'none' }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: sm?'100%':'50%', height: 90 }}>
                        <div style={{ width: sm?'100%':'97%', fontSize: '100%', height: 38, marginBottom: 'auto', color: ' #ffffff', display: 'flex', alignItems: 'center' }}>Date of Anniversary</div>
                        <div style={{ width: sm?'100%':'97%', height: 55, background: ' #191919', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: '1px solid #f6f6f6', position: 'relative' }}>
                            <input type="date" min="1900-01-01" max="2099-12-31"
                                style={{ width: '90%', height: '90%', border: '0', outline: 'none', fontSize: '120%', background: 'transparent', color: '#ffffff', fontFamily: 'inherit', appearance: 'none', WebkitAppearance: 'none' }} />
                        </div>
                    </div>
                </div>

                <div style={{ width:sm?'95%': 770, height: 200, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Button style={{ width: sm?'47%':'30%', height: '25%', border: '1px solid #ffffff', color: ' #ffffff', fontWeight: 600, borderRadius: 7 }}>DISCARD CHANGES</Button>
                    <Button onMouseEnter={() => setButtonColor('#00b594')} onMouseLeave={() => setButtonColor('#12daa8')} style={{ width: sm?'47%':'30%', height: '25%', border: '1px solid #12daa8', color: ' #000000', fontWeight: 700, borderRadius: 7, background: buttonColor }}>SAVE CHANGES</Button>
                </div>
            </div>
            <Footer />
        </div>
    </>)
} 