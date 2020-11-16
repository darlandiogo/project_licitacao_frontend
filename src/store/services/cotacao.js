import api from ".";

export const fetchCotacao = ({ perPage, page, searchTerm }) => {
    return api().request({ 
        url: "/cotacao", 
        method: "GET",
        params: { perPage, page, searchTerm }
    });
}

export const fetchCotacaoById = (id) => api().request({ url: `/cotacao/${id}`, method: "GET" });
export const createCotacao = (values) => api().request({ url: '/cotacao', method: 'POST', data: values })
export const updateCotacao = (id, values) => api().request({ url: `/cotacao/${id}`, method: 'PUT', data: values })
export const fetchEmpresa = () => api().request({ url: 'cotacao/listempresa', method: "GET" })

export const fetchCotacaoEmpresa  = (id) => api().request({ url: `/cotacao/empresa/${id}`, method: "GET" });
export const createCotacaoEmpresa = (values) => api().request({ url: '/cotacao/empresa', method: 'POST', data: values })
export const updateCotacaoEmpresa = (id, values) => api().request({ url: `/cotacao/empresa/${id}`, method: 'PUT', data: values })
