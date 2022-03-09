import Header from "./containers/Header";
import Main from "./containers/Main";
import TableComponent from "./components/TableComponent";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/material";

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Header />
        <Main>
          <TableComponent />
        </Main>
      </Container>
    </ThemeProvider>
  );
}

export default App;