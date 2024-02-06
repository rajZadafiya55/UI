import { GET_TABLE_DATA } from "../Types/type";

const initialstate = {
    allTableData: [],
}

export const tableReducer = (state = initialstate, action) => {
    switch (action.type) {

        case GET_TABLE_DATA: {
            return { ...state, allTableData: action.payload };
        }
      
        default: return state
    }

}