import { useStyles } from "./AdsInterfaceCss"
import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField, FormHelperText } from "@mui/material"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { postData, getData } from "../../backendservices/FetchNodeServices"
import Swal from "sweetalert2"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function MainsliderInterface() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [image, setImage] = useState([])
    const [productId, setProductId] = useState('')
    const [serviceId, setServiceId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [description, setDescription] = useState('')
    const [imgno, setImgno] = useState('')
    const [error, setError] = useState({})

    //////////////////////////////////////////////////////////////////////////

    const [serviceList, setServiceList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [productList, setProductList] = useState([])
    const [productDetailsList, setProductDetailsList] = useState([])
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
        var res = await postData("brands/fetch_brands_by_services", {
            serviceid: sid
        })
        setBrandList(res.data)
    }
    useEffect(function () {
        fetchAllBrands()
    }, [])

    const fillBrands = () => {
        return (brandList.map((item) => {
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        }))
    }

    const fetchAllProducts = async (bid) => {
        var res = await postData("products/fetch_product_by_brand", {
            brandid: bid
        })
        setProductList(res.data)
    }
    useEffect(function () {
        fetchAllBrands()
    }, [])

    const fillProducts = () => {
        return (productList.map((item) => {
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        }))
    }

    const fetchAllProductDetails = async (pid) => {
        var res = await postData("productDetails/fetch_productdetail_by_product", {
            productid: pid
        })
        setProductDetailsList(res.data)
    }

    const fillProductDetails = () => {
        return (productDetailsList.map((item) => {
            return <MenuItem value={item.productdetailsid}><div style={{ display: 'flex', alignItems: 'center' }}> <span style={{ marginRight: 10 }}>{item.productram}GB  {item.productstorage}GB </span>
                <div style={{ width: 20, height: 20, background: item.productcolor, borderRadius: '50%', border: '1px solid black', marginRight: 6 }} />
                <span style={{ marginRight: 10 }}>{item.productcolorname}</span>
                <span style={{ marginRight: 10 }}>IMEI-{item.imei}</span>
            </div></MenuItem>
        }))
    }
    const handleChangeServiceId = (e) => {
        setServiceId(e.target.value)
        fetchAllBrands(e.target.value)
    }
    const handleChangeBrandId = (e) => {
        setBrandId(e.target.value)
        fetchAllProducts(e.target.value)
    }
    const handleChangeProductId = (e) => {
        setProductId(e.target.value)
        fetchAllProductDetails(e.target.value)
    }
    //////////////////////////////////////////////////////////////////////////////////////

    const handleErrorMessage = (label, errorMessage) => {
        setError((prev) => ({ ...prev, [label]: errorMessage }))
    }

    const handleReset = () => {
        setServiceId('')
        setBrandId('')
        setProductId('')
        setDescription('')
        setImgno('')
        setImage([])
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
        if (productId.length == 0) {
            err = true
            handleErrorMessage('productId', 'Please Input Product ID...')
        }
        if (description.length == 0) {
            err = true
            handleErrorMessage('description', 'Please Input Description...')
        }
        if (imgno.length == 0) {
            err = true
            handleErrorMessage('imgno', 'Please Select Image Number...')
        }
        if (image?.length == 0) {
            err = true
            handleErrorMessage('image', 'Please Choose Image...')
        }
        if (err == false) {
            var formData = new FormData()
            formData.append('serviceid', serviceId)
            formData.append('brandid', brandId)
            formData.append('productid', productId)
            formData.append('description',description)
            formData.append('imgno', imgno)
            image?.map((item, i) => {
                formData.append(`images${i}`, item)
            })

            var result = await postData('ads/insert_ads', formData)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Ads Register",
                    text: result.message,
                    toast: true
                });
                handleReset()
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Ads Register",
                    text: result.message,
                    toast: true
                });
            }
        }
    }

    const showImage = () => {
        return (image?.map((item) => {
            return (<div style={{ margin: 2 }}>
                <img src={`${URL.createObjectURL(item)}`} style={{ width: 30, height: 30 }} />
            </div>)
        }))
    }

    const handleImageChange = (e) => {
        var images = Object.values(e.target.files)
        setImage(images)
    }

    return (
        <div className={classes.root}>
            <div className={classes.box}>
                <div className={classes.title}>
                    <div>
                        <img src="/logo.png" className={classes.logo_style} />
                    </div>
                    <div className={classes.title_style}>
                        Add New Ads Pictures
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate("/dashboard/displayallads")}>
                        <img src="/report.png" className={classes.report_style} />
                    </div>
                </div>
                <div style={{ margin: 8 }}>
                    <Grid2 container spacing={1}>
                        <Grid2 size={4} >
                            <FormControl error={error.serviceId} onFocus={() => handleErrorMessage('serviceId', null)} fullWidth>
                                <InputLabel>Service ID</InputLabel>
                                <Select onChange={handleChangeServiceId} label="Service Id" value={serviceId}>
                                    {fillServices()}
                                </Select>
                                <FormHelperText>{error.serviceId}</FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={4} >
                            <FormControl error={error.brandId} onFocus={() => handleErrorMessage('brandId', null)} fullWidth>
                                <InputLabel>Brand ID</InputLabel>
                                <Select onChange={handleChangeBrandId} value={brandId} label="Brand Id" >
                                    <MenuItem >Select Brands</MenuItem>
                                    {fillBrands()}
                                </Select>
                                <FormHelperText>{error.brandId}</FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={4} >
                            <FormControl error={error.productId} onFocus={() => handleErrorMessage('productId', null)} fullWidth>
                                <InputLabel>Product ID</InputLabel>
                                <Select onChange={handleChangeProductId} value={productId} label="Product Id" >
                                    <MenuItem>Select Products</MenuItem>
                                    {fillProducts()}
                                </Select>
                                <FormHelperText>{error.productId}</FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={6} >
                            <FormControl error={error.imgno} onFocus={() => handleErrorMessage('imgno', null)} fullWidth>
                                <InputLabel>Image Number</InputLabel>
                                <Select onChange={(e) => setImgno(e.target.value)} label="Image Number" value={imgno}>
                                    <MenuItem value='1'>1</MenuItem>
                                    <MenuItem value='2'>2</MenuItem>
                                    <MenuItem value='3'>3</MenuItem>
                                    <MenuItem value='4'>4</MenuItem>
                                    <MenuItem value='5'>5</MenuItem>
                                    <MenuItem value='6'>6</MenuItem>
                                    <MenuItem value='7'>7</MenuItem>
                                    <MenuItem value='8'>8</MenuItem>
                                </Select>
                                <FormHelperText>{error.imgno}</FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={6} >
                            <TextField value={description} error={error.description} helperText={error.description} onFocus={() => handleErrorMessage('description', null)} label="Description" onChange={(e) => setDescription(e.target.value)} fullWidth />
                        </Grid2>
                        <Grid2 size={4} className={classes.center}>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {showImage()}
                            </div>
                        </Grid2>
                        <Grid2 size={8}  >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60, flexDirection: 'column' }}>
                                <Button fullWidth component="label" variant="outlined">
                                    Upload Image
                                    <input onFocus={() => handleErrorMessage(image, '')} onChange={handleImageChange} type="file" accept="image/*" hidden multiple />
                                </Button>
                                <div className={classes.helperTextStyle}>{error.image}</div>
                            </div>
                        </Grid2>
                        <Grid2 size={6} className={classes.center} >
                            <Button fullWidth className={classes.button_style} variant="contained" onClick={handleClick}>Save</Button>
                        </Grid2>
                        <Grid2 size={6} className={classes.center} >
                            <Button fullWidth className={classes.button_style} variant="contained" onClick={handleReset}>Reset</Button>
                        </Grid2>
                    </Grid2>
                </div>
            </div>
        </div>
    )
}