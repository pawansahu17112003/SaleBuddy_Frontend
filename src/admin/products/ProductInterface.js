import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField, FormHelperText } from "@mui/material"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useStyles } from "./ProductInterfaceCss"
import { postData,getData } from "../../backendservices/FetchNodeServices"
import Swal from "sweetalert2"
export default function ProductInterface() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [serviceId, setServiceId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [image, setImage] = useState({ filename: '/box.png', bytes: '' })
    const [error, setError] = useState({})

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [serviceList, setServiceList] = useState([])
    const [brandList,setBrandList]=useState([])
    const fetchAllServices = async () => {
        var res = await getData("services/fetch_services")
        setServiceList(res.data)
    }
    useEffect(function () {
        fetchAllServices()
    }, [])
    const fillServices = () => {
        return (serviceList.map((item) => {
            return <MenuItem value={item.serviceid}>{item.servicetype} {item.servicename}</MenuItem>
        }))
    }
    const fetchAllBrands = async (sid) => {
        var res = await postData("brands/fetch_brands_by_services",{
            serviceid:sid
        })
        setBrandList(res.data)
    }
    
    const fillBrands = () => {
        return (brandList.map((item) => {
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        }))
    }
    const handleChangeServiceId=(e)=>{
        setServiceId(e.target.value)
        fetchAllBrands(e.target.value)
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const handleErrorMessage = (label, errorMessage) => {
        setError((prev) => ({ ...prev, [label]: errorMessage }))
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage({ filename: URL.createObjectURL(file), bytes: file })
            handleErrorMessage('image', null)
        }
    }
    const handleReset = () => {
        setServiceId('')
        setBrandId('')
        setProductName('')
        setProductDescription('')
        setImage({ filename: '/box.png', bytes: '' })
    }
    const handleClick = async () => {
        var err = false
        if (serviceId.length == 0) {
            err = true
            handleErrorMessage('serviceId', 'Please Input Service ID...')
        }
        if (brandId.length == 0) {
            err = true
            handleErrorMessage('brandId', 'Please Input Brand ID...')
        }
        if (productName.length == 0) {
            err = true
            handleErrorMessage('productName', 'Please Input Product Name...')
        }
        if (productDescription.length == 0) {
            err = true
            handleErrorMessage('productDescription', 'Please Input Product Description...')
        }
        if (image.bytes.length == 0) {
            err = true
            handleErrorMessage('image', 'Please Choose Image...')
        }
        if (err == false) {
            var formData = new FormData()
            formData.append('serviceid', serviceId)
            formData.append('brandid', brandId)
            formData.append('productname', productName)
            formData.append('productdescription', productDescription)
            formData.append('productpicture', image.bytes)

            var result = await postData('products/insert_products', formData)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Product Register",
                    text: result.message,
                    toast: true
                });
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Product Register",
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
                        Add New Products
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate("/dashboard/displayallproducts")}>
                        <img src="/report.png" className={classes.report_style} />
                    </div>
                </div>
                <div style={{ margin: 8 }}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={6} >
                        <FormControl fullWidth>
                                    <InputLabel>Service ID</InputLabel>
                                    <Select onChange={handleChangeServiceId} label="Service Id" value={serviceId}>   
                                        {fillServices()}
                                    </Select>
                                </FormControl>
                        </Grid2>
                        <Grid2 size={6} >
                        <FormControl fullWidth>
                                    <InputLabel>Brand ID</InputLabel>
                                    <Select onChange={(e) => setBrandId(e.target.value)} value={brandId} label="Brand Id" >
                                        <MenuItem>Select Brands</MenuItem>   
                                        {fillBrands()}
                                    </Select>
                                </FormControl>
                        </Grid2>
                        <Grid2 size={12} >
                            <TextField value={productName} error={error.productName} helperText={error.productName} onFocus={() => handleErrorMessage('productName', null)} label="Product Name" onChange={(e) => setProductName(e.target.value)} fullWidth />
                        </Grid2>
                        <Grid2 size={12} >
                            <TextField value={productDescription} error={error.productDescription} helperText={error.productDescription} onFocus={() => handleErrorMessage('productDescription', null)} label="Product Description" onChange={(e) => setProductDescription(e.target.value)} fullWidth />
                        </Grid2>
                        <Grid2 size={4} className={classes.center}>
                            <img src={image.filename} className={classes.image_style} />
                        </Grid2>
                        <Grid2 size={8}  >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60, flexDirection: 'column' }}>
                                <Button fullWidth component="label" variant="outlined">
                                    Upload
                                    <input onFocus={() => handleErrorMessage(image, '')} onChange={handleImageChange} type="file" accept="image/*" hidden multiple />
                                </Button>
                                <div className={classes.helperTextStyle}>{error.image}</div>
                            </div>
                        </Grid2>

                        <Grid2 size={6} className={classes.center} >
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