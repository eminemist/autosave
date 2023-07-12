import React, { useReducer, useContext } from "react";
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
  CREATE_FILE_BEGIN,
  CREATE_FILE_SUCCESS,
  CREATE_FILE_ERROR,
  GET_FILES_BEGIN,
  GET_FILES_SUCCESS,
  GET_ALL_FILES_BEGIN,
  GET_ALL_FILES_SUCCESS,
  SET_EDIT_FILE,
  DELETE_FILE_BEGIN,
  EDIT_FILE_BEGIN,
  //EDIT_FILE_SUCCESS,
  EDIT_FILE_ERROR,
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
  file: {},
  totalFiles: [],
  numOfPages: 1,
  page: 1,
  title: "EDIT TITLE",
  content: "EDIT CONTENT",
  date: "",
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
      // Promise.reject(error);
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

  //done
  const getFile = async (file_id) => {
    let url = `/files/${file_id}`;

    dispatch({ type: GET_FILES_BEGIN });
    try {
      const file = await authFetch(url);
      dispatch({
        type: GET_FILES_SUCCESS,
        payload: file.data[0],
      });
    } catch (error) {
      // logoutUser()
    }
    clearAlert();
  };

  //done
  const getAllFiles = async (currentUser) => {
    let url = `/files`;

    dispatch({ type: GET_ALL_FILES_BEGIN });
    try {
      const totalFiles = await authFetch(url);
      dispatch({
        type: GET_ALL_FILES_SUCCESS,
        payload: [...totalFiles.data],
      });
    } catch (error) {
      //  logoutUser();
    }
    clearAlert();
  };

  const setEditFile = (currentFile) => {
    dispatch({ type: SET_EDIT_FILE, payload: { currentFile } });
  };

  //done
  const editFile = async (id, title, content) => {
    dispatch({ type: EDIT_FILE_BEGIN });
    try {
      await authFetch.put(`/files/${id}`, {
        title,
        content,
      });

      getFile(id);
      // dispatch({
      //   type: EDIT_FILE_SUCCESS,
      // });
      // dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_FILE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //done
  const deleteFile = async (currentFile) => {
    dispatch({ type: DELETE_FILE_BEGIN });
    try {
      await authFetch.delete(`/files/${currentFile}`);
      // console.log(getAllFiles())
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const createFile = async (title, content) => {
    try {
      if (state?.user && state?.user?._id) {
        const file = await authFetch.put(`/files`, {
          title: title,
          content: content,
          _userId: state?.user?._id,
        });
         dispatch({
            type:CREATE_FILE_SUCCESS,
            payload: file.data,
         });
         getFile(file?.data?._id)
      }
    } catch (error) {}
  };

  // useEffect(()=>{
  //   getFile("64ad6197be40ddc8eb7f60fb")
  // },[])

  // useEffect(()=>{
  //   getAllFiles("64abe0e8499b375101f56c05");
  // },[])

  // useEffect(()=>{
  //  deleteFile("64ad615ebe40ddc8eb7f60f7");
  // },[])

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
        getFile,
        getAllFiles,
        setEditFile,
        deleteFile,
        editFile,
        changePage,
        createFile,
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
