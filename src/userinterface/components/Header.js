import RoomIcon from "@mui/icons-material/Room";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import InventoryIcon from "@mui/icons-material/Inventory";
import CloseIcon from "@mui/icons-material/Close";
import Menu from "./Menu";
import Search from "./SearchBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { Badge, Button, Dialog, fabClasses } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import UserLogin from "./user/UserLogin";
import OTPComponent from "./user/OTPComponent";
import UpdateProfile from "./UpdateProfile";
import SearchBox from "./SearchBox";
import UpdateAddress from "./UpdateAddress";
import { generateOtp, postData } from "../../backendservices/FetchNodeServices";

export default function Header({
  cLogin,
  setCLogin,
  screencart,
  productList = [],
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [open, setOpenDialog] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [screen, setScreen] = useState("header");

  const handleLogin = () => {
    setOpenDialog(true);
    if (cLogin == true) {
      setCLogin(false);
    }
  };

  //const product=useSelector((state)=>state.cart)
  // keys=Object.keys(product)
  ///localstorage
  var keys = [];
  try {
    const product = JSON.parse(localStorage.getItem("cart")) || {};
    keys = Object.keys(product);
  } catch (e) {
    keys = [];
  }
  var user = {};
  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch (e) {}

  const dispatch = useDispatch();
  ////////////////////

  useEffect(
    function () {
      setOpenDialog(cLogin);
    },
    [cLogin]
  );

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //USER
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);
  const [update, setUpdate] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [chooseOpen, setChooseOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [address, setAddress] = useState("#ffffff");
  const [orderColor, setOrderColor] = useState("#ffffff");
  const [profileColor, setProfileColor] = useState("#ffffff");
  const [logoutColor, setLogoutColor] = useState("#ffffff");

  const [userAddress, setUserAddress] = useState([]);
  const [addressId, setAddressId] = useState(null);

  const handleLogout = () => {
    if (JSON.stringify(user) != "{}") {
      dispatch({ type: "LOGOUT" });
      dispatch({ type: "CLEAR_CART" });
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      navigate("/");
      setLogoutColor("#ffffff");
    }
  };

  const handleMouse = () => {
    setHover(false);
    setProfileColor("#ffffff");
    setAddress("#ffffff");
    setOrderColor("#ffffff");
    setLogoutColor("#ffffff");
  };

  var user = {};
  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch (e) {
    user = {};
  }
  var mobileno = Object.keys(user)[0] || "";

  var productData = [];
  try {
    const product = JSON.parse(localStorage.getItem("cart"));
    productData = Object.values(product);
  } catch (e) {}

  const fetchUserAddress = async () => {
    if (!mobileno) return;
    var res = await postData("userinterface/userinterface_chk_address", {
      mobileno,
    });
    if (res.status) {
      setUserAddress(res.data);
      dispatch({ type: "ADD_USER", payload: [mobileno, res.data] });
      localStorage.setItem("user", JSON.stringify({ [mobileno]: res.data }));
    }
  };

  useEffect(
    function () {
      fetchUserAddress();
    },
    [addressOpen, chooseOpen]
  );

  const UserHover = () => {
    return (
      <>
        <style>{`                    
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10%); }
                    to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-slidedown {
                    animation: slideDown 0.3s ease-out forwards;
                }
            `}</style>
        {JSON.stringify(user) == "{}" ? (
          <></>
        ) : matches ? (
          <></>
        ) : (
          <>
            <div
              onMouseEnter={() => {
                setHover(true);
              }}
              onMouseLeave={handleMouse}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: 250,
                minHeight: 100,
                zIndex: 20,
                borderRadius: 10,
                background: " #393939",
                fontFamily: '"Inter", sans-serif',
                fontSize: "100%",
                position: "absolute",
                right: "4%",
                top: "9%",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.4)",
              }}
            >
              {userAddress.length == 0 ? (
                <></>
              ) : (
                <div
                  onClick={() => {
                    setUpdate(true);
                    setProfileColor("#ffffff");
                  }}
                  onMouseEnter={() => {
                    setProfileColor("#12DAA8");
                  }}
                  onMouseLeave={() => {
                    setProfileColor("#ffffff");
                  }}
                  style={{
                    background: profileColor == "#ffffff" ? "" : "#575757ff",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: 70,
                    cursor: "pointer",
                    color: profileColor,
                  }}
                >
                  <AccountCircleOutlinedIcon
                    style={{ marginRight: 10, fontSize: "180%" }}
                  />{" "}
                  Update Profile
                </div>
              )}
              <div
                onClick={() => {
                  setChooseOpen(true);
                  setAddress("#ffffff");
                }}
                onMouseEnter={() => {
                  setAddress("#12DAA8");
                }}
                onMouseLeave={() => {
                  setAddress("#ffffff");
                }}
                style={{
                  background: address == "#ffffff" ? "" : "#575757ff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: 70,
                  cursor: "pointer",
                  color: address,
                }}
              >
                <HomeIcon style={{ marginRight: 10, fontSize: "180%" }} />{" "}
                Update Address
              </div>
              <div
                onClick={() => {
                  navigate("/orderhistory");
                  setOrderColor("#ffffff");
                }}
                onMouseEnter={() => {
                  setOrderColor("#12DAA8");
                }}
                onMouseLeave={() => {
                  setOrderColor("#ffffff");
                }}
                style={{
                  background: orderColor == "#ffffff" ? "" : "#575757ff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: 70,
                  cursor: "pointer",
                  color: orderColor,
                }}
              >
                <InventoryIcon style={{ marginRight: 10, fontSize: "180%" }} />{" "}
                Order History
              </div>
              <div
                onClick={handleLogout}
                onMouseEnter={() => {
                  setLogoutColor("#12DAA8");
                }}
                onMouseLeave={() => {
                  setLogoutColor("#ffffff");
                }}
                style={{
                  background: logoutColor == "#ffffff" ? "" : "#575757ff",
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: 70,
                  cursor: "pointer",
                  color: logoutColor,
                }}
              >
                <LogoutIcon style={{ marginRight: 10, fontSize: "180%" }} />{" "}
                Logout
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  const UserClick = () => {
    return (
      <>
        {JSON.stringify(user) == "{}" ? (
          <></>
        ) : !matches ? (
          <></>
        ) : (
          <>
            <div
              style={{
                width: "70%",
                height: "100vh",
                background: "rgba(0,0,0,0.8)",
                position: "fixed",
                top: 0,
                right: 0,
                zIndex: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "100%",
                  height: 30,
                }}
              >
                <CloseIcon
                  onClick={() => {
                    setClick(false);
                  }}
                  style={{
                    color: "#ffffff",
                    fontSize: "150%",
                    marginRight: 5,
                    marginTop: 3,
                    cursor: "pointer",
                  }}
                />
              </div>
              <div
                onClick={() => {
                  setUpdate(true);
                  setProfileColor("#ffffff");
                }}
                onMouseEnter={() => {
                  setProfileColor("#12DAA8");
                }}
                onMouseLeave={() => {
                  setProfileColor("#ffffff");
                }}
                style={{
                  background: profileColor == "#ffffff" ? "" : "#57575785",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: 70,
                  cursor: "pointer",
                  color: profileColor,
                }}
              >
                <AccountCircleOutlinedIcon
                  style={{ marginRight: 10, fontSize: "180%" }}
                />{" "}
                Update Profile
              </div>
              <div
                onClick={() => {
                  setChooseOpen(true);
                  setAddress("#ffffff");
                }}
                onMouseEnter={() => {
                  setAddress("#12DAA8");
                }}
                onMouseLeave={() => {
                  setAddress("#ffffff");
                }}
                style={{
                  background: address == "#ffffff" ? "" : "#57575785",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: 70,
                  cursor: "pointer",
                  color: address,
                }}
              >
                <HomeIcon style={{ marginRight: 10, fontSize: "180%" }} />{" "}
                Update Address
              </div>
              <div
                onClick={() => {
                  navigate("/orderhistory");
                  setOrderColor("#ffffff");
                }}
                onMouseEnter={() => {
                  setOrderColor("#12DAA8");
                }}
                onMouseLeave={() => {
                  setOrderColor("#ffffff");
                }}
                style={{
                  background: orderColor == "#ffffff" ? "" : "#57575785",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: 70,
                  cursor: "pointer",
                  color: orderColor,
                }}
              >
                <InventoryIcon style={{ marginRight: 10, fontSize: "180%" }} />{" "}
                Order History
              </div>
              <div
                onClick={handleLogout}
                onMouseEnter={() => {
                  setLogoutColor("#12DAA8");
                }}
                onMouseLeave={() => {
                  setLogoutColor("#ffffff");
                }}
                style={{
                  background: logoutColor == "#ffffff" ? "" : "#57575785",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: 70,
                  cursor: "pointer",
                  color: logoutColor,
                }}
              >
                <LogoutIcon style={{ marginRight: 10, fontSize: "180%" }} />{" "}
                Logout
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  const MultipleAddresses = () => {
    return (
      <Dialog
        open={chooseOpen}
        PaperProps={{
          sx: {
            width: "800px",
            minHeight: "100px",
            background: "#191919",
            borderRadius: 2,
            fontFamily: '"Inter", sans-serif',
          },
        }}
      >
        <CloseIcon
          onClick={() => {
            setChooseOpen(false);
          }}
          style={{
            right: 6,
            position: "absolute",
            top: 3,
            cursor: "pointer",
            color: "#ffffff",
          }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "90%",
              marginTop: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "100%",
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#ffffff",
                fontWeight: 700,
              }}
            >
              Choose Address
            </div>
            {userAddress.map((item, i) => (
              <>
                <div
                  onClick={() => {
                    setAddressId(item.addressid);
                    setAddressOpen(true);
                    setChooseOpen(false);
                  }}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    padding: 5,
                    boxSizing: "border-box",
                    alignItems: "center",
                    flexDirection: "column",
                    height: 80,
                    width: "100%",
                    marginBottom: 30,
                    borderRadius: 5,
                    background: "#ffffff",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "25%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: 700,
                    }}
                  >
                    Address {i + 1}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "37.5%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item?.address}, {item.area}, Near {item?.landmark},
                    {item.pincode}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "37.5%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.city} {item.state}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </Dialog>
    );
  };

  const ChangeMobile = () => {
    const [temporary, setTemporary] = useState("");
    var otp = generateOtp();
    return (
      <>
        <Dialog
          open={openMobile}
          PaperProps={{
            sx: {
              width: "800px",
              background: "#191919",
              borderRadius: 2,
              fontFamily: '"Inter", sans-serif',
            },
          }}
        >
          <CloseIcon
            onClick={() => {
              setOpenMobile(false);
            }}
            style={{
              right: 6,
              position: "absolute",
              top: 3,
              cursor: "pointer",
              color: "#ffffff",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#ffffff",
                fontWeight: 650,
                height: 50,
              }}
            >
              Update Mobile Number
            </div>
            <div
              style={{
                width: "90%",
                height: 50,
                background: " #f6f6f6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                border: "1px solid #f6f6f6",
                position: "relative",
              }}
            >
              <input
                onChange={(e) => setTemporary(e.target.value)}
                type="text"
                placeholder="Enter Mobile Number"
                style={{
                  width: "90%",
                  height: "90%",
                  border: "0px solid transparent",
                  outline: "none",
                  fontSize: "105%",
                  background: " #f6f6f6",
                }}
              />
            </div>
            <div
              style={{
                width: "100%",
                height: 85,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => {
                  setOpenOtp(true);
                  setMobileNo(temporary);
                  setOpenMobile(false);
                  setOtpValue(otp);
                  alert(otp);
                }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50%",
                  width: "80%",
                  color: "#000000",
                  fontWeight: 600,
                  background: "#12DAA8",
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <UserLogin
        open={open}
        setOpenDialog={setOpenDialog}
        openOtp={openOtp}
        setOpenOtp={setOpenOtp}
        otpValue={otpValue}
        setOtpValue={setOtpValue}
        mobileNo={mobileNo}
        setMobileNo={setMobileNo}
        setCLogin={setCLogin}
      />
      <OTPComponent
        screen={screen}
        setScreen={setScreen}
        screencart={screencart}
        open={open}
        setOpenDialog={setOpenDialog}
        openOtp={openOtp}
        setOpenOtp={setOpenOtp}
        otpValue={otpValue}
        setOtpValue={setOtpValue}
        mobileNo={mobileNo}
        setMobileNo={setMobileNo}
      />
      <UpdateProfile
        open={update}
        setOpen={setUpdate}
        openOtp={openOtp}
        setOpenOtp={setOpenOtp}
        otpValue={otpValue}
        setOtpValue={setOtpValue}
        mobileNum={mobileNo}
        setMobileNum={setMobileNo}
        setOpenMobile={setOpenMobile}
        openMobile={openMobile}
      />
      <UpdateAddress
        addressOpen={addressOpen}
        addressId={addressId}
        setAddressOpen={setAddressOpen}
      />
      {search.length != 0 && (
        <SearchBox
          productList={productList}
          search={search}
          setSearch={setSearch}
          text={text}
          setText={setText}
        />
      )}
      {hover && <UserHover />}
      {click && <UserClick />}
      {chooseOpen && <MultipleAddresses />}
      {openMobile && <ChangeMobile />}
      <div
        style={{
            position:'static',
             
          boxSizing: "border-box",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: matches ? 90 : 75,
          background: "#000",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
          zIndex:1000,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "row",
            width: "95%",
            height: "100%",
          }}
        >
          <Menu />
          <div
            style={{
              color: "white",
              width: "15%",
              display: "flex",
              alignItems: "center",
              fontSize: 22,
              flexGrow: 1,
            }}
          >
            <div
              style={{
                marginRight: "40%",
                fontSize: matches ? 25 : 30,
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              SalesBuddy
            </div>
          </div>
          {matches ? (
            <></>
          ) : (
            <Search
              productList={productList}
              text={text}
              setText={setText}
              search={search}
              setSearch={setSearch}
            />
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24%",
              height: "100%",
            }}
          >
            {matches ? (
              <></>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 2,
                }}
              >
                <RoomIcon style={{ color: "white", fontSize: 25, margin: 2 }} />
                <div style={{ color: "white", fontSize: 14 }}>
                  Gwalior,474011
                </div>
                <EditIcon style={{ color: "white", fontSize: 16 }} />
              </div>
            )}
            <div
              style={{
                marginLeft: matches ? "auto" : 0,
                marginRight: 10,
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                onClick={() => {
                  if (JSON.stringify(user) === "{}") {
                    handleLogin();
                  } else setClick(true);
                }}
                onMouseEnter={() => {
                  setHover(true);
                }}
                onMouseLeave={() => {
                  setHover(false);
                }}
                style={{
                  color: "white",
                  fontSize: 25,
                  marginRight: 10,
                  cursor: "pointer",
                  height: hover ? "100%" : "",
                  display: "flex",
                  alignItems: "center",
                  color: hover || open ? "#12DAA8" : "#ffffff",
                  transition: "color 0.3s ease",
                }}
              >
                <PersonIcon />
              </div>
              <Badge
                style={{ margin: "0 8 0 8" }}
              //   invisible={keys.length === 0}
                badgeContent={keys.length}
                showZero
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#12DAA8",
                    color: "#000",
                  },
                }}
              >
                <ShoppingCartIcon
                  onClick={() => navigate("/cart")}
                  style={{ color: "white", fontSize: 25, cursor: "pointer" }}
                />
              </Badge>
            </div>
          </div>
        </div>
        {matches && (
          <Search
            productList={productList}
            text={text}
            setText={setText}
            search={search}
            setSearch={setSearch}
          />
        )}
      </div>
    </>
  );
}
