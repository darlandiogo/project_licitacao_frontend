import api from ".";

export const fetchPessoa = values => api().request({ url: "/pessoafisica", method: "GET", data: values });

