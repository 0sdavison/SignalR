import React, { useContext, useEffect, useState } from "react";
import { SignalRContext } from "./SignalRContext";

export interface ConnectionStatusProps {}

const ConnectionStatus: React.FunctionComponent<
  Readonly<ConnectionStatusProps>
> = () => {
  const connection = useContext(SignalRContext);

  return <p>{connection.state}</p>;
};

export default ConnectionStatus;
