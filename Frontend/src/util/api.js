import axios from "axios"

const baseUrl = "http://localhost:8080/api/"
const token = localStorage.getItem("token")

export const request = (method = "", url = "", data = {}) => {
    // var token = "dafsdjoeijflksjeDFASFDf"
    return axios({
        url: baseUrl + url,
        method: method,
        data: data,
        headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${token}`

        },
    }).then(res => {
        return res
    }).catch(err => {
        if (err.code == "ERR_NETWORK") {
            alert("Can not connect to server. Plase contact administration!")
            return false
        }
        return false
    })
}

