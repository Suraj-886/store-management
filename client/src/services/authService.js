import httpClient from "./httpClient";

export const registerUser = async (userDetails) => {
    const response = await httpClient.post("/mgt/admin/register", userDetails);
    return response;
};

export const loginUser = async (userDetails) => {
    const response = await httpClient.post("/mgt/admin/login", userDetails);
    return response;
}
export const forgetUser = async (userDetails) => {
    const response = await httpClient.post("/mgt/admin/forget", userDetails);
    return response;
}
export const authUser = async (authToken) => { 
    const response = await httpClient.get("/mgt/admin/", {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return response;
}
