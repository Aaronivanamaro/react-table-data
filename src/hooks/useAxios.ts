import axios from 'axios';

export const useAxios: Function = (arrOfData: string[], setData: Function) => {

    const getRowsData = () => {
        setData([]);
        arrOfData.forEach(async (API_NAME: string) => {
            try {
                const status = await axios(`https://api.factoryfour.com/${API_NAME}/health/status`);
                const statusObj = await { name: API_NAME, ...status.data };
                setData((prevState: any) => [...prevState, statusObj]);
            }
            catch (error: any) {
                let message = await error.response ? `Response Error: ${error.response.status}` : error.request ? 'Request Error' : error.message || 'Error'; 
                const statusObj = {
                    name: API_NAME,
                    success: false,
                    message,
                    hostname: Math.random(),
                    time: '-'
                }
                setData((prevState: any) => [...prevState, statusObj]);
            }
            // finally {
            //     setIsPending(false);
            // }
        });    
    }
    return getRowsData();
};