import { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import MainContent from "../components/mainContent";
import { changeLanguage } from "../redux/language/language-actions";
import { chooseUserLang } from "../utils/utils";

function About({ texts, lang, change }) {
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
  const texts = state.server.texts.filter((t) => t.tag.includes("about"));

  return {
    lang: state.client.currentLanguage,
    texts: texts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    change: (newLang) => dispatch(changeLanguage(newLang)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
