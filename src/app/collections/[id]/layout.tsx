import "@/styles/layoutStyles.css";
import SearchForm from "@/components/forms/SearchForm";

function CollectionPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="container pt-12">{children}</div>;
}

export default CollectionPageLayout;
