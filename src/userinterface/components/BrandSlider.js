import Slider from "react-slick";
import { serverURL } from "../../backendservices/FetchNodeServices";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ProductScrollerBack from "./ProductScrollerBack";
import ProductScrollerFront from "./ProductScrollerFront";
import { useRef } from "react";
import { useNavigate } from "react-router";
export default function BrandSlider({ data }) {
  const theme = useTheme();
  const ref = useRef();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const sm = useMediaQuery("(max-width:700px)");
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: matches ? 3 : 5,
    slidesToScroll: matches ? 3 : 4,
    autoPlay: false,
    arrows: false,
  };

  const navigate = useNavigate();

  const showImages = () => {
    return data.map((item, i) => {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={() => {
              navigate(`/productlist/${item.brandname}`);
            }}
            style={{
              background: "#393939",
              width: "auto",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "7%",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            <img
              src={`${serverURL}/images/${item.brandlogo}`}
              style={{ width: "95%", margin: 10 }}
            />
          </div>
        </div>
      );
    });
  };
  return (
    <div
      className="slider-container"
      style={{
        width: "100%",
        height: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: " #191919",
        marginBottom: 0,
      }}
    >
      {sm ? (
        <></>
      ) : (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <ProductScrollerBack productScroller={ref} />
        </div>
      )}
      <Slider
        ref={ref}
        {...settings}
        style={{
          width: matches ? "90%" : "80%",
          height: "100%",
          background: " #191919",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {showImages()}
      </Slider>
      {sm ? (
        <></>
      ) : (
        <div style={{ width: "100%", display: "flex" }}>
          <ProductScrollerFront productScroller={ref} />
        </div>
      )}
    </div>
  );
}
