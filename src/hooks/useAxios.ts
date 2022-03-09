import axios from 'axios';
import { Data } from '../interfaces/interfaces';

const useAxios: Function = (API_NAMES: string[], setData: Function) => {

    const getData = () => {
        setData([]);
        API_NAMES.forEach(async (API_NAME: string, index: number) => {
          const api_name = API_NAME.toLowerCase();
          try {
            const status = await axios(`https://api.factoryfour.com/${api_name}/health/status`);
            const statusObj = await { id: index + 1, name: API_NAME, ...status.data };
            setData((prevState: Data[]) => [...prevState, statusObj]);
          }
          catch (error: any ) {
            let message = await error.response ? `Response Error: ${error.response.status}` : error.request ? 'Request Error' : error.message || 'Error';
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
    }
    return getData;
};

export default useAxios;