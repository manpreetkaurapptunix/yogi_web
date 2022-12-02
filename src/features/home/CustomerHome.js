import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Categories } from "../../components/home/Categories";
import { ClassCard } from "../../components/home/ClassCard";
import { Footer } from "../../layout/Footer";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Header from "../../layout/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  modalVisible,
  classAction,
  singleClassAction,
  getCategoryAction,
  getClassByCatAction,
  getUserDashAction,
  tempData,
} from "../../redux/actions";
import { Box } from "@material-ui/core";
import Pagination from "../../components/Pagination";
import { useRouter } from "next/router";
import { Modules } from "../../constants/modules";
import Image from "next/image";
import { Loader } from "../../components/Loader";
import { ImageSlider } from "../../components/Common/ImageSlider";
const catg = [
  {
    image: "/static/images/yogaCat.png",
    name: "Yoga",
  },
  {
    image: "/static/images/danceCat.png",
    name: "danceCat",
  },
  {
    image: "/static/images/pilatesCat.png",
    name: "pilatesCat",
  },
  {
    image: "/static/images/workoutCat.png",
    name: "workoutCat",
  },
  {
    image: "/static/images/yogaCat.png",
    name: "Yoga",
  },
  {
    image: "/static/images/danceCat.png",
    name: "danceCat",
  },
  {
    image: "/static/images/pilatesCat.png",
    name: "Pilates",
  },
  {
    image: "/static/images/workoutCat.png",
    name: "Workout",
  },
  {
    image: "/static/images/yogaCat.png",
    name: "Yoga",
  },
  {
    image: "/static/images/danceCat.png",
    name: "danceCat",
  },
  {
    image: "/static/images/pilatesCat.png",
    name: "Pilates",
  },
  {
    image: "/static/images/workoutCat.png",
    name: "Workout",
  },
];
function CustomerHome() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [catClick, setcatClick] = useState(0);
  const { classData } = useSelector((state) => state.classReducer);
  const isAuthorised = useSelector((state) => state.commonReducer.isAuthorised);
  const isLoading = useSelector((state) => state.classReducer.isLoading);

  const { categoryData } = useSelector((state) => state.classReducer);
  const filterData = useSelector((state) => state.commonReducer.tempData);

  const { userDashboardData } = useSelector((state) => state.homeReducer);

  useEffect(() => {
    classDataApi();
  }, [dispatch, isAuthorised]);

  const classDataApi = () => {
    let params = {
      page: 1,
      limit: 20,
      guestMode: isAuthorised ? false : true,
    };
    let arr = [];
    const body = {
      arr: filterData?.filterTempData?.arr || JSON.stringify(arr),
      sortFilter:
        filterData?.globalSearch?.sortFilter ||
        filterData?.filterTempData?.sortFilter ||
        null,
      priceFilter:
        filterData?.globalSearch?.priceFilter ||
        filterData?.filterTempData?.priceFilter ||
        null,
      startTime:
        filterData?.globalSearch?.startTime ||
        filterData?.filterTempData?.startTime ||
        null,
      endTime:
        filterData?.globalSearch?.endTime ||
        filterData?.filterTempData?.endTime ||
        null,

      schoolName:
        filterData?.globalSearch?.schoolName ||
        filterData?.filterTempData?.schoolName ||
        null,
      className:
        filterData?.globalSearch?.className ||
        filterData?.filterTempData?.className ||
        null,
      longitude:
        filterData?.globalSearch?.longitude ||
        filterData?.filterTempData?.longitude ||
        null,
      latitude:
        filterData?.globalSearch?.latitude ||
        filterData?.filterTempData?.latitude ||
        null,
    };

    dispatch(getUserDashAction.request(body, params));
    dispatch(
      tempData.updateTempData({
        // filters: null,
        link: null,
        selectedDiscount: null,
        // globalSearch: null,
      })
    );
  };

  const classDetailFunc = async (id, dist, rate, wish) => {
    let params = {
      id,
    };

    dispatch(singleClassAction.request(params));
    if (!isLoading) {
      // router.push(`home/${id}`);
      router.push({
        pathname: `/${id}`,
        query: userDashboardData?.allNearByClasses?.filter(
          (item) => item.id == id
        )[0],
      });
      const distance = {
        dist,
        rate,
        wish,
      };
      dispatch(tempData.updateTempData({ distance: distance }));
    }
  };

  const onCatClick = (item) => {
    console.log(item?._id);
    let arr = [];
    arr.push(item?._id);

    const body = {
      arr: JSON.stringify(arr),
      sortFilter: null,
      priceFilter: null,
      startTime: null,
      endTime: null,
      seats: null,
      startDate: null,
      endDate: null,
      schoolName: null,
      className: null,
      longitude: null,
      latitude: null,
    };

    let params = {
      page: 1,
      limit: 20,
      guestMode: isAuthorised ? false : true,
    };
    dispatch(getUserDashAction.request(body, params));
    dispatch(
      tempData.updateTempData({
        filters: null,
        link: null,
        selectedDiscount: null,
        globalSearch: null,
        filterTempData: null,
      })
    );
  };

  const allData = () => {
    let params = {
      page: 1,
      limit: 20,
      guestMode: isAuthorised ? false : true,
    };
    dispatch(getUserDashAction.request({}, params));
    dispatch(
      tempData.updateTempData({
        filters: null,
        link: null,
        selectedDiscount: null,
        globalSearch: null,
        filterTempData: null,
      })
    );
  };

  return (
    <Box sx={{ margin: 0 }}>
      <Header home />
      <Box className="dum_hd cstm_container mb-100">
        <Box style={{ marginTop: "30px" }} className="dum_hd">
          <h4>Categories</h4>
        </Box>
        <Box className="categ_compo">
          <Box className="categCards_wpr">
            {userDashboardData?.allCategories?.length && (
              <Box onClick={() => allData()} className="catg_card">
                <figure>
                  <Image
                    width={"100%"}
                    height={"100%"}
                    src={"/static/images/yogaCat.png"}
                    alt=" "
                  />
                </figure>
                <Typography className="cat_txt">All</Typography>
              </Box>
            )}
            {userDashboardData?.allCategories?.map((data, i) => (
              <Box
                onClick={() => onCatClick(data)}
                className="catg_card"
                key={i}
              >
                <Categories data={data} />
              </Box>
            ))}
          </Box>
          <Button
            onClick={() => dispatch(modalVisible.modalOpen(Modules.FILTER))}
            className="btn_sc_cat btn_design"
          >
            <FilterAltIcon />
            <Typography>Filters</Typography>
          </Button>
        </Box>
        <div>
          <h4 style={{ marginBottom: "20px" }}>Featured Classes</h4>
        </div>

        <Box className="card_compo cstm_grid">
          {userDashboardData && userDashboardData?.data?.length ? (
            userDashboardData?.data?.map((item, index) => {
              return (
                <Box key={index} className="cstm_grid_item">
                  {isAuthorised ? (
                    <Box
                      onClick={() =>
                        classDetailFunc(
                          item?.classes?._id,
                          item?.dist,
                          item?.avgRating,
                          Boolean(item?.wishlists?.length)
                        )
                      }
                    >
                      <ClassCard data={item} wish />
                    </Box>
                  ) : (
                    <Box
                      key={index}
                      onClick={() =>
                        dispatch(modalVisible.modalOpen(Modules.LOGIN))
                      }
                    >
                      <ClassCard data={item} wish />
                    </Box>
                  )}
                </Box>
              );
            })
          ) : (
            <Typography className="empty_text">No classes available</Typography>
          )}
        </Box>
        <Box className="pagination_wpr">{/* <Pagination /> */}</Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default CustomerHome;
