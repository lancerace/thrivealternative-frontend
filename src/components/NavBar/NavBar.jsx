import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBarItem from './NavBarItem/NavBarItem';
import styles from './styles.module.css';

class NavBar extends Component {
  static Item = NavBarItem;

  render() {
    const { children, hoverColor } = this.props;

    const kv = {
      blue: 'li--Blue',
    };
    return <ul className={`${styles.root} ${kv[hoverColor]}`}>{children}</ul>;
  }
} //  end class
NavBar.propTypes = {
  children: PropTypes.node,
  hoverColor: PropTypes.string,
};
NavBar.defaultProps = {
  children: '',
  hoverColor: '',
};

export default NavBar;
