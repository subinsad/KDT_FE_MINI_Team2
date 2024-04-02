import React from "react";

const DetailImageSkeleton = () => {
  return (
    <div className="max-w-mw mx-auto">
      <div className="h-[530px] flex gap-2 mt-8 mb-10">
        <div className="w-[656px] h-full rounded-3xl bg-gray-200 " />
        <div className="grid grow gap-2 grid-rows-2 grid-cols-2">
          <div className=" rounded-3xl bg-gray-200 " />
          <div className=" rounded-3xl bg-gray-200 " />
          <div className=" rounded-3xl bg-gray-200 " />
          <div className=" rounded-3xl bg-gray-200 " />
        </div>
      </div>
    </div>
  );
};

export default DetailImageSkeleton;
