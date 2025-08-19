import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router";

export default function AddToCartButton(props) {
  const [value, setValue] = useState(props.qty);
  useEffect(
    function () {
      setValue(props.qty);
    },
    [props.qty]
  );

  const handlePlus = () => {
    var v = value;
    v++;
    setValue(v);
    props.onChange(v);
  };
  const handleClick = () => {
    navigate("/cart");
    var v = value;
    v++;
    setValue(v);
    props.onChange(v);
  };
  const handleMinus = () => {
    var v = value;
    v--;
    setValue(v);
    props.onChange(v);
  };
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          width: "100%",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          onClick={handleClick}
          style={{
            background: " #00e9bf",
            width: "35%",
            color: " #000000",
            borderRadius: 5,
            fontSize: "85%",
            fontWeight: 700,
            height: "70%",
          }}
        >
          Buy Now
        </Button>
        {value == 0 ? (
          <Button
            onClick={handlePlus}
            style={{
              background: " #353535",
              width: "35%",
              color: " #ffffff",
              borderRadius: 5,
              fontSize: "85%",
              fontWeight: 700,
              height: "70%",
            }}
          >
            Add To Cart
          </Button>
        ) : (
          <>
            <div
              style={{
                width: "35%",
                height: "70%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "80%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={handlePlus}
                  style={{
                    width: 35,
                    height: 35,
                    border: "2px solid #ffffff",
                    borderRadius: "100%",
                    color: " #ffffff",
                    fontSize: "110%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <AddIcon />
                </div>
                <div
                  style={{
                    height: "100%",
                    color: " #ffffff",
                    fontWeight: 600,
                    fontSize: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {value}
                </div>
                <div
                  onClick={handleMinus}
                  style={{
                    width: 35,
                    height: 35,
                    border: "2px solid #ffffff",
                    borderRadius: "100%",
                    color: " #ffffff",
                    fontSize: "110%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <RemoveIcon />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
