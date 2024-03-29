import React from "react";
import Button from "./Common/Button";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";

export default function ScrollButton() {
  return (
    <div className="flex flex-col w-14 fixed top-[85%] text-2xl right-[580px] transform -translate-x-1/2 -translate-y-1/2 z-50">
      <Button
        text={<FaArrowAltCircleUp />}
        className="rounded-lg"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />

      <Button
        text={<FaArrowAltCircleDown />}
        className="rounded-lg"
        onClick={() =>
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          })
        }
      />
    </div>
  );
}
