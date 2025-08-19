import PercentIcon from '@mui/icons-material/Percent';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function ShippingInfo() {

    const theme = useTheme();
    const md = useMediaQuery('(max-width:1300px)');
    const sm = useMediaQuery('(max-width:700px)');
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');

    return (<>
        <div style={{ display: 'flex', width: '100%', justifyContent: md ? 'center' : 'flex-end', marginBottom: 30, }}>
            <div style={{ width: md ? '95%' : '80%', height: 100, background: ' #ffffff', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{ height: '50%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '90%' }}>Continue Creating Account…</div>
                <div style={{ height: '50%', width: '95%', display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: sm ? '120%' : '145%' }}>ENTER SHIPPING INFORMATION</div>
            </div>
        </div>
    </>)
}