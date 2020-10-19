import api from ".";

export const fetchFuncionario = ({ perPage, page, searchTerm }) => {
    return api().request({ 
        url: "/funcionario", 
        method: "GET",
        params: { perPage, page, searchTerm }
    });
}

export const fetchFuncionarioById = (id) => api().request({ url: `/funcionario/${id}`, method: "GET" });
export const createFuncionario = (values) => api().request({ url: '/funcionario', method: 'POST', data: values })
export const updateFuncionario = (id, values) => api().request({ url: `/funcionario/${id}`, method: 'PUT', data: values })
export const fetchPessoa = () => api().request({ url: 'funcionario/listpessoa', method: "GET" })