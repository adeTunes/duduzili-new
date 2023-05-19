import { useRouter } from "next/router";
import React, { useLayoutEffect } from "react";

function Home() {
  const router = useRouter();
  useLayoutEffect(() => {
    router.push("/home");
  }, []);
  return <></>;
}

export default Home;
