import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ROUTES } from "../utils/routes";
import styled from "styled-components";
import { changeLanguage } from "../redux/language/language-actions";
import { connect } from "react-redux";
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
const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  h1 {
    font-size: 1.2rem;
    display: inline;
  }
`;
function Layout({ children, lang, change }) {
  const router = useRouter();
  const header = router.pathname !== ROUTES.ABOUT ? true : false;
  const handleChange = (e) => {
    e.preventDefault();
    const newLanguage = e.target.value;
    change(newLanguage);
  };
  console.log(lang);
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
      <StyledFooter>
        <div>I AM Tech Assessment - 2021</div>
        <select defaultValue={lang} onChange={handleChange}>
          <option value="en">English - en</option>
          <option value="es">Español - es</option>
        </select>
      </StyledFooter>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    lang: state.client.currentLanguage,
    texts: state.server.texts.filter((t) => t.tag.includes("home")),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    change: (newLang) => dispatch(changeLanguage(newLang)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
