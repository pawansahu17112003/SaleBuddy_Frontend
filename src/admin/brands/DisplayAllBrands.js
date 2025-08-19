import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField, FormHelperText } from "@mui/material"
import { postData } from "../../backendservices/FetchNodeServices"
import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { getData, serverURL } from "../../backendservices/FetchNodeServices";
import { useStyles } from "./DisplayAllBrandsCss";
import { Style } from "@mui/icons-material";
export default function DisplayAllBrands() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [btnStatus, setBtnStatus] = useState(true)
    const [serviceList,setServiceList] =useState([])
    const [serviceId, setServiceId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [brandName, setBrandName] = useState('')
    const [image, setImage] = useState({ filename: '/brand.png', bytes: '' })
    const [error, setError] = useState({})
    const [dialogState, setDialogState] = useState('')
    const [oldPicture, setOldPicture] = useState('')
    const [listBrands, setListBrands] = useState([])
    const [open, setOpen] = useState(false)

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

    const handleErrorMessage = (label, errorMessage) => {
        setError((prev) => ({ ...prev, [label]: errorMessage }))
    }
    const handleDelete = async () => {
        {
            var body = { 'brandid': brandId }
            var result = await postData('brands/delete_brands', body)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Brand Register",
                    text: result.message,
                    toast: true
                });
                fetchAllBrands()
            }
        }
    }

    const handleDelete2 = async (id) => {
        {
            var body = { brandid: id }
            var result = await postData('brands/delete_brands', body)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Brand Register",
                    text: result.message,
                    toast: true
                });
                fetchAllBrands()
            }
        }
    }

    const deleteUsingIcon = (rowData) => {
        setBrandId(rowData.brandid)
        Swal.fire({
            title: "Are you sure to delete selected Brands",
            showCancelButton: true,
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete2(rowData.brandid)
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
            handleErrorMessage('serviceId', 'Please Input Service Id...')
        }
        if (brandName.length == 0) {
            err = true
            handleErrorMessage('brandName', 'Please input Brand Name...')
        }
        if (err == false) {
            var body = { 'serviceid': serviceId, 'brandid': brandId, 'brandname': brandName }
            var result = await postData('brands/edit_brands', body)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Brand Register",
                    text: result.message,
                    toast: true
                });
                fetchAllBrands()
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
    const handleOpenDialog = (rowData, state) => {
        setDialogState(state)
        setServiceId(rowData.serviceid)
        setBrandId(rowData.brandid)
        setBrandName(rowData.brandname)
        setOldPicture(rowData.brandlogo)
        setImage({ filename: `${serverURL}/images/${rowData.brandlogo}`, bytes: '' })
        setOpen(true)
    }
    const handleCloseDialog = () => {
        setOpen(false)
    }
    const brandForm = () => {
        return (
            <div className={classes.box2}>
                <div className={classes.title}>
                    <div>
                        <img src="/logo.png" className={classes.logo_style} />
                    </div>
                    <div className={classes.title_style}>
                        Edit Brands
                    </div>
                </div>
                <div style={{ margin: 8 }}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={12} >
                            <FormControl fullWidth>
                                <InputLabel>Service ID</InputLabel>
                                <Select value={serviceId} onChange={(e) => setServiceId(e.target.value)} label="Service Id" >
                                    {fillServices()}
                                </Select>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={12} >
                            <TextField value={brandName} error={error.brandName} helperText={error.brandName} onFocus={() => handleErrorMessage('brandName', null)} onChange={(e) => setBrandName(e.target.value)} label="Brand Name" fullWidth />
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
        formData.append('brandid', brandId)
        formData.append('brandlogo', image.bytes)

        var result = await postData('brands/update_icon', formData)
        if (result.status) {
            Swal.fire({
                icon: "success",
                title: "Brand Register",
                text: result.message,
                toast: true
            });
            fetchAllBrands()
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
            <DialogContent className={classes.dialogcontent}>{dialogState == 'data' ? brandForm() : pictureForm()}</DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
        </Dialog>
    }
    const fetchAllBrands = async () => {
        var response = await getData('brands/fetch_brands')
        if (response.status) {
            setListBrands(response.data)
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Brand Register",
                text: response.message,
                toast: true
            });
        }
    }
    useEffect(function () {
        fetchAllBrands()
    }, [])

    function displayAll() {
        return (
            <MaterialTable
                title="List Of Brands"
                columns={[
                    { title: 'ID', field: 'brandid' },
                    { title: 'Service ID', render:(rowData)=> <div>{rowData.servicetype} {rowData.servicename}</div> },
                    { title: 'Name', field: 'brandname' },
                    { title: 'Icon', render: (rowData) => <div style={{ cursor: 'pointer' }} onClick={() => handleOpenDialog(rowData, 'image')}><img src={`${serverURL}/images/${rowData.brandlogo}`} style={{ width: 60, height: 40, fullWidth:'contain', borderRadius: 7,margin:0 }} /></div> },
                ]}
                data={listBrands}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Brands',
                        onClick: (event, rowData) => handleOpenDialog(rowData, 'data')
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Brands',
                        onClick: (event, rowData) => deleteUsingIcon(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Brands',
                        isFreeAction: true,
                        onClick: (event) => navigate("/dashboard/brandinterface")
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