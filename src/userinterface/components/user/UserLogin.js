import { Button, Dialog } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router";
import { postData, generateOtp } from "../../../backendservices/FetchNodeServices";

export default function UserLogin({ open, setOpenDialog, openOtp, setOpenOtp, otpValue, setOtpValue, mobileNo, setMobileNo }) {

  const theme = useTheme();
  const md = useMediaQuery('(max-width:1200px)');
  const sm = useMediaQuery('(max-width:700px)');
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const smatches = useMediaQuery(theme.breakpoints.down('sm'));
  const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');

  const [check, setCheck] = useState(false)
  const [buttonColor, setButtonColor] = useState('#12daa8')
  const navigate = useNavigate()

  const [mobileno, setMobileno] = useState('')

  const handleClick = async () => {
    setOpenDialog(false)
    var otp = generateOtp()
    setMobileNo(mobileno)
    setOtpValue(otp)
    alert(otp)
    //var res = await postData('smsapi/sendotp', { mobileno, otp })
    setOpenOtp(true)
  }
  const handleClose = () => {
    setOpenDialog(false)
  }

  return (<>
    <style>{`
        .placeholdercolor::placeholder {
          font-size: ${matches ? '80%' : '100%'};
          color: #aaa;
        }
      `}</style>
    <Dialog
      open={open}
      PaperProps={{ sx: { width: '525px', height: '406px', background: '#191919', borderRadius: 2, } }}>
      <CloseIcon onClick={handleClose} style={{ color: 'white', right: 6, position: 'absolute', top: 3, cursor: 'pointer' }} />
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: smatches ? '90%' : '70%', height: '80%', }}>
          <div style={{ width: '100%', height: '15%', border: '2px solid #353535', borderRadius: 3, display: 'flex', justifyContent: 'space-evenly' }}>
            <div style={{ width: '46%', color: ' #ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '100%' }}>Login</div>
            <div style={{ width: '8%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 2, height: '25%', background: ' #999999' }}></div>
              <div style={{ width: '100%', height: '50%', border: '1px solid #999999', borderRadius: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', color: ' #ffffff', fontSize: '85%' }}>OR</div>
              <div style={{ width: 2, height: '25%', background: ' #999999' }}></div>
            </div>
            <div style={{ width: '46%', color: ' #ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '100%' }}>Create Account</div>
          </div>
          <div style={{ width: '100%', height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: ' #ffffff', fontSize: '90%' }}>Please enter your Email ID or Phone number</div>
          <div style={{ width: '100%', height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #999999', borderRadius: 4 }}>
            <input onChange={(e) => { setMobileno(e.target.value) }} value={mobileno} className="placeholdercolor" type="text" placeholder="Enter your Email ID or Phone Number" style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', background: ' #191919', color: ' #ffffff', fontSize: '120%' }} />
          </div>
          <div style={{ width: '100%', height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {check ? (<><CheckBoxOutlineBlankIcon onClick={() => { setCheck(false) }} style={{ color: ' #ffffff', fontSize: '140%', marginRight: 5 }} /></>) : (<><CheckBoxIcon onClick={() => { setCheck(true) }} style={{ color: ' #00e9bf', fontSize: '140%', marginRight: 5 }} /></>)}
            <div style={{ color: ' #ffffff' }}>Keep me signed in</div>
          </div>
          <div style={{ width: '100%', height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: smatches ? '65%' : '80%', color: ' #ffffff' }}>
            By continuing you agree to our <u style={{ marginRight: 5, marginLeft: 5, color: ' #00e9bf' }}> Terms of Use </u> & <u style={{ marginRight: 5, marginLeft: 5, color: ' #00e9bf' }}> Privacy Policy </u>
          </div>
          <Button onClick={handleClick} onMouseEnter={() => setButtonColor('#00b594')} onMouseLeave={() => setButtonColor('#12daa8')} style={{ width: '100%', height: '15%', background: buttonColor, borderRadius: 7, color: ' #000000', fontWeight: 650, fontSize: '80%' }}>Continue</Button>
        </div>
      </div>
    </Dialog>
  </>);
}
