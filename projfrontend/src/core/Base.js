import React from "react";
import Foot from "./foot";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "display p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron text-center">
        <h1 className="display-4">{title}</h1>
        <h5 className="lead">{description}</h5>
      </div>
      <div className={className}>{children}</div>
    </div>
    <>
      <Foot />
    </>
  </div>
);

export default Base;
