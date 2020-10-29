import api from ".";

export const fetchItem = ({ perPage, page, searchTerm, type, type_id }) => {
    return api().request({ 
        url: "/item", 
        method: "GET",
        params: { perPage, page, searchTerm , type, type_id}
    });
}

export const fetchItemById = (id) => api().request({ url: `/item/${id}`, method: "GET" });
export const createItem = (values) => api().request({ url: '/item', method: 'POST', data: values })
export const updateItem = (id, values) => api().request({ url: `/item/${id}`, method: 'PUT', data: values })