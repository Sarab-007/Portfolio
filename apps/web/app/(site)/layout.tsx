import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-bg min-h-screen">
      {/* Background layers */}
      <div className="bg-fx" aria-hidden="true" />
      <div className="bg-leaks" aria-hidden="true" />

      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
