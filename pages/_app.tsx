import Layout from "@/components/Layout";
import { setUser } from "@/redux/authSlice";
import { persistor, store } from "@/redux/store";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


function MyApp({ Component, pageProps }: AppProps) {

  useEffect(()=>{

    const storeUser = localStorage.getItem('user');
    if(storeUser){
      const user = JSON.parse(storeUser);
      store.dispatch(setUser(user));
    }

  },[])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

      <Layout>
        <Component {...pageProps} />
      </Layout>
        
      </PersistGate>
    </Provider>

  );
}
export default MyApp;
