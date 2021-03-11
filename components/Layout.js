import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ROUTES } from "../utils/routes";
import styled from "styled-components";
const StyledHeader = styled.header`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  h1 {
    font-size: 1.2rem;
    display: inline;
  }
  nav,
  ul {
    width: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
  }
`;
function Layout({ children }) {
  const router = useRouter();
  const header = router.pathname !== ROUTES.ABOUT ? true : false;
  return (
    <div>
      <Head>
        <title>I AM Tech assessment</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {header && (
        <StyledHeader>
          <h1>I AM Tech Assessment</h1>
          <nav>
            <ul>
              <li>
                <Link href={ROUTES.HOME}>Home</Link>
              </li>
              <li>
                <Link href={ROUTES.ABOUT}>About</Link>
              </li>
            </ul>
          </nav>
        </StyledHeader>
      )}
      {children}
    </div>
  );
}

export default Layout;
