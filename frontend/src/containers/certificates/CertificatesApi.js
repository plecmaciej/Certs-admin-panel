import axios from "axios";

export const loadCertificates = (params, callback) => async (dispatch, getState) => {
    const config = {
        url: '/certificates',
        params,
        headers: { authorization: getState().appState.token }
    };
    const result = await axios.request(config);
    callback(result.data);
};

export const loadCertificate = (id, callback) => async (dispatch, getState) => {
    const config = {
        url: `/certificates/${id}`,
        method: 'GET',
        headers: { authorization: getState().appState.token }
    };
    const result = await axios.request(config);
    callback(result.data);
};

export const saveCertificate = (resource, callback) => async (dispatch, getState) => {
    const config = {
        url: resource.id ? `/certificates/${resource.id}` : '/certificates',
        method: resource.id ? 'PUT' : 'POST',
        data: {
            certificate: resource
        },
        headers: { authorization: getState().appState.token }
    };
    const result = await axios.request(config);
    callback(result.data);
};

export const deleteCertificate = (id, callback) => async (dispatch, getState) => {
    const config = {
        url: `/certificates/${id}`,
        method: 'DELETE',
        headers: { authorization: getState().appState.token }
    };
    await axios.request(config);
    callback();
};


