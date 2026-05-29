import React from "react";
import NoTran from "../../src/assets/trans.png";

function NoTransactions() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        marginBottom: "2rem",
      }}
    >
      <img src={NoTran} style={{ width: "400px", margin: "4rem" }} alt="no transactions" />
      <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
        You Have No Transactions Currently
      </p>
    </div>
  );
}
export default NoTransactions;
