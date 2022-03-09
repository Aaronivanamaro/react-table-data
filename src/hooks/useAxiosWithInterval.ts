import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import useInterval from "./useInterval";
import { API_NAMES } from "../data/tableData";
import { Data } from "../interfaces/interfaces";

const useAxiosWithInterval: Function = (delay: number) => {

    const [rows, setRows] = useState<Data[]>([]);
    const getData = useAxios(API_NAMES, setRows);
  
    useEffect(() => {
      getData();
    }, []);
  
    useInterval(() => {
      getData();
    }, delay);

    return rows;
};

export default useAxiosWithInterval;