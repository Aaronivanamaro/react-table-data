import { useEffect, useMemo, useState } from 'react';
import { createTheme } from '@mui/material/styles';

const useDarkMode = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => setIsDarkTheme(localStorage.getItem('theme') === 'dark' ? true : false), []);

    useEffect(() => localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light'), [isDarkTheme]);
    
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
              setIsDarkTheme((prevMode) => !prevMode);
            }
        }),
        [],
    );
    
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: isDarkTheme ? 'dark' : 'light'
                },
            }),
        [isDarkTheme],
    );    

    return { theme, colorMode };
}

export default useDarkMode;