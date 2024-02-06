import { ITEM_REQUECT, ADD_ITEM, GETBYID, UPDATE_ITEM } from "../Types/type";

const initialstate = {
    allItemsData: [],
    oneItem: "",
}

export const itemsReducer = (state = initialstate, action) => {
    switch (action.type) {

        case ITEM_REQUECT: {
            return { ...state, allItemsData: action.payload };
        }
        case ADD_ITEM:
            return { ...state }

        case GETBYID:
            return {
                ...state, oneItem: action.payload
            }
        case UPDATE_ITEM:
            return {
                ...state, oneItem: action.payload
            }
        default: return state
    }

}