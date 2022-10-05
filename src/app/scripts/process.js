const URL = 'https://serversprint1-production.up.railway.app';

export const getData= async(endpoint)=>{
    const {data}= await axios.get(`${URL}/${endpoint}`);
    return data;
}