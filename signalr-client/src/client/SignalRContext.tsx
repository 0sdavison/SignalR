import * as signalR from "@microsoft/signalr";
import React, { createContext, useState } from "react";

export const SignalRContext = createContext<signalR.HubConnection>(undefined);

export interface SignalRProviderProps extends React.PropsWithChildren {}

const SignalRProvider: React.FunctionComponent<
  Readonly<SignalRProviderProps>
> = ({ children }) => {
  const [connection, setConnection] = useState(
    new signalR.HubConnectionBuilder().withUrl("/hub").build()
  );

  return (
    <SignalRContext.Provider value={connection}>
      {children}
    </SignalRContext.Provider>
  );
};

export default SignalRProvider;
