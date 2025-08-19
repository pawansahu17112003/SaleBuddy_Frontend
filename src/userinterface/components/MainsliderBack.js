import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function MainsliderBack({mainslider}){
     const [slider,setSlider]=useState('#576574')
     const handleBack=()=>{
        mainslider.current.slickPrev();
    }
     const theme = useTheme();
        const matches = useMediaQuery(theme.breakpoints.down('md'));
    
    return(<>
    {matches?<></>: <div onClick={handleBack} onMouseEnter={()=>setSlider('#2d3436')} onMouseLeave={()=>setSlider(' #576574')} style={{ width: '3.5%', height: '9%', background: slider , opacity: 0.8, cursor: 'pointer', transition: 'background 0.3s ease', position: 'absolute', zIndex: 2, top: '40%',left:'0.1%' ,borderTopRightRadius: 10, borderBottomRightRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', width: '100%' }}><ArrowBackIosNewIcon style={{ width: '100%', fontSize: '230%', color: 'white' }} /></div>
            </div>}</>)
}