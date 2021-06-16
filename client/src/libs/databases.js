const axios = require('axios');

const fetchUsers =async (filter = '') => {
    let dbgridData = []
    let url = '/api/users'
    if (filter !==''){url= '/api/users/name/'}
    let result = await axios.get(`${url}${filter}`)
        .then(async (response) => {
            return await response.data
        })
        .catch(err=>{throw err})
         for (let i in result) {
             dbgridData.push({
                 id: result[i]._id,
                 name: result[i].name,
                 surname: result[i].surname,
                 description: result[i].description,
                 avatar: result[i].avatar
             });
         }
    return dbgridData
}

const editUser = async (user) =>{
    let body = {
        name: user.name,
        surname:user.surname,
        avatar: user.avatar,
        description: user.description
    }
    axios.put(`/api/users/${user.id}`, body)
        .then(async result => {
            console.log("record saved", result)
            return await result;
        })
        .catch(err => {
            throw err
        })

}

const insertUser = async (user)=> {
    let body = {
        name: user.name,
        surname:user.surname,
        avatar: user.avatar,
        description: user.description
    }
    axios.post(`/api/users/`, body)
        .then(async result => {
            console.log("insert record", result)
            return await result;
        })
        .catch(err => {
            throw err
        })
}

const deleteUser = async (id) =>{
    axios.delete(`/api/users/${id}`)
        .then(async result => {
            console.log("record deleted", result)
            return await result;
        })
        .catch(err=>{throw err})
}


export {
    fetchUsers,
    editUser,
    insertUser,
    deleteUser
}