import { createContext, useReducer } from "react";
import { HIDE_ALERT, SHOW_ALERT } from "../types";

export const AlertContext = createContext();

export const AlertState = ({ children }) => {
  const [state, dispatch] = useReducer(AlertReducer, null);

  const hide = () => dispatch({ type: HIDE_ALERT });

  const show = (text, type = "secondary") =>
    dispatch({
      type: SHOW_ALERT,
      payload: {
        text,
        type,
      },
    });

  return (
    <AlertContext.Provider value={{ hide, show, alert: state }}>
      {children}
    </AlertContext.Provider>
  );
};

const handlers = {
  [SHOW_ALERT]: (state, action) => action.payload,
  [HIDE_ALERT]: (state, action) => null,
  DEFAULT: (state) => state,
};

export const AlertReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
