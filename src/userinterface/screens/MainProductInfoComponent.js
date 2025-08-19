import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductInfoComponent from "../components/ProductInfo/ProductDetails/ProductInfoComponent";
import ProductPictureComponent from "../components/ProductInfo/ProductPicture/ProductPictureComponent";
import VerticalSlider from "../components/ProductInfo/ProductPicture/VerticalSlider";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { postData, serverURL } from "../../backendservices/FetchNodeServices"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProductColorComponent from "../components/ProductInfo/ProductDetails/ProductColorComponent";
import ProductRamComponent from "../components/ProductInfo/ProductDetails/ProductRamCompontent";
import ProductStorageComponent from "../components/ProductInfo/ProductDetails/ProductStorage";
import ProductExchangeComponent from "../components/ProductInfo/ProductDetails/ProductExchangeComponent";
import KeyfeatureComponent from "../components/ProductInfo/ProductDetails/KeyfeatureComponent";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ProductSpecializationComponent from "../components/ProductInfo/ProductSpecialization/ProductSpecializationComponent";
import ProductOverviewComponent from "../components/ProductInfo/ProductSpecialization/ProductOverviewComponent";
import AddToCartButton from "../components/Cart/AddToCartButton";
import { useDispatch, useSelector } from "react-redux";
export default function MainProductInfoComponent() {

  const theme = useTheme();
  const md = useMediaQuery('(max-width:1300px)');
  const sm = useMediaQuery('(max-width:700px)');
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const smatches = useMediaQuery(theme.breakpoints.down('sm'));
  const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');

  const [selectedMedia, setSelectedMedia] = useState(null);
  const [refresh, setRefresh] = useState(false)

  const params = useParams()
  const dispatch = useDispatch()
  // const product = useSelector((state) => state.cart)
  // const keys = Object.keys(product)

  var keys = 0
  var product=[]
  try {
    product = JSON.parse(localStorage.getItem('cart'))
    keys = Object.keys(product)
    //alert(JSON.stringify(Object.values(product)))
  }
  catch (e) { }

  const [productData, setProductData] = useState({})
  const fetchProductDetails = async () => {
    const response = await postData('userinterface/userinterface_fetch_productdetails_by_id', { productdetailsid: params.productdetailsid })
    setProductData(response.data)
  }

  const [productColor, setProductColor] = useState([])
  const fetchProductColors = async () => {
    const response = await postData('userinterface/userinterface_fetch_productcolor_by_id', { productid: params.productid })
    setProductColor(response.data)
  }

  const [productRam, setProductRam] = useState([])
  const fetchProductRam = async () => {
    const response = await postData('userinterface/userinterface_fetch_productram_by_id', { productid: params.productid })
    setProductRam(response.data)
  }

  const [productStorage, setProductStorage] = useState([])
  const fetchProductStorage = async () => {
    const response = await postData('userinterface/userinterface_fetch_productstorage_by_id', { productid: params.productid })
    setProductStorage(response.data)
  }

  const [productImages, setProductImages] = useState([])
  const fetchProductImages = async () => {
    const response = await postData("userinterface/moreimages_by_id", { productdetailsid: params.productdetailsid })
    setProductImages(response?.data)
  }

  useEffect(function () {
    fetchProductDetails()
    fetchProductColors()
    fetchProductRam()
    fetchProductStorage()
    fetchProductImages()
  }, [params])

  const handleQtyChange = (v) => {
    var data = productData
    if (v == 0) {
      dispatch({ type: 'DEL_CART', payload: [data.productdetailsid, data] })
    }
    else {
      data['qty'] = v
      dispatch({ type: 'ADD_CART', payload: [data.productdetailsid, data] })
    }
    setRefresh(!refresh)
  }

  var data = [{
    productdetailid: 1, productname: 'SAMSUNG Galaxy S25 Ultra 5G (12GB RAM, 256GB, Titanium Silverblue)', storage: '128GB', color: 'Titanium Blue', ram: '12GB',
    image: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1748778565/s25_ultra_e1hcpg.png', ratings: 3.3, price: 78000.00, offerprice: 70000.00,
    display: '6.68 inches (16.96 cm), LCD, 120 Hz Refresh Rate',
    memory: '6GB RAM, 128GB ROM, Memory Card (Hybrid) upto 1TB',
    processor: 'MediaTek Dimensity 6300, Octa Core, 2.4 GHz',
    camera: '50 MP + 0.08 MP Dual Rear & 8 MP Front Camera',
    battery: '5500 mAh with 44W FlashCharge',
    usp: 'IP64 Dust & Water Resistance, AI-Enhanced Stunning Photos, Shock-Absorbing Corners',
  }]
  var color = ['Titanium Blue', 'Titanium Black', 'Titanium White', 'Titanium Silver', 'Titanium WhiteSilver']
  var ram = ['8GB', '12GB', '16GB']
  var storage = ['64GB', '128GB', '256GB', '512GB', '1TB']

  const specificationData = [
    {
      section: "MOBILE CATEGORY",
      items: [
        { label: "Mobile Type", value: "Android Smartphone" },
        { label: "Mobile Design", value: "Touch" },
      ]
    },
    {
      section: "MANUFACTURER DETAILS",
      items: [
        { label: "Brand", value: "Vivo" },
        { label: "Model Series", value: "Y29" },
        { label: "Model Number", value: "PD2421BF" },
      ]
    },
    {
      section: "Product Dimensions (Open)",
      items: [
        { label: "Dimensions In CM (WxDxH)", value: "7.61 x 0.81 x 16.57" },
        { label: "Product Weight", value: "0.198 Kg" },
        { label: "Dimensions In Inches (WxDxH)", value: "3.00 x 0.32 x 6.52" },
      ]
    },
    {
      section: "Operating System",
      items: [
        { label: "OS Type", value: "Android OS" },
        { label: "OS Name & Version", value: "Android 14" },
        { label: "User Interface", value: "Funtouch OS 14" },
      ]
    },
  ];

  const overviewData = [
    {
      title: "Seamless Performance",
      description: "Designed for smooth and reliable performance, vivo Y29 6.68-inch 5G Smartphone ensures fast multitasking and efficient operation, keeping up with your lifestyle."
    },
    {
      title: "Ample Storage",
      description: "With 128GB of internal storage and 6GB RAM, this smartphone ensures plenty of space for your apps, files, and photos while maintaining smooth performance for your daily tasks."
    },
    {
      title: "Versatile Camera Experience",
      description: "The 50MP HD rear camera of this 6.68-inch smartphone captures every detail with stunning clarity. Plus, the AI Photo Enhance feature sharpens facial details, making every photo memorable. Furthermore, the 8MP front camera, combined with Aura Screen Light, ensures radiant selfies, even in low light."
    },
    {
      title: "Creative Photography Options",
      description: "With 10 portrait styles and Multi-Styles Night Filters, you can unleash your creativity and capture unique, artistic photos. You can also explore innovative night modes for stunning night scenes with a single tap."
    }
  ]

  return (<>
    <div style={{ width: '100%', height: '100%', background: ' #191919', fontFamily: '"Inter", sans-serif', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <div>
        <Header />
      </div>
      <div style={{ width: '100%', height: 40, color: ' #ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: matches ? '85%' : '70%', fontSize: matches ? '75%' : '100%', fontWeight: 400 }}>Phones & Wearables <ArrowForwardIosIcon style={{ fontSize: '80%' }} /> Mobile Phones <ArrowForwardIosIcon style={{ fontSize: '80%' }} /> Android Phones</div>
      </div>
      <div style={{ display: 'flex', flexDirection: matches ? 'column' : '', }}>
        <div style={{ width: matches ? '100%' : '50%', display: 'flex', justifyContent: matches ? '' : 'flex-end' }}>
          <div style={{ width: matches ? '100%' : '17%', height: '100%' }}>
            <VerticalSlider data={productImages} onImageClick={setSelectedMedia} />
          </div>
          {matches ? <></> : <div style={{ width: md ? '80%' : '60%', display: 'flex', flexDirection: 'column' }}>
            <ProductPictureComponent media={selectedMedia} />
            <AddToCartButton qty={product?.[productData.productdetailsid]?.qty || 0} onChange={handleQtyChange} />
          </div>}
        </div>
        <div style={{ display: 'flex', width: matches ? '100%' : '50%', height: '100%', flexDirection: 'column', overflowY: matches ? 'none' : 'auto', scrollbarWidth: 'none' }}>
          <ProductInfoComponent data={productData} />
          <ProductExchangeComponent />
          <ProductColorComponent productid={params.productid} color={productColor} defaultColor={productData?.productcolorname} />
          <ProductRamComponent productid={params.productid} ram={productRam} defaultRam={productData?.productram} />
          <ProductStorageComponent productid={params.productid} storage={productStorage} defaultStorage={productData?.productstorage} />
          <KeyfeatureComponent data={productData?.description} />
        </div>
      </div>
      <div>
        <ProductSpecializationComponent data={specificationData} />
      </div>
      <div>
        <ProductOverviewComponent data={overviewData} />
      </div>
      <div style={{ height: '100%' }}>
        <Footer />
      </div>
    </div>
  </>)
}