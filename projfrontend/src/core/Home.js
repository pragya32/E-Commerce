import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./card";

export default function Home() {
  return (
    <Base title="Heyo GEEKS!!!" description="Welcome to the Tshirt Store">
      <div className="container">
        <div className="row text-center">
          <div className="col-4">
            <Card />
          </div>
        </div>
      </div>
    </Base>
  );
}
