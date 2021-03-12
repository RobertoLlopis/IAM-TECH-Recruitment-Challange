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
function Header() {
  const router = useRouter();
  const header = router.pathname !== ROUTES.ABOUT ? true : false;
  return (
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
  );
}

export default Header;
