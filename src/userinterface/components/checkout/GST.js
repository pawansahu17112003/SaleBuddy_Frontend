import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'

export default function GST() {
    const theme = useTheme()
    const md = useMediaQuery('(max-width:1300px)')
    const sm = useMediaQuery('(max-width:790px)')
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const smatches = useMediaQuery(theme.breakpoints.down('sm'))
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)')

    const[gst,setGst]=useState('')

    return (<>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: md?'center':'flex-end', width: '100%', height: 200,marginBottom:md?'':30 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: ' #ffffff', width: md?'95%':'80%', height: '90%',flexDirection:'column' }}>
                <div style={{ width: '90%', height: '30%', display: 'flex', alignItems: 'center', fontSize: '100%', fontWeight: 600 }}>GST Information (Optional)</div>
                <div style={{ width: '90%', height: '70%', display: 'flex',flexDirection:'column' }}>
                    <div style={{ width: '100%' , fontSize: '90%', height: 38, color: ' #000000', display: 'flex', alignItems: 'center' }}>GST Number</div>
                    <div style={{ width: sm ? '100%' : 250, height: 55, background: ' #f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, border: '1px solid #f6f6f6',alignSelf:'flex-start'}}>
                        <input type="text" placeholder="Enter GST Number" onChange={(e)=>{setGst(e.target.value)}} style={{ width: '90%', height: '90%', border: '0px solid transparent', outline: 'none', fontSize: '105%', background: ' #f6f6f6',fontWeight:500 }} />
                    </div>
                </div>
            </div>
        </div>
    </>)
}