import { useStyles } from "./ProductDetailsInterfaceCss"
import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField, FormHelperText } from "@mui/material"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { postData, getData } from "../../backendservices/FetchNodeServices"
import Swal from "sweetalert2"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function ProductDetailInterface() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [offerPrice, setOfferPrice] = useState('')
    const [image, setImage] = useState({ filename: '/box.png', bytes: '' })
    const [video, setVideo] = useState({ filename: '/play.mp4', bytes: '' })
    const [productId, setProductId] = useState('')
    const [serviceId, setServiceId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [productDetailsId, setProductDetailsId] = useState('')
    const [productColorId, setProductColorId] = useState('')
    const [productVarientId, setProductVarientId] = useState('')
    const [imei, setImei] = useState('')
    const [productStatus, setProductStatus] = useState('')
    const [status, setStatus] = useState('')
    const [warrenty, setWarrenty] = useState('')
    const [ratings, setRatings] = useState('')
    const [price, setPrice] = useState('')
    const [membershipPrice, setMembershipPrice] = useState('')
    const [productCondition, setProductCondition] = useState('')
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState('')
    const [error, setError] = useState({})

    //////////////////////////////////////////////////////////////////////////

    const [serviceList, setServiceList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [productList, setProductList] = useState([])
    const [productColorList, setProductColorList] = useState([])
    const [productVarientList, setProductVarientList] = useState([])
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

    const fetchAllProductColor = async (pid) => {
        var res = await postData("productColors/fetch_productcolor_by_product", {
            productid: pid
        })
        setProductColorList(res.data)
    }

    const fillProductColor = () => {
        return (productColorList.map((item) => {
            return <MenuItem value={item.productcolorid}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: 20, height: 20, background: item.productcolor, borderRadius: '50%', border: '1px solid black', marginRight: 10, }} />
                    <span>{item.productcolorname}</span>
                </div>
            </MenuItem>
        }))
    }

    const fetchAllProductVarient = async (pid) => {
        var res = await postData("productVarients/fetch_productvarient_by_product", {
            productid: pid
        })
        setProductVarientList(res.data)
    }

    const fillProductVarient = () => {
        return (productVarientList.map((item) => {
            return <MenuItem value={item.productvarientid}>{item.productram}  {item.productstorage}</MenuItem>
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
        fetchAllProductColor(e.target.value)
        fetchAllProductVarient(e.target.value)
    }
    //////////////////////////////////////////////////////////////////////////////////////

    const handleErrorMessage = (label, errorMessage) => {
        setError((prev) => ({ ...prev, [label]: errorMessage }))
    }

    const handleReset = () => {
        setServiceId('')
        setBrandId('')
        setProductId('')
        setProductColorId('')
        setProductVarientId('')
        setImei('')
        setProductStatus('')
        setStatus('')
        setWarrenty('')
        setRatings('')
        setPrice('')
        setOfferPrice('')
        setMembershipPrice('')
        setProductCondition('')
        setStock('')
        setDescription('')
        setImage({ filename: '/box.png', bytes: '' })
        setVideo({ filename: '/play.mp4', bytes: '' })
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
        if (productColorId.length == 0) {
            err = true
            handleErrorMessage('productColorId', 'Please Input Colour ID...')
        }
        if (productVarientId.length == 0) {
            err = true
            handleErrorMessage('productVarientId', 'Please Input Variant...')
        }
        if (imei.length == 0) {
            err = true
            handleErrorMessage('imei', 'Please Input IMEI...')
        }
        if (productStatus.length == 0) {
            err = true
            handleErrorMessage('productStatus', 'Please Input Product Status...')
        }
        if (status.length == 0) {
            err = true
            handleErrorMessage('status', 'Please Select Status...')
        }
        if (warrenty.length == 0) {
            err = true
            handleErrorMessage('warrenty', 'Please Input Warrenty...')
        }
        if (ratings.length == 0) {
            err = true
            handleErrorMessage('ratings', 'Please Input Ratings...')
        }
        if (price.length == 0) {
            err = true
            handleErrorMessage('price', 'Please Input Price...')
        }
        if (offerPrice.length == 0) {
            err = true
            handleErrorMessage('offerPrice', 'Please Input Offer Price...')
        }
        if (membershipPrice.length == 0) {
            err = true
            handleErrorMessage('membershipPrice', 'Please Input Membership Price...')
        }
        if (productCondition.length == 0) {
            err = true
            handleErrorMessage('productCondition', 'Please Input Product Condition...')
        }
        if (stock.length == 0) {
            err = true
            handleErrorMessage('stock', 'Please Input Stock...')
        }
        if (description.length == 0) {
            err = true
            handleErrorMessage('description', 'Please Input Description...')
        }
        if (image.bytes.length == 0) {
            err = true
            handleErrorMessage('image', 'Please Choose Image...')
        }
        if (video.bytes.length == 0) {
            err = true
            handleErrorMessage('video', 'Please Choose Video...')
        }
        if (err == false) {
            var formData = new FormData()
            formData.append('serviceid', serviceId)
            formData.append('brandid', brandId)
            formData.append('productid', productId)
            formData.append('productcolorid', productColorId)
            formData.append('productvarientid', productVarientId)
            formData.append('imei', imei)
            formData.append('productstatus', productStatus)
            formData.append('status', status)
            formData.append('warrenty', warrenty)
            formData.append('ratings', ratings)
            formData.append('price', price)
            formData.append('offerprice', offerPrice)
            formData.append('membershipprice', membershipPrice)
            formData.append('productcondition', productCondition)
            formData.append('stock', stock)
            formData.append('description', description)
            formData.append('picture', image.bytes)
            formData.append('video', video.bytes)

            var result = await postData('productDetails/insert_productdetails', formData)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Product Detail Register",
                    text: result.message,
                    toast: true
                });
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Product Detail Register",
                    text: result.message,
                    toast: true
                });
            }
        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage({ filename: URL.createObjectURL(file), bytes: file })
            handleErrorMessage('image', null)
        }
    }
    const handleVideoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setVideo({ filename: URL.createObjectURL(file), bytes: file })
            handleErrorMessage('video', null)
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
                        Add New Product Details
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate("/dashboard/displayallproductdetails")}>
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
                        <Grid2 size={4} >
                            <FormControl error={error.productColorId} onFocus={() => handleErrorMessage('productColorId', null)} fullWidth>
                                <InputLabel>Product Colour ID</InputLabel>
                                <Select onChange={(e) => setProductColorId(e.target.value)} value={productColorId} label="Product Color Id" >
                                    <MenuItem>Select Product Color ID</MenuItem>
                                    {fillProductColor()}
                                </Select>
                                <FormHelperText>{error.productColorId}</FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={4} >
                            <FormControl error={error.productVarientId} onFocus={() => handleErrorMessage('productVarientId', null)} fullWidth>
                                <InputLabel>Product Varient ID</InputLabel>
                                <Select onChange={(e) => setProductVarientId(e.target.value)} value={productVarientId} label="Product Varient Id" >
                                    <MenuItem>Select Product Color ID</MenuItem>
                                    {fillProductVarient()}
                                </Select>
                                <FormHelperText>{error.productVarientId}</FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={4} >
                            <FormControl error={error.productStatus} onFocus={() => handleErrorMessage('productStatus', null)} fullWidth>
                                <InputLabel>Product Status</InputLabel>
                                <Select value={productStatus} onChange={(e) => setProductStatus(e.target.value)} label="Product Status">
                                    <MenuItem value="Old">Old</MenuItem>
                                    <MenuItem value="New">New</MenuItem>
                                    <MenuItem value="Refurbished">Refurbished</MenuItem>
                                </Select>
                                <FormHelperText>{error.productStatus}</FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={4} >
                            <FormControl error={error.status} onFocus={() => handleErrorMessage('status', null)} fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Status">
                                    <MenuItem value="Latest Launches">Latest Launches</MenuItem>
                                    <MenuItem value="Hot Deals">Hot Deals</MenuItem>
                                    <MenuItem value="Deals Of The Day">Deals Of The Day</MenuItem>
                                    <MenuItem value="Summer Special">Summer Special</MenuItem>
                                    <MenuItem value="Winter Special">Winter Special</MenuItem>
                                </Select>
                                <FormHelperText>{error.Status}</FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={4} >
                            <FormControl error={error.warrenty} onFocus={() => handleErrorMessage('warrenty', null)} fullWidth>
                                <InputLabel>Warrenty
                                </InputLabel>
                                <Select value={warrenty} onChange={(e) => setWarrenty(e.target.value)} label="Warrenty">
                                    <MenuItem value="No Warrenty">No Warranty</MenuItem>
                                    <MenuItem value="1 Months">1 Months</MenuItem>
                                    <MenuItem value="2 Months">2 Months</MenuItem>
                                    <MenuItem value="3 Months">3 Months</MenuItem>
                                    <MenuItem value="4 Months">4 Months</MenuItem>
                                    <MenuItem value="5 Months">5 Months</MenuItem>
                                    <MenuItem value="6 Months">6 Months</MenuItem>
                                    <MenuItem value="7 Months">7 Months</MenuItem>
                                    <MenuItem value="8 Months">8 Months</MenuItem>
                                    <MenuItem value="9 Months">9 Months</MenuItem>
                                    <MenuItem value="10 Months">10 Months</MenuItem>
                                </Select>
                                <FormHelperText>{error.warrenty}</FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={4} >
                            <FormControl error={error.ratings} onFocus={() => handleErrorMessage('ratings', null)} fullWidth>
                                <InputLabel>Ratings
                                </InputLabel>
                                <Select value={ratings} onChange={(e) => setRatings(e.target.value)} label="Ratings">
                                    <MenuItem value="0">0 Star</MenuItem>
                                    <MenuItem value="1">1 Star</MenuItem>
                                    <MenuItem value="2">2 Star</MenuItem>
                                    <MenuItem value="3">3 Star</MenuItem>
                                    <MenuItem value="4">4 Star</MenuItem>
                                    <MenuItem value="5">5 Star</MenuItem>
                                </Select>
                                <FormHelperText>{error.warrenty}</FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={4} >
                            <TextField value={price} error={error.price} helperText={error.price} onFocus={() => handleErrorMessage('price', null)} label="Price" onChange={(e) => setPrice(e.target.value)} fullWidth />
                        </Grid2>
                        <Grid2 size={4} >
                            <TextField value={offerPrice} error={error.offerPrice} helperText={error.offerPrice} onFocus={() => handleErrorMessage('offerPrice', null)} label="Offer Price" onChange={(e) => setOfferPrice(e.target.value)} fullWidth />
                        </Grid2>
                        <Grid2 size={4} >
                            <TextField value={membershipPrice} error={error.membershipPrice} helperText={error.membershipPrice} onFocus={() => handleErrorMessage('membershipPrice', null)} label="Member Ship Price" onChange={(e) => setMembershipPrice(e.target.value)} fullWidth />
                        </Grid2>
                        <Grid2 size={4} >
                            <TextField value={imei} error={error.imei} helperText={error.imei} onFocus={() => handleErrorMessage('imei', null)} label="IMEI" onChange={(e) => setImei(e.target.value)} fullWidth />
                        </Grid2>
                        <Grid2 size={4} >
                            <FormControl error={error.productCondition} onFocus={() => handleErrorMessage('productCondition', null)} fullWidth>
                                <InputLabel>Condition</InputLabel>
                                <Select value={productCondition} onChange={(e) => setProductCondition(e.target.value)} label="Product Condition">
                                    <MenuItem value="Fair">Fair</MenuItem>
                                    <MenuItem value="Good">Good</MenuItem>
                                    <MenuItem value="Superb">Superb</MenuItem>
                                </Select>
                                <FormHelperText>{error.productCondition}</FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={4} >
                            <TextField value={stock} error={error.stock} helperText={error.stock} onFocus={() => handleErrorMessage('stock', null)} label="Stock" onChange={(e) => setStock(e.target.value)} fullWidth />
                        </Grid2>
                        <Grid2 size={12} >
                            <ReactQuill
                                value={description}
                                onChange={setDescription}
                                modules={{
                                    toolbar: [
                                        ['bold', 'italic', 'underline', 'strike'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                        ['link', 'image', 'video'],
                                        ['clean']
                                    ],
                                }}
                                formats={[
                                    'bold', 'italic', 'underline', 'strike',
                                    'list', 'bullet',
                                    'link', 'image'
                                ]}
                            />
                        </Grid2>
                        <Grid2 size={2} className={classes.center}>
                            <img src={image.filename} className={classes.image_style} />
                        </Grid2>
                        <Grid2 size={4}  >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60, flexDirection: 'column' }}>
                                <Button fullWidth component="label" variant="outlined">
                                    Upload Image
                                    <input onFocus={() => handleErrorMessage(image, '')} onChange={handleImageChange} type="file" accept="image/*" hidden multiple />
                                </Button>
                                <div className={classes.helperTextStyle}>{error.image}</div>
                            </div>
                        </Grid2>
                        <Grid2 size={2} className={classes.center}>
                            <video src={video.filename} autoPlay loop muted className={classes.image_style} />
                        </Grid2>
                        <Grid2 size={4}  >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60, flexDirection: 'column' }}>
                                <Button fullWidth component="label" variant="outlined">
                                    Upload Video
                                    <input onFocus={() => handleErrorMessage(video, '')} onChange={handleVideoChange} type="file" accept="video/*" hidden multiple />
                                </Button>
                                <div className={classes.helperTextStyle}>{error.video}</div>
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