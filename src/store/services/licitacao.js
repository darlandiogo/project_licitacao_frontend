import api from ".";

export const fetchLicitacao = ({ perPage, page, searchTerm }) => {
    return api().request({ 
        url: "/licitacao", 
        method: "GET",
        params: { perPage, page, searchTerm }
    });
}

export const fetchLicitacaoById = (id) => api().request({ url: `/licitacao/${id}`, method: "GET" });
export const createLicitacao = (values) => api().request({ url: '/licitacao', method: 'POST', data: values })
export const updateLicitacao = (id, values) => api().request({ url: `/licitacao/${id}`, method: 'PUT', data: values })
export const Selectoptions  = () => api().request({url: '/licitacao/selectoptions', method: 'GET' });