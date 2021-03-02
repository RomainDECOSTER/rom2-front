import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import clsx from 'clsx';

import './Loader.scss';

function Loader(props) {
  const [loading, setLoading] = useState(true);
  const [ComponentToRender, setComponentToRender] = useState(<div />);
  const { render, className, thickness, size } = props;

  function renderComponent(Component = <div />) {
    setComponentToRender(Component);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    render(renderComponent);
  }, [render]);

  return loading ? (
    <div className={clsx('loader-container', className)}>
      <CircularProgress thickness={thickness} size={size} color="primary" />
    </div>
  ) : (
    ComponentToRender
  );
}

export { Loader };
