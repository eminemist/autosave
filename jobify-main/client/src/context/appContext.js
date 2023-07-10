import React, { useReducer, useContext  } from "react";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  // REGISTER_USER_BEGIN,
  // REGISTER_USER_SUCCESS,
  // REGISTER_USER_ERROR,
  // LOGIN_USER_BEGIN,
  // LOGIN_USER_SUCCESS,
  // LOGIN_USER_ERROR,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  // CREATE_JOB_BEGIN,
  // CREATE_JOB_SUCCESS,
  // CREATE_JOB_ERROR,
  GET_FILES_BEGIN,
  GET_FILES_SUCCESS,
  // SET_EDIT_JOB,
  // DELETE_JOB_BEGIN,
  // EDIT_JOB_BEGIN,
  // EDIT_JOB_SUCCESS,
  // EDIT_JOB_ERROR,
  // SHOW_STATS_BEGIN,
  // SHOW_STATS_SUCCESS,
  // CLEAR_FILTERS,
  CHANGE_PAGE,
} from "./action";
import axios from "axios";
import reducer from "./reducer";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  showSidebar: false,
  
  files: [],
  totalFiles: 0,
  numOfPages: 1,
  page: 1,
 

  search: "",
  searchStatus: "all",
  searchType: "all",
 
  

  isUserSet: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //axios global setup
  //axios.defaults.headers["Authorization"] = `Bearer ${state.token}`;
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  //request
  authFetch.interceptors.request.use(
    (config) => {
     config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
     // console.log("error.response");
      if (error.response.status === 401) {
        logoutUser();
        //console.log("AUTH ERROR");
      }
      Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  // const registerUser = async (currentUser) => {
  //   dispatch({ type: REGISTER_USER_BEGIN });
  //   console.log(initialState.isUserSet)
  //   try {
  //     const response = await axios.post("/api/v1/auth/register", currentUser);
  //     //console.log(response)
  //     const { user, token, location } = response.data;
  //     dispatch({
  //       type: REGISTER_USER_SUCCESS,
  //       payload: { user, token, location },
  //     });
  //     //local storage later
  //     addUserToLocalStorage({ user, token, location });
  //   } catch (error) {
  //     // console.log(error.response)
  //     dispatch({
  //       type: REGISTER_USER_ERROR,
  //       payload: { msg: error.response.data.msg },
  //     });
  //   }
  //   clearAlert();
  // };

  // const loginUser = async (currentUser) => {
  //   dispatch({ type: LOGIN_USER_BEGIN });
  //   console.log(initialState.isUserSet);
  //   try {
  //     const {data} = await axios.post("/api/v1/auth/login", currentUser);
  //     //console.log(response)
  //     const { user, token, location } = data;
  //     dispatch({
  //       type: LOGIN_USER_SUCCESS,
  //       payload: { user, token, location },
  //     });
  //     //local storage later
  //     addUserToLocalStorage({ user, token, location });
  //   } catch (error) {

  //     dispatch({
  //       type: LOGIN_USER_ERROR,
  //       payload: { msg: error.response.data.msg },
  //     });
  //   }
  //   clearAlert();
  // }

  const setupUser = async ({ currentUser, endpoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });

    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endpoint}`,
        currentUser
      );
      //console.log(response)
      const { user, token, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      //local storage later
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({
      type: TOGGLE_SIDEBAR,
    });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, location, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      //console.log(error.response);
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  

  const getFiles = async () => {
    // added page
    //const { userId } = state;

    let url = `/files/findAlldFiles`;
    // if (search) {
    //   url = url + `&search=${search}`;
    // }
    dispatch({ type: GET_FILES_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { files, totalFiles, numOfPages } = data;
      dispatch({
        type: GET_FILES_SUCCESS,
        payload: {
          files,
          totalFiles,
          numOfPages,
        },
      });
    } catch (error) {
       logoutUser()
    }
    clearAlert();
  };


  


  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };


  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        getFiles,
        // createJob,
        // getJobs,
        // setEditJob,
        // deleteJob,
        // editJob,
        // showStats,
        // clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

//export default AppProvider
export { AppProvider, initialState, useAppContext };
