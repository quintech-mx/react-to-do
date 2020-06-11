import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			authenticated === true ? (
				<Redirect to="/tasks" />
			) : (
				<Component {...props} />
			)
		}
	/>
);

AuthRoute.propTypes = {
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
	authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
