import axios from "axios";

const fetchApi = axios.create({
   baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1/',
});


export const getUsers = async (page = 1) => {
   const response = await fetchApi.get(`users?page=${page}&count=6`);
   return response.data;
};

export const getToken = async () => {
   const response = await fetchApi.get(`token`);
   return response.data;
};

export const getPositions = async () => {
   const response = await fetchApi.get(`positions`);
   return response.data;
};

export const postUser = async (data, token) => {
   const response = await fetchApi.post(`users`, data, {
      headers: {
         token,
         "Content-Type": 'multipart/form-data',
      },
   });
   return response.data;
};