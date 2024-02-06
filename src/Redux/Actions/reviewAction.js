import axios from 'axios';
import { GET_REVIEW } from '../Types/type';

const getReviews = (reviews) => ({
    type: GET_REVIEW,
    payload: reviews
})

export const getReviewData = () => {
    return (dispatch) => {
        axios.get('http://localhost:5000/api/review/getAll')
            .then((res) => {
                dispatch(getReviews(res.data.data))
                console.log(res.data.data)
            }).catch((error) => {
                console.log(error)
            })
    }
}