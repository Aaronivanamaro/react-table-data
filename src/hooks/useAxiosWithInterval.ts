import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import useInterval from "./useInterval";
import { API_NAMES } from "../data/tableData";
import { Data } from "../interfaces/interfaces";

const useAxiosWithInterval: Function = (delay: number) => {

    const [rows, setRows] = useState<Data[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const getData = useAxios(API_NAMES, setRows, setIsLoading);

    useEffect(() => {
        getData();
    }, [API_NAMES]);

    useInterval(() => {
        getData();
    }, delay);

    return { isLoading, rows };
};

export default useAxiosWithInterval;