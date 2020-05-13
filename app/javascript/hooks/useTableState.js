import React, { useReducer } from "react";
import get from "lodash-es/get";

const initialState = {
  currentPage: 1,
  search: {},
  sort: {},
};

function parameterize(s) {
  return s.toLowerCase().replace(/[^a-zA-Z]/, "_");
}

const actions = {
  TOGGLE_SORT: 1,
  SET_PAGE: 2,
};

function tableStateReducer(state, action) {
  const sorts = ["default", "asc", "desc"];

  switch (action.type) {
    case actions.TOGGLE_SORT:
      const currentSort = state.sort[action.field] || "default";
      const nextSort =
        currentSort === "default"
          ? "asc"
          : currentSort === "asc"
          ? "desc"
          : "default";
      return {
        ...state,
        sort: {
          // ...state.sort, (for multisort, add logic later)
          [action.field]: nextSort,
        },
      };
    default:
      return state;
  }
}

function getSortProps(col, state, dispatch) {
  return col.sortable
    ? {
        cursor: "pointer",
        sortDirection: state.sort[col.id],
        onClick: (e) => {
          e.preventDefault();
          dispatch({ type: actions.TOGGLE_SORT, field: col.id });
        },
      }
    : {};
}

function initColumns(col, state, dispatch) {
  let { id, header, sortable } = col;

  if (!id) {
    if (typeof header === "function") {
      throw new Error(
        "Columns with function headers, should supply an `id` prop"
      );
    }

    id = parameterize(header);
  }

  /*
  if (sortable && typeof state.sort[id] === "undefined") {
    dispatch({ type: actions.INIT_SORT, field: id });
  }
  */

  return {
    ...col,
    id,
  };
}

function generateColumn(col, state, dispatch) {
  const sortProps = getSortProps(col, state, dispatch);
  return {
    ...col,
    sortDirection: sortProps.sortDirection,
    getHeaderProps: () => ({
      key: `column.${col.id}`,
      ...sortProps,
    }),
    render: () => {
      if (typeof col.header === "function") {
        return React.createElement(col.header, col);
      } else {
        return col.header;
      }
    },
  };
}

function generateCell(col, row, y, x) {
  let { cell, accessor, ...otherProps } = col;

  // create cell if accessor is provided
  if (accessor) {
    cell = ({ row }) => get(row, accessor);
  }

  return {
    column: col,
    getCellProps: (props) => ({
      key: `cell.${y}.${x}`,
      ...props,
    }),
    ...otherProps,
    render: () => {
      if (typeof cell === "function") {
        return React.createElement(cell, { row });
      } else {
        return cell;
      }
    },
  };
}

const useTableState = ({ columns: rawColumns, data, ...props }) => {
  const [state, dispatch] = useReducer(tableStateReducer, initialState);

  const columns = rawColumns.map((c) => initColumns(c, state, dispatch));
  const headers = columns.map((c) => generateColumn(c, state, dispatch));

  const rows = data.map((row, y) => ({
    cells: columns.map((column, x) => generateCell(column, row, y, x)),
    getRowProps: () => ({ role: "row", key: `row.${y}` }),
  }));

  const getTableProps = () => ({
    role: "grid",
  });

  const getTableBodyProps = () => ({
    role: "rowgroup",
  });

  return {
    getTableProps,
    getTableBodyProps,
    headers,
    rows,
    state,
  };
};

export default useTableState;
