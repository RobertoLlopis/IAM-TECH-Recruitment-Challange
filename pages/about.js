import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import React from "react";
import { connect } from "react-redux";

import Layout from "../components/Layout";
import MainContent from "../components/mainContent";
function About({ texts, lang }) {
  console.log(lang);
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

export default connect(mapStateToProps)(About);
