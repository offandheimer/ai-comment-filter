import React, { useEffect, useState } from "react";

// 로딩중 상태를 나타내는 state를 받아야함
interface LoadingBarProps {
	isLoading: boolean;
}

export const LoadingBar: React.FC<LoadingBarProps> = ({ isLoading }) => {
	const [progress, setProgress] = useState<number>(0);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (isLoading) {
			// progress 상태를 업데이트
			timer = setInterval(() => {
				setProgress((prevProgress) => {
					if (prevProgress >= 100) {
						clearInterval(timer);
						return 100;
					}
					return prevProgress + 5; // 일단은 5씩 늘리기
				});
			}, 1000); // 일단은 초단위로 로딩
		} else {
			setProgress(0); // 로딩중이 아닐때는 progress 리셋
		}

		return () => clearInterval(timer); // 타이머 클린
	}, [isLoading]);

	return (
		<div
			className="container"
			style={{
				width: "70%",
				height: "10px",
				background: "#78788016",
				marginTop: "1rem",
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-start",
				position: "relative",
			}}
		>
			<div
				className="progress-bar"
				style={{
					width: "100%",
					height: "100%",
					background: "#78788016",
					borderRadius: "1rem",
					overflow: "hidden",
				}}
			>
				<div
					className="progress-bar-fill"
					style={{
						width: `${progress}%`,
						height: "100%",
						background: "#007AFF",
						borderRadius: "1rem",
						transition: "width 0.5s ease",
					}}
				></div>
			</div>
		</div>
	);
};
