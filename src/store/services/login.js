import api from ".";

export const login = values => api().request({ url: "/login", method: "POST", data: values });



export const setAuthStorage = async auth => localStorage.setItem("@auth", JSON.stringify(auth));

export const getAuthStorage = async () => JSON.parse(localStorage.getItem("@auth"));

export const clearStorageAuth = async () => localStorage.removeItem("@auth");
