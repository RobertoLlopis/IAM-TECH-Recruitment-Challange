import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
const StyledDiv = styled.div`
  height: 100vh;
`;
function Layout({ children }) {
  const router = useRouter();
  return (
    <StyledDiv>
      <Head>
        <title>{router.pathname} | I AM Tech assessment</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {children}
      <Footer />
    </StyledDiv>
  );
}
export default Layout;
