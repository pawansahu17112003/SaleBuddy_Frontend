import { useStyles } from "./MorePictureInterfaceCss"
import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField, FormHelperText } from "@mui/material"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { postData, getData } from "../../backendservices/FetchNodeServices"
import Swal from "sweetalert2"

export default function MorePictureInterface() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [image, setImage] = useState([])
    const [productId, setProductId] = useState('')
    const [serviceId, setServiceId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [productDetailsId, setProductDetailsId] = useState('')
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
            return <MenuItem value={item.productdetailsid}><div style={{ display: 'flex', alignItems: 'center' }}> <span style={{ marginRight: 10 }}>{item.productram} {item.productstorage}</span>
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
        setProductDetailsId('')
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
        if (productDetailsId.length == 0) {
            err = true
            handleErrorMessage('productDetailsId', 'Please Input Product Details ID...')
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
            formData.append('productdetailsid', productDetailsId)
            image?.map((item,i)=>{
                formData.append(`picture${i}`,item)
            })

            var result = await postData('morepictures/insert_morepictures', formData)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Picture Register",
                    text: result.message,
                    toast: true
                });
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Picture Register",
                    text: result.message,
                    toast: true
                });
            }
        }
    }

    const showImage = () => {
        return (image?.map((item)=>{
        return(<div style={{margin:2}}>
            <img src={`${URL.createObjectURL(item)}`} style={{width:30,height:30}}/>
        </div>)}))
    }

    const handleImageChange = (e) => {
        var images=Object.values(e.target.files)
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
                        Add New Product Pictures
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate("/dashboard/displayallmorepicture")}>
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
                        <Grid2 size={12} >
                            <FormControl error={error.serviceId} onFocus={() => handleErrorMessage('productDetailsId', null)} fullWidth>
                                <InputLabel>Product Details ID</InputLabel>
                                <Select onChange={(e) => setProductDetailsId(e.target.value)} label="Product Details Id" value={productDetailsId}>
                                    {fillProductDetails()}
                                </Select>
                                <FormHelperText>{error.productDetailsId}</FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={4} className={classes.center}>
                          <div style={{display:'flex',flexWrap:'wrap'}}>
                            {showImage()}
                          </div>
                        </Grid2>
                        <Grid2 size={8}  >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60, flexDirection: 'column' }}>
                                <Button fullWidth component="label" variant="outlined">
                                    Upload Image
                                    <input onFocus={() => handleErrorMessage(image, '')} onChange={handleImageChange} type="file" hidden multiple />
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