import api from ".";

export const updateAddress = (values) => api().request({ url: '/address/update', method: 'POST', data: values })