import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Components
import Navbar from './components/Navbar';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// Util
import themeFile from './util/theme';
import AuthRoute from './util/AuthRoute';

// Redux stuff
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

const theme = createMuiTheme(themeFile);

const token = localStorage.AuthToken;
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(getUserData());
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Navbar />
						<div className="container">
							<Switch>
								<Route exact path="/" component={home} />
								<AuthRoute
									exact
									path="/login"
									component={login}
								/>
								<AuthRoute
									exact
									path="/signup"
									component={signup}
								/>
							</Switch>
						</div>
					</Router>
				</ThemeProvider>
			</Provider>
		);
	}
}

export default App;
