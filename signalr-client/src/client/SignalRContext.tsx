import React from "react";
import { createSignalRContext } from "react-signalr/signalr";
import { CONFIG } from "../config";

export const SignalRContext = createSignalRContext();

export interface SignalRProviderProps extends React.PropsWithChildren {}

const SignalRProvider: React.FunctionComponent<
  Readonly<SignalRProviderProps>
> = ({ children }) => {
  return (
    <SignalRContext.Provider url={CONFIG.signalRServerUrl + "/hub"}>
      {children}
    </SignalRContext.Provider>
  );
};

export default SignalRProvider;
