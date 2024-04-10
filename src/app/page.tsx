import SearchForm from "@/components/forms/SearchForm";

export default function Home() {
  return (
    <div className="h-[calc(100vh-90px)] bg-[url('/assets/hero-left.png'),url('/assets/hero-right.png')] bg-no-repeat bg-[position:0_center,100%_center] bg-[size:26%] grid justify-items-center">
      <div className="mt-44 w-full max-w-[555px]">
        <h1 className="text-5xl font-semibold text-center text-[#121826] mb-4">
          Search
        </h1>
        <p className="text-center font-medium text-[#121826] mb-6">
          Search high-resolution images from Unsplash
        </p>
        <SearchForm />
      </div>
    </div>
  );
}
