import DataTable from "./components/DataTable";
import Header from "./containers/Header";
import Main from "./containers/Main";
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
          <DataTable />
        </Main>
      </Container>
    </ThemeProvider>
  );
}

export default App;