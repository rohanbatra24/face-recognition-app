import React from "react";

const Navigation = (props) => {
  if (props.isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => props.onRouteChange("signout")}
          className="f3 dim link black underline pa3 pointer"
        >
          Sign out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => props.onRouteChange("home")}
          className="f3 dim link black underline pa3 pointer"
        >
          Home
        </p>
        <p
          onClick={() => props.onRouteChange("signin")}
          className="f3 dim link black underline pa3 pointer"
        >
          Sign in
        </p>
        <p
          onClick={() => props.onRouteChange("register")}
          className="f3 dim link black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
