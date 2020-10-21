import api from ".";

export const updateRepresentante = (values) => api().request({ url: '/representante/update', method: 'POST', data: values })