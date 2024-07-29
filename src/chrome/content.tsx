import * as path from "path"; // Ensure polyfill is configured if using 'path'
import React from "react";
import ReactDOM from "react-dom";
import YoutubeButton from "./YoutubeButton";

// Create a container to mount the React component
const container = document.createElement("div");
container.id = "my-extension-root";
document.body.appendChild(container);

// Render the React component into the container
ReactDOM.render(<YoutubeButton />, container);
