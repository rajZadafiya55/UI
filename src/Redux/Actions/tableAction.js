import { GET_TABLE_DATA } from "../Types/type";
import axios from 'axios';
import { APIHttp } from "../../helper/API";

const getTables = (table) => ({
    type: GET_TABLE_DATA,
    payload: table
})

export const getTableData = () => {
    return (dispatch) => {
        axios.get(`${APIHttp}/table/getAll`)
            .then((res) => {
                dispatch(getTables(res.data.data))
            }).catch((error) => {
                console.log(error)
            })
    }
}