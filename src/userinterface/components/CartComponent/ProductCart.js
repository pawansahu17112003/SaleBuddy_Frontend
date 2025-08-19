import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {serverURL} from '../../../backendservices/FetchNodeServices'
import { useDispatch } from 'react-redux';
export default function ProductCart({ item ,refresh,setRefresh}) {

    const theme = useTheme();
    const md = useMediaQuery('(max-width:1200px)');
    const sm = useMediaQuery('(max-width:700px)');
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');

    const [color, setColor] = useState(false)
    const [rcolor, setRcolor] = useState(false)

    var dispatch=useDispatch()
    const handleRemove=(item)=>{
        dispatch({type:'DEL_CART',payload:[item.productdetailsid]})
        setRefresh(!refresh)
    }
    var discount = item?.price - item?.offerprice
    var percent = (discount / item?.price) * 100

    return (<>
        {matches ? <>
            <div style={{ width: '100%', height: '100%', }}>
                <div style={{ width: '100%', height: '75%', display: 'flex' }}>
                    <div style={{ width: '40%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <img src={`${serverURL}/images/${item?.picture}`} style={{ maxWidth: '90%', maxHeight: '100%' }} />
                    </div>
                    <div style={{ width: '60%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ width: '100%', height: 40, fontSize: '100%', fontWeight: 550, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', }}>{item?.productname} ({item?.productram} RAM, {item?.productstorage} Storage) {item?.productcolorname}</div>
                        <div style={{ width: '100%', height: 25 }}>
                            <Rating name="half-rating-read" defaultValue={item?.ratings} precision={0.1} readOnly icon={<StarIcon sx={{ color: ' #00e9bf' }} style={{ fontSize: '70%' }} />} emptyIcon={<StarIcon sx={{ color: 'grey' }} style={{ fontSize: '70%' }} />} />
                        </div>
                        <div style={{ width: '100%', display: 'flex' }}>
                            <div style={{ width: '40%', height: 40 }}>
                                <div style={{ width: '100%', height: 15, fontSize: '85%', display: 'flex', }}>{'\u20B9'}{parseInt(item?.offerprice ?? item?.price)?.toFixed(2)}</div>
                                <div style={{ width: '100%', height: 15, fontSize: '70%', display: 'flex' }}>(Incl. all Taxes)</div>
                            </div>
                            <div style={{ width: '20%', height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ width: '20%', height: 0.5, background: ' #000000' }}></div>
                                <div style={{ width: '60%', height: '80%', border: '1px solid #000000', borderRadius: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '90%' }}>OR</div>
                                <div style={{ width: '20%', height: 0.5, background: ' #000000' }}></div>
                            </div>
                            <div style={{ width: '40%', height: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: 550, fontSize: '90%' }}>{'\u20B9'}6457/mo*</div>
                                <div style={{ width: '100%', fontSize: '70%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', color: ' #088466' }}><u>EMI Options</u></div>
                            </div>

                        </div>
                        {item?.offerprice && (<>
                            <div style={{ width: '100%', display: 'flex', height: 25, }}>
                                <div style={{ fontSize: '80%', height: '100%', display: 'flex', alignItems: 'center', }}><s>MRP {'\u20B9'}{parseInt(item?.price).toFixed(2)}</s></div>
                                <div style={{ fontSize: '70%', height: '100%', display: 'flex', alignItems: 'center', color: ' #9A9A9A' }}>(Save {'\u20B9'}{discount.toFixed(2)})</div>
                            </div>
                        </>)}
                        <div style={{ width: '100%', height: 25, fontSize: '70%', display: 'flex', alignItems: 'center' }}>{item?.delivery}</div>
                        <div style={{ width: '100%', height: 70, display: 'flex', alignItems: 'center' }}>
                            <div onMouseEnter={() => { setColor(true) }} onMouseLeave={() => { setColor(false) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid ', borderColor: color ? ' #00e9bf' : ' #000000', borderRadius: 10, boxSizing: 'border-box', cursor: 'pointer', marginRight: 10 }}><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 15, marginLeft: 15, marginTop: 15, marginBottom: 15, fontSize: '75%', fontWeight: 600 }}>Move To Whislist</div></div>
                            <div onMouseEnter={() => { setRcolor(true) }} onMouseLeave={() => { setRcolor(false) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid ', borderColor: rcolor ? ' #00e9bf' : ' #000000', borderRadius: 10, boxSizing: 'border-box', cursor: 'pointer' }}><div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 15, marginLeft: 15, marginTop: 15, marginBottom: 15, fontSize: '80%', fontWeight: 600 }} onClick={()=>handleRemove(item)}>Remove</div></div>
                        </div>
                    </div>
                </div>
                <div style={{ height: '25%', width: '100%', }}>
                    {item?.offerapply && (<>
                        <div style={{ width: '100%', height: 0.5, background: ' #000000', marginTop: 10, marginBottom: 10 }}></div>
                        <div style={{ width: '80%', display: 'flex', alignItems: 'center', }}>
                            <DoneIcon style={{ display: 'flex', alignSelf: 'center', fontSize: '140%', color: ' #00e9bf', marginRight: 10 }} /><div style={{ fontSize: '85%' }}>{item?.offerapply}</div>
                        </div></>)}
                </div>
            </div>
        </>
            :
            <div style={{ width: '100%', height: '80%', display: 'flex' }}>
                <div style={{ width: '23%', height: '100%', }}>
                    <div style={{ width: '100%', height: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={`${serverURL}/images/${item?.picture}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </div>
                </div>
                <div style={{ width: '77%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '75%', width: '100%', display: 'flex' }}>
                        <div style={{ width: '60%', height: '100%', }}>
                            <div style={{ width: '100%', height: 45, fontSize: '110%', fontWeight: 550, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', }}>{item?.productname} ({item?.productram} RAM, {item?.productstorage} Storage) {item?.productcolorname}</div>
                            <div style={{ width: '100%', height: 25 }}>
                                <Rating name="half-rating-read" defaultValue={item?.ratings} precision={0.1} readOnly icon={<StarIcon sx={{ color: ' #00e9bf' }} style={{ fontSize: '70%' }} />} emptyIcon={<StarIcon sx={{ color: 'grey' }} style={{ fontSize: '70%' }} />} />
                            </div>
                            <div style={{ width: '50%', height: 35, fontSize: '85%', }}>{item?.delivery}</div>
                            <div style={{ width: '100%', height: 60, display: 'flex', alignItems: 'center' }}>
                                <div onMouseEnter={() => { setColor(true) }} onMouseLeave={() => { setColor(false) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid ', borderColor: color ? ' #00e9bf' : ' #000000', borderRadius: 10, boxSizing: 'border-box', cursor: 'pointer', marginRight: 15 }}><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: md ? 25 : 30, marginLeft: md ? 25 : 30, marginTop: 7, marginBottom: 7, fontSize: '85%', fontWeight: 600 }}>Move To Whislist</div></div>
                                <div onMouseEnter={() => { setRcolor(true) }} onMouseLeave={() => { setRcolor(false) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid ', borderColor: rcolor ? ' #00e9bf' : ' #000000', borderRadius: 10, boxSizing: 'border-box', cursor: 'pointer' }}><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: md ? 25 : 30, marginLeft: md ? 25 : 30, marginTop: 7, marginBottom: 7, fontSize: '85%', fontWeight: 600 }} onClick={()=>handleRemove(item)}>Remove</div></div>
                            </div>
                        </div>
                        <div style={{ width: '40%', height: '100%', display: 'flex', }}>
                            <div style={{ width: '90%', height: '100%' }}>
                                <div style={{ width: '100%', height: 25, fontSize: '140%', fontWeight: 700, display: 'flex', justifyContent: 'flex-end' }}>{'\u20B9'}{parseInt(item?.offerprice) || parseInt(item?.price)}</div>
                                <div style={{ width: '100%', height: 30, fontSize: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>(Incl. all Taxes)</div>
                                <div style={{ width: '50%', height: 0.5, background: ' #000000', justifySelf: 'flex-end', marginTop: 7, marginBottom: 10 }}></div>
                                {item?.offerprice && (<>
                                    <div style={{ width: '100%', height: 15, fontSize: '85%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', }}><s>MRP {'\u20B9'}{parseInt(item?.price).toFixed(2)}</s></div>
                                    <div style={{ width: '100%', height: 15, fontSize: '75%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', color: ' #9A9A9A' }}>{'\u20B9'}{discount}</div>
                                    <div style={{ width: '50%', height: 0.5, background: ' #000000', justifySelf: 'flex-end', marginTop: 10, marginBottom: 10 }}></div>
                                </>)}
                                <div style={{ width: '100%', height: 25, fontSize: '100%', fontWeight: 700, display: 'flex', justifyContent: 'flex-end' }}>{'\u20B9'}6457/mo*</div>
                                <div style={{ width: '100%', height: 15, fontSize: '80%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', color: ' #088466' }}><u>EMI Options</u></div>
                            </div>
                        </div>
                    </div>
                    {item?.offerapply && (<><div style={{ width: '100%', height: 0.5, background: ' #000000', justifySelf: 'flex-end', marginTop: 10, marginBottom: 10 }}></div>
                        <div style={{ height: '25%', width: '60%', display: 'flex', alignItems: 'center' }}>
                            <DoneIcon style={{ display: 'flex', alignSelf: 'flex-start', fontSize: '140%', color: ' #00e9bf', marginRight: 10 }} /><div style={{ fontSize: '85%' }}>{item?.offerapply}</div>
                        </div></>)}
                </div>
            </div>}
    </>)
}