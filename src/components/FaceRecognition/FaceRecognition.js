import React from 'react';

const FaceRecognition = (props) => {
	return (
		<div className="center">
			<img src={props.imageUrl} alt="" />
		</div>
	);
};

export default FaceRecognition;
