import React from 'react';
import FormContent from './Page/FormContent/FormContent';
import Login from './Page/Login/Login';

const routes = [

	{
		path: '/',
		exact: true,
		main: props => <FormContent {...props} />
	},
	{
		path: '/login',
		exact: false,
		main: props => <Login {...props} />
	}
];

export default routes;