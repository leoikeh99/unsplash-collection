import "@/styles/layoutStyles.css";
import SearchForm from "@/components/forms/SearchForm";

function SearchPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="h-20 bg-[url('/assets/gradiend-bg.svg')] bg-no-repeat bg-cover"></div>
      <div className="max-w-[min(34.68rem,95%)] mx-auto -mt-6 mb-10">
        <SearchForm />
      </div>
      <div className="container">{children}</div>
    </div>
  );
}

export default SearchPageLayout;
