import React, { useContext, useEffect, useState } from "react";
import { SignalRContext } from "./SignalRContext";

export interface ConnectionStatusProps {}

const ConnectionStatus: React.FunctionComponent<
  Readonly<ConnectionStatusProps>
> = () => {
  const connection = useContext(SignalRContext);

  const startConnection = async () => {
    if (!connection) {
      return;
    }

    connection.start().catch((err) => {
      console.log(err);
      connection.stop();
    });
  };

  useEffect(() => {
    startConnection();
  });

  return <p>{connection.state}</p>;
};

export default ConnectionStatus;
