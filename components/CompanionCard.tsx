import Image from "next/image";
import { Button } from "./ui/button";

interface CompanionCardProps {
  id: string;
  subject: string;
  title: string;
  duration: number;
  topic: string;
  color: string;
}

const CompanionCard = ({
  duration,
  id,
  subject,
  title,
  topic,
  color,
}: CompanionCardProps) => {
  return (
    <div className="companion-card" style={{ backgroundColor: color }} key={id}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>

        <button className="companion-bookmark">
          <Image
            src="/icons/bookmark.svg"
            alt="bookmark"
            width={14}
            height={14}
          />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl">{title}</h1>
        <p className="text-sm">{topic}</p>
        <p className="flex gap-2 text-xs ">
          <Image
            src={"/icons/clock.svg"}
            width={14}
            height={14}
            alt="clock icon"
          />{" "}
          {duration} mins
        </p>
      </div>

      <button className="btn-primary w-full justify-center">
        Launch Companion
      </button>
    </div>
  );
};

export default CompanionCard;
