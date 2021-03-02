import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

const IntlWrapperComponent = props => {
  const { i18n, children } = props;
  return <IntlProvider {...i18n}>{children}</IntlProvider>;
};

const mapStateToProps = state => ({
  i18n: state.I18n,
});

const IntlWrapper = connect(mapStateToProps)(IntlWrapperComponent);
export { IntlWrapper };
