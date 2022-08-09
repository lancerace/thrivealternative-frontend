import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function NavBarItem({ children, to }) {
  return (
    <li>
      <Link to={to}>{children}</Link>
    </li>
  );
}

NavBarItem.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
};

NavBarItem.defaultProps = {
  to: '',
};
