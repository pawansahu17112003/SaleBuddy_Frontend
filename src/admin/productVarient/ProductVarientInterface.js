import {useStyles} from "./productVarientIntefaceCss"
import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField, FormHelperText } from "@mui/material"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { postData, getData } from "../../backendservices/FetchNodeServices"
import Swal from "sweetalert2"

export default function ProductVarientInterface() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [productRam, setProductRam] = useState('')
    const [productStorage, setProductStorage] = useState('')
    const [productId, setProductId] = useState('')
    const [serviceId, setServiceId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [error, setError] = useState({})

    //////////////////////////////////////////////////////////////////////////

    const [serviceList, setServiceList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [productList, setProductList] = useState([])
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

    const fillProducts = () => {
        return (productList.map((item) => {
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
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
    //////////////////////////////////////////////////////////////////////////////////////

    const handleErrorMessage = (label, errorMessage) => {
        setError((prev) => ({ ...prev, [label]: errorMessage }))
    }

    const handleReset = () => {
        setServiceId('')
        setBrandId('')
        setProductRam('')
        setProductStorage('')
        setProductId('')
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
        if (productRam.length == 0) {
            err = true
            handleErrorMessage('productRam', 'Please Input Ram...')
        }
        if (productStorage.length == 0) {
            err = true
            handleErrorMessage('productStorage', 'Please Input Storage...')
        }
        if (err==false) {
            var formData = new FormData()
            formData.append('serviceid', serviceId)
            formData.append('brandid', brandId)
            formData.append('productid', productId)
            formData.append('productram', productRam)
            formData.append('productstorage', productStorage)

            var result =await postData('productVarients/insert_productVarients', formData)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Product Varients Register",
                    text: result.message,
                    toast: true
                });
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Product Varients Register",
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
                        Add New Product Varients
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate("/dashboard/DisplayAllProductVarient")}>
                        <img src="/report.png" className={classes.report_style} />
                    </div>
                </div>
                <div style={{ margin: 8 }}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={12} >
                            <FormControl error={error.serviceId} onFocus={() => handleErrorMessage('serviceId', null)} fullWidth>
                                <InputLabel>Service ID</InputLabel>
                                <Select onChange={handleChangeServiceId} label="Service Id" value={serviceId}>
                                    {fillServices()}
                                </Select>
                                <FormHelperText>{error.serviceId}</FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={12} >
                            <FormControl error={error.brandId} onFocus={() => handleErrorMessage('brandId', null)} fullWidth>
                                <InputLabel>Brand ID</InputLabel>
                                <Select onChange={handleChangeBrandId} value={brandId} label="Brand Id" >
                                    <MenuItem>Select Brands</MenuItem>
                                    {fillBrands()}
                                </Select>
                                <FormHelperText>{error.brandId}</FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={12} >
                            <FormControl error={error.productId} onFocus={() => handleErrorMessage('productId', null)} fullWidth>
                                <InputLabel>Product ID</InputLabel>
                                <Select onChange={(e) => setProductId(e.target.value)} value={productId} label="Product Id" >
                                    <MenuItem>Select Products</MenuItem>
                                    {fillProducts()}
                                </Select>
                                <FormHelperText>{error.productId}</FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={6} >
                            <TextField value={productRam} error={error.productRam} helperText={error.productRam} onFocus={() => handleErrorMessage('productRam', null)} label="RAM" onChange={(e) => setProductRam(e.target.value)} fullWidth />
                        </Grid2>
                        <Grid2 size={6} >
                            <TextField value={productStorage} error={error.productStorage} helperText={error.productStorage} onFocus={() => handleErrorMessage('productStorage', null)} label="Storage" onChange={(e) => setProductStorage(e.target.value)} fullWidth />
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