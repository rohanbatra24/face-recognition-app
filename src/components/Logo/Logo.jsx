import React from 'react';

import Tilt from 'react-tilt';

import logo from './logo.png';

import './Logo.css';

const Logo = () => {
	return (
		<div className="ma4 mt0">
			<Tilt className=" br2 shadow-2  Tilt" options={{ max: 55 }} style={{ height: 150, width: 150 }}>
				<div className="Tilt-inner pa3">
					<img src={logo} alt="" style={{ paddingTop: '5px' }} />
				</div>
			</Tilt>
		</div>
	);
};

export default Logo;
