import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function VerticalArrowUp({VerticalArrow}) {

    const [slider,setSlider]=useState(' #576574')
    const handleForward=()=>{
        VerticalArrow?.current?.slickPrev();
    }
     const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    return (<>
    {matches?<></>:<div onClick={handleForward} style={{ width: 'auto', height: '5%', cursor: 'pointer', display: 'flex',marginLeft:'13%' }} >
        <div style={{ display: 'flex', width: '100%' }}><KeyboardArrowUpIcon style={{ width: '100%', fontSize: '300%', color: 'white' }} /></div>
    </div>}</>)
}