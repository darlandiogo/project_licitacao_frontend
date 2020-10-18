import api from ".";

export const fetchPessoa = ({ perPage, page, searchTerm }) => {
    return api().request({ 
        url: "/pessoafisica", 
        method: "GET",
        params: { perPage, page, searchTerm }
    });
}

export const fetchPessoaById = (id) => api().request({ url: `/pessoafisica/${id}`, method: "GET" });
export const createPessoa = (values) => api().request({ url: '/pessoafisica', method: 'POST', data: values })
export const updatePessoa = (id, values) => api().request({ url: `/pessoafisica/${id}`, method: 'PUT', data: values })