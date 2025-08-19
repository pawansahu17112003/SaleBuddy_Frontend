import { useState, useEffect } from "react"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useParams,useNavigate } from "react-router";
import { postData } from "../../../../backendservices/FetchNodeServices";

export default function ProductStorageComponent({ productid,storage, defaultStorage }) {

    const theme = useTheme();
    const md = useMediaQuery('(max-width:1300px)');
    const sm = useMediaQuery('(max-width:700px)');
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');

    const navigate = useNavigate()
    const [storageValue, setStorageValue] = useState(defaultStorage)

    const handleClick = async (storage, id) => {
        setStorageValue(storage);
        const response = await postData('userinterface/userinterface_fetch_productdetails_by_id_storage', { productid, productvarientid: id })
        if (response.status) {
           
            navigate(`/mainproductinfocomponent/${response.data.productdetailsid}/${productid}`)
        } else {
            alert("Id Not Found")
        }
    };

    useEffect(() => {
        setStorageValue(defaultStorage)
    }, [defaultStorage]);

    return (<>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop: 10,alignItems:matches?'center':'' }}>
            <div style={{ width:matches?'90%':md?'95%': '80%', height: 'auto', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: ' #ffffff', fontSize: '90%', marginBottom: 15 }}>Internal Storage</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', }}>
                    {storage.map((item) => (
                        <div
                            onClick={() => handleClick(item.productstorage, item.productvarientid)}
                            onMouseEnter={(e) => {
                                if (storageValue !== item.productstorage) {
                                    e.currentTarget.style.border = '1px solid #49a5a2';
                                    e.currentTarget.style.background = '#49a5a2';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (storageValue !== item.productstorage) {
                                    e.currentTarget.style.border = '1px solid #ffffff';
                                    e.currentTarget.style.background = '';
                                }
                            }} style={{ display: 'flex', justifyContent: 'center', backgroundColor: storageValue === item.productstorage ? ' #000000' : 'transparent', alignItems: 'center', border: storageValue === item.productstorage ? '1px solid rgb(0, 255, 208)' : '1px solid #ffffff', marginRight: 20, marginBottom: 10, borderRadius: 5, cursor: 'pointer' }}>
                            <div style={{ color: ' #ffffff', margin: 10, fontSize: '80%' }}>{item.productstorage}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>)
}