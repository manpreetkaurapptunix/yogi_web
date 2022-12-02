import { Provider } from "react-redux";
import { store } from "../redux/configureStore";
import "../styles/globals.css";
import "../assets/css/style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

import { useEffect } from "react";
import { firebaseCloudMessaging } from "../utils/firebase";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
        toast(
          <div style={{ height: "100%" }}>
            <div>{event?.data?.firebaseMessaging?.payload?.data?.tittle}</div>
            <div>{event?.data?.firebaseMessaging?.payload?.data?.message}</div>
          </div>
        );
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          console.log("token", token);
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </Provider>
  );
}

export default MyApp;
