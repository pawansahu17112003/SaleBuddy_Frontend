import { useState } from "react"
import { useNavigate } from "react-router"
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
export default function CheckOutHeader() {

    const theme = useTheme()
    const md = useMediaQuery('(max-width:1300px)')
    const sm = useMediaQuery('(max-width:790px)')
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const smatches = useMediaQuery(theme.breakpoints.down('sm'))
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)')

    const navigate = useNavigate()
    const [color, setColor] = useState('#ffffff')

    return (<>
        <div style={{ width: '100%', height: smatches ? 60 : 80, background: '#000000', display: 'flex', alignItems: 'center' }}>
            <div onClick={() => navigate('/')} style={{ width: '40%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: smatches?'150%':'200%', color: '#ffffff', fontWeight: 500, cursor: 'pointer' }}>SalesBuddy</div>
            <div style={{ width: '60%', height: '100%', display: 'flex', alignItems: 'center', }}>
                <div onMouseEnter={() => { setColor('#49a5a2') }} onMouseLeave={() => { setColor('#ffffff') }} onClick={() => { navigate('/cart') }} style={{ background: '#191919', width: md ? '30%' : '15%', height: '60%', borderRight: '2px solid #12daa8', borderTopLeftRadius: 7, borderBottomLeftRadius: 7, borderLeft: '2px solid #545454', borderTop: '2px solid #545454', borderBottom: '2px solid #545454', color: color, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>Cart</div>
                <div style={{ background: '#191919', width: md ? '30%' : '15%', height: '60%', borderTop: '2px solid #12daa8', borderBottom: '2px solid #12daa8', color: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Shipping</div>
                <div style={{ background: '#191919', width: md ? '30%' : '15%', height: '60%', borderLeft: '2px solid #12daa8', borderTop: '2px solid #545454', borderBottom: '2px solid #545454', borderRight: '2px solid #545454', borderTopRightRadius: 7, borderBottomRightRadius: 7, color: '#545454', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Payment</div>
            </div>
        </div>
    </>)
}