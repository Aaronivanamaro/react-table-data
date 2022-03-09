import axios from 'axios';
import { Data } from '../interfaces/interfaces';

const useAxios: Function = (API_NAMES: string[], setData: Function, setIsLoading: Function) => {

    const getData = () => {
        setData([]);
        setIsLoading(true);
        API_NAMES.forEach(async (API_NAME: string, index: number) => {
            const api_name = API_NAME.toLowerCase();
            try {
                const status = await axios(`https://api.factoryfour.com/${api_name}/health/status`);
                const statusObj = await { id: index + 1, name: API_NAME, ...status.data };
                setData((prevState: Data[]) => [...prevState, statusObj]);
            }
            catch (error: any) {
                const responseError =  error.response ? `Response Error: ${error.response.status} - ${error.message}` : null;
                const requestError = error.request ? `Request Error: ${error.request.status} - ${error.message}` : null;
                const defaultError = `Error: ${error.name} - ${error.message}`;

                const message = await error.response ? responseError : error.request ? requestError : defaultError;

                const statusObj = {
                    id: index + 1,
                    name: API_NAME,
                    success: false,
                    message,
                    hostname: 'Not Available',
                    time: 'Not Available'
                };
                setData((prevState: Data[]) => [...prevState, statusObj]);
            }
        });
        setTimeout(() => setIsLoading(false), 500);
    }
    return getData;
};

export default useAxios;