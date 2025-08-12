import React from "react";
import { Button } from "@/components/ui/button";
import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import { recentSessions } from "@/constants";
import CTA from "@/components/CTA";

const Page = () => {
  function handlButtonClick() {}

  return (
    <main>
      <h1>Dashboard</h1>

      <section className="home-section ">
        <CompanionCard
          id="123"
          title={"Neura the Brainy Explorer"}
          subject={"Science"}
          topic={"Neural Network of the Brain"}
          duration={45}
          color="#E5D0FF"
        />

        <CompanionCard
          id="123"
          title={"Countsy the Number Wizard"}
          subject={"Maths"}
          topic={"Derivatives & Integrals"}
          duration={30}
          color="#FFDA6E"
        />

        <CompanionCard
          id="123"
          title={"Verba the Vocabulary Builder"}
          subject={"English"}
          topic={"English Literature"}
          duration={30}
          color="#BDE7FF"
        />
      </section>
      <section className="home-section">
        <CompanionList title="meow" companions={recentSessions} classNames="" />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
