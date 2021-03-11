import React from "react";
import App from "next/app";
import { wrapper } from "../redux/store-w-wrapper";
import { fetchAPITexts } from "../redux/language/language-actions";

class WrappedApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    await ctx.store.dispatch(fetchAPITexts());
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
