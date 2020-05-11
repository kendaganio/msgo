import React, { useReducer } from "react";

const globalReducer = (state) => {
  return state;
};

let stateReducers = [globalReducer];

const initialState = {};

const useTableState = ({ columns, data, ...props }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  console.log("inside useTableState");
  console.log(columns, data);
  console.log("done!");

  const getTableProps = () => ({
    role: "table",
  });

  const getTableBodyProps = () => ({
    role: "rowgroup",
  });

  const headerGroups = {
    headers: columns.map((column) => ({
      ...column,
      render: (el, props) => {
        const element = column[el];
        return <Element {...props} />;
      },
    })),
  };

  return {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
  };
};

export default useTableState;
