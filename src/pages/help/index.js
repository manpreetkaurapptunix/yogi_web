import { Box } from "@mui/material";
import React from "react";
import { Guide } from "../../components/help/guide";
import { GuideAccordian } from "../../components/help/guideAccordian";
import { HelpBanner } from "../../components/help/helpBanner";
import { HelpEnquery } from "../../components/help/helpEnquery";
import { DownloadApp } from "../../components/welcome/DownloadApp";
import WelcomeHeader from "../../components/welcome/WelcomeHeader";
import { InstructorFooter } from "../../layout/InstructorFooter";

const Help = () => {
  return (
    <Box className="help_page w-100">
      <WelcomeHeader />
      <HelpBanner />
      <Guide />
      <GuideAccordian />
      <HelpEnquery />
      <DownloadApp />
      <InstructorFooter />
    </Box>
  );
};

export default Help;
