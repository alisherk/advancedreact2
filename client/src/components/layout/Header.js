import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  renderLinks() {
    return this.props.auth ? (
      <div className='header'>
        <ul>
          <li>
            <Link to='/signout'> Sign out </Link>
          </li>
          <li>
            <Link to='/feature'> Feature </Link>
          </li>
        </ul>
      </div>
    ) : (
      <div className='header'>
        <ul>
          <li>
            <Link to='/'> Redux Auth </Link>
          </li>
          <li>
            <Link to='/signup'> Sign up </Link>
          </li>
          <li>
            <Link to='/signin'> Sign in </Link>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return <div> 
      
    {this.renderLinks()} 
    </div>;
  }
}
function mapStateToProps(state) {
  return { auth: state.auth.authed };
}
export default connect(mapStateToProps)(Header);
