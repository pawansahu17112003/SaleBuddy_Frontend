import Header from "../components/Header"
import MainSlider from "../components/MainSlider"
import Footer from "../components/Footer"
import BrandSlider from "../components/BrandSlider"
import ProductScroller from "../components/ProductScroller"
import { useEffect, useState } from "react"
import { getData, postData } from "../../backendservices/FetchNodeServices"
import ShowAdvertisment from "../components/ShowAdvertisment"
import ShowTwoAds from "../components/ShowTwoAds"
import ShowFourAds from "../components/ShowFourAds"
import ServiceSlider from "../components/ServiceSlider"
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
export default function Home() {

    const [brandList, setBrandList] = useState([])
    const [serviceList, setServiceList] = useState([])
    const [listProduct, setListProduct] = useState([])
    const [listProductLatest, setListProductLatest] = useState([])
    

    const fetchBrands = async () => {
        var response = await getData('userinterface/userinterface_fetch_brands')
        if (response.status) {
            setBrandList(response.data)
        }
        else {
            alert(response.message)
        }
    }

    const fetchServices = async () => {
        var response = await getData('userinterface/userinterface_fetch_services')
        if (response.status) {
            setServiceList(response.data)
        }
        else {
            alert(response.message)
        }
    }

    const fetchAllProducts = async (status) => {
        var response = await postData('userinterface/userinterface_fetch_productdetails', { status })
        if (response.status) {
            status == 'Hot Deals' ? setListProduct(response.data) : setListProductLatest(response.data)
        }
        else {
            alert(response.message)
        }
    }

    useEffect(function () {
        fetchBrands()
        fetchServices()
        fetchAllProducts('Hot Deals')
        fetchAllProducts('Latest Launches')
    }, [])

    var data = [{
        productdetailid: 1, productname: 'SAMSUNG Galaxy S25 Ultra 5G (12GB RAM, 512GB, Titanium Gray)', variant: '128 GB', color: 'Teal',
        image: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1748778565/s25_ultra_e1hcpg.png', ratings: 3.3, price: 78000.00, offer: 70000.00
    },
    {
        productdetailid: 1, productname: 'SAMSUNG Galaxy S25 Ultra 5G (12GB RAM, 512GB, Titanium Gray)', variant: '128 GB', color: 'Teal',
        image: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1748778280/sam_z6_v6ubdl.png', ratings: 3.3, price: 78000.00, offer: 70000.00
    },
    {
        productdetailid: 1, productname: 'SAMSUNG Galaxy S25 Ultra 5G (12GB RAM, 512GB, Titanium Gray)', variant: '128 GB', color: 'Teal',
        image: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1748778565/s25_ultra_e1hcpg.png', ratings: 3.3, price: 78000.00, offer: 70000.00
    },
    {
        productdetailid: 1, productname: 'SAMSUNG Galaxy S25 Ultra 5G (12GB RAM, 512GB, Titanium Gray)', variant: '128 GB', color: 'Teal',
        image: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1748778280/sam_z6_v6ubdl.png', ratings: 3.3, price: 78000.00, offer: 70000.00
    }]

    return (<div style={{ width: '100%', display: 'flex', flexDirection: 'column' }} >
        <div  >
            <Header />
        </div>
        <div style={{ width: '100%', height: '100%', overflowX: "hidden", background: ' #191919'}}>
            <MainSlider />
        </div>
        <div>
            <ServiceSlider data={serviceList}/>
        </div>
        <div>
            <ShowFourAds />
        </div>
        <div style={{ width: '100%', height: '100%', overflowX: "hidden", background: ' #191919' }}>
            <ProductScroller data={listProduct} title='Hot Deals' />
        </div>
        <div>
            <ShowTwoAds />
        </div>
        <div style={{ width: '100%', height: '100%', overflowX: "hidden", background: ' #191919' }}>
            <ProductScroller data={listProduct} title='Whats Hot' />
        </div>
        <div>
            <ShowAdvertisment />
        </div>
        <div >
            <BrandSlider data={brandList} />
        </div>
        <div style={{ width: '100%', height: '100%' }}>
            <Footer />
        </div>
    </div>
    )
}