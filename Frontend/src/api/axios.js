import axios from "axios"



export const api = axios.create({
      baseURL: 'https://explainoai-backend.onrender.com',
    withCredentials:true
})