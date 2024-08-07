import * as path from "path"; // Ensure polyfill is configured if using 'path'
import React from "react";
import ReactDOM from "react-dom";
import Background from "./components/Background";
import Button from "./components/common/Button";

// YouTube 페이지가 완전히 로드된 후 우리의 컴포넌트를 삽입합니다.
window.addEventListener('load', () => {
    // 컨테이너 생성
    const container = document.createElement("div");
    container.id = "my-extension-root";
    document.body.appendChild(container);
  
    // React 컴포넌트 렌더링
    ReactDOM.render(
      <React.Fragment>
        <Background>
            <Button text="Filter with AI ✨" 
            onClick={() => console.log('Primary 클릭')} 
            type="primary" 
            />
            <Button text="Liked Comment 🩷" 
            onClick={() => console.log('Primary 클릭')} 
            type="secondary" 
            />
        </Background>
      </React.Fragment>,
      container
    );
  });