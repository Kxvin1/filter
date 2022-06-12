import React from "react";
import { useSelector } from "react-redux";
import Splash from "../SplashPage";
import UserHome from "../authenticated";

export default function Main() {
  const user = useSelector((state) => state?.session?.user);

  let decideView;

  if (user) {
    decideView = <UserHome />;
  } else {
    decideView = <Splash />;
  }

  return <div>{decideView}</div>;
}
