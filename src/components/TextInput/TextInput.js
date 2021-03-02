import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';

import './TextInput.scss';

function TextInput(props) {
  const [textField, setTextField] = useState(props.value === null ? '' : props.value);
  const { value, setField, endAdornment, multiline } = props;

  useEffect(() => {
    if (value !== textField) {
      setTextField(value === null ? '' : value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function onTextFieldChange(event) {
    setTextField(event.target.value);
  }

  function onLeave() {
    setField(textField);
  }

  const inputProps = {
    className: props.inputClassName,
  };
  if (endAdornment) {
    inputProps.endAdornment = endAdornment;
    inputProps.className += ' input-with-end-adornment';
  } else if (props.type === 'email') {
    inputProps.endAdornment = <InputAdornment position="end">@</InputAdornment>;
  }

  return (
    <TextField
      onChange={onTextFieldChange}
      name={props.name}
      label={props.label}
      error={props.error}
      type={props.type}
      value={textField}
      fullWidth={props.fullWidth}
      required={props.required}
      margin={props.margin}
      variant={props.variant}
      disabled={props.disabled}
      InputProps={inputProps}
      inputRef={props.inputRef}
      InputLabelProps={{ className: 'text-input-label' }}
      onBlur={onLeave}
      className={props.className}
      multiline={multiline}
      rows={6}
      autoFocus={props.autoFocus}
    />
  );
}

TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  setField: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  margin: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  endAdornment: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  inputClassName: PropTypes.string,
  className: PropTypes.string,
  multiline: PropTypes.bool,
  inputRef: PropTypes.any,
  autoFocus: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

TextInput.defaultProps = {
  name: 'name',
  label: '',
  value: '',
  error: false,
  setField: () => {},
  disabled: false,
  variant: 'outlined',
  margin: 'dense',
  required: true,
  type: 'text',
  inputClassName: '',
  className: '',
  multiline: false,
  inputRef: undefined,
  autoFocus: false,
  fullWidth: true,
};

export { TextInput };
