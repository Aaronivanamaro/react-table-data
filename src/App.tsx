import useDarkMode from "./hooks/useDarkMode";
import Header from "./containers/Header";
import Layout from "./containers/Layout";
import TableComponent from "./components/TableComponent";
import ToggleBtnComponent from './components/ToggleBtnComponent';

function App() {

  const { theme, colorMode } = useDarkMode();

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