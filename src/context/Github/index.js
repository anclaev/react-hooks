import { createContext, useReducer } from "react";
import {
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
  SEARCH_USERS,
  SET_LOADING,
} from "../types";

const handlers = {
  [SEARCH_USERS]: (state, { payload }) => ({
    ...state,
    users: payload,
    loading: false,
  }),
  [GET_REPOS]: (state, { payload }) => ({
    ...state,
    repos: payload,
    loading: false,
  }),
  [GET_USER]: (state, { payload }) => ({
    ...state,
    user: payload,
    loading: false,
  }),
  [SET_LOADING]: (state) => ({ ...state, loading: true }),
  [CLEAR_USERS]: (state) => ({ ...state, users: [] }),
  DEFAULT: (state) => state,
};

export const GithubContext = createContext();
export const GithubReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
export const GithubState = ({ children }) => {
  const initialState = { user: {}, users: [], loading: false, repos: [] };
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const search = async (value) => {
    setLoading();
    // TODO: Axios Request
    dispatch({ type: SEARCH_USERS, payload: [] });
  };

  const getUser = async (name) => {
    setLoading();
    // TODO: Axios Request

    dispatch({ type: GET_USER, payload: {} });
  };

  const getRepos = async (name) => {
    setLoading();
    // TODO: Axios Request

    dispatch({ type: GET_REPOS, payload: [] });
  };

  const clearUsers = () => dispatch({ type: CLEAR_USERS });
  const setLoading = () => dispatch({ type: SET_LOADING });
  const { user, users, repos, loading } = state;

  return (
    <GithubContext.Provider
      value={{
        search,
        setLoading,
        clearUsers,
        getUser,
        getRepos,
        user,
        users,
        repos,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
