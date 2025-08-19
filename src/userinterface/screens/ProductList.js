import Header from "../components/Header";
import MultipleDropdown from "../components/ProductListComponents/MultipleDropdown";
import Footer from '../components/Footer'
import ProductCard from "../components/ProductListComponents/ProductCard";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { postData } from "../../backendservices/FetchNodeServices";

export default function ProductList() {

    const params = useParams()
    const [productList, setProductList] = useState([])

    const fetchProductList = async () => {
        var res = await postData('userinterface/userinterface_user_search', { searchtext: params.searchtext })
        setProductList(res.data)
    }

    useEffect(function(){
        fetchProductList()
    },[params,params.searchtext])

    // var data = [{
    //     productdetailid: 1, productname: 'SAMSUNG Galaxy S25 Ultra 5G (12GB RAM, 512GB, Titanium Gray)', variant: '128 GB', color: 'Teal',
    //     image: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1748778565/s25_ultra_e1hcpg.png', ratings: 3.3, price: 78000, offer: 70000.00
    // },
    // {
    //     productdetailid: 1, productname: 'SAMSUNG Galaxy S25 Ultra 5G (12GB RAM, 512GB, Titanium Gray)', variant: '128 GB', color: 'Teal',
    //     image: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1748778280/sam_z6_v6ubdl.png', ratings: 3.3, price: 78000, offer: 70000.00
    // },
    // {
    //     productdetailid: 1, productname: 'SAMSUNG Galaxy S25 Ultra 5G (12GB RAM, 512GB, Titanium Gray)', variant: '128 GB', color: 'Teal',
    //     image: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1748778565/s25_ultra_e1hcpg.png', ratings: 3.3, price: 78000, offer: 70000.00
    // },
    // {
    //     productdetailid: 1, productname: 'SAMSUNG Galaxy S25 Ultra 5G (12GB RAM, 512GB, Titanium Gray)', variant: '128 GB', color: 'Teal',
    //     image: 'https://res.cloudinary.com/dio6iadsq/image/upload/v1748778280/sam_z6_v6ubdl.png', ratings: 3.3, price: 78000, offer: 70000.00
    // }]

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', background: ' #191919', height: '100%' }}>
            <div  >
                <Header productList={productList}/>
            </div>
            <div >
                <MultipleDropdown />
            </div>
            <div>
                <ProductCard data={productList} />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}