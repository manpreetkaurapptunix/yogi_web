import { Box } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function handleClick(e) {
  e.preventDefault();
  console.info("hello");
}

export default function Breadcrumb() {
  const [crumbs, setcrumbs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const location = window.location.pathname;
      if (location) {
        let arr = location.split("/");
        if (arr?.length) {
          setcrumbs(arr.slice(1));
        }
      }
    }
  }, [router]);

  console.log(crumbs);

  return (
    <div role="presentation" className="usr_stry" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {crumbs.map((eachPath, index) => (
          <Box
            id={index}
            key={index}
            underline="hover"
            color="inherit"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              if (index == 0) {
                router.replace("/home");
              } else if (index !== crumbs.length - 1) {
                router.replace(`/${crumbs.slice(0, index + 1).join("/")}`);
              }
            }}
          >
            {eachPath}
          </Box>
        ))}
      </Breadcrumbs>
    </div>
  );
}
