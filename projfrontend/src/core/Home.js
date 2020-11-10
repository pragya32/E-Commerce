import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";

export default function Home() {
  console.log("API IS", API);

  return (
    <Base title="Heyo GEEKS!!!" description="Welcome to the Tshirt Store">
      <div className="container">hiii</div>
    </Base>
  );
}
