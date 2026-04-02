import { Hero } from "@/components/Hero/Hero";
import { Services } from "@/components/Services/Services";
import { About } from "@/components/About/About";
import { Stats } from "@/components/Stats/Stats";
import { Advantages } from "@/components/Advantages/Advantages";
import { Clients } from "@/components/Clients/Clients";
import { ContactInfo } from "@/components/ContactInfo/ContactInfo";
import { ContactForm } from "@/components/ContactForm/ContactForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Stats />
      <Advantages />
      <Clients />
      <ContactInfo />
      <ContactForm />
    </>
  );
}
