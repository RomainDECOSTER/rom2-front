import React, { useMemo } from 'react';
import { Selector } from 'components/Selector';

import './SelectFilter.scss';
import { injectIntl } from 'react-intl';

function SelectFilterComponent({
  column: { filterValue, setFilter, preFilteredRows, id },
  label,
  labelId,
  options,
  ...props
}) {
  const intl = props.intl.messages.components.selectFilter;
  const optionsToDisplay = useMemo(() => {
    if (options !== undefined) {
      return options.map(o => ({ label: o, value: o }));
    } else {
      const options = new Set();
      preFilteredRows.forEach(row => {
        options.add(row.values[id]);
      });
      return [{ label: intl.all, value: '' }].concat([...options.values()].map(o => ({ label: o, value: o })));
    }
  }, [options, preFilteredRows, intl.all, id]);

  function handleChange(value) {
    if (value === '') {
      setFilter(undefined);
    } else {
      setFilter(value);
    }
  }

  return (
    <Selector
      className="select-filter"
      label={label}
      labelId={labelId}
      items={optionsToDisplay}
      setSelected={handleChange}
      selected={filterValue}
    />
  );
}

const SelectFilter = injectIntl(SelectFilterComponent);

export { SelectFilter };
