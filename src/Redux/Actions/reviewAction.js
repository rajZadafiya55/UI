import axios from 'axios';
import { GET_REVIEW } from '../Types/type';
import { APIHttp } from "../../helper/API";

const getReviews = (reviews) => ({
    type: GET_REVIEW,
    payload: reviews
})

export const getReviewData = () => {
    return (dispatch) => {
        axios.get(`${APIHttp}/review/getAll`)
            .then((res) => {
                dispatch(getReviews(res.data.data))
                console.log(res.data.data)
            }).catch((error) => {
                console.log(error)
            })
    }
}