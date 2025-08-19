import PercentIcon from '@mui/icons-material/Percent';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function ApplyCoupon() {

    const theme = useTheme();
    const md = useMediaQuery('(max-width:1200px)');
    const sm = useMediaQuery('(max-width:700px)');
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');

    return (<>
        <div style={{ display: 'flex', width: '100%', justifyContent: matches?'center':'flex-end', marginBottom: 30 }}>
            <div style={{ display: 'flex', width: md?'95%':'80%', height: 70, justifyContent: 'space-between', alignItems: 'center', paddingRight: 30, paddingLeft: 30, background: ' #ffffff', borderRadius: 5, boxSizing: 'border-box' }}>
                <div style={{ display: 'flex' }}><PercentIcon style={{ border: '2px solid black', borderRadius: '50%', marginRight: 10 }} /><div style={{ fontWeight: 700, fontSize: '130%' }}>Apply Coupon</div></div>
                <KeyboardArrowRightIcon style={{ fontSize: '250%' }} />
            </div>
        </div>
    </>)
}