import { useState, useEffect } from "react"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { postData } from "../../../../backendservices/FetchNodeServices";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

export default function ProductColorComponent({ productid, color, defaultColor }) {

    const theme = useTheme();
    const md = useMediaQuery('(max-width:1300px)');
    const sm = useMediaQuery('(max-width:700px)');
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');

    const params = useParams()
    const navigate = useNavigate()
    const [colorValue, setColorValue] = useState(defaultColor)

    const handleClick = async (color, id) => {
        setColorValue(color);
        const response = await postData('userinterface/userinterface_fetch_productdetails_by_id_color', { productid:productid, productcolorid: id })
        if (response.status) {
            navigate(`/mainproductinfocomponent/${response.data.productdetailsid}/${productid}`)
        } else {
            alert("Id Not Found")
        }
    };

    useEffect(() => {
        setColorValue(defaultColor)
    }, [defaultColor]);

    return (<>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop: 20, alignItems: matches ? 'center' : '' }}>
            <div style={{ width: matches ? '90%' : md ? '95%' : '80%', height: 'auto', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: ' #ffffff', fontSize: '90%', marginBottom: 15 }}>Brand Color</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', }}>
                    {color.map((item) => (
                        <div
                            onClick={() => handleClick(item.productcolorname, item.productcolorid)}
                            onMouseEnter={(e) => {
                                if (colorValue !== item.productcolorname) {
                                    e.currentTarget.style.border = '1px solid #49a5a2';
                                    e.currentTarget.style.background = '#49a5a2';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (colorValue !== item.productcolorname) {
                                    e.currentTarget.style.border = '1px solid #ffffff';
                                    e.currentTarget.style.background = '';
                                }
                            }} style={{ display: 'flex',justifyContent: 'center', backgroundColor: colorValue === item.productcolorname ? ' #000000' : 'transparent', alignItems: 'center', border: colorValue === item.productcolorname ? '1px solid rgb(0, 255, 208)' : '1px solid #ffffff', marginRight: 20, marginBottom: 10, borderRadius: 5, cursor: 'pointer' }}>
                            <div style={{ color: ' #ffffff', margin: 10, fontSize: '80%' }}>{item.productcolorname}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>)
}