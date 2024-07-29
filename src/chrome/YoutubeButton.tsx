// src/chrome/YouTubeButton.tsx

import React from "react";

const YouTubeButton: React.FC = () => {
	const handleClick = () => {
		alert("Button clicked!");
		// Add any action you want to perform here
	};

	return (
		<button
			style={{
				position: "fixed",
				top: "10px",
				right: "10px",
				padding: "10px 20px",
				backgroundColor: "#FF0000",
				color: "#FFFFFF",
				border: "none",
				borderRadius: "5px",
				cursor: "pointer",
				zIndex: "100000",
			}}
			onClick={handleClick}
		>
			My Custom Button
		</button>
	);
};

export default YouTubeButton;
