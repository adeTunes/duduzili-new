import Head from "next/head";
import { useRouter } from "next/router";
import React, { useLayoutEffect } from "react";

function Home() {
  const router = useRouter();
  useLayoutEffect(() => {
    router.push("/home");
  }, []);
  return (
    <>
      <Head>
        <title>Duduzili | Home</title>
      </Head>
    </>
  );
}

export default Home;
