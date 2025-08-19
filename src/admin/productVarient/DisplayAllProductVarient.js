import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField, FormHelperText } from "@mui/material"
import { postData } from "../../backendservices/FetchNodeServices"
import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { getData, serverURL } from "../../backendservices/FetchNodeServices";
import { useStyles } from "./DisplayProductVarientCss";

export default function DisplayAllVarients() {

  const classes = useStyles()
  const [listProductVarients, setListProductVarients] = useState([])
  const navigate = useNavigate()
  const [productVarientId, setProductVarientId] = useState('')
  const [productRam, setProductRam] = useState('')
  const [productStorage, setProductStorage] = useState('')
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
      var body = { 'productvarientid': productVarientId }
      var result = await postData('productVarients/delete_productVarients', body)
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Product Varient Register",
          text: result.message,
          toast: true
        });
        fetchAllProductVarients()
      }
    }
  }

  const handleDelete2 = async (id) => {
    {
      var body = { productvarientid: id }
      var result = await postData('productVarients/delete_productVarients', body)
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Product Varient Register",
          text: result.message,
          toast: true
        });
        fetchAllProductVarients()
      }
    }
  }

  const deleteUsingIcon = (rowData) => {
    setProductVarientId(rowData.productVarientId)
    Swal.fire({
      title: "Are you sure to delete selected Product Varient",
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete2(rowData.productvarientid)
      }
    })
  }

  const fetchAllProductVarients = async () => {
    var response = await getData('productVarients/fetch_productVarients')
    if (response.status) {
      setListProductVarients(response.data)
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Product Varients Register",
        text: response.message,
        toast: true
      });
    }
  }

  useEffect(function () {
    fetchAllProductVarients()
  }, [])

  const openDialog = () => {
    return <Dialog open={open}>
      <DialogContent className={classes.dialogcontent}>{dialogState === 'data' ? productVarientForm() : null}</DialogContent>
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
    if (productRam.length == 0) {
      err = true
      handleErrorMessage('productRam', 'Please Input Ram...')
    }
    if (productStorage.length == 0) {
      err = true
      handleErrorMessage('productStorage', 'Please Input Storage...')
    }
    if (err == false) {
      var body = { 'productvarientid': productVarientId, 'serviceid': serviceId, 'brandid': brandId, 'productid': productId, 'productram': productRam, 'productstorage': productStorage }
      var result = await postData('productVarients/update_productVarients', body)
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Product Varients Register",
          text: result.message,
          toast: true
        });
        fetchAllProductVarients()
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

  const productVarientForm = () => {
    return (
      <div className={classes.box2}>
        <div className={classes.title}>
          <div>
            <img src="/logo.png" className={classes.logo_style} />
          </div>
          <div className={classes.title_style}>
            Edit Product Variants
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
              <TextField label="Product Ram" variant="outlined" fullWidth value={productRam} onChange={(e) => setProductRam(e.target.value)} />
            </Grid2>
            <Grid2 size={6}>
              <TextField label="Product Storage" variant="outlined" fullWidth value={productStorage} onChange={(e) => setProductStorage(e.target.value)} />
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
    setProductVarientId(rowData.productvarientid)
    setProductRam(rowData.productram)
    setProductStorage(rowData.productstorage)
    setOpen(true)
  }

  function displayAll() {
    return (
      <MaterialTable
        title="List Of Product Variants"
        columns={[
          { title: 'ID', width: '2%', field: 'productvarientid' },
          { title: 'Service', render: (rowData) => <div>{rowData.servicetype} {rowData.servicename}</div> },
          { title: 'Brand', field: 'brandname' },
          { title: 'Product', field: 'productname' },
          { title: 'RAM', render: (rowData) => <div>{rowData.productram}</div> },
          { title: 'Storage', render: (rowData) => <div>{rowData.productstorage}</div> }
        ]}
        data={listProductVarients}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Product Varients',
            onClick: (event, rowData) => handleOpenDialog(rowData, 'data')
          },
          {
            icon: 'delete',
            tooltip: 'Delete Product Varients',
            onClick: (event, rowData) => deleteUsingIcon(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Product Varients',
            isFreeAction: true,
            onClick: (event) => navigate("/dashboard/productvarientinterface")
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