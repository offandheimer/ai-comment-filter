import React, { useEffect, useState } from "react";

const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [dimensions, setDimensions] = useState({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const findCommentSection = () => {
			const selectors = [
				'ytd-item-section-renderer#sections[section-identifier="comment-item-section"]',
				"ytd-comments#comments",
				"#comments",
				'#sections[section-identifier="comment-item-section"]',
			];

			for (const selector of selectors) {
				const element = document.querySelector(selector);
				if (element) {
					console.log("Comment section found:", element);
					const rect = element.getBoundingClientRect();
					console.log("rect:", rect); // rect 값을 로그로 출력

					// ytd-comments-header-renderer 요소의 top과 height를 가져오기
					const headerElement = document.querySelector(
						"ytd-comments-header-renderer.style-scope.ytd-item-section-renderer"
					);
					if (headerElement) {
						const headerRect = headerElement.getBoundingClientRect();
						const headerBottom =
							headerRect.top + window.scrollY + headerRect.height;

						setDimensions({
							top: headerBottom, // header의 bottom 값으로 설정
							left: rect.left + window.scrollX,
							width: rect.width,
							height: rect.height,
						});
					} else {
						console.log("Comments header not found");
					}

					return element;
				}
			}

			return null;
		};

		const checkForCommentSection = () => {
			const commentSection = findCommentSection();
			setIsVisible(!!commentSection);
		};

		// 초기 체크
		checkForCommentSection();

		// MutationObserver를 사용하여 DOM 변경 감지
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.type === "childList") {
					checkForCommentSection();
				}
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		// YouTube 네비게이션 이벤트 리스너 추가
		const handleYoutubeNavigate = () => {
			setTimeout(checkForCommentSection, 1000); // 네비게이션 후 약간의 지연을 둠
		};
		document.addEventListener("yt-navigate-finish", handleYoutubeNavigate);

		// 윈도우 리사이즈 이벤트 리스너 추가
		const handleResize = () => {
			checkForCommentSection();
		};
		window.addEventListener("resize", handleResize);

		// 컴포넌트 언마운트 시 정리
		return () => {
			observer.disconnect();
			document.removeEventListener("yt-navigate-finish", handleYoutubeNavigate);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	if (!isVisible) return null;

	return (
		<div
			style={{
				position: "absolute",
				top: dimensions.top,
				left: dimensions.left,
				width: dimensions.width,
				height: dimensions.height,
				backgroundColor: "rgba(255, 255, 255)",
				zIndex: 9999,
				display: "flex",
				flexDirection: "column",
				padding: "20px",
				boxSizing: "border-box",
				overflow: "auto",
			}}
		>
			{children}
		</div>
	);
};

export default Background;
