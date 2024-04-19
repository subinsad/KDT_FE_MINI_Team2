import React from "react";

function NoticeDetailSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-1 pb-4 mb-6 border-b-2 border-solid border-gray-300">
        <b className="w-80 h-6 mb-2 bg-gray-200 rounded-3xl"></b>
        <div className="flex gap-1">
          <span className="w-24 h-4 mb-2 bg-gray-200 rounded-3xl"></span>
          <span className="text-gray-300">|</span>
          <span className="w-8 h-4 mb-2 bg-gray-200 rounded-3xl"></span>
          <span className="text-gray-300">|</span>
          <span className="w-8 h-4 mb-2 bg-gray-200 rounded-3xl"></span>
        </div>
      </div>
      <div className="w-[20%] h-4 mb-2 bg-gray-200 rounded-3xl"></div>
      <div className="w-[60%] h-4 mb-2 bg-gray-200 rounded-3xl"></div>
      <div className="w-[80%] h-4 mb-2 bg-gray-200 rounded-3xl"></div>
      <div className="w-[40%] h-4 mb-2 bg-gray-200 rounded-3xl"></div>
      <div className="w-[20%] h-4 mb-2 bg-gray-200 rounded-3xl"></div>
      <div className="w-[60%] h-4 mb-2 bg-gray-200 rounded-3xl"></div>
      <div className="w-[80%] h-4 mb-2 bg-gray-200 rounded-3xl"></div>
      <div className="w-[40%] h-4 mb-2 bg-gray-200 rounded-3xl"></div>
    </>
  );
}

export default NoticeDetailSkeleton;
