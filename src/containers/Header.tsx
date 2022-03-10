import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header: FC = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6"  sx={{ flexGrow: 1 }}>
            Status Page
          </Typography>
          { children }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;