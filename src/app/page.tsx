import SearchForm from "@/components/forms/SearchForm";

export default function Home() {
  return (
    <div className="h-[calc(100vh-90px)] md:bg-[url('/assets/hero-left.png'),url('/assets/hero-right.png')] bg-no-repeat bg-[position:0_center,100%_center] bg-[size:26%] grid justify-items-center">
      <div className="mt-32 sm:mt-44 w-full max-w-[min(34.68rem,90%)]">
        <h1 className="text-4xl sm:text-5xl font-semibold text-center mb-4">
          Search
        </h1>
        <p className="text-center font-medium mb-6">
          Search high-resolution images from Unsplash
        </p>
        <SearchForm />
      </div>
    </div>
  );
}
