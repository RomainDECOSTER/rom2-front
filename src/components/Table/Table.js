import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { injectIntl } from 'react-intl';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import './Table.scss';

const TableComponent = props => {
  const { rows, columns, actions, onEdit, hideHeader, className, intl } = props;
  const smallDevice = useMediaQuery(useTheme().breakpoints.down('sm'));
  const columnsCopy = [...columns];
  if (actions) {
    columnsCopy.push({
      id: 'actions',
      label: intl.messages.components.table.actions,
      align: 'center',
      render: row => (
        <Tooltip title={intl.messages.components.table.editTooltip}>
          <IconButton onClick={() => onEdit(row)} className="table-actions-button">
            <Edit />
          </IconButton>
        </Tooltip>
      ),
    });
  }

  return (
    <Paper variant="outlined">
      <TableContainer className={clsx('table-container', className)}>
        <Table stickyHeader aria-label="sticky table">
          {!hideHeader && (
            <TableHead>
              <TableRow>
                {columnsCopy.map(
                  (column, index) =>
                    column !== undefined && (
                      <TableCell
                        key={index}
                        align={column.align ? column.align : 'left'}
                        className={clsx('table-header-cell', smallDevice && 'table-cell-small-device')}
                      >
                        {column.label}
                      </TableCell>
                    ),
                )}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover key={index}>
                  {columnsCopy.map((column, colIndex) => {
                    if (column === undefined) return false;
                    const value = column.render ? column.render(row, index) : row[column.id];
                    return (
                      <TableCell
                        key={colIndex}
                        align={column.align ? column.align : 'left'}
                        className={clsx(smallDevice && 'table-cell-small-device')}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

TableComponent.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      render: PropTypes.func,
    }),
  ),
  rows: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.bool,
  onEdit: PropTypes.func,
  hideHeader: PropTypes.bool,
  className: PropTypes.string,
};

TableComponent.defaultProps = {
  columns: [],
  rows: [],
  actions: false,
  onEdit: () => {},
  hideHeader: false,
  className: '',
};

const TableToExport = injectIntl(TableComponent);

export { TableToExport as Table };
