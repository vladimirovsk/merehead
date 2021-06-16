import {
    USER_EDIT,
    USER_INSERT,
    USER_DELETE,
    USERS_FETCH,
    USER_SELECT
} from "./actionTypes";
import {fetchUsers, editUser, insertUser, deleteUser} from "../../libs/databases";

export const fetchAllUsers = async () => {
    return async (dispatch) =>{
      await fetchUsers()
          .then(async res => {
              let rows = await res;
              dispatch({
                      type: USERS_FETCH,
                      payload: rows,
                      modify: false
                  })
          }
          )
          .catch(err=>{throw err})

    }
}

export const editRecordUser = async (user) =>{
    return async (dispatch) =>{
        await editUser(user)
            .then(async res => {
                    let row = await res;
                    dispatch({
                    type: USER_EDIT,
                    payload: row,
                    modify: true})
                }
            )
            .catch(err=>{throw err})

    }
}

export const insertRecordUser = async (user) =>{
    return async (dispatch) =>{
        await insertUser(user)
            .then(async res => {
                    let row = await res;
                    dispatch({
                        type: USER_INSERT,
                        payload: row,
                        modify: true
                        })
                }
            )
            .catch(err=>{throw err})

    }
}

export const deleteRecordUser = async (id) =>{
    return async (dispatch) =>{
        await deleteUser(id)
            .then(async res => {
                    let row = await res;
                    dispatch({
                        type: USER_DELETE,
                        payload: row,
                        modify: true
                    })
                }
            )
            .catch(err=>{throw err})

    }
}

export const selectUser = (user) =>{
    return (dispatch) =>{
        dispatch({
            type: USER_SELECT,
            payload: user
        })
    }
}