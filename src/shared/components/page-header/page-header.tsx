import React, { FC } from "react";
import "./page-header.css";

import { Link } from "react-router-dom";

interface props {
  to: string
}

const PageHeader: FC<props> = (props, { children }): JSX.Element => {
  return <Link to={props.to} className="page-header">{children}</Link>
}

export default PageHeader;