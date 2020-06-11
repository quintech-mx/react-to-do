export default {
	palette: {
		primary: {
			light: '#5471d2',
			main: '#0d47a1',
			dark: '#002071',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff9e40',
			main: '#ff6d00',
			dark: '#c43c00',
			contrastText: '#fff',
		},
	},
	spreadThis: {
		homeLogo: {
			width: '60%',
		},
		card: {
			display: 'flex',
			marginBottom: 20,
		},
		image: {
			minWidth: 200,
			objectFit: 'cover',
		},
		content: {
			padding: 25,
		},
		typography: {
			useNextVariants: true,
		},
		form: {
			textAlign: 'center',
		},
		pageTitle: {
			fontSize: 30,
			margin: '20px auto',
		},
		textField: {
			margin: '10px auto',
		},
		button: {
			marginTop: 40,
		},
		customError: {
			color: 'red',
			fontSize: '.8rem',
			marginTop: 10,
		},
		smallLine: {
			display: 'block',
			marginTop: 15,
		},
		progress: {
			display: 'inline-block',
			color: 'white',
		},
		paper: {
			padding: 20,
		},
		profile: {
			'& .image-wrapper': {
				textAlign: 'center',
				position: 'relative',
				'& button': {
					position: 'absolute',
					top: '80%',
					left: '70%',
				},
			},
			'& .profile-image': {
				width: 200,
				height: 200,
				objectFit: 'cover',
				maxWidth: '100%',
				borderRadius: '50%',
			},
			'& .profile-details': {
				textAlign: 'center',
				'& span, svg': {
					verticalAlign: 'middle',
				},
				'& a': {
					color: '#00bcd4',
				},
			},
			'& hr': {
				border: 'none',
				margin: '0 0 10px 0',
			},
			'& svg.button': {
				'&:hover': {
					cursor: 'pointer',
				},
			},
		},
		buttons: {
			textAlign: 'center',
			'& a': {
				margin: '20px 10px',
			},
		},
	},
};
