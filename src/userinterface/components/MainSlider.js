import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../backendservices/FetchNodeServices"
import MainsliderForward from "./MainsliderForward";
import MainsliderBack from "./MainsliderBack";
import { useRef } from "react";

export default function MainSlider() {
    const ref=useRef()
    var settings = {
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        fade: true,
    };
    var data = { id: 1, images: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1748756295/b1_nhwg7z.png,https://res.cloudinary.com/dio6iadsq/image/upload/v1748756420/b8_j4v3ku.png,https://res.cloudinary.com/dio6iadsq/image/upload/v1748756421/b2_woblzn.png,https://res.cloudinary.com/dio6iadsq/image/upload/v1748756422/b7_eegm6g.png,https://res.cloudinary.com/dio6iadsq/image/upload/v1748756423/b4_wd8tnj.png,https://res.cloudinary.com/dio6iadsq/image/upload/v1748756423/b3_uxtm0q.png,https://res.cloudinary.com/dio6iadsq/image/upload/v1748756424/b5_inflhl.png,https://res.cloudinary.com/dio6iadsq/image/upload/v1748756425/b6_q2vham.png' }
    var images = data?.images?.split(',')
    const showImages = () => {
        return images.map((item, i) => {
            return <div style={{width:'100%',margin:0,overflowY:'hidden',padding:0}}>
                <img src={item} style={{ width: '100%' }} />
            </div>
        })
    }
    return (
        <div style={{ position: 'relative',margin:0,padding:0 }}>
            <MainsliderForward mainslider={ref}/> 
            <Slider ref={ref} {...settings} style={{ width: '100%',margin:0,padding:0 }}>
                {showImages()}
            </Slider>
            <MainsliderBack mainslider={ref}/> 
        </div>
    )
}