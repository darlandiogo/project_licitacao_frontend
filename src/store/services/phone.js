import api from ".";

export const updatePhone = (values) => api().request({ url: '/phone/update', method: 'POST', data: values })