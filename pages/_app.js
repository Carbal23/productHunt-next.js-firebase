import firebase, { FirebaseContext } from "@/firebase";
import { getuserAuth } from "@/firebase/firebase";
import App from "next/app";


const myApp = (props) => {
  const { Component, pageProps } = props;
  const user = getuserAuth();

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        user,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default myApp;
