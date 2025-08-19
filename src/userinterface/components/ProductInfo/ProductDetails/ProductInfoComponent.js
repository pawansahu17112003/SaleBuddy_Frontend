import StarIcon from '@mui/icons-material/Star';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function ProductInfoComponent({ data }) {

    const theme = useTheme();
    const md = useMediaQuery('(max-width:1300px)');
    const sm = useMediaQuery('(max-width:700px)');
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');

    var discount = data?.price - data?.offerprice
    var percent = (discount / data?.price) * 100;
    return (<>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: matches ? 'center' : '' }}>
            <div style={{ width:matches?'90%': md ? '95%' : '80%', height: matches ? 140 : 170, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', display: 'flex', height: '35%', fontSize: '120%', color: ' #ffffff', fontWeight: 600 }}>{data?.productname} ({data?.productram} RAM, {data?.productstorage} Storage) {data?.productcolorname}</div>
                <div style={{ width: '100%', display: 'flex', height: matches ? '25%' : '20%', color: ' #00e9bf', fontSize: '95%' }}>{data?.ratings}<StarIcon style={{ fontSize: '100%' }} /></div>
                <div style={{ width: '100%', display: 'flex', height: '30%', fontSize: '140%', color: ' #ffffff', fontWeight: 600, flexDirection: 'column', borderBottom: matches ? '' : '0.2px solid #9A9A9A' }}>
                    <div>{'\u20B9'}{parseInt(data?.price).toFixed(2)}</div>
                    <div style={{ fontSize: '55%' }}>(Incl. all Taxes)</div>
                </div>
                {matches ? <></> : <div style={{ color: ' #9A9A9A', height: '15%', fontWeight: 700, fontSize: '90%', display: 'flex', alignItems: 'flex-end' }}>
                    <div style={{ marginRight: 10 }}><s>MRP: {'\u20B9'}{parseInt(data?.offerprice).toFixed(2)}</s></div>
                    <div style={{ color: ' #ffffff', fontSize: '100%', }}>(Save {'\u20B9'}{discount.toFixed(2)}, {percent.toFixed(2)}% off)</div>
                </div>}
            </div>
        </div>
    </>)
}