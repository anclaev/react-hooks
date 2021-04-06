import axios from "axios";
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

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const withCreds = (url) =>
  `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

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
    const res = await axios.get(
      withCreds(`https://api.github.com/search/users?q=${value}&`)
    );
    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  const getUser = async (name) => {
    setLoading();
    const res = await axios.get(
      withCreds(`https://api.github.com/users/${name}?`)
    );
    dispatch({ type: GET_USER, payload: res.data });
  };

  const getRepos = async (name) => {
    setLoading();
    const res = await axios.get(
      withCreds(`https://api.github.com/users/${name}/repos?per_page=10&`)
    );
    dispatch({ type: GET_REPOS, payload: res.data });
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
