import Link from "next/link";
import { useRouter } from "next/router";
import { ROUTES } from "../utils/routes";
import styled from "styled-components";
const StyledHeader = styled.header`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  height: 10vh;
  font-family: sans-serif;
  background-color: #3949a0;
  h1 {
    color: #ddedff;
    font-size: 1.2rem;
    display: inline;
    margin: 0;
  }
  nav,
  ul {
    width: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    height: 100%;
    margin: 0;
  }
  li {
    height: 100%;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    :hover {
      background-color: #8ca2f7;
      a {
        color: #3949a0;
      }
    }
  }
  a {
    text-decoration: none;
    color: #8ca2f7;
  }
`;
function Header() {
  const router = useRouter();
  const aboutHeader = router.pathname === ROUTES.ABOUT ? true : false;
  return (
    <StyledHeader>
      <h1>I AM {!aboutHeader ? "Tech Assessment" : "another header"}</h1>
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
  );
}

export default Header;
