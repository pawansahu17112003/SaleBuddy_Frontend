import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function MainsliderForward({mainslider}) {

    const [slider,setSlider]=useState(' #576574')
    const handleForward=()=>{
        mainslider.current.slickNext();
    }
     const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    return (<>
    {matches?<></>:<div onClick={handleForward} onMouseEnter={()=>setSlider('#2d3436')} onMouseLeave={()=>setSlider('#576574')} style={{ width: '3.5%', height: '9%', background: slider, opacity: 0.9, cursor: 'pointer', transition: 'background 0.3s ease', position: 'absolute', zIndex: 2, top: '40%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', right: '0.1%' }} >
        <div style={{ display: 'flex', width: '100%' }}><ArrowForwardIosIcon style={{ width: '100%', fontSize: '230%', color: 'white' }} /></div>
    </div>}</>)
}