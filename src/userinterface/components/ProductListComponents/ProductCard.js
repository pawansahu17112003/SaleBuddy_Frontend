import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { serverURL } from '../../../backendservices/FetchNodeServices';
import { useNavigate } from 'react-router';

export default function ProductCard({ data }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery('(max-width:1200px)');
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');
    const [heart, setHeart] = useState(null);
    const [check, setCheck] = useState(null);
    const navigate=useNavigate()

    return (<>
        {!matches ? <div style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '4% 0' }}>
            <div style={{ width: md ? '92%' : '77%', display: 'flex', flexWrap: 'wrap', gap: '3.5%', }} >
                {data.map((item, i) => (
                    <div key={i} onClick={()=>navigate(`/mainproductinfocomponent/${item.productdetailsid}/${item.productid}`)} style={{ height: smatches ? 270 : matches ? 330 : 470, width: smatches ? '100%' : matches ? '48%' : '31%', borderBottom: '0.5px solid gray', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', fontFamily: '"Inter", sans-serif', marginBottom: 100, paddingBottom: 30,cursor:'pointer' }} >
                        <div style={{ display: 'flex', justifyContent: 'center', height: '60%', width: '100%', position: 'relative', alignItems: 'center', background: ' #393939', borderRadius: 10 }}>
                            <div style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={`${serverURL}/images/${item.picture}`} style={{ height: '14rem', borderRadius: 8, marginRight: '5%', marginLeft: '5%' }} />
                            </div>
                            <div style={{ position: 'absolute', display: 'flex', width: 'auto', justifyContent: 'center', alignItems: 'center', top: '2%', right: '5%' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: landscape || smatches ? 'default' : 'pointer', background: 'rgba(0, 0, 0, 0.30)', borderRadius: '50%', width: 'auto', height: 'auto', padding: '2%', marginRight: 10 }}>
                                    <FavoriteBorderIcon onMouseEnter={!smatches ? () => setHeart(i) : undefined} onMouseLeave={!smatches ? () => setHeart(null) : undefined} style={{ fontSize: matches ? '150%' : '170%', color: heart === i ? '#00e9bf' : 'white', cursor: landscape || smatches ? 'default' : 'pointer', borderRadius: '50%', }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: landscape || smatches ? 'default' : 'pointer', background: 'rgba(0, 0, 0, 0.30)', borderRadius: 40, width: 'auto', height: 'auto', padding: '4%', color: ' #ffffff' }}>
                                    <CheckBoxOutlineBlankIcon onMouseEnter={!smatches ? () => setCheck(i) : undefined} onMouseLeave={!smatches ? () => setCheck(null) : undefined} style={{ fontSize: matches ? '150%' : '170%', color: check === i ? '#00e9bf' : 'white', cursor: landscape || smatches ? 'default' : 'pointer', borderRadius: '50%', }} />
                                    Compare
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 170, alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: '5%', }}>
                            <div>
                                <div style={{ width: '100%', height: 'auto', color: 'white', justifyContent: 'center', alignItems: 'center', fontSize: smatches ? '80%' : matches ? '90%' : '110%', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.3', marginTop: 10, fontWeight: 600, }}>
                                    {item?.productname} ({item?.productram} RAM, {item?.productstorage} Storage) {item?.productcolorname}
                                </div>
                            </div>
                            <div style={{ display: 'flex', width: '100%', color: ' #00e9bf', alignItems: 'center', fontSize: '110%', height: 30, marginTop: 20 }}>
                                {item.ratings}<StarIcon style={{ fontSize: '110%', marginLeft: 5 }} />
                            </div>
                            <div style={{ width: '100%', height: 80, color: 'white', display: 'flex', alignItems: 'center' }}>
                                <div style={{ fontSize: landscape ? '100%' : smatches ? '90%' : matches ? '115%' : "120%", fontWeight: 500 }}>
                                    ₹{item.price}
                                </div>
                            </div>
                            <div style={{ width: '100%', height: '10%', color: 'white', display: 'flex', alignItems: 'center', fontSize: '85%' }}>
                                <LocalShippingIcon style={{ marginRight: 8 }} />Standard Delivery by Tue, 17th Jun
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div> :
            <div style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '4% 0' }}>
                <div style={{ width: md ? '92%' : '77%', display: 'flex', flexWrap: 'wrap', gap: '2%', }} >
                    {data.map((item, i) => (
                        <div key={i} onClick={()=>navigate(`/mainproductinfocomponent/${item.productdetailsid}/${item.productid}`)} style={{ height: matches ? 400 : 470, width: smatches ? '100%' : matches ? '48%' : '31%', borderBottom: '0.5px solid gray', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: '"Inter", sans-serif', cursor:'pointer'}} >
                            <div style={{ display: 'flex', justifyContent: 'center', height: '75%', width: smatches?'55%':'100%', position: 'relative', alignItems: 'center', background: ' #393939', borderRadius: 10 }}>
                                <div style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src={`${serverURL}/images/${item.picture}`} style={{ width: '90%', borderRadius: 8, marginRight: '5%', marginLeft: '5%' }} />
                                </div>
                                <div style={{ position: 'absolute', top: '1%', right: '1%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: landscape || smatches ? 'default' : 'pointer', background: 'rgba(0, 0, 0, 0.30)', borderRadius: '50%', width: 'auto', height: 'auto', padding: '2%', marginRight: 10 }}>
                                    <FavoriteBorderIcon onMouseEnter={!smatches ? () => setHeart(i) : undefined} onMouseLeave={!smatches ? () => setHeart(null) : undefined} style={{ fontSize: matches ? '150%' : '170%', color: heart === i ? '#00e9bf' : 'white', cursor: landscape || smatches ? 'default' : 'pointer', borderRadius: '50%', }} />
                                </div>
                                <div style={{ position: 'absolute', bottom: '3%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: landscape || smatches ? 'default' : 'pointer', background: 'rgba(0, 0, 0, 0.30)', borderRadius: 40, width: 'auto', height: 'auto', padding: '4%', color: ' #ffffff' }}>
                                    <CheckBoxOutlineBlankIcon onMouseEnter={!smatches ? () => setCheck(i) : undefined} onMouseLeave={!smatches ? () => setCheck(null) : undefined} style={{ fontSize: matches ? '150%' : '170%', color: check === i ? '#00e9bf' : 'white', cursor: landscape || smatches ? 'default' : 'pointer', borderRadius: '50%', }} />
                                    Compare
                                </div>
                            </div>
                            <div style={{ width: '90%', height: '80%', alignItems: 'center', display: 'flex', flexDirection: 'column', marginLeft: '4%', }}>
                                <div>
                                    <div style={{ width: '100%', height: 'auto', color: 'white', justifyContent: 'center', alignItems: 'center', fontSize:'100%', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.3', marginTop: 10, fontWeight: 600, }}>
                                        {item?.productname} ({item?.productram} RAM, {item?.productstorage} Storage) {item?.productcolorname}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', width: '100%', color: ' #00e9bf', alignItems: 'center', fontSize: '110%', height: 30, marginTop: 20 }}>
                                    {item.ratings}<StarIcon style={{ fontSize: '110%', marginLeft: 5 }} />
                                </div>
                                <div style={{ width: '100%', height: 40, color: 'white', display: 'flex', alignItems: 'center' }}>
                                    <div style={{ fontSize: "120%", fontWeight: 600 }}>
                                        ₹{item.price}
                                    </div>
                                </div>
                                <div style={{ width: '100%', height: '30%', color: 'white', display: 'flex', alignItems: 'center', fontSize: '85%' }}>
                                    <LocalShippingIcon style={{ marginRight: 8 }} />Standard Delivery by Tue, 17th Jun
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        }

    </>);
}
