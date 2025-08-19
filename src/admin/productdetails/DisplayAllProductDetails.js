import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField, FormHelperText } from "@mui/material"
import { postData } from "../../backendservices/FetchNodeServices"
import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { getData, serverURL } from "../../backendservices/FetchNodeServices";
import { useStyles } from "./DisplayAllProductDetailsCss";
import { Style } from "@mui/icons-material";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function DisplayAllProducts() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [offerPrice, setOfferPrice] = useState('')
    const [image, setImage] = useState({ filename: '/box.png', bytes: '' })
    const [video, setVideo] = useState({ filename: '/video.png', bytes: '' })
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
    const [btnStatus, setBtnStatus] = useState(true)
    const [btnStatus2, setBtnStatus2] = useState(true)
    const [dialogState, setDialogState] = useState('')
    const [oldPicture, setOldPicture] = useState('')
    const [oldVideo, setOldVideo] = useState('')
    const [listProductDetails, setListProductDetails] = useState([])
    const [error, setError] = useState({})
    const [open, setOpen] = useState(false)
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        fetchAllProducts()
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
    useEffect(function () {
        fetchAllProductColor()
    }, [])

    const fillProductColor = () => {
        return (productColorList.map((item) => {
            return <MenuItem key={item.productcolorid} value={item.productcolorid}>
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
    useEffect(function () {
        fetchAllProductVarient()
    }, [])

    const fillProductVarient = () => {
        return (productVarientList.map((item) => {
            return <MenuItem value={item.productvarientid}>{item.productram} {item.productstorage}</MenuItem>
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

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleErrorMessage = (label, errorMessage) => {
        setError((prev) => ({ ...prev, [label]: errorMessage }))
    }
    const handleDelete = async () => {
        {
            var body = { 'productdetailsid': productDetailsId }
            var result = await postData('productdetails/delete_productdetails', body)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Product Detail Register",
                    text: result.message,
                    toast: true
                });
                fetchAllProductDetails()
            }
        }
    }

    const handleDelete2 = async (id) => {
        {
            var body = { productdetailsid: id }
            var result = await postData('productdetails/delete_productdetails', body)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Product Detail Register",
                    text: result.message,
                    toast: true
                });
                fetchAllProductDetails()
            }
        }
    }

    const deleteUsingIcon = (rowData) => {
        setProductDetailsId(rowData.productDetailId)
        Swal.fire({
            title: "Are you sure to delete selected Product Details",
            showCancelButton: true,
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete2(rowData.productdetailsid)
            }
        })
    }
    const handleImageChange = (e) => {
        setImage({ filename: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
        setBtnStatus(false)
    }
    const handleCancelImageChange = (e) => {
        {
            setImage({ filename: `${serverURL}/images/${oldPicture}`, bytes: '' })
            setBtnStatus(true)
        }
    }
    const handleVideoChange = (e) => {
        setVideo({ filename: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
        setBtnStatus2(false)
    }
    const handleCancelVideoChange = (e) => {
        {
            setVideo({ filename: `${serverURL}/images/${oldVideo}`, bytes: '' })
            setBtnStatus2(true)
        }
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
            handleErrorMessage('productStatus', 'Please Select Status...')
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

        if (err == false) {
            var body = {
                'productdetailsid': productDetailsId,
                'serviceid': serviceId,
                'brandid': brandId,
                'productid': productId,
                'productcolorid': productColorId,
                'productvarientid': productVarientId,
                'imei': imei,
                'productstatus': productStatus,
                'status': status,
                'warrenty': warrenty,
                'ratings': ratings,
                'price': price,
                'offerprice': offerPrice,
                'membershipprice': membershipPrice,
                'productcondition': productCondition,
                'stock': stock,
                'description': description
            }
            var result = await postData('productdetails/edit_productdetails', body)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Product Details Register",
                    text: result.message,
                    toast: true
                });
                fetchAllProductDetails()
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Product Details Register",
                    text: result.message,
                    toast: true
                });
            }
        }
    }
    const handleOpenDialog = (rowData, state) => {
        fetchAllBrands(rowData.serviceid)
        fetchAllProducts(rowData.brandid)
        fetchAllProductColor(rowData.productid)
        fetchAllProductVarient(rowData.productid)
        setDialogState(state)
        setServiceId(rowData.serviceid)
        setProductId(rowData.productid)
        setBrandId(rowData.brandid)
        setProductColorId(rowData.productcolorid)
        setProductVarientId(rowData.productvarientid)
        setProductDetailsId(rowData.productdetailsid)
        setImei(rowData.imei)
        setProductStatus(rowData.productstatus)
        setStatus(rowData.status)
        setWarrenty(rowData.warrenty)
        setRatings(rowData.ratings)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setMembershipPrice(rowData.membershipprice)
        setProductCondition(rowData.productcondition)
        setStock(rowData.stock)
        setDescription(rowData.description)
        setOldPicture(rowData.picture)
        setOldVideo(rowData.video)
        setImage({ filename: `${serverURL}/images/${rowData.picture}`, bytes: '' })
        setVideo({ filename: `${serverURL}/images/${rowData.video}`, bytes: '' })
        setOpen(true)
    }
    const handleCloseDialog = () => {
        setOpen(false)
    }
    const productDetailsForm = () => {
        return (
            <div className={classes.box2}>
                <div className={classes.title}>
                    <div>
                        <img src="/logo.png" className={classes.logo_style} />
                    </div>
                    <div className={classes.title_style}>
                        Edit Product Details
                    </div>
                </div>
                <div style={{ margin: 8 }}>
                    <Grid2 container spacing={2}>
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
                                    <MenuItem>Select Brands</MenuItem>
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
                            <TextField value={imei} error={error.imei} helperText={error.imei} onFocus={() => handleErrorMessage('imei', null)} label="IMEI" onChange={(e) => setImei(e.target.value)} fullWidth />
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
                        <Grid2 size={6} className={classes.center} >
                            <Button className={classes.button_style} variant="contained" onClick={handleClick}>Save</Button>
                        </Grid2>
                        <Grid2 size={6} className={classes.center} >
                            <Button className={classes.button_style} variant="contained" onClick={handleDelete}>Delete</Button>
                        </Grid2>
                    </Grid2>
                </div>
            </div>
        )
    }
    const handleImageSave = async () => {
        var formData = new FormData()
        formData.append('productdetailsid', productDetailsId)
        formData.append('picture', image.bytes)

        var result = await postData('productdetails/update_icon', formData)
        if (result.status) {
            Swal.fire({
                icon: "success",
                title: "Product Detail Register",
                text: result.message,
                toast: true
            });
            fetchAllProductDetails()
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
    const handleVideoSave = async () => {
        var formData = new FormData()
        formData.append('productdetailsid', productDetailsId)
        formData.append('video', video.bytes)

        var result = await postData('productdetails/update_video', formData)
        if (result.status) {
            Swal.fire({
                icon: "success",
                title: "Product Detail Register",
                text: result.message,
                toast: true
            });
            fetchAllProductDetails()
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
    const pictureForm = () => {
        return (
            <div className={classes.box2}>
                <div className={classes.title}>
                    <div>
                        <img src="/logo.png" className={classes.logo_style} />
                    </div>
                    <div className={classes.title_style}>
                        Update Icon
                    </div>
                </div>
                <div style={{ margin: 8 }}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={6}>
                            <img src={image.filename} className={classes.image_style} />
                        </Grid2>
                        <Grid2 size={6}  >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60, flexDirection: 'column' }}>
                                <Button fullWidth component="label" variant="outlined">
                                    Upload
                                    <input onFocus={() => handleErrorMessage(image, '')} onChange={handleImageChange} type="file" accept="image/*" hidden multiple />
                                </Button>
                                <div className={classes.helperTextStyle}>{error.image}</div>
                            </div>
                        </Grid2>
                        <Grid2 size={6} className={classes.center} >
                            <Button disabled={btnStatus} className={classes.button_style} variant="contained" onClick={handleImageSave}>Save</Button>
                        </Grid2>
                        <Grid2 size={6} className={classes.center} >
                            <Button disabled={btnStatus} className={classes.button_style} variant="contained" onClick={handleCancelImageChange}>Cancel</Button>
                        </Grid2>
                    </Grid2>
                </div>
            </div>
        )
    }

    const VideoForm = () => {
        return (
            <div className={classes.box2}>
                <div className={classes.title}>
                    <div>
                        <img src="/logo.png" className={classes.logo_style} />
                    </div>
                    <div className={classes.title_style}>
                        Update Video
                    </div>
                </div>
                <div style={{ margin: 8 }}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={6}>
                            <video autoPlay loop muted src={video.filename} className={classes.video_style} />
                        </Grid2>
                        <Grid2 size={6}  >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100, flexDirection: 'column' }}>
                                <Button fullWidth component="label" variant="outlined">
                                    Upload
                                    <input onFocus={() => handleErrorMessage(video, '')} onChange={handleVideoChange} type="file" accept="video/*" hidden multiple />
                                </Button>
                                <div className={classes.helperTextStyle}>{error.video}</div>
                            </div>
                        </Grid2>
                        <Grid2 size={6} className={classes.center} >
                            <Button disabled={btnStatus2} className={classes.button_style} variant="contained" onClick={handleVideoSave}>Save</Button>
                        </Grid2>
                        <Grid2 size={6} className={classes.center} >
                            <Button disabled={btnStatus2} className={classes.button_style} variant="contained" onClick={handleCancelVideoChange}>Cancel</Button>
                        </Grid2>
                    </Grid2>
                </div>
            </div>
        )
    }
    const openDialog = () => {
        return <Dialog open={open} >
            <DialogContent className={classes.dialogcontent}>{dialogState === 'data' ? productDetailsForm() : dialogState === 'image' ? pictureForm() : dialogState === 'video' ? VideoForm() : null}</DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
        </Dialog>
    }
    const fetchAllProductDetails = async () => {
        var response = await getData('productdetails/fetch_productdetails')
        if (response.status) {
            setListProductDetails(response.data)
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Product Color Register",
                text: response.message,
                toast: true
            });
        }
    }
    useEffect(function () {
        fetchAllProductDetails()
    }, [])

    function displayAll() {
        return (
            <MaterialTable
                title="List Of Product Details"
                columns={[
                    { title: 'ID', field: 'productdetailsid', width: '3%' },
                    { title: 'Service', width: '6%', render: (rowData) => <div>{rowData.servicetype} {rowData.servicename}</div> },
                    { title: 'Brand Product', render: (rowData) => <div>{rowData.brandname} {rowData.productname}</div> },

                    {
                        title: 'Product Color', width: '11%', render: (rowData) => <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: 20, height: 20, background: `${rowData.productcolor}`, borderRadius: '50%', border: '1px solid black', marginRight: 10, }} />
                            <span >{rowData.productcolorname}</span>
                        </div>
                    },
                    { title: 'Product Variant', width: '6%', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}><div>{rowData.productram}</div><div> {rowData.productstorage}</div></div> },
                    { title: 'Status Condition Ratings', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }}><div>{rowData.productstatus} </div><div>{rowData.productcondition}</div> <div>{rowData.ratings}</div></div> },
                    { title: 'Status', width: '7%', field: 'status' },
                    { title: 'Warrenty IMEI', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }}><div>{rowData.warrenty}</div><div>{rowData.imei}</div></div> },
                    { title: <div style={{ display: 'flex', flexDirection: 'column' }}> <div>Price</div> <div>Offer Price</div> <div>MembershipPrice</div> </div>, width: '11%', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}><div>₹-{rowData.price}</div><div>₹-{rowData.offerprice}</div> <div>₹-{rowData.membershipprice}</div></div> },

                    { title: 'Stock', width: '7%', field: 'stock' },

                    { title: 'Icon', render: (rowData) => <div style={{ cursor: 'pointer' }} onClick={() => handleOpenDialog(rowData, 'image')}><img src={`${serverURL}/images/${rowData.picture}`} style={{ width: 50, height: 50, borderRadius: 15 }} /></div> },
                    { title: 'Video', render: (rowData) => <div style={{ cursor: 'pointer' }} onClick={() => handleOpenDialog(rowData, 'video')}><video autoPlay loop muted src={`${serverURL}/images/${rowData.video}`} style={{ width: 50, height: 50, borderRadius: 15, margin: 0, padding: 0 }} /></div> }
                ]}
                data={listProductDetails}
                options={{
                    tableLayout: "fixed",
                }}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Product Details',
                        onClick: (event, rowData) => handleOpenDialog(rowData, 'data')
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Product Details',
                        onClick: (event, rowData) => deleteUsingIcon(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Product Details',
                        isFreeAction: true,
                        onClick: (event) => navigate("/dashboard/productdetailsinterface")
                    }
                ]}
            />
        )
    }
    return (<div className={classes.root}>
        <div className={classes.box}>
            {displayAll()}
        </div>
        {openDialog()}
    </div>)

}