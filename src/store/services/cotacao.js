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