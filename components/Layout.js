import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{router.pathname} | I AM Tech assessment</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
}
export default Layout;
