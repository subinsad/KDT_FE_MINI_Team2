import React from "react";

const ListSkeleton = () => {
  return (
    <>
      <div className="stayItemBox flex gap-6 items-center">
        <div className="w-[480px] h-[270px] bg-gray-200 rounded-3xl" />
        <div className="stayDetail flex flex-col gap-16 grow items-end">
          <div className="flex flex-col w-72">
            <div className="flex justify-between text-sm ">
              <span className="w-16 h-4 mb-2 bg-gray-200 rounded-3xl"></span>
              <span className="w-8 h-4 bg-gray-200 rounded-3xl"></span>
            </div>
            <span className="w-20 h-4 mb-2 bg-gray-200 rounded-3xl"></span>
            <span className="w-16 h-4 bg-gray-200 rounded-3xl"></span>
          </div>
          <div className="w-fit flex flex-col items-end">
            <div className="flex gap-1 mb-1 items-center">
              <div className="w-20 h-4 mb-2 bg-gray-200 rounded-3xl"></div>
            </div>
            <span className=" w-32 h-6 bg-gray-200 rounded-3xl"></span>
          </div>
        </div>
      </div>
      <div className="stayItemBox flex gap-6 items-center">
        <div className="w-[480px] h-[270px] bg-gray-200 rounded-3xl" />
        <div className="stayDetail flex flex-col gap-16 grow items-end">
          <div className="flex flex-col w-72">
            <div className="flex justify-between text-sm ">
              <span className="w-16 h-4 mb-2 bg-gray-200 rounded-3xl"></span>
              <span className="w-8 h-4 bg-gray-200 rounded-3xl"></span>
            </div>
            <span className="w-20 h-4 mb-2 bg-gray-200 rounded-3xl"></span>
            <span className="w-16 h-4 bg-gray-200 rounded-3xl"></span>
          </div>
          <div className="w-fit flex flex-col items-end">
            <div className="flex gap-1 mb-1 items-center">
              <div className="w-20 h-4 mb-2 bg-gray-200 rounded-3xl"></div>
            </div>
            <span className=" w-32 h-6 bg-gray-200 rounded-3xl"></span>
          </div>
        </div>
      </div>
      <div className="stayItemBox flex gap-6 items-center">
        <div className="w-[480px] h-[270px] bg-gray-200 rounded-3xl" />
        <div className="stayDetail flex flex-col gap-16 grow items-end">
          <div className="flex flex-col w-72">
            <div className="flex justify-between text-sm ">
              <span className="w-16 h-4 mb-2 bg-gray-200 rounded-3xl"></span>
              <span className="w-8 h-4 bg-gray-200 rounded-3xl"></span>
            </div>
            <span className="w-20 h-4 mb-2 bg-gray-200 rounded-3xl"></span>
            <span className="w-16 h-4 bg-gray-200 rounded-3xl"></span>
          </div>
          <div className="w-fit flex flex-col items-end">
            <div className="flex gap-1 mb-1 items-center">
              <div className="w-20 h-4 mb-2 bg-gray-200 rounded-3xl"></div>
            </div>
            <span className=" w-32 h-6 bg-gray-200 rounded-3xl"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListSkeleton;
