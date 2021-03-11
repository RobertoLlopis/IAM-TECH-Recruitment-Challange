import { connect } from "react-redux";
import { changeLanguage } from "../redux/language/language-actions";
import styled from "styled-components";

const P = styled.p`
  color: red;
`;

function Home({ lang, change }) {
  const handleClick = (_e) => {
    change("es");
  };
  return (
    <>
      Hello, lang is: {lang}
      <button onClick={handleClick}>Click me</button>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    lang: state.page.currentLanguage,
  };
};

//Pass the actions functions to be accessible by the component
const mapDispatchToProps = (dispatch) => {
  return {
    change: (newLang) => dispatch(changeLanguage(newLang)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
