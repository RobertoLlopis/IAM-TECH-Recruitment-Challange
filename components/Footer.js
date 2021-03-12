import { changeLanguage } from "../redux/language/language-actions";
import { connect } from "react-redux";
import styled from "styled-components";
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
function Footer({ lang, texts, change }) {
  const handleChange = (e) => {
    e.preventDefault();
    const newLanguage = e.target.value;
    if (
      !localStorage.getItem("userLang") ||
      localStorage.getItem("userLang") !== newLanguage
    )
      localStorage.setItem("userLang", newLanguage);
    change(newLanguage);
  };
  const selectText = texts.filter((t) => t.tag.includes("select"))[0].valueLang;
  console.log(texts);
  return (
    <StyledFooter>
      <div>I AM Tech Assessment - 2021</div>
      <select defaultValue={lang} onChange={handleChange}>
        <option value="en">{selectText.en}</option>
        <option value="es">{selectText.es}</option>
      </select>
    </StyledFooter>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    lang: state.client.currentLanguage,
    texts: state.server.texts.filter((t) => t.tag.includes("generic")),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    change: (newLang) => dispatch(changeLanguage(newLang)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
