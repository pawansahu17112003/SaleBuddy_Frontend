import Slider from "react-slick"
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import { useRef, useState, useEffect, useMemo } from "react"
import VerticalArrowUp from "./VerticalArrowUp"
import VerticalArrowDown from "./VerticalArrowDown"
import styled from 'styled-components'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { serverURL } from "../../../../backendservices/FetchNodeServices"

export default function VerticalSlider({ data, onImageClick }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const StyledSlider = styled(Slider)`
      .slick-dots li button:before {
        color: white;
        opacity: 10;
      }

      .slick-dots li.slick-active button:before {
        color: #00e9bf;
        opacity: 1;
      }

      .thumbnail:hover {
        border: 2px solid #00e9bf !important;
        width:77px !important;
        height:77px !important;
      }
    `;

    const ref = useRef()
    const [selectedImage, setSelectedImage] = useState(0)

    const settings = useMemo(() => ({
        dots: matches,
        infinite: true,
        slidesToShow: matches ? 1 : 4,
        slidesToScroll: 1,
        vertical: !matches,
        arrows: false,
        focusOnSelect: false,
        initialSlide: selectedImage
    }), [matches, selectedImage])

    const images = data?.picture?.split(',') || [];

    useEffect(() => {
        if (onImageClick && images.length > 0) {
            onImageClick(images[selectedImage])
        }
    }, [selectedImage, onImageClick, images])

    const handleClick = (item, i) => {
        setSelectedImage(i)
        onImageClick?.(item)
    }

    const showImages = () => {
        return images.map((item, i) => {
            const isVideo = !!item && /\.(mp4|webm|ogg|mov|avi|flv|wmv|mkv|m4v|3gp)$/i.test(item)
            const isActive = selectedImage === i

            return matches ? (
                <div style={{ width: '100%', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '100%', height: 400, display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: '7%', borderRadius: 5, cursor: 'pointer', padding: 1 }}>
                        {isVideo ? (
                            <video controls src={`${serverURL}/images/${item}`} style={{ height: '100%', maxWidth: '95%' }} />
                        ) : (
                            <img src={`${serverURL}/images/${item}`} style={{ height: '100%' }} />
                        )}
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div
                        onClick={() => handleClick(item, i)} className="thumbnail"
                        style={{ width: isActive ? '77px' : '79px', height: isActive ? '77px' : '79px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: isActive ? '2px solid #00e9bf' : '1px solid #ffffff', borderRadius: '4px', marginBottom: '7px', cursor: 'pointer', background: '#191919' }}>
                        {isVideo ? (
                            <PlayCircleIcon style={{ color: ' #12daa8', fontSize: '300%', width: '100%' }} />
                        ) : (
                            <img style={{ maxWidth: '90%', maxHeight: '90%' }} src={`${serverURL}/images/${item}`} alt="" />
                        )}
                    </div>
                </div>
            )
        })
    }

    return (
        <div style={{ width: '100%', height: 435, display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>
            <div style={{ width: '100%', display: 'flex' }}>
                <VerticalArrowUp VerticalArrow={ref} />
            </div>
            <div style={{ width: '100%', flex: 1 }}>
                <StyledSlider ref={ref} {...settings}>
                    {showImages()}
                </StyledSlider>
            </div>
            <div style={{ width: '100%', display: 'flex' }}>
                <VerticalArrowDown VerticalArrow={ref} />
            </div>
        </div>
    );
}
