import React from 'react';
import { NavLink } from 'fluxible-router';
import path from 'path';
import requireCSS from '../lib/requireCSS';

requireCSS('components/Nav.sass');

class Link extends React.Component {
  static propTypes = {
    page: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <li>
        <NavLink routeName={this.props.page}>{this.props.title}</NavLink>
      </li>
    );
  }
}

class Nav extends React.Component {
  static propTypes = {
    links: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <ul className="Nav">
        {Object.keys(this.props.links).map((name) => (
          <Link {...this.props.links[name]} key={name} />
        ))}
      </ul>
    );
  }
}

export default Nav;
