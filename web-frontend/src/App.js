import MainLayout from "./components/Layout/MainLayout";

import { createGlobalStyle, ThemeProvider } from 'styled-components';

import useTheme from './hooks/useTheme';

function App() {

  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainLayout />
    </ThemeProvider>

  );
}

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.globalBackground};
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    margin: 0;
    padding: 0;


  }
`;
export default App;


