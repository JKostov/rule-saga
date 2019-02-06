
import React, { Component } from 'react';
import {
  Menu, MenuItem, Container, Segment,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './styles.scss';

class Header extends Component {
  constructor(props) {
    super(props);

    this.itemChangeCallback = this.itemChangeCallback.bind(this);
  }

  itemChangeCallback(url) {
    const { activeItem, onItemChange } = this.props;
    if (activeItem === url) {
      return;
    }
    onItemChange(url);
  }

  leftMenu() {
    const { isUser } = this.props;

    return (
      <Menu.Menu position="left">
        {isUser ? this.leftMenuUser() : this.leftMenuCompany()}
      </Menu.Menu>
    );
  }

  leftMenuUser() {
    return (
      <React.Fragment>
        <MenuItem name="dashboard" onClick={() => this.itemChangeCallback('/dashboard-user')} />
      </React.Fragment>
    );
  }

  leftMenuCompany() {
    return (
      <React.Fragment>
        <MenuItem name="dashboard" onClick={() => this.itemChangeCallback('/dashboard-company')} />
      </React.Fragment>
    );
  }

  rightMenu() {
    const { isLoggedIn } = this.props;

    return (
      <Menu.Menu position="right">
        {isLoggedIn ? this.rightMenuLoggedIn() : this.rightMenuGuest()}
      </Menu.Menu>
    );
  }

  rightMenuLoggedIn() {
    return (
      <React.Fragment>
        <MenuItem
          name="logout"
          onClick={() => this.itemChangeCallback('/logout')}
        />
      </React.Fragment>
    );
  }

  rightMenuGuest() {
    return (
      <React.Fragment>
        <MenuItem name="login-user" onClick={() => this.itemChangeCallback('/login-user')} />
        <MenuItem name="login-company" onClick={() => this.itemChangeCallback('/login-company')} />
        <MenuItem name="sign up" onClick={() => this.itemChangeCallback('/register-company')} />
      </React.Fragment>
    );
  }

  render() {
    const { className, isLoggedIn } = this.props;

    const segmentClass = classNames(style.segment, {
      [className]: className,
    });

    return (
      <Segment className={segmentClass}>
        <Menu pointing secondary size="large">
          <Container>
            {isLoggedIn && this.leftMenu()}
            {this.rightMenu()}
          </Container>
        </Menu>
      </Segment>
    );
  }
}

Header.defaultProps = {
  isUser: true,
  isLoggedIn: false,
  activeItem: '/',
  className: null,
};

Header.propTypes = {
  isUser: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  activeItem: PropTypes.string,
  className: PropTypes.string,
  onItemChange: PropTypes.func.isRequired,
};

export default Header;
