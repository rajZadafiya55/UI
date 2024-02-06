import { GET_TABLE_DATA } from "../Types/type";
import axios from 'axios';

const getTables = (table) => ({
    type: GET_TABLE_DATA,
    payload: table
})

export const getTableData = () => {
    return (dispatch) => {
        axios.get('http://localhost:5000/api/table/getAll')
            .then((res) => {
                dispatch(getTables(res.data.data))
            }).catch((error) => {
                console.log(error)
            })
    }
}