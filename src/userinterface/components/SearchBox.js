import { useState, useEffect } from "react"
import { postData } from "../../backendservices/FetchNodeServices"
import { useNavigate } from "react-router"

export default function SearchBox({ search, productList, setSearch, text, setText }) {
    const [productSearch, setProductSearch] = useState([])
    const [back, setBack] = useState(null)
    const navigate = useNavigate()

    const fetchProductSearch = async () => {
        const res = await postData('userinterface/userinterface_user_search', { searchtext: search })
        setProductSearch(res.data)
    }

    const handleSearch = (item) => {
        navigate(`/productlist/${item.productname}`)
        setText('')
    }

    useEffect(() => {
        fetchProductSearch()
    }, [search])

    return (<>
        <div style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center', top: '8%', zIndex: 20 }}>
            <div style={{ width: '33%', background: '#191919', marginRight: '4.6%' }}>
                {productSearch.length === 0 ? (
                    <div style={{ width: '100%', height: 50, color: '#ffffff', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        No Item Found
                    </div>
                ) : (
                    productSearch.map((item, i) => (
                        <div
                            onMouseEnter={() => setBack(i)}
                            onMouseLeave={() => setBack(null)}
                            onClick={() => handleSearch(item)}
                            style={{ width: '100%', height: 50, color: '#ffffff', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', background: back === i ? '#393939' : '#191919' }}>
                            {item.productname} {item.productram} {item.productstorage} {item.productcolorname}
                        </div>
                    ))
                )}
            </div>
        </div>
    </>)
}
