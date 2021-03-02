import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, Checkbox, MenuItem, ListItemText } from '@material-ui/core';

import './MultipleSelector.scss';

function MultipleSelector(props) {
  const { labelId, label, selected, renderSelected, setSelected, items, error, disabled } = props;

  function handleChange(event) {
    const value = event.target.value[1];
    const selectedValues = [...selected];
    if (selectedValues.includes(value)) {
      const index = selectedValues.indexOf(value);
      selectedValues.splice(index, 1);
    } else {
      selectedValues.push(value);
    }
    setSelected(selectedValues);
  }

  function renderValues() {
    return (
      <span className="multiple-select-render-value">
        {renderSelected
          ? renderSelected(selected)
          : selected
              .map(value => {
                const item = items.find(item => item.value === value);
                return item ? item.label : value;
              })
              .join(', ')}
      </span>
    );
  }

  const itemsToDisplay = [...items];

  selected.forEach(s => {
    if (items.find(i => i.value === s) === undefined) {
      itemsToDisplay.push({
        value: s,
        label: s,
      });
    }
  });

  return (
    <FormControl className="multiple-select-container">
      {labelId && label && (
        <InputLabel error={error} id={labelId}>
          {label}
        </InputLabel>
      )}
      <Select
        labelId={labelId}
        multiple
        value={['']}
        onChange={handleChange}
        renderValue={renderValues}
        disabled={disabled}
      >
        {itemsToDisplay.map((item, index) => (
          <MenuItem key={index} value={item.value} disabled={item.disabled}>
            <Checkbox checked={selected.includes(item.value)} />
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

MultipleSelector.propTypes = {
  labelId: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  selected: PropTypes.arrayOf(PropTypes.string),
  renderSelected: PropTypes.func,
  setSelected: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  error: PropTypes.bool,
  disabled: PropTypes.bool,
};

MultipleSelector.defaultProps = {
  labelId: '',
  label: '',
  selected: [],
  setSelected: () => {},
  items: [],
  error: false,
  disabled: false,
};

export { MultipleSelector };
