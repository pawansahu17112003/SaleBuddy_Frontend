import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { serverURL } from "../../backendservices/FetchNodeServices"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
export default function ProductComponent({ item, i }) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery('(max-width:1200px)');
    const sm = useMediaQuery('(max-width:700px)');
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');
    const [heart, setHeart] = useState(null)
    const navigate=useNavigate()
    return (<>
        <div onClick={()=>navigate(`/mainproductinfocomponent/${item.productdetailsid}/${item.productid}`)} style={{ height: smatches ? 270 : matches ? 330 : 370, width: '90%', background: ' black', marginLeft: '3.5%', marginRight: '3.5%', borderRadius: 10, display: "flex", justifyContent: 'center', flexDirection: 'column', alignItems: 'center', fontFamily: '"Inter", sans-serif',cursor:'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'center', height: '60%', width: '90%', position: 'relative', alignItems: 'center' }}>
                <div style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', justifyContent: 'center' }}><img src={`${serverURL}/images/${item.picture}`} style={{ width: 'auto', margin: '5%' }} /></div>
                <FavoriteBorderIcon onMouseEnter={!smatches ? () => setHeart(i) : undefined} onMouseLeave={!smatches ? () => setHeart(null) : undefined} style={{ fontSize: matches ? '130%' : '170%', color: heart == i ? ' #00e9bf' : 'white', position: 'absolute', right: '-4%', top: '1%', cursor: landscape ? '' : smatches ? '' : 'pointer' }} />
            </div>
            <div style={{ width: '95%', height: '30%', alignItems: 'center', display: 'flex', flexDirection: 'column', marginBottom: '5%' }}>
                <div style={{ width: '90%', height: smatches ? '55%' : matches ? '50%' : '45%', color: 'white', justifyContent: 'center', marginBottom: '2%', fontSize: smatches ? '80%' : matches ? '90%' : '100%', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.2' }}>{item.productname}({item.productram} RAM {item.productstorage}, {item.productcolorname})</div>
                <div style={{ width: '90%', height: '50%', color: 'white', display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontSize: landscape ? '100%' : smatches ? '90%' : matches ? '115%' : "120%", fontWeight: 500 }}>{'\u20B9'}{item.price.toFixed(2)}</div>
                    <div style={{ width: '100%', display: 'flex', height: '70%', justifyContent: 'center' }}><div style={{ width: '90%', fontSize: landscape ? '75%' : smatches ? '75%' : matches ? '80%' : "88%", fontWeight: 400, color: 'grey', height: '100%', display: 'flex' }}><s>{'\u20B9'}{item.offerprice.toFixed(2)}</s></div></div>
                </div>
                <div style={{ display: 'flex', width: '90%' }}>
                    {smatches ? <Rating name="half-rating-read" defaultValue={item.ratings} precision={0.1} readOnly icon={<StarIcon sx={{ color: '#00e9bf' }} style={{ fontSize: '95%' }} />} emptyIcon={<StarIcon sx={{ color: 'grey' }} style={{ fontSize: '95%' }} />} /> :
                        <Rating name="half-rating-read" defaultValue={item.ratings} precision={0.1} readOnly icon={<StarIcon sx={{ color: ' #00e9bf' }} />} emptyIcon={<StarIcon sx={{ color: 'grey' }} />} />}
                </div>
            </div>
        </div>
    </>)
}