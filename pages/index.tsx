import { useRouter } from "next/router";
import React, { useLayoutEffect } from "react";

function index() {
  const router = useRouter();
  useLayoutEffect(() => {
    router.push("/home");
  }, []);
  return <></>;
}

export default index;
