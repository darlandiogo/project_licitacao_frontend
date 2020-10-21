import api from ".";

export const fetchEmpresa = ({ perPage, page, searchTerm }) => {
    return api().request({ 
        url: "/pessoajuridica", 
        method: "GET",
        params: { perPage, page, searchTerm }
    });
}

export const fetchSecretaria = ({ perPage, page, searchTerm }) => {
    return api().request({ 
        url: "/pessoajuridica/listsecretaria", 
        method: "GET",
        params: { perPage, page, searchTerm }
    });
}

export const fetchEmpresaById = (id) => api().request({ url: `/pessoajuridica/${id}`, method: "GET" });
export const createEmpresa = (values) => api().request({ url: '/pessoajuridica', method: 'POST', data: values })
export const updateEmpresa = (id, values) => api().request({ url: `/pessoajuridica/${id}`, method: 'PUT', data: values })