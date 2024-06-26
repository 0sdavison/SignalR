import React, { useEffect, useState } from "react";

export interface ButtonProps extends React.PropsWithChildren {
  onClick: () => void;
}

const Button: React.FunctionComponent<Readonly<ButtonProps>> = ({
  onClick,
  children,
}) => {
  return <div onClick={onClick}>{children}</div>;
};

export default Button;
