const URL = 'https://serversprint1-production.up.railway.app';

export const getData = async (endpoint) => {
    const { data } = await axios.get(`${URL}/${endpoint}`);
    return data;
}
export const postData = async (endpoint, obj = {}) => {
    await axios.post(`${URL}/${endpoint}`, obj);
}
export const upData = async (endpoint, obj = {}) => {
    try {
        const status = ({
            method: 'PUT',
            url: `${URL}/${endpoint}`,
            timeout: 3000,
            data: obj,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        return {status};

    } catch (error) {
        console.log(error)
    }

    
}

