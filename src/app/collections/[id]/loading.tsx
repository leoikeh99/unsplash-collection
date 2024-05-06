"use client";

import Loading from "@/components/Photoslist/Loading";

const loading = () => {
  return (
    <div>
      <div className="max-w-[25rem] mx-auto flex flex-col items-center gap-7 mb-10">
        <div className="flex flex-col items-center gap-1">
          <div className="w-44 h-5 rounded-lg bg-slate-300 dark:bg-slate-800 animate-pulse mb-1"></div>
          <div className="w-20 h-3 rounded-lg bg-slate-300 dark:bg-slate-800 animate-pulse"></div>
        </div>
        <div className="flex justify-center gap-3">
          <div className="w-12 h-3 rounded-lg bg-slate-300 dark:bg-slate-800 animate-pulse"></div>
          <div className="w-12 h-3 rounded-lg bg-slate-300 dark:bg-slate-800 animate-pulse">
            {" "}
          </div>
        </div>
      </div>
      <Loading />
    </div>
  );
};

export default loading;
