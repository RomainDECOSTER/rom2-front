import React, { useEffect } from 'react';
import {
  Checkbox,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import MaUTable from '@material-ui/core/Table';
import {
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  useGlobalFilter,
  useRowState,
  useFilters,
} from 'react-table';
import TablePaginationActions from './components/TablePaginationActions/TablePaginationActions';
import { TableToolBar } from './components';

import './EnhancedTable.scss';
import { JsonParam, NumberParam, StringParam, withQueryParams } from 'use-query-params';
import { ArrayUtils, ObjectUtils } from 'tools';

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolveRef = ref || defaultRef;

  useEffect(() => {
    resolveRef.current.indeterminate = indeterminate;
  }, [resolveRef, indeterminate]);

  return (
    <>
      <Checkbox ref={resolveRef} {...rest} />
    </>
  );
});

const defaultPropGetter = () => ({});

function EnhancedTablecomponent({
  columns,
  data,
  title,
  actions,
  skipPageReset,
  getRowProps = defaultPropGetter,
  useMultipleSelect = true,
  initialState,
  reducer,
  query,
  setQuery,
}) {
  const {
    getTableProps,
    headers,
    page,
    prepareRow,
    getTableBodyProps,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,
    state: { pageIndex, pageSize, globalFilter },
    rows,
  } = useTable(
    {
      columns,
      data,
      autoResetExpanded: !skipPageReset,
      autoResetGroupBy: !skipPageReset,
      autoResetSelectedRows: !skipPageReset,
      autoResetSortBy: !skipPageReset,
      autoResetFilters: !skipPageReset,
      autoResetRowState: !skipPageReset,
      autoResetGlobalFilter: !skipPageReset,
      autoResetHiddenColumns: !skipPageReset,
      initialState,
      stateReducer: (newState, action, prevState) => {
        if (reducer !== undefined) {
          reducer(newState, action, prevState);
        }
        switch (action.type) {
          case 'init':
            if (query.pageSize !== undefined && query.pageIndex !== undefined) {
              if (query.pageIndex !== newState.pageIndex) {
                newState.pageIndex = query.pageIndex;
              }
              if (query.pageSize !== newState.pageSize) {
                newState.pageSize = query.pageSize;
              }
              if (query.globalFilter !== newState.globalFilter) {
                newState.globalFilter = query.globalFilter;
              }
              if (
                query.sortBy !== undefined &&
                query.sortBy.length > 0 &&
                !ArrayUtils.compareArrays(query.sortBy, newState.sortBy, ObjectUtils.compareSimpleObjects)
              ) {
                newState.sortBy = query.sortBy;
              }
            }
            break;
          default:
            const querytoUpdate = {};
            if (query.pageIndex !== newState.pageIndex) {
              querytoUpdate.pageIndex = newState.pageIndex;
            }
            if (query.pageSize !== newState.pageSize) {
              querytoUpdate.pageSize = newState.pageSize;
            }
            if (query.globalFilter !== newState.globalFilter) {
              querytoUpdate.globalFilter = newState.globalFilter;
            }
            if (!ArrayUtils.compareArrays(query.sortBy, newState.sortBy, ObjectUtils.compareSimpleObjects)) {
              if (newState.sortBy.length === 0) {
                querytoUpdate.sortBy = undefined;
              } else {
                querytoUpdate.sortBy = newState.sortBy;
              }
            }
            if (Object.keys(querytoUpdate).length > 0) {
              setQuery(querytoUpdate);
            }
            break;
        }
        return newState;
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState,
    hook => {
      if (useMultipleSelect) {
        hook.allColumns.push(columns => [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} id={row._id} />
              </div>
            ),
            disableSortBy: true,
          },
          ...columns,
        ]);
      }
    },
  );

  useEffect(() => {
    headers.forEach(header => {
      if (header.socket !== undefined && header.socket.addListener !== undefined) {
        header.socket.addListener(page);
      }
    });
    return () => {
      headers.forEach(header => {
        if (header.socket !== undefined && header.socket.removeListener !== undefined) {
          header.socket.removeListener();
        }
      });
    };
  }, [headers, page]);

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setPageSize(Number(event.target.value));
  };

  return (
    <TableContainer>
      <TableToolBar
        title={title}
        selectedRowIds={selectedFlatRows}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
        actions={actions}
        filters={headers.filter(h => h.Filter !== undefined)}
      />
      <MaUTable {...getTableProps()} size="small">
        <TableHead>
          <TableRow>
            {headers.map(column => (
              <TableCell
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className={column.hidden && 'column-hidden'}
              >
                {column.render('Header')}
                {column.isSorted ? (
                  <TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'} />
                ) : null}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps(getRowProps(row))}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()} className={cell.column.hidden && 'column-hidden'}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[25, 50, 100, 150, { label: 'All', value: data.length }]}
              colSpan={12}
              count={rows.length}
              rowsPerPage={pageSize}
              page={pageIndex > 0 && pageSize > rows.length ? gotoPage(0) : pageIndex}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MaUTable>
    </TableContainer>
  );
}

const EnhancedTable = withQueryParams(
  { pageSize: NumberParam, pageIndex: NumberParam, globalFilter: StringParam, sortBy: JsonParam },
  EnhancedTablecomponent,
);

export { EnhancedTable };
