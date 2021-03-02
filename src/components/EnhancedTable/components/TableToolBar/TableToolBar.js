import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Typography } from '@material-ui/core';
import GlobalFilter from '../GlobalFilter/GlobalFilter';
import { ToolBarActions } from './components';
import { injectIntl } from 'react-intl';

import './TableToolBar.scss';

function TableToolBarComponent(props) {
  const { title, selectedRowIds, preGlobalFilteredRows, setGlobalFilter, globalFilter, actions, filters } = props;
  const numSelected = useMemo(() => {
    return selectedRowIds !== undefined ? selectedRowIds.length : 0;
  }, [selectedRowIds]);
  return (
    <Toolbar>
      <Typography variant="h6">{title}</Typography>
      <>
        <div className="spacer" />
        {filters.map(f => (
          <div key={f.filterKey} className="filters">
            {f.render('Filter')}
          </div>
        ))}
      </>
      <div className="spacer" />
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      {numSelected !== 0 && <div className="spacer-small" />}
      <ToolBarActions actions={actions} selectedRowIds={selectedRowIds} />
    </Toolbar>
  );
}

TableToolBarComponent.propTypes = {
  title: PropTypes.string.isRequired,
  numSelected: PropTypes.number,
};

const TableToolBar = injectIntl(TableToolBarComponent);

export { TableToolBar };
