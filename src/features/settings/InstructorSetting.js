import React, { useState, useEffect } from "react";
import { Box, Typography, Tab, Tabs, Avatar } from "@mui/material";
import { useRouter } from "next/router";
import Header from "../../layout/Header";
import { Footer } from "../../layout/Footer";
import PropTypes from "prop-types";
import Membership from "../../components/settings/Membership";
import ChangePassword from "../../components/settings/ChangePassword";
import ReferFriend from "../../components/settings/ReferFriend";
import ContactUs from "../../components/settings/ContactUs";
import AboutApp from "../../components/settings/AboutApp";
import TermsConditions from "../../components/settings/TermsConditions";
import FAQ from "../../components/settings/FAQ";
import InstructorHeader from "../../layout/InstructorHeader";
import { TabContext, TabPanel } from "@mui/lab";
import { InstructorFooter } from "../../layout/InstructorFooter";
import { useSelector } from "react-redux";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const InstructorSetting = () => {
  const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const data = useSelector((state) => state.commonReducer.tempData);
  const isAuthorised = useSelector((state) => state.commonReducer.isAuthorised);

  useEffect(() => {
    if (data?.link) {
      setValue(data?.link);
    } else {
      setValue(1);
    }
  }, [data]);

  return (
    <Box className="setting_page">
      <InstructorHeader />
      <Box className="cstm_container">
        <Box className="setting_wrap">
          <Box className="sub_hdg setting_hdg">
            <h3 align="center">Settings</h3>
          </Box>
          <TabContext value={value}>
            <Box className="tabs_wpr">
              <Tabs
                orientation="vertical"
                // variant="scrollable"
                className="tabButtons"
                value={value}
                onChange={handleChange}
                // aria-label="basic tabs example"
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                <Tab
                  icon={
                    <Avatar
                      alt="test avatar"
                      src="/static/images/changePass.png"
                    />
                  }
                  iconPosition="start"
                  label="Change Password"
                  value={1}
                />
                <Tab
                  className="b-0"
                  icon={
                    <Avatar alt="test avatar" src="/static/images/refer.png" />
                  }
                  iconPosition="start"
                  label="Refer A Friend"
                  value={2}
                />
                <Tab
                  className="contact_tab"
                  icon={
                    <Avatar
                      alt="test avatar"
                      src="/static/images/contact.png"
                    />
                  }
                  iconPosition="start"
                  label="Contact Us"
                  value={3}
                />
                <Tab className="small_tab" label="About App" value={4} />
                <Tab
                  className="small_tab"
                  label="Terms & Conditions"
                  value={5}
                />
                <Tab className="small_tab" label="FAQ" value={6} />
              </Tabs>
              <Box className="tabContent_wpr">
                <TabPanel value={1} index={1}>
                  <ChangePassword />
                </TabPanel>
                <TabPanel value={2} index={2}>
                  <ReferFriend />
                </TabPanel>
                <TabPanel value={3} index={3}>
                  <ContactUs />
                </TabPanel>
                <TabPanel value={4} index={4}>
                  <AboutApp />
                </TabPanel>
                <TabPanel value={5} index={5}>
                  <TermsConditions />
                </TabPanel>
                <TabPanel value={6} index={6}>
                  <FAQ />
                </TabPanel>
              </Box>
            </Box>
          </TabContext>
        </Box>
      </Box>
      <InstructorFooter />
    </Box>
  );
};

export default InstructorSetting;
