import React from "react";
import Button from "../Common/Button";

export default function MapNavi() {
  return (
    <div className="mb-3 border-gray-200 border-solid border-b-2">
      <Button
        className="mr-2 px-5 bg-white text-slate-500 hover:text-black"
        text="객실"
      />
      <Button
        className="px-5 bg-white text-slate-500 hover:text-black"
        text="위치"
      />
    </div>
  );
}
