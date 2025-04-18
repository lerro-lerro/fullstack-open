import React, { useReducer, useContext } from "react";
import { StateContext } from "./context";
import { reducer } from "./reducer";
import { initialState } from "./types";

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateValue = () => useContext(StateContext);
