import { GET_REVIEW } from "../Types/type";

const initialstate = {
    allReviewData: [],
    oneReview: "",
}

export const reviewReducer = (state = initialstate, action) => {
    switch (action.type) {

        case GET_REVIEW: {
            return { ...state, allReviewData: action.payload };
        }
        default: return state
    }

}