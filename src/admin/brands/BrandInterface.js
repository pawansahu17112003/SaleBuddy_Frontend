import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField, FormHelperText } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useStyles } from "./BrandInterfaceCss"
import { getData, postData } from "../../backendservices/FetchNodeServices"
import Swal from "sweetalert2"
export default function BrandInterface() {
    const classes = useStyles()
    const [serviceList, setServiceList]=useState([])
    const [serviceId, setServiceId] = useState('')
    const [brandName, setBrandName] = useState('')
    const navigate = useNavigate()
    const [image, setImage] = useState({ filename: '/brand.png', bytes: '' })
    const [error, setError] = useState({})

    const fetchAllServices=async()=>{
        var res=await getData("services/fetch_services")
        setServiceList(res.data)
    }
    useEffect(function(){
        fetchAllServices()
    },[])
    const fillServices=()=>{
        return(serviceList.map((item)=>{
            return <MenuItem value={item.serviceid}>{item.servicetype} {item.servicename}</MenuItem>
        }))
    }

    const handleErrorMessage = (label, errorMessage) => {
        setError((prev) => ({ ...prev, [label]: errorMessage }))
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage({ filename: URL.createObjectURL(file), bytes: file });
            handleErrorMessage('image', null);
        }
    };

    const handleReset=()=>{
        setServiceId('')
        setBrandName('')
        setImage({filename:'/brand.png',bytes:''})
    }

    const handleClick = async () => {
        var err = false
        if (serviceId.length == 0) {
            err = true
            handleErrorMessage('serviceId', 'Please Input Service Id...')
        }
        if (brandName.length == 0) {
            err = true
            handleErrorMessage('brandName', 'Please input Brand Name...')
        }
        if (image.bytes.length == 0) {
            err = true
            handleErrorMessage('image', 'Please Choose Image...')
        }

        if (err == false) {
            var formData = new FormData()
            formData.append('serviceid', serviceId)
            formData.append('brandname', brandName)
            formData.append('brandlogo', image.bytes)

            var result = await postData('brands/insert_brands', formData)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Brand Register",
                    text: result.message,
                    toast: true
                });
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Brand Register",
                    text: result.message,
                    toast: true
                });
            }
        }
    }
    return (
        <div className={classes.root}>
            <div className={classes.box}>
                <div className={classes.title}>
                    <div>
                        <img src="/logo.png" className={classes.logo_style} />
                    </div>
                    <div className={classes.title_style}>
                        Add New Brands
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate("/dashboard/displayallbrands")}>
                        <img src="/report.png" className={classes.report_style} />
                    </div>
                </div>
                <div style={{ margin: 8 }}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={12} >
                                <FormControl fullWidth>
                                    <InputLabel>Service ID</InputLabel>
                                    <Select onChange={(e) => setServiceId(e.target.value)} label="Service Id" >   
                                        {fillServices()}
                                    </Select>
                                </FormControl>
                        </Grid2>
                        <Grid2 size={12} >
                            <TextField value={brandName} error={error.brandName} helperText={error.brandName} onFocus={() => handleErrorMessage('brandName', null)} onChange={(e) => setBrandName(e.target.value)} label="Brand Name" fullWidth />
                        </Grid2>
                        <Grid2 size={4} className={classes.center}>
                            <img src={image.filename}  className={classes.image_style} />
                        </Grid2>
                        <Grid2 size={8}  >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 70, flexDirection: 'column' }}>
                                <Button fullWidth component="label" variant="outlined">
                                    Upload
                                    <input onFocus={() => handleErrorMessage(image, '')} onChange={handleImageChange} type="file" accept="image/*" hidden multiple />
                                </Button>
                                <div className={classes.helperTextStyle}>{error.image}</div>
                            </div>
                        </Grid2>

                        <Grid2 size={6}  className={classes.center} >
                            <Button className={classes.button_style} variant="contained" onClick={handleClick}>Save</Button>
                        </Grid2>
                        <Grid2 size={6} className={classes.center} >
                            <Button className={classes.button_style} variant="contained" onClick={handleReset}>Reset</Button>
                        </Grid2>
                    </Grid2>
                </div>
            </div>
        </div>
    )
}