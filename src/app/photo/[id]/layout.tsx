import "@/styles/layoutStyles.css";

function PhotoPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="container">{children}</div>;
}

export default PhotoPageLayout;
