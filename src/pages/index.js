/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { Box } from "@material-ui/core";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { GOOGLE_API_KEY } from "../constants/urls";
import styles from "../styles/Home.module.css";
import "../../node_modules/react-calendar/dist/Calendar.css";

import LandingPage from "./home";

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Yogi</title>
        <meta name="description" content="Yogi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        id="googlemaps"
        type="text/javascript"
        strategy="beforeInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
        onLoad={() => console.log("loading......")}
      />

      <LandingPage />
    </Box>
  );
}
