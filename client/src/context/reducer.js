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
  GET_ALL_FILES_BEGIN,
  GET_ALL_FILES_SUCCESS,
  SET_EDIT_FILE,
  DELETE_FILE_BEGIN,
  EDIT_FILE_BEGIN,
  EDIT_FILE_SUCCESS,
  EDIT_FILE_ERROR,
  // SHOW_STATS_BEGIN,
  // SHOW_STATS_SUCCESS,
  // CLEAR_FILTERS,
  CHANGE_PAGE,
} from "./action";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
 
  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
      isUserSet: true,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      jobLocation: "",
      userLocation: "",
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
      isUserSet: true,
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return { ...state, page: 1, [action.payload.name]: action.payload.value };
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editJobId: "",
      position: "",
      company: "",
      jobLocation: state.userLocation,
      jobType: "full-time",
      status: "pending",
    };
    return { ...state, ...initialState };
  }



  if (action.type === GET_FILES_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_FILES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      files: action.payload.files,
      totalFiles: action.payload.totalFiles,
      
    };
  }
  if (action.type === GET_ALL_FILES_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_ALL_FILES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      files: action.payload.files,
      totalFiles: action.payload.totalFiles,
    };
  }
  
  if (action.type === SET_EDIT_FILE) {
    const file = state.files.getFile((file) => file._id === action.payload.id);
    const { _id, data} = file;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      data
    };
  }

  if (action.type === DELETE_FILE_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDIT_FILE_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_FILE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "File Updated!",
    };
  }
  if (action.type === EDIT_FILE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
 

  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }

  throw new Error(`no such action : ${action.type}`);
};
export default reducer;
