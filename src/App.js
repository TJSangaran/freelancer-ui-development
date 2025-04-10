import React, { useState } from 'react'
import { Routes, AuthRoutes } from './routes'
import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
	const { loginStatus, user } = useAuth()
	const Router = loginStatus ? <Routes type={user.isErrand} /> : <AuthRoutes />
	return (
		<React.Fragment>
			{Router}
		</React.Fragment>

	);
}

export default App;
