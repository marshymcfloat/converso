import CompanionComponent from "@/components/CompanionComponent";
import { getCompanion } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

interface CompanionSessionProps {
  params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();

  if (!user) redirect("/sign-in");
  if (!companion) redirect("/companions");
  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2 ">
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{ background: getSubjectColor(companion.subject) }}
          >
            <Image
              width={35}
              height={35}
              alt={companion.subject}
              src={`/icons/${companion.subject}.svg`}
            />
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex items-center gap-2 ">
              <p className="font-bold  text-2xl">{companion.name}</p>
              <p className="subject-badge max-sm:hidden">{companion.subject}</p>
            </div>
            <p className="text-lg">{companion.topic}</p>
          </div>
        </div>
        <div className="flex items-start text-2xl max-md:hidden">
          {companion.duration} minutes
        </div>
      </article>
      <CompanionComponent
        {...companion}
        companionId={companion.id}
        userName={user.firstName}
        userImage={user.imageUrl}
      />
    </main>
  );
};

export default CompanionSession;
