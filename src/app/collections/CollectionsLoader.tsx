"use client";

const CollectionsLoader = () => {
  return (
    <div className="grid sm:grid-cols-2 tab:grid-cols-3 gap-8 max-w-[24rem] sm:max-w-[45rem] tab:max-w-full mx-auto">
      {[...new Array(4)].map((_, index) => (
        <div
          key={index}
          className="h-[13rem] xs:h-[17rem] rounded-md bg-slate-300 dark:bg-slate-800 animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default CollectionsLoader;
