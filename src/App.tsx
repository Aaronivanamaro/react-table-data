import { useMemo, useState } from "react";
import { createTheme } from '@mui/material/styles';
import Header from "./containers/Header";
import Layout from "./containers/Layout";
import TableComponent from "./components/TableComponent";
import ToggleBtnComponent from './components/ToggleBtnComponent';

function App() {

  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
      () => ({
          toggleColorMode: () => {
              setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
          }
      }),
      [],
  );

  const theme = useMemo(
      () =>
          createTheme({
              palette: {
                  mode
              },
          }),
      [mode],
  );

  return (
    <Layout theme={theme}>
      <Header>
        <ToggleBtnComponent onClick={colorMode.toggleColorMode} themeMode={theme.palette.mode}/>
      </Header>
      <TableComponent />
    </Layout>
  );
}

export default App;