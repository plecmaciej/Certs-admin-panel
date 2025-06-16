import axios from "axios";

export var loadUsers = (params, callback) => async (dispatch, getState) => {
    var config = {
        url: '/users',
        params,
        headers: {authorization: getState().appState.token}
    };
    var result = await axios.request(config);
    callback(result.data);
};

export var loadUser = (id, callback) => async (dispatch, getState) => {
    var config = {
        url: `/users/${id}`,
        data: {
            user: {id: id}
        },
        headers: {authorization: getState().appState.token}
    };
    var result = await axios.request(config);
    callback(result.data);
};

export var saveUser = (resource, callback) => async (dispatch, getState) => {
    var config = {
        url: resource.id ? `/users/${resource.id}` : '/users',
        method: resource.id ? 'PUT' : 'POST',
        data: {
            user: resource
        },
        headers: {authorization: getState().appState.token}
    };
    var result = await axios.request(config);
    callback(result.data);
};

export var deleteUser = (id, callback) => async (dispatch, getState) => {
    var config = {
        url: `/users/${id}`,
        method: 'DEvarE',
        headers: {authorization: getState().appState.token}
    };
    await axios.request(config);
    callback();
};


export const loadUserEmail = (id) => async (dispatch, getState) => {
    const config = {
        url: `/users/${id}`,
        method: 'GET',
        headers: { authorization: getState().appState.token }
    };
    const result = await axios.request(config);
    return result.data.email;
};