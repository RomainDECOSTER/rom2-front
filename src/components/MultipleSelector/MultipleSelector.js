import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import './MultipleSelector.scss';

function MultipleSelector(props) {
  const {
    labelId,
    label,
    selected,
    renderSelected,
    setSelected,
    items,
    error,
    MenuProps,
    variant,
    FormClassName,
    disabled,
  } = props;

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
    <FormControl className={`multiple-select-container ${FormClassName}`}>
      {labelId && label && (
        <InputLabel error={error} id={labelId} variant={variant} className="background-white">
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
        MenuProps={MenuProps}
        variant={variant}
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
  MenuProps: PropTypes.object,
  variant: PropTypes.string,
  FormClassName: PropTypes.string,
};

MultipleSelector.defaultProps = {
  labelId: '',
  label: '',
  selected: [],
  setSelected: () => {},
  items: [],
  error: false,
  disabled: false,
  MenuProps: {},
  variant: 'outlined',
  FormClassName: '',
};

export { MultipleSelector };
