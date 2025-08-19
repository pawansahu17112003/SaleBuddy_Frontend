import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField, FormHelperText } from "@mui/material"
import { postData } from "../../backendservices/FetchNodeServices"
import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { getData, serverURL } from "../../backendservices/FetchNodeServices";
import { useStyles } from "./DisplayAllProductCss";
import { Style } from "@mui/icons-material";
export default function DisplayAllProducts() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [btnStatus, setBtnStatus] = useState(true)
    const [productId, setProductId] = useState('')
    const [serviceId, setServiceId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [image, setImage] = useState({ filename: '/box.png', bytes: '' })
    const [error, setError] = useState({})
    const [dialogState, setDialogState] = useState('')
    const [oldPicture, setOldPicture] = useState('')
    const [listProducts, setListProducts] = useState([])
    const [open, setOpen] = useState(false)
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
    const handleDelete = async () => {
        {
            var body = { 'productid': productId }
            var result = await postData('products/delete_products', body)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Product Register",
                    text: result.message,
                    toast: true
                });
                fetchAllProducts()
            }
        }
    }

    const handleDelete2 = async (id) => {
        {
            var body = { productid: id }
            var result = await postData('products/delete_products', body)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Product Register",
                    text: result.message,
                    toast: true
                });
                fetchAllProducts()
            }
        }
    }

    const deleteUsingIcon = (rowData) => {
        setProductId(rowData.productId)
        Swal.fire({
            title: "Are you sure to delete selected Products",
            showCancelButton: true,
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete2(rowData.productid)
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
        if (err == false) {
            var body = { 'productid': productId, 'serviceid': serviceId, 'brandid': brandId, 'productname': productName, 'productdescription': productDescription }
            var result = await postData('products/edit_products', body)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Product Register",
                    text: result.message,
                    toast: true
                });
                fetchAllProducts()
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
    const handleOpenDialog = (rowData, state) => {
        fetchAllBrands(rowData.serviceid)
        setDialogState(state)
        setServiceId(rowData.serviceid)
        setProductId(rowData.productid)
        setBrandId(rowData.brandid)
        setProductName(rowData.productname)
        setProductDescription(rowData.productdescription)
        setOldPicture(rowData.productpicture)
        setImage({ filename: `${serverURL}/images/${rowData.productpicture}`, bytes: '' })
        setOpen(true)
    }
    const handleCloseDialog = () => {
        setOpen(false)
    }
    const productForm = () => {
        return (
            <div className={classes.box2}>
                <div className={classes.title}>
                    <div>
                        <img src="/logo.png" className={classes.logo_style} />
                    </div>
                    <div className={classes.title_style}>
                        Edit Products
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
                                    <Select onChange={(e) => setBrandId(e.target.value)} label="Brand Id" value={brandId}>
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
        formData.append('productid', productId)
        formData.append('productpicture', image.bytes)

        var result = await postData('products/update_icon', formData)
        if (result.status) {
            Swal.fire({
                icon: "success",
                title: "Product Register",
                text: result.message,
                toast: true
            });
            fetchAllProducts()
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
    const openDialog = () => {
        return <Dialog open={open}>
            <DialogContent className={classes.dialogcontent}>{dialogState == 'data' ? productForm() : pictureForm()}</DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
        </Dialog>
    }
    const fetchAllProducts = async () => {
        var response = await getData('products/fetch_products')
        if (response.status) {
            setListProducts(response.data)
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Product Register",
                text: response.message,
                toast: true
            });
        }
    }
    useEffect(function () {
        fetchAllProducts()
    }, [])

    function displayAll() {
        return (
            <MaterialTable
                title="List Of Products"
                columns={[
                    { title: 'ID', field: 'productid' },
                    { title: 'Service', render:(rowData)=><div>{rowData.servicetype} {rowData.servicename}</div> },
                    { title: 'Brand', field: 'brandname' },
                    { title: 'Name', field: 'productname' },
                    { title: 'Description', field: 'productdescription' },
                    { title: 'Icon', render: (rowData) => <div style={{ cursor: 'pointer' }} onClick={() => handleOpenDialog(rowData, 'image')}><img src={`${serverURL}/images/${rowData.productpicture}`} style={{ width: 40, height: 40, borderRadius: 7 }} /></div> },
                ]}
                data={listProducts}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Products',
                        onClick: (event, rowData) => handleOpenDialog(rowData, 'data')
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Products',
                        onClick: (event, rowData) => deleteUsingIcon(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Products',
                        isFreeAction: true,
                        onClick: (event) => navigate("/dashboard/productinterface")
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