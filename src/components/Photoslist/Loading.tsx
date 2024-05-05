"use client";

const Loading = () => {
  const height = "h-[200px]";
  return (
    <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 tab:grid-cols-4">
      <div className="hidden tab:block">
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[290px]" />
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[390px]" />
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[245px]" />
      </div>
      <div className="hidden sm:block">
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[280px] tab:h-[330px]" />
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[400px] tab:h-[500px]" />
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[200px] tab:h-[290px]" />
      </div>
      <div>
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[280px] sm:h-[330px] tab:h-[430px]" />
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[240px] tab:h-[288px]" />
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[250px] sm:h-[300px]" />
      </div>
      <div>
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[240px] sm:h-[280px] tab:h-[330px]" />
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[255px] sm:h-[300px] tab:h-[350px]" />
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[260px] tab:h-[300px]" />
      </div>
    </div>
  );
};

export default Loading;
