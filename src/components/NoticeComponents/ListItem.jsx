import React from "react";
import { Link } from "react-router-dom";

function ListItem({ title, text, date, link }) {
  return (
    <Link to={link}>
      <li className="flex flex-col gap-2 pt-4 pb-4 border-b-2 border-solid border-gray-300 large:flex-row large:justify-between large:items-center">
        {/* <li className="flex justify-between items-center pt-4 pb-4 border-b-2 border-solid border-gray-300"> */}
        <p className="text-lg font-semibold"> {title} </p>
        <p className="text-gray-500">{date} </p>
      </li>
    </Link>
  );
}

export default ListItem;
