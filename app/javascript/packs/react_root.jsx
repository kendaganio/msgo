// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";

import App from "../App";
import { AuthProvider } from "../contexts/AuthContext";
import { UserProvider } from "../contexts/UserContext";

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    heading: "'Manrope', sans-serif",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <AuthProvider>
      <UserProvider>
        <ThemeProvider theme={customTheme}>
          <CSSReset />
          <App />
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>,
    document.getElementById("app-root")
  );
});
