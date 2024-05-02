"use client";

const Loading = () => {
  const height = "h-[200px]";
  return (
    <div className="grid gap-5 grid-cols-4">
      <div>
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[290px]" />
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[390px]" />
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[245px]" />
      </div>
      <div>
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[330px]" />
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[500px]" />
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[290px]" />
      </div>
      <div>
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[430px]" />
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[288px]" />
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[300px]" />
      </div>
      <div>
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[330px]" />
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[350px]" />
        <div className="bg-slate-300 mb-5 animate-pulse rounded-xl h-[300px]" />
      </div>
    </div>
  );
};

export default Loading;
