import axios from "axios";
const serverURL = 'https://salebuddy-backend.onrender.com'
const postData = async (url, body) => {
    try {
        var response = await axios.post(`${serverURL}/${url}`, body)
        var result = response.data
        return (result)
    }
    catch (e) {
        return (null)
    }
}
const getData = async (url) => {
    try {
        var response = await axios.get(`${serverURL}/${url}`)
        var result = response.data
        return (result)
    }
    catch (e) {
        return (null)
    }
}
const generateOtp = () => {
    var otp = parseInt((Math.random() * 8999) + 1000)
    return (otp)
}

export { serverURL, postData, getData, generateOtp }