import React from "react";

const Loader = () => {
	return (
		<div className="loading-area">
			<div className="loading-box" />
			<div className="loading-pic" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<i className="flaticon-home" style={{ fontSize: '80px', color: '#fff', animation: 'pulse 1.5s infinite' }} />
			</div>
		</div>
	);
};

export default Loader;
