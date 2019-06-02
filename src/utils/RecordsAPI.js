import axios from 'axios';

export const api = process.env.REACT_APP_RECORDS_API_URL || "http://localhost:5000"

export const getAll=() =>
   axios.get(`https://5cedfc701c2baf00142cb8f8.mockapi.io/api/v1/records`)
   
export const create=(body)=>
   axios.post(`https://5cedfc701c2baf00142cb8f8.mockapi.io/api/v1/records`,body)
 
 
export const update=(id,body)=>
   axios.put(`https://5cedfc701c2baf00142cb8f8.mockapi.io/api/v1/records/${id}`,body)
   
export const remove=(id) =>
 	axios.delete(`https://5cedfc701c2baf00142cb8f8.mockapi.io/api/v1/records/${id}`,id)
