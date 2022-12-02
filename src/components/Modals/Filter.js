/* eslint-disable @next/next/no-img-element */
import { Box, Button, Typography, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getUserDashAction, modalVisible, tempData } from "../../redux/actions";
import dayjs from "dayjs";
// import Slider from "@mui/material/Slider";
import { Slider } from "material-ui-slider";

const sortData = [
  {
    id: 1,
    basis: "Popularity",
    unCheckimg: "/static/images/Check.png",
    checkimg: "/static/images/pinkCheck.png",
    value: "POPULARITY",
  },
  {
    id: 2,
    basis: "Rating",
    unCheckimg: "/static/images/Check.png",
    checkimg: "/static/images/pinkCheck.png",
    value: "RATING",
  },
  {
    id: 3,
    basis: "Price low to high",
    unCheckimg: "/static/images/Check.png",
    checkimg: "/static/images/pinkCheck.png",
    value: "LOWTOHIGH",
  },
  {
    id: 4,
    basis: "Price high to low",
    unCheckimg: "/static/images/Check.png",
    checkimg: "/static/images/pinkCheck.png",
    value: "HIGHTOLOW",
  },
];

const catData = [
  {
    id: 1,
    basis: "Yoga",
    imageCat: "/static/images/yogaCat.png",
  },
  {
    id: 2,
    basis: "Dance",
    imageCat: "/static/images/danceCat.png",
  },
  {
    id: 3,
    basis: "WorkOut",
    imageCat: "/static/images/workoutCat.png",
  },
  {
    id: 4,
    basis: "Pilates",
    imageCat: "/static/images/pilatesCat.png",
  },
];

const timeData = [
  {
    id: 1,
    startTime: "12:00am",
    endTime: "03:00am",
    start: "00:00",
    end: "03:00",
  },
  {
    id: 2,
    startTime: "03:00am",
    endTime: "06:00am",
    start: "03:00",
    end: "06:00",
  },
  {
    id: 3,
    startTime: "06:00am",
    endTime: "09:00am",
    start: "06:00",
    end: "09:00",
  },
  {
    id: 4,
    startTime: "09:00am",
    endTime: "12:00pm",
    start: "09:00",
    end: "12:00",
  },
  {
    id: 5,
    startTime: "12:00pm",
    endTime: "03:00pm",
    start: "12:00",
    end: "15:00",
  },
  {
    id: 6,
    startTime: "03:00pm",
    endTime: "06:00pm",
    start: "15:00",
    end: "18:00",
  },
  {
    id: 7,
    startTime: "06:00pm",
    endTime: "09:00pm",
    start: "18:00",
    end: "21:00",
  },
  {
    id: 8,
    startTime: "09:00pm",
    endTime: "12:00am",
    start: "21:00",
    end: "24:00",
  },
];

const priceData = [
  {
    id: 1,
    time: "50",
  },
  {
    id: 2,
    time: "75",
  },
  {
    id: 3,
    time: "100",
  },
  {
    id: 4,
    time: "150",
  },
  {
    id: 5,
    time: "250",
  },
  {
    id: 6,
    time: "500",
  },
];

export const Filter = () => {
  const dispatch = useDispatch();
  const [sortFilter, setsortFilter] = useState("");
  const [priceFilter, setpriceFilter] = useState("");
  const [location, setlocation] = useState("");
  const [categoryFilter, setcategoryFilter] = useState([]);
  const [timeFilter, settimeFilter] = useState([]);

  const { userDashboardData } = useSelector((state) => state.homeReducer);
  const temporaryData = useSelector((state) => state.commonReducer.tempData);
  const isAuthorised = useSelector((state) => state.commonReducer.isAuthorised);

  useEffect(() => {
    if (temporaryData?.filters) {
      setcategoryFilter(temporaryData?.filters?.categoryFilter);
      setsortFilter(temporaryData?.filters?.sortFilter);
      setpriceFilter(temporaryData?.filters?.priceFilter);
      settimeFilter(temporaryData?.filters?.timeFilter);
    } else {
      setcategoryFilter([]);
    }
  }, [temporaryData]);

  const handleSort = (item) => {
    if (sortFilter == item?.value) {
      setsortFilter("");
    } else {
      setsortFilter(item?.value);
    }
  };

  const handleCategory = (item) => {
    if (categoryFilter?.includes(item?._id)) {
      setcategoryFilter((categoryFilter) =>
        categoryFilter?.filter((s) => s !== item?._id)
      );
    } else {
      setcategoryFilter((categoryFilter) => [...categoryFilter, item?._id]);
    }
  };

  const handletimeline = (item) => {
    if (timeFilter == item) {
      settimeFilter("");
    } else {
      settimeFilter(item);
    }
  };

  const onApplyClick = () => {
    if (categoryFilter?.length || sortFilter || priceFilter || timeFilter) {
      let arr = [];
      const body = {
        arr: categoryFilter ? JSON.stringify(categoryFilter) : arr,
        sortFilter: sortFilter || null,
        priceFilter: priceFilter || null,
        startTime: timeFilter?.start || null,
        endTime: timeFilter?.end || null,
        schoolName: temporaryData?.globalSearch?.schoolName || null,
        className: temporaryData?.globalSearch?.className || null,
        longitude: temporaryData?.globalSearch?.longitude || null,
        latitude: temporaryData?.globalSearch?.latitude || null,
      };

      let params = {
        page: 1,
        limit: 20,
        guestMode: isAuthorised ? false : true,
      };
      dispatch(tempData.updateTempData({ filterTempData: body }));
      dispatch(getUserDashAction.request(body, params));
      let filter = {
        categoryFilter,
        sortFilter,
        priceFilter,
        timeFilter,
        schoolName: null,
        className: null,
        longitude: null,
        latitude: null,
      };
      dispatch(tempData.updateTempData({ filters: filter }));
    } else {
      dispatch(modalVisible.modalClose());
      let params = {
        page: 1,
        limit: 20,
        guestMode: isAuthorised ? false : true,
      };
      let arr = [];
      const body = {
        arr: arr && JSON.stringify(arr),
        sortFilter: null,
        priceFilter: null,
        startTime: null,
        endTime: null,
        schoolName: temporaryData?.globalSearch?.schoolName || null,
        className: temporaryData?.globalSearch?.className || null,
        longitude: temporaryData?.globalSearch?.longitude || null,
        latitude: temporaryData?.globalSearch?.latitude || null,
      };

      dispatch(getUserDashAction.request(body, params));
    }
  };

  const onClearClick = () => {
    setcategoryFilter([]);
    setsortFilter("");
    setpriceFilter("");
    settimeFilter([]);
    dispatch(tempData.updateTempData({ filters: null }));
    dispatch(modalVisible.modalClose());
    let params = {
      page: 1,
      limit: 20,
      guestMode: isAuthorised ? false : true,
    };
    let arr = [];
    const body = {
      arr: arr && JSON.stringify(arr),
      sortFilter: null,
      priceFilter: null,
      startTime: null,
      endTime: null,
      schoolName: temporaryData?.globalSearch?.schoolName || null,
      className: temporaryData?.globalSearch?.className || null,
      longitude: temporaryData?.globalSearch?.longitude || null,
      latitude: temporaryData?.globalSearch?.latitude || null,
    };
    dispatch(getUserDashAction.request(body, params));
    dispatch(tempData.updateTempData({ filterTempData: null }));
  };

  return (
    <Box className="filter_cont">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4>Filters</h4>
        <Typography
          onClick={onClearClick}
          className="fz-14 color-primary"
          sx={{ cursor: "pointer" }}
        >
          Clear
        </Typography>
      </Box>
      {/* <Box className="location_view">
        <Box className="locText_view">
          <Typography className="fz-18">Location</Typography>
          <Typography
            onClick={() => setlocation("")}
            className="fz-14 color-primary"
            sx={{ cursor: "pointer" }}
          >
            Change
          </Typography>
        </Box>
        <Box className="loc_address">
          <LocationOnOutlinedIcon />
          <Box className="input-group-location">
            <TextField
              placeholder="Search Location"
              type="text"
              fullWidth
              margin="none"
              name="address"
              onChange={(e) => setlocation(e.target.value)}
              value={location || ""}
              variant="standard"
            />
          </Box>
        </Box>
      </Box> */}
      <Typography className="fz-18 mb-10">Sort By</Typography>
      <Box className="sort_view">
        {sortData.map((item, index) => {
          return (
            <Box
              key={index}
              onClick={() => handleSort(item)}
              className="sort_text"
            >
              <Typography>{item.basis}</Typography>
              <Image
                width={"20%"}
                height={"20%"}
                src={
                  sortFilter == item?.value ? item.checkimg : item.unCheckimg
                }
                alt=" "
              />
            </Box>
          );
        })}
      </Box>
      <Typography className="fz-18 mb-10">Categories</Typography>
      <Box className="cate_view">
        {userDashboardData?.allCategories?.map((item, index) => {
          return (
            <Box
              key={index}
              onClick={() => handleCategory(item)}
              className="cate_text"
              style={{
                backgroundColor: categoryFilter?.includes(item?._id)
                  ? "#ff637d"
                  : "#FFFFFF",
              }}
            >
              {" "}
              <img src={item?.image} alt=" " />
              <Typography>{item?.name}</Typography>
            </Box>
          );
        })}
      </Box>
      <Typography className="fz-18 mb-10">TimeLine</Typography>
      <Box className="timeline_view">
        {timeData.map((item, index) => {
          return (
            <Box
              key={index}
              onClick={() => handletimeline(item)}
              className="timeline_text"
              style={{
                backgroundColor: timeFilter == item ? "#ff637d" : "#FFFFFF",
                color: timeFilter == item ? "#fff" : "#292D32",
              }}
            >
              {item.startTime + "-" + item.endTime}
            </Box>
          );
        })}
      </Box>

      <Typography className="fz-18 mb-10">Price</Typography>
      <Box className="timeline_view" sx={{ mb: 6 }}>
        <Slider
          value={priceFilter}
          max={500}
          min={0}
          defaultValue={0}
          color={"#ff637d"}
          onChange={(val) => {
            setpriceFilter(val);
          }}
        ></Slider>
        <Typography>{priceFilter || "0"}</Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button onClick={onApplyClick} className="apply_btn">
          Apply
        </Button>
      </Box>
    </Box>
  );
};
