import {USER_EDIT,
    USER_INSERT,
    USER_DELETE,
    USERS_FETCH,
    USER_SELECT} from "../action/actionTypes";

const initialState = {
    items: [],
    item:{},
    modify: false
}

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case USERS_FETCH:
            return {
                ...state,
                items: action.payload,
                modify: action.modify
            };
        case USER_EDIT:
            return {
                ...state,
                item: action.payload,
                modify: action.modify
            };
        case USER_INSERT:
            return {
                ...state,
                item: action.payload,
                modify: action.modify
            };
        case USER_DELETE:
            return {
                ...state,
                item: action.payload,
                modify: action.modify
            };

        case USER_SELECT:
            return {
                ...state,
                item: action.payload
            };
        default:
            return state
    }
}