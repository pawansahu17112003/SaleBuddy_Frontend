import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField, FormHelperText } from "@mui/material"
import { postData } from "../../backendservices/FetchNodeServices"
import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { getData, serverURL } from "../../backendservices/FetchNodeServices";
import { useStyles } from "./DisplayAllServicesCss";
import { Style } from "@mui/icons-material";
export default function DisplayAllServices() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [btnStatus, setBtnStatus] = useState(true)
    const [serviceId, setServiceId] = useState('')
    const [serviceType, setServiceType] = useState('')
    const [serviceName, setServiceName] = useState('')
    const [serviceStatus, setServiceStatus] = useState('')
    const [image, setImage] = useState({ filename: '/repair.png', bytes: '' })
    const [error, setError] = useState({})
    const [dialogState, setDialogState] = useState('')
    const [oldPicture, setOldPicture] = useState('')
    const [listServices, setListServices] = useState([])
    const [open, setOpen] = useState(false)
    const handleErrorMessage = (label, errorMessage) => {
        setError((prev) => ({ ...prev, [label]: errorMessage }))
    }
    const handleDelete = async () => {
        {
            var body = { 'serviceid': serviceId }
            var result = await postData('services/delete_services', body)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Service Register",
                    text: result.message,
                    toast: true
                });
                fetchAllServices()
            }
        }
    }

    const handleDelete2 = async (id) => {
        {
            var body = { serviceid: id }
            var result = await postData('services/delete_services', body)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Brand Register",
                    text: result.message,
                    toast: true
                });
                fetchAllServices()
            }
        }
    }

    const deleteUsingIcon = (rowData) => {
        setServiceId(rowData.serviceId)
        Swal.fire({
            title: "Are you sure to delete selected services",
            showCancelButton: true,
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete2(rowData.serviceid)
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
        if (serviceName.length == 0) {
            err = true
            handleErrorMessage('serviceName', 'Pls Input Service Name')
        }
        if (serviceType.length == 0) {
            err = true
            handleErrorMessage('serviceType', "Pls Select Service Type..")
        }
        if (serviceStatus.length == 0) {
            err = true
            handleErrorMessage('serviceStatus', "Pls Select Service Status..")
        }
        if (err == false) {
            var body = { 'servicetype': serviceType, 'servicename': serviceName, 'servicestatus': serviceStatus, 'serviceid': serviceId }
            var result = await postData('services/edit_services', body)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Service Register",
                    text: result.message,
                    toast: true
                });
                fetchAllServices()
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Service Register",
                    text: result.message,
                    toast: true
                });
            }
        }
    }
    const handleOpenDialog = (rowData, state) => {
        setDialogState(state)
        setServiceId(rowData.serviceid)
        setServiceType(rowData.servicetype)
        setServiceName(rowData.servicename)
        setServiceStatus(rowData.servicestatus)
        setOldPicture(rowData.icon)
        setImage({ filename: `${serverURL}/images/${rowData.icon}`, bytes: '' })
        setOpen(true)
    }
    const handleCloseDialog = () => {
        setOpen(false)
    }
    const serviceForm = () => {
        return (
            <div className={classes.box2}>
                <div className={classes.title}>
                    <div>
                        <img src="/logo.png" className={classes.logo_style} />
                    </div>
                    <div className={classes.title_style}>
                        Edit Services
                    </div>
                </div>
                <div style={{ margin: 8 }}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={6} >
                            <FormControl error={error.serviceType} onFocus={() => handleErrorMessage('serviceType', null)} fullWidth>
                                <InputLabel>Service Type</InputLabel>
                                <Select value={serviceType} onChange={(e) => setServiceType(e.target.value)} label="Service Type">
                                    <MenuItem value="Buy">Buy</MenuItem>
                                    <MenuItem value="Sell">Sell</MenuItem>
                                </Select>
                                <FormHelperText>{error.serviceType}</FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={6} >
                            <TextField value={serviceName} error={error.serviceName} helperText={error.serviceName} onFocus={() => handleErrorMessage('serviceName', null)} onChange={(e) => setServiceName(e.target.value)} label="Service Name" fullWidth />
                        </Grid2>

                        <Grid2 size={12} >
                            <FormControl error={error.serviceStatus} onFocus={() => handleErrorMessage('serviceStatus', null)} fullWidth>
                                <InputLabel>Service Status</InputLabel>
                                <Select value={serviceStatus} onChange={(e) => setServiceStatus(e.target.value)} label="Service Status">
                                    <MenuItem value="Continue">Continue</MenuItem>
                                    <MenuItem value="Discontinue">Discontinue</MenuItem>
                                </Select>
                                <FormHelperText>{error.serviceStatus}</FormHelperText>
                            </FormControl>
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
        formData.append('serviceid', serviceId)
        formData.append('icon', image.bytes)

        var result = await postData('services/update_icon', formData)
        if (result.status) {
            Swal.fire({
                icon: "success",
                title: "Service Register",
                text: result.message,
                toast: true
            });
            fetchAllServices()
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Service Register",
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

            <DialogContent className={classes.dialogcontent}>{dialogState == 'data' ? serviceForm() : pictureForm()}</DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
        </Dialog>
    }
    const fetchAllServices = async () => {
        var response = await getData('services/fetch_services')
        if (response.status) {
            setListServices(response.data)
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Service Register",
                text: response.message,
                toast: true
            });
        }
    }
    useEffect(function () {
        fetchAllServices()
    }, [])

    function displayAll() {
        return (
            <MaterialTable
                title="List Of Services"
                columns={[
                    { title: 'ID', field: 'serviceid' },
                    { title: 'Type', field: 'servicetype' },
                    { title: 'Name', field: 'servicename' },
                    { title: 'Status', field: 'servicestatus' },
                    { title: 'Icon', render: (rowData) => <div style={{ cursor: 'pointer' }} onClick={() => handleOpenDialog(rowData, 'image')}><img src={`${serverURL}/images/${rowData.icon}`} style={{ width: 40, height: 40, borderRadius: 7 }} /></div> },
                ]}
                data={listServices}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Services',
                        onClick: (event, rowData) => handleOpenDialog(rowData, 'data')
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Services',
                        onClick: (event, rowData) => deleteUsingIcon(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Services',
                        isFreeAction: true,
                        onClick: (event) => navigate("/dashboard/serviceinterface")
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