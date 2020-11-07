import api, { sendFile } from ".";

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
export const deleteItem = (id) => api().request({ url: `/item/${id}`, method: "DELETE" });
export const deleteItemAll = ({type, type_id}) => api().request({ url: `/item/all`, method: "DELETE", params: { type, type_id } });
export const exportItem = ({type, type_id}) => {
    return api().request({ 
        url: "/export", 
        method: "GET",
        params: { type, type_id }
    });
}

export const importItem = (values) => api().request({ url: '/import',  method: 'POST', data: values });
