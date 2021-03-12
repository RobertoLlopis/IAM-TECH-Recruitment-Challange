import { connect } from "react-redux";
import { changeLanguage } from "../redux/language/language-actions";
import styled from "styled-components";
import Layout from "../components/Layout";
import MainContent from "../components/mainContent";
import { useRouter } from "next/router";

function Home({ lang, texts, change }) {
  const router = useRouter();
  const handleClick = (_e) => {
    change("es");
  };

  return (
    <Layout>
      {lang}
      <MainContent texts={texts} lang={lang} />
      <button onClick={handleClick}>Click me</button>
    </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
