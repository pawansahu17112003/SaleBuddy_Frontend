import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../backendservices/FetchNodeServices";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router";

export default function ServiceSlider({data}) {

    const theme = useTheme();
    const md = useMediaQuery('(max-width:1200px)');
    const sm = useMediaQuery('(max-width:700px)');
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');

    const navigate=useNavigate()

    // const data = [
    //     {
    //         id: 1,
    //         image: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1753250629/Mobile_sdtrdf-removebg-preview_b8mdy1.png',
    //         title: 'Buy Mobile'

    //     },
    //     {
    //         id: 1,
    //         image: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1753250631/Laptops_pzewpv-removebg-preview_xbwd2r.png',
    //         title: 'Buy Laptop'

    //     },
    //     {
    //         id: 1,
    //         image: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1753250629/Mobile_sdtrdf-removebg-preview_b8mdy1.png',
    //         title: 'Sell Mobile'

    //     },
    //     {
    //         id: 1,
    //         image: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1753250631/Laptops_pzewpv-removebg-preview_xbwd2r.png',
    //         title: 'Sell Laptop'
    //     }
    // ]

    const showImages = () => {
        return data.map((item, i) => (<>
            <div onClick={()=>{navigate(`/productlist/${item.servicename}`)}} style={{ width: '100%', height: '90%', display: 'flex',  alignItems: 'center', flexDirection: 'column',cursor:'pointer' }}>
                <img style={{ maxHeight: '45%', maxWidth: '45%' }} src={`${serverURL}/images/${item.icon}`} />
                <div style={{marginTop:10,fontSize:'120%',color:'#ffffff'}} >{item.servicetype} {item.servicename}</div>
            </div>
        </>))
    }

    return (<>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: ' #191919', width: '100%', height: matches?150:200 }}>
            <div style={{ display: 'flex', justifyContent: "space-evenly", alignItems: 'center', width: matches?'100%':'80%' }}>
                {showImages()}
            </div>
        </div>
    </>)
}