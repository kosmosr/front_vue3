import axios from 'axios';

const request = (options) => {
    const instance = axios.create({
        baseURL: 'api',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    options = {...options, instance}
    return new Promise((resolve, reject) => {
        instance(options)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

const getUserList = (page = 1, per_page = 10) => {
    return request({
        method: 'GET',
        url: '/get_user_list',
        params: {
            page,
            per_page
        }
    })
}

const addUserRequest = (user) => {
    return request({
        method: 'POST',
        url: '/add_user',
        data: user
    })
}

const editUserRequest = (user) => {
    return request({
        method: 'PUT',
        url: '/edit_user',
        data: user
    })
}

export {getUserList, addUserRequest, editUserRequest}