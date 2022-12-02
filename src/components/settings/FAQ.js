import { Box, capitalize, CircularProgress, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import { useDispatch, useSelector } from "react-redux";
import { faqAction } from "../../redux/actions";

const FAQ = () => {
  const [selected, setSelected] = useState([]);

  const dispatch = useDispatch();
  const { faqResData, isLoading } = useSelector((state) => state.faqReducer);

  useEffect(() => {
    dispatch(faqAction.request());
  }, [dispatch]);

  const handleSelected = (id) => {
    if (selected.includes(id)) {
      setSelected((selected) => selected.filter((s) => s !== id));
    } else {
      setSelected((selected) => [...selected, id]);
    }
  };

  if (isLoading) {
    return (
      <Box className="perfect_center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="faq_cont text_card">
      {faqResData?.data ? (
        faqResData?.data?.map((item, i) => {
          return (
            <Box
              className="main_box"
              onClick={() => handleSelected(item._id)}
              key={i}
            >
              <Box className="ques_box">
                <Box className="ques_txt">
                  <Typography>{item.question}</Typography>
                </Box>
                <Box className="arrow_box">
                  {selected.includes(item._id) ? (
                    <KeyboardArrowDownSharpIcon />
                  ) : (
                    <KeyboardArrowRightSharpIcon />
                  )}
                </Box>
              </Box>
              {selected.includes(item._id) ? (
                <Box className="faq_ans">
                  {item.answer != "" && <Typography>{item.answer}</Typography>}
                </Box>
              ) : null}
            </Box>
          );
        })
      ) : (
        <Typography sx={{ textAlign: "center" }}>data not found</Typography>
      )}
    </Box>
  );
};

export default FAQ;
