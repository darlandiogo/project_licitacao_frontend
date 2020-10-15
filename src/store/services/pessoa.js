import api from ".";

export const fetchPessoa = ({ perPage, page, searchTerm }) => {
    return api().request({ 
        url: "/pessoafisica", 
        method: "GET",
        params: { perPage, page, searchTerm }
    });
}

export const fetchPessoaById = (id) => api().request({ url: `/pessoafisica/${id}`, method: "GET" });