import HeroSection from "@/components/HeroSection";
import AudienceSwitcher from "@/components/AudienceSwitcher";
import ServicesBento from "@/components/ServicesBento";
import TrustBlock from "@/components/TrustBlock";
import ReviewsBlock from "@/components/ReviewsBlock";
import LocationSection from "@/components/LocationSection";
import LeadForm from "@/components/LeadForm";

const Index = () => {
  return (
    <>
      <HeroSection />
      <AudienceSwitcher />
      <ServicesBento />
      <TrustBlock />
      <ReviewsBlock />
      <LeadForm />
      <LocationSection />
    </>
  );
};

export default Index;
