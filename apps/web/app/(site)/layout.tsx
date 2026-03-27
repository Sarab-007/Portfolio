import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}