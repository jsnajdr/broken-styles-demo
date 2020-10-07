import React from 'react';
import "./card.css";

export default function Card({ className, children }) {
  return <div className={"card " + className}>{children}</div>;
}
