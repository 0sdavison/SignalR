import React, { useContext, useEffect, useState } from "react";
import { SignalRContext } from "./SignalRContext";

export interface ConnectionStatusProps {}

const ConnectionStatus: React.FunctionComponent<
  Readonly<ConnectionStatusProps>
> = () => {
  const [connectionState, setConnectionState] = useState(
    SignalRContext.connection.state
  );
  useEffect(
    () => setConnectionState(SignalRContext.connection.state),
    [SignalRContext.connection.state]
  );

  return <p>{connectionState}</p>;
};

export default ConnectionStatus;
