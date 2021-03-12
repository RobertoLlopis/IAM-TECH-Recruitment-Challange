import { useEffect } from "react";
import { connect } from "react-redux";
import { changeLanguage } from "../redux/language/language-actions";
import Layout from "../components/Layout";
import MainContent from "../components/MainContent";
import { chooseUserLang } from "../utils/utils";

function Home({ lang, texts, change }) {
  useEffect(() => {
    chooseUserLang(lang, change);
  }, []);

  return (
    <Layout>
      <MainContent texts={texts} lang={lang} />
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
