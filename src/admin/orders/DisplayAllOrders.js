import { postData, getData, serverURL } from "../../backendservices/FetchNodeServices"
import MaterialTable from "@material-table/core";
import { useStyles } from "./DisplayAllOrdersCss";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function DisplayAllOrders() {
    const classes = useStyles()
    const [orderList, setOrderList] = useState([])
    const [orderDate, setOrderDate] = useState([])
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [clickDate, setClickDate] = useState('')

    const fetchAllOrders = async () => {
        const res = await getData('userinterface/userinterface_fetch_orders')
        setOrderList(res.data)
    }

    const fetchAllOrdersDate = async (range = false) => {
        if (range && start && end) {
            const res = await postData('userinterface/userinterface_fetch_orders_by_date', { startdate: start, enddate: end })
            setOrderDate(res.data)
            setClickDate('')
        } else if (clickDate) {
            const res = await postData('userinterface/userinterface_fetch_orders_by_date', { orderdate: clickDate })
            setOrderDate(res.data)
        }
    }

    useEffect(() => {
        fetchAllOrders()
    }, [])

    useEffect(() => {
        if (clickDate) fetchAllOrdersDate()
    }, [clickDate])

    const date = new Date()
    const today = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`

    const yesterdayDate = new Date()
    yesterdayDate.setDate(yesterdayDate.getDate() - 1)
    const yesterday = `${yesterdayDate.getFullYear()}/${yesterdayDate.getMonth() + 1}/${yesterdayDate.getDate()}`

    return (
        <div className={classes.root}>
            <div className={classes.buttonbox}>
                <Button onClick={() => { setClickDate(''); setStart(''); setEnd(''); setOrderDate([]); fetchAllOrders() }}
                    style={{ width: '15%', height: '100%', background: '#3498db', border: '1px solid #000000', color: '#ffffff', fontWeight: 550, textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                    All
                </Button>
                <Button onClick={() => { setClickDate(today); setStart(''); setEnd('') }}
                    style={{ width: '15%', height: '100%', background: '#3498db', border: '1px solid #000000', color: '#ffffff', fontWeight: 550, textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                    Today
                </Button>
                <Button onClick={() => { setClickDate(yesterday); setStart(''); setEnd('') }}
                    style={{ width: '15%', height: '100%', background: '#3498db', border: '1px solid #000000', color: '#ffffff', fontWeight: 550, textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                    Yesterday
                </Button>
                <div className={classes.datebox}>
                    <div style={{ height: '100%', color: '#000000', fontWeight: 650, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '120%' }}>From</div>
                    <input onChange={(e) => {
                        const d = new Date(e.target.value);
                        const format = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
                        setStart(format)
                    }} type="date" style={{ width: '35%', height: '95%', border: '1px solid #000000', borderRadius: 5, fontWeight: 650 }} />
                    <div style={{ height: '100%', color: '#000000', fontWeight: 650, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '120%' }}>To</div>
                    <input onChange={(e) => {
                        const d = new Date(e.target.value);
                        const format = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
                        setEnd(format)
                    }} type="date" style={{ width: '35%', height: '95%', border: '1px solid #000000', borderRadius: 5, fontWeight: 650 }} />
                    <div onClick={() => {
                        if (start && end) {
                            fetchAllOrdersDate(true)
                        }
                    }} style={{ width: '10%', height: '95%', color: '#000000', fontWeight: 650, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '120%', background: '#3498db', border: '1px solid #000000', borderRadius: 10, cursor: 'pointer', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                        <SearchIcon style={{ color: '#ffffff' }} />
                    </div>
                </div>
            </div>
            <div className={classes.box}>
                <MaterialTable
                    title="List Of Orders"
                    columns={[
                        { title: 'ID', field: 'orderdetailsid', cellStyle: { maxWidth: 10 }, headerStyle: { maxWidth: 10 } },
                        { title: 'Detail ID', field: 'productdetailsid', cellStyle: { maxWidth: 10 }, headerStyle: { maxWidth: 10 } },
                        { title: 'Date', field: 'orderdate', cellStyle: { maxWidth: 50 }, headerStyle: { maxWidth: 50 } },
                        { title: 'Amount', field: 'amount', cellStyle: { maxWidth: 50 }, headerStyle: { maxWidth: 50 } },
                        { title: 'Address', field: 'address', cellStyle: { minWidth: 300 }, headerStyle: { minWidth: 300 } },
                        { title: 'Quantity', field: 'qty', cellStyle: { maxWidth: 10 }, headerStyle: { maxWidth: 10 } },
                        { title: 'Status', field: 'deliverystatus', cellStyle: { maxWidth: 30 }, headerStyle: { maxWidth: 30 } },
                        { title: 'Payment', field: 'paymentstatus', cellStyle: { maxWidth: 30 }, headerStyle: { maxWidth: 30 } },
                        { title: 'Product', field: 'productname', cellStyle: { minWidth: 300 }, headerStyle: { minWidth: 300 } },
                    ]}
                    data={orderDate.length === 0 ? orderList : orderDate} />
            </div>
        </div>
    )
}
