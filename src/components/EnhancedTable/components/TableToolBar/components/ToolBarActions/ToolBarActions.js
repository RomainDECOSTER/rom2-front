import React, { useMemo } from 'react';

function ToolBarActionsComponent({ selectedRowIds, actions }) {
  const numSelected = useMemo(() => {
    return selectedRowIds !== undefined ? selectedRowIds.length : 0;
  }, [selectedRowIds]);

  const freeActions = useMemo(() => {
    return actions !== undefined
      ? actions.filter(a => a.isFreeAction === true).map((a, index) => <span key={index}>{a.render()}</span>)
      : [];
  }, [actions]);

  const nonFreeActions = useMemo(() => {
    return actions !== undefined
      ? actions
          .filter(a => a.isFreeAction === undefined || a.isFreeAction === false)
          .map((a, index) => <span key={index}>{a.render(selectedRowIds)}</span>)
      : [];
  }, [actions, selectedRowIds]);

  return <>{actions !== undefined && actions.length > 0 ? (numSelected === 0 ? freeActions : nonFreeActions) : ''}</>;
}

export { ToolBarActionsComponent as ToolBarActions };
