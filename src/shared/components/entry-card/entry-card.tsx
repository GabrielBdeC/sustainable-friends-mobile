import React, { FC } from "react";
import "./entry-card.css";

const EntryCard: FC = ({ children }) => {
  return <div className="entry-card">{children}</div>
}

export default EntryCard;