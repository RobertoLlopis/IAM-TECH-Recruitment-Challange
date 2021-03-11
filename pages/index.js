import { connect } from "react-redux";
import { changeLanguage } from "../redux/language/language-actions";
import styled from "styled-components";
import Layout from "../components/Layout";

function Home({ lang, texts, change }) {
  const handleClick = (_e) => {
    change("es");
  };
  console.log(texts);
  let textH1;
  let textH2;
  let textP;
  texts.forEach((t) => {
    if (t.tag.includes("h1")) {
      textH1 = t.valueLang[lang];
      return;
    }
    if (t.tag.includes("h2")) {
      textH2 = t.valueLang[lang];
      return;
    }
    textP = t.valueLang[lang];
  });
  return (
    <Layout>
      {lang}
      <h1>{textH1}</h1>
      <h2>{textH2}</h2>
      <p>{textP}</p>

      <button onClick={handleClick}>Click me</button>
    </Layout>
  );
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
