import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField, FormHelperText } from "@mui/material"
import { postData } from "../../backendservices/FetchNodeServices"
import MaterialTable from "@material-table/core";
import { useStyles } from "./DisplayProductColorCss";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { getData, serverURL } from "../../backendservices/FetchNodeServices";

export default function DisplayAllColours() {

  const classes = useStyles()
  const [listColours, setListColours] = useState([])
  const navigate = useNavigate()
  const [productColorId, setProductColorId] = useState('')
  const [productColor, setProductColor] = useState('')
  const [productColorName, setProductColorName] = useState('')
  const [productId, setProductId] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [brandId, setBrandId] = useState('')
  const [error, setError] = useState({})
  const [dialogState, setDialogState] = useState('')
  const [open, setOpen] = useState(false)

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

  const handleDelete = async () => {
    {
      var body = { 'productcolorid': productColorId }
      var result = await postData('productColors/delete_productColors', body)
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Colour Register",
          text: result.message,
          toast: true
        });
        fetchAllColours()
      }
    }
  }

  const handleDelete2 = async (id) => {
    {
      var body = { productcolorid: id }
      var result = await postData('productColors/delete_productColors', body)
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Colour Register",
          text: result.message,
          toast: true
        });
        fetchAllColours()
      }
    }
  }

  const deleteUsingIcon = (rowData) => {
    setProductColorId(rowData.productColorId)
    Swal.fire({
      title: "Are you sure to delete selected Colours",
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete2(rowData.productcolorid)
      }
    })
  }

  const fetchAllColours = async () => {
    var response = await getData('productColors/fetch_productColors')
    if (response.status) {
      setListColours(response.data)
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Colour Register",
        text: response.message,
        toast: true
      });
    }
  }

  useEffect(function () {
    fetchAllColours()
  }, [])

  const openDialog = () => {
    return <Dialog open={open}>
      <DialogContent className={classes.dialogcontent}>{dialogState === 'data' ? colourForm() : null}</DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleErrorMessage = (label, errorMessage) => {
    setError((prev) => ({ ...prev, [label]: errorMessage }))
  }

  const handleClick = async () => {
    var err = false
    if (serviceId.length == 0) {
      err = true
      handleErrorMessage('serviceId', 'Please Input Service Id...')
    }
    if (brandId.length == 0) {
      err = true
      handleErrorMessage('brandId', 'Please Input Brand ID...')
    }
    if (productId.length == 0) {
      err = true
      handleErrorMessage('productId', 'Please Input Product ID...')
    }
    if (productColor.length == 0) {
      err = true
      handleErrorMessage('productColor', 'Please Input Colour Code...')
    }
    if (productColorName.length == 0) {
      err = true
      handleErrorMessage('productColorName', 'Please Input Colour Name...')
    }
    if (err == false) {
      var body = { 'productcolorid': productColorId, 'serviceid': serviceId, 'brandid': brandId, 'productid': productId, 'productcolor': productColor, 'productcolorname': productColorName }
      var result = await postData('productColors/update_productColors', body)
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Colour Register",
          text: result.message,
          toast: true
        });
        fetchAllColours()
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Colour Register",
          text: result.message,
          toast: true
        });
      }
    }
  }

  const colourForm = () => {
    return (
      <div className={classes.box2}>
        <div className={classes.title}>
          <div>
            <img src="/logo.png" className={classes.logo_style} />
          </div>
          <div className={classes.title_style}>
            Edit Colours
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
              <TextField label="Product Color Code" variant="outlined" fullWidth value={productColor} onChange={(e) => setProductColor(e.target.value)} />
            </Grid2>
            <Grid2 size={6}>
              <TextField label="Product Color Name" variant="outlined" fullWidth value={productColorName} onChange={(e) => setProductColorName(e.target.value)} />
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
  const handleOpenDialog = (rowData, state) => {
    fetchAllProducts(rowData.brandid)
    fetchAllBrands(rowData.serviceid)
    setDialogState(state)
    setServiceId(rowData.serviceid)
    setProductId(rowData.productid)
    setBrandId(rowData.brandid)
    setProductColorId(rowData.productcolorid)
    setProductColor(rowData.productcolor)
    setProductColorName(rowData.productcolorname)
    setOpen(true)
  }

  function displayAll() {
    return (
      <MaterialTable
        title="List Of Colours"
        columns={[
          { title: 'ID', field: 'productcolorid' },
          { title: 'Service', render: (rowData) => <div>{rowData.servicetype} {rowData.servicename}</div> },
          { title: 'Brand', field: 'brandname' },
          { title: 'Product', field: 'productname' },
          { title: 'Color Code', render: rowData => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 20, border: "3px solid #0a3d62" }}><div style={{ width: 30, height: 30, borderRadius: 15, background: `${rowData.productcolor}` }}></div></div> },
          { title: 'Colour', field: 'productcolorname' }
        ]}
        data={listColours.sort((a, b) => a.productcolorid - b.productcolorid)}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Colours',
            onClick: (event, rowData) => handleOpenDialog(rowData, 'data')
          },
          {
            icon: 'delete',
            tooltip: 'Delete Colours',
            onClick: (event, rowData) => deleteUsingIcon(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Colours',
            isFreeAction: true,
            onClick: (event) => navigate("/dashboard/productcolorinterface")
          }
        ]}
      />
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        {displayAll()}
      </div>
      {openDialog()}
    </div>
  )
}