import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Features from "@/components/landing/Features";
import RepresentativeForm from "@/components/landing/RepresentativeForm";
import Footer from "@/components/landing/Footer";
import PromoPopup from "@/components/landing/PromoPopup";

const Index = () => {
  return (
    <div className="min-h-screen">
      <PromoPopup />
      <Header />
      <Hero />
      <About />
      <Features />
      <RepresentativeForm />
      <Footer />
    </div>
  );
};

export default Index;
