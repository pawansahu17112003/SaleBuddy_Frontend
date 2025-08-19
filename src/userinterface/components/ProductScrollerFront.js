import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function ProductScrollerForward({productScroller}) {

    const [slider,setSlider]=useState(' #576574')
    const handleForward=()=>{
        productScroller?.current?.slickNext();
    }
     const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    return (<>
    {matches?<></>:<div onClick={handleForward} style={{ width: 'auto', height: '9%', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', right: '0.1%' }} >
        <div style={{ display: 'flex', width: '100%' }}><ArrowForwardIosIcon style={{ width: '100%', fontSize: '150%', color: 'white' }} /></div>
    </div>}</>)
}