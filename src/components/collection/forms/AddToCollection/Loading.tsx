import React from "react";

const Loading = () => {
  return (
    <div>
      {[...new Array(3)].map((_, index) => (
        <div key={index} className="flex gap-4 items-center mb-3">
          <div className="bg-slate-300 dark:bg-slate-800 w-[3.3rem] h-[3.5rem] sm:w-[4.3rem] sm:h-[4.5rem] animate-pulse rounded-lg"></div>
          <div>
            <div className="w-28 h-3 rounded-lg bg-slate-300 dark:bg-slate-800 animate-pulse mb-1"></div>
            <div className="w-20 h-3 rounded-lg bg-slate-300 dark:bg-slate-800 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
