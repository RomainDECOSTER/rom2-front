import { AppBar, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { ArrowBack, ExitToApp, Menu as MenuIcon, PowerSettingsNew } from '@material-ui/icons';
import { Selector } from 'components/Selector';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { AuthenticationActioner } from 'services';
import { CampaignActioner } from 'services/campaign';
import { HeaderIconButton } from '../';
// import logo from './parkki-logo.png';
import './Header.scss';

function HeaderComponent(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { navbarOpen, handleDrawerOpen, handleDrawerClose, campaign, setCampaign, campaigns } = props;
  const intl = props.intl.messages.components.appframe.header;
  // const displayLogo = useMediaQuery(`(min-width:${minHeaderWidth}px)`);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (campaign === undefined) {
      setCampaign(campaigns[0]._id);
    }
  }, [campaign, campaigns, setCampaign]);

  return (
    <AppBar position="fixed" className="header-appbar">
      <Toolbar className="header-toolbar">
        <HeaderIconButton
          aria-label="open drawer"
          onClick={navbarOpen ? handleDrawerClose : handleDrawerOpen}
          icon={navbarOpen ? ArrowBack : MenuIcon}
        />
        <Divider orientation="vertical" flexItem className="header-divider" />
        {/* {displayLogo && <img className="header-logo" src={logo} alt="Parkki" />} */}
        <div className="header-grow" />
        <Selector
          className="campaign-selector"
          label={intl.campaign}
          labelId="campaign-current-selector"
          items={campaigns.map(t => ({ label: t.name, value: t._id }))}
          selected={campaign}
          setSelected={v => setCampaign(v)}
          labelClassName={'campaign-selector-color blue'}
          inputClassName={'campaign-selector-color'}
        />
        <Divider orientation="vertical" flexItem className="header-divider" />
        <HeaderIconButton aria-label="log out" icon={PowerSettingsNew} onClick={handleMenuOpen} />
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={props.logOut}>
            <ListItemIcon className="log-out-icon">
              <ExitToApp fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={intl.logout} />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state => ({
  campaign: state.Campaign.current_campaign,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(AuthenticationActioner.logout()),
  setCampaign: id => dispatch(CampaignActioner.setCurrentCampaign(id)),
});

const Header = connect(mapStateToProps, mapDispatchToProps)(injectIntl(HeaderComponent));

export { Header };
