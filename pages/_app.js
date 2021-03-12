import React from "react";
import App from "next/app";
import { wrapper } from "../redux/store";
import { chacheTexts, fetchAPITexts } from "../redux/language/language-actions";
import cacheData from "memory-cache";
import "../styles/globals.scss";

class WrappedApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    const texts = cacheData.get("texts");
    if (!texts) {
      await ctx.store.dispatch(fetchAPITexts());
      const state = await ctx.store.getState();
      cacheData.put("texts", state.server.texts);
    } else {
      await ctx.store.dispatch(chacheTexts(texts));
    }
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        // Some custom thing for all pages
        appProp: ctx.pathname,
      },
    };
  };

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(WrappedApp);
