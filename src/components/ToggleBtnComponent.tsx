import { SyntheticEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface Props {
    onClick: (e: SyntheticEvent) => void;
    themeMode: string;
}

const ToggleBtnComponent = ({ onClick, themeMode} : Props) => {

    return (
        <IconButton sx={{ ml: 1 }} onClick={onClick} color="inherit">
            {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    )
}

export default ToggleBtnComponent;