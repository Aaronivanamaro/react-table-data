import { ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

interface Props {
    children: JSX.Element[];
    theme: {
        palette: {
            mode: string
        }
    }
}

const Layout = ({ children, theme } : Props) => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
                { children }
            </Container>
        </ThemeProvider>
    )
}

export default Layout;