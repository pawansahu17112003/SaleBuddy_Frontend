import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getData, serverURL } from "../../backendservices/FetchNodeServices";
import { useStyles } from "./DisplayAllMorePictureCss";
import 'react-quill-new/dist/quill.snow.css';

export default function DisplayAllMorePictures() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [listMorePicture, setListMorePicture] = useState([])

    const fetchAllMorePictures = async () => {
        var response = await getData('morepictures/fetch_morepictures')
        if (response.status) {
            setListMorePicture(response.data)
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Product Picture Register",
                text: response.message,
                toast: true
            });
        }
    }
    useEffect(function () {
        fetchAllMorePictures()
    }, [])

    function displayAll() {
        return (
            <MaterialTable
                title="List Of Product Pictures"
                columns={[
                    { title: 'ID', field: 'pictureid' },
                    { title: 'Service', render: (rowData) => <div>{rowData.servicetype} {rowData.servicename}</div> },
                    { title: 'Brand ', field: 'brandname' },
                    { title: 'Product ', field: 'productname' },
                    { title: 'IMEI', field: 'imei' },
                    { title: 'Variant', render: (rowData) => <div>{rowData.productram} {rowData.productstorage}</div> },
                    {
                        title: 'Product Color', width: "20%", render: (rowData) => <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: 20, height: 20, background: `${rowData.productcolor}`, borderRadius: '50%', border: '1px solid black', marginRight: 10, }} />
                            <span >{rowData.productcolorname}</span>
                        </div>
                    },
                    {
                        title: 'Images', render: (rowData) => {
                            return (
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {rowData.picture.split(',').map(item => item.trim()).map((item) => (
                                        <img src={`${serverURL}/images/${item}`} style={{ width: 40 }} />
                                    ))}
                                </div>
                            );
                        }
                    }
                ]}
                data={listMorePicture}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Add More Product Pictures',
                        isFreeAction: true,
                        onClick: (event) => navigate("/dashboard/morepictureinterface")
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