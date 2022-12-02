import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { membershipAction, membershipUpdateAction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const silentFeatures = [
  {
    id: 1,
    text: "it is a long established fact .",
  },
  {
    id: 2,
    text: "it is a long established fact 2 .",
  },
  {
    id: 3,
    text: "it is a long established fact 3 .",
  },
  {
    id: 4,
    text: "it is a long established fact 4.",
  },
  {
    id: 5,
    text: "it is a long established fact 5.",
  },
];

const AddMembership = (props) => {
  const { getSingleData } = useSelector((state) => state.membershipReducer);
  const [saveData, setSaveData] = useState(false);
  const [chooseMembership, setchooseMembership] = useState("");
  const [price, setprice] = useState("");
  const [chooseNoClass, setchooseNoClass] = useState("");
  const [chooseTimePeriod, setchooseTimePeriod] = useState("");
  const [entry, setentry] = useState("");
  const [planDesc, setplanDesc] = useState("");
  const [features, setfeatures] = useState([]);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getSingleData) {
      setchooseMembership(getSingleData?.name || "");
      setprice(getSingleData?.price || "");
      setchooseTimePeriod(getSingleData?.duration || "");
      setchooseNoClass(getSingleData?.entryClass || "");
      setentry(getSingleData?.entry || "");
      setplanDesc(getSingleData?.notes || "");
      setSaveData(true);
    }
  }, [getSingleData]);

  console.log(getSingleData, "dadadada");

  const handleChange = (event) => {
    setchooseMembership(event.target.value);
  };

  const handleFeature = (item) => {
    if (features.includes(item)) {
      setfeatures((features) => features.filter((s) => s !== item));
    } else {
      setfeatures((features) => [...features, item]);
    }
  };

  const submit = () => {
    if (
      !chooseMembership.length ||
      !price ||
      !chooseTimePeriod ||
      !entry ||
      !planDesc ||
      !chooseNoClass
    ) {
      setError(true);
    } else {
      setprice(Number(price));
      setentry(Number(entry));
      setchooseTimePeriod(Number(chooseTimePeriod));
      const body = {
        name: chooseMembership,
        price: price,
        notes: planDesc,
        entryClass: chooseNoClass,
        entry: entry,
        duration: chooseTimePeriod,
      };
      {
        saveData
          ? dispatch(membershipUpdateAction.request(body, getSingleData._id))
          : dispatch(membershipAction.request(body));
      }
      setchooseMembership("");
      setplanDesc("");
      setprice("");
      setentry("");
      setchooseTimePeriod("");
      setchooseNoClass("");
      setSaveData(false);
      setError(false);
    }
  };

  return (
    <Box className="add_member">
      <Box>
        <FormControl fullWidth className="select_btn val_selct_bx">
          <InputLabel id="demo-simple-select-label">
            Choose Membership
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chooseMembership}
            label="Choose Membership"
            onChange={(e) => setchooseMembership(e.target.value)}
          >
            <MenuItem value={"Lite"}>Lite</MenuItem>
            <MenuItem value={"Basic"}>Basic</MenuItem>
            <MenuItem value={"Pro"}>Pro</MenuItem>
          </Select>
          {!chooseMembership && error ? (
            <label className="compul_s">This field is required</label>
          ) : (
            ""
          )}
        </FormControl>

        <Box className="input_field val_selct_bx">
          <TextField
            type="number"
            className="line_form"
            placeholder="Enter Price"
            fullWidth
            value={price}
            InputProps={{ inputProps: { max: 1 } }}
            onChange={(e) => {
              if (e.target.value?.length < 5) {
                e.target.value < 0 ? "" : setprice(e.target.value);
              }
            }}
            margin="none"
          />
          {!price && error ? (
            <label className="compul_s">This field is required</label>
          ) : (
            ""
          )}
        </Box>

        <Box className="input_field val_selct_bx">
          <TextField
            type="number"
            className="line_form"
            placeholder="Choose Number of Classes"
            fullWidth
            value={chooseNoClass}
            onChange={(e) => {
              if (e.target.value?.length < 4) {
                e.target.value < 0 ? "" : setchooseNoClass(e.target.value);
              }
            }}
            margin="none"
          />
          {!chooseNoClass && error ? (
            <label className="compul_s">This field is required</label>
          ) : (
            ""
          )}
        </Box>

        <FormControl fullWidth className="select_btn val_selct_bx">
          <InputLabel id="demo-simple-select-label">
            Choose Time Period
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chooseTimePeriod}
            label="Choose Time Period"
            onChange={(e) => setchooseTimePeriod(e.target.value)}
          >
            <MenuItem value={3}>3 months</MenuItem>
            <MenuItem value={6}>6 months</MenuItem>
            <MenuItem value={12}>1 Year</MenuItem>
          </Select>
          {!chooseTimePeriod && error ? (
            <label className="compul_s">This field is required</label>
          ) : (
            ""
          )}
        </FormControl>

        <Box className="input_field val_selct_bx">
          <TextField
            type="number"
            className="line_form"
            placeholder="Enter number of entry"
            fullWidth
            value={entry}
            onChange={(e) => {
              e.target.value < 0 ? "" : setentry(e.target.value);
            }}
            margin="none"
          />
          {!entry && error ? (
            <label className="compul_s">This field is required</label>
          ) : (
            ""
          )}
        </Box>

        <Box className="input_field val_selct_bx">
          <TextField
            type="text"
            className="line_form"
            placeholder="Plan Description"
            fullWidth
            margin="none"
            name="planDesc"
            onChange={(e) => setplanDesc(e.target.value)}
            value={planDesc}
            variant="standard"
            multiline
            maxRows={5}
          />
          {!planDesc && error ? (
            <label className="compul_s">This field is required</label>
          ) : (
            ""
          )}
        </Box>

        <Box className="features ">
          {/* <Box className="fetaure_head">
            <Typography className="ftrs">Select features</Typography>
          </Box>
          <Box className="body_feature">
            {silentFeatures.map((item, index) => {
              return (
                <Box
                  onClick={() => handleFeature(item)}
                  key={index}
                  className="feature_cost"
                >
                  {features.includes(item) ? (
                    <CheckBoxIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                  <Typography>{item.text}</Typography>
                </Box>
              );
            })}
          </Box> */}

          <Box sx={{ mt: 6 }}>
            <Button type="submit" className="apply_btn" onClick={submit}>
              {saveData ? "Save" : "Add"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddMembership;
