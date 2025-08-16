import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import React from "react";

const CompanionLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;

  const subject = filters.subject ?? "";
  const topic = filters.topic ?? "";

  const companions = await getAllCompanions({ subject, topic });

  console.log(companions);

  return (
    <main>
      <section className="flex justify-between gap-4 flex-col">
        <div className="w-full flex justify-between">
          <h1>Companion Library</h1>
          <div className="flex gap-4">
            <SearchInput />
            <SubjectFilter />
          </div>
        </div>
        <section className="companions-grid">
          {companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))}
        </section>
      </section>
    </main>
  );
};

export default CompanionLibrary;
