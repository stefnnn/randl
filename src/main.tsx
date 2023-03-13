import React from "preact/compat";

import { render } from "preact";
import { App } from "./app";
import "./styles/globals.css";

render(<App />, document.getElementById("app") as HTMLElement);
