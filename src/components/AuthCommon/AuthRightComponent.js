import { Box } from "@material-ui/core";
import React from "react";

const AuthRightComponent = (props) => {
  const { images } = props;
  return (
    <Box className="static_image" style={{ backgroundImage: `url(${images})` }}>
      <figure className="yoga_static">
        {/* <img src={images} alt="yoga" /> */}
      </figure>
    </Box>
  );
};

export default AuthRightComponent;
