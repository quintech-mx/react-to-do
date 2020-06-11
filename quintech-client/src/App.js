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

import { Provider } from 'react-redux';
import store from './redux/store';

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.AuthToken;
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		window.location.href = '/login';
		authenticated = false;
	} else {
		axios.defaults.headers.common['Authorization'] = token;
		authenticated = true;
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
									authenticated={authenticated}
								/>
								<AuthRoute
									exact
									path="/signup"
									component={signup}
									authenticated={authenticated}
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
