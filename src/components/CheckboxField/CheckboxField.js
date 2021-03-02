import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

function CheckboxField(props) {
  const { checked, setField, label, labelPlacement, disabled, className } = props;

  function onChange(event) {
    setField(event.target.checked);
  }

  return (
    <FormControlLabel
      className={className}
      control={<Checkbox checked={checked} onChange={onChange} disabled={disabled} />}
      label={label}
      labelPlacement={labelPlacement}
    />
  );
}

export { CheckboxField };
