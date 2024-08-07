import * as path from "path"; // Ensure polyfill is configured if using 'path'
import React from "react";
import ReactDOM from "react-dom";
import Background from "./components/Background";
import { LoadingBar } from "./components/LoadingBar";

// YouTube 페이지가 완전히 로드된 후 우리의 컴포넌트를 삽입합니다.
window.addEventListener("load", () => {
	// 컨테이너 생성
	const container = document.createElement("div");
	container.id = "my-extension-root";
	document.body.appendChild(container);

	// React 컴포넌트 렌더링
	ReactDOM.render(
		<React.Fragment>
			<Background>
				{<div style={{ height: "10px" }}>Hi</div>}
				<LoadingBar />
			</Background>
		</React.Fragment>,
		container
	);
});
