import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import './Selector.scss';

function Selector(props) {
  const { label, labelId, selected, setSelected, items, error, disabled, variant, className } = props;

  function onStatusChange(event) {
    const value = event.target.value;
    if (selected !== value) {
      setSelected(value);
    }
  }

  return (
    <FormControl className={`selector-container ${className}`}>
      {labelId && label && (
        <InputLabel error={error} id={labelId}>
          {label}
        </InputLabel>
      )}
      <Select variant={variant} labelId={labelId} value={selected} onChange={onStatusChange} disabled={disabled}>
        {items.map((item, index) => (
          <MenuItem value={item.value} key={index}>
            {item.icon && (
              <item.icon className={clsx('selector-item-icon', item.iconColor && `color-${item.iconColor}`)} />
            )}
            <span className="selector-item-label">{item.label}</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

Selector.propTypes = {
  labelId: PropTypes.string,
  label: PropTypes.string,
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func, PropTypes.element]),
      iconColor: PropTypes.string,
    }),
  ),
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  className: PropTypes.string,
};

Selector.defaultProps = {
  labelId: '',
  label: '',
  selected: '',
  setSelected: () => {},
  items: [],
  error: false,
  disabled: false,
  variant: 'standard',
  className: '',
};

export { Selector };
