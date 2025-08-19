import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getData, serverURL, postData } from "../../backendservices/FetchNodeServices";
import { useStyles } from "./DisplayAllAdsCss";

export default function DisplayAllAds() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [adsId, setAdsId] = useState('')
    const [listAds, setListAds] = useState([])

    const fetchAllAds = async () => {
        var response = await getData('ads/fetch_ads')
        if (response.status) {
            setListAds(response.data)
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Ads Register",
                text: response.message,
                toast: true
            });
        }
    }
    useEffect(function () {
        fetchAllAds()
    }, [])

    const handleDelete = async (id) => {
        {
            var body = { 'adid': id }
            var result = await postData('ads/delete_ads', body)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Ads Register",
                    text: result.message,
                    toast: true
                });
                fetchAllAds()
            }
        }
    }
    const deleteUsingIcon = (rowData) => {
        setAdsId(rowData.adid)
        Swal.fire({
            title: "Are you sure to delete selected Ads",
            showCancelButton: true,
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(rowData.adid)
            }
        })
    }

    function displayAll() {
        return (
            <MaterialTable
                title="List Of Ads Pictures"
                columns={[
                    { title: 'ID', field: 'adid' },
                    { title: 'Service', render: (rowData) => <div>{rowData.servicetype} {rowData.servicename}</div> },
                    { title: 'Brand ', field: 'brandname' },
                    { title: 'Product ', field: 'productname' },
                    { title: 'Image Number', field: 'imgno' },
                    {
                        title: 'Images',render: (rowData) => {
                            return (
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {rowData.images.split(',').map(item => item.trim()).map((item) => (
                                        <img src={`${serverURL}/images/${item}`} style={{ width: 40 }}/>
                                    ))}
                                </div>
                            );
                        }
                    }
                ]}
                data={listAds}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Add More Ads',
                        isFreeAction: true,
                        onClick: (event) => navigate("/dashboard/adsinterface")
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Ads',
                        onClick: (event,rowData) =>deleteUsingIcon(rowData) 
                    }
                ]}
            />
        )
    }
    return (<div className={classes.root}>
        <div className={classes.box}>
            {displayAll()}
        </div>
    </div>)
}