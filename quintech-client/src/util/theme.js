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
		progressData: {
			marginTop: 70,
			display: 'block',
			color: '#0D47A1',
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
				border: '2px solid #ccc',
			},
			'& .profile-details': {
				textAlign: 'center',
				'& span, svg': {
					verticalAlign: 'middle',
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
		loadingHolder: {
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
		},
		status: {
			fontSize: 13,
		},
		statusComplete: {
			color: '#4CAF50 !important',
		},
		statusNotStarted: {
			color: 'rgba(0, 0, 0, 0.54)',
		},
		statusInProgress: {
			color: '#03A9F4',
		},
		statusDelayed: {
			color: '#FFAB00',
		},
		assigned: {
			fontSize: 14,
		},
		taskButtons: {
			justifyContent: 'flex-end',
			'& *': {
				color: '#fff',
			},
			'& .editTask': {
				backgroundColor: '#29B6F6',
			},
			'& .updateTask': {
				backgroundColor: '#FB8C00',
			},
			'& .completeTask': {
				backgroundColor: '#4CAF50',
			},
		},
		disabledButton: {
			backgroundColor: 'rgba(0, 0, 0, 0.3) !important',
			color: '#fff !important',
		},
	},
};
