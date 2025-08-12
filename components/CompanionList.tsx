import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getSubjectColor } from "@/lib/utils";
import Link from "next/link";

// Assuming Companion type is defined elsewhere
// interface Companion { ... }

interface CompanionListProps {
  title: string;
  companions: Companion[];
  classNames?: string;
}

const CompanionList = ({
  title,
  companions,
  classNames,
}: CompanionListProps) => {
  return (
    <article className={cn("companion-list w-2/3", classNames)}>
      <h2 className="font-bold text-2xl mb-4">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60%] text-lg">Lessons</TableHead>
            <TableHead className="w-[20%] text-lg">Subject</TableHead>
            <TableHead className="w-[20%] text-lg text-right">
              Duration
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.map(({ id, subject, name, topic, duration }) => (
            <TableRow key={id}>
              <TableCell className="w-[60%]">
                <Link
                  href={`/companion/${id}`}
                  className="flex gap-4 items-center"
                >
                  <div
                    className="size-[72px] flex-shrink-0 flex items-center justify-center rounded-lg max-md:hidden"
                    style={{ backgroundColor: getSubjectColor(subject) }}
                  >
                    <Image
                      src={`/icons/${subject}.svg`}
                      alt={subject}
                      width={35}
                      height={35}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-xl">{name}</p>
                    <p className="text-base text-muted-foreground">{topic}</p>
                  </div>
                </Link>
              </TableCell>

              <TableCell className="w-[20%]   ">
                <div className="subject-badge hidden lg:inline w-fit">
                  {subject}
                </div>
                <div
                  className="subject-badge  w-fit lg:hidden size-[35px] flex justify-center items-center rounded-lg"
                  style={{ backgroundColor: getSubjectColor(subject) }}
                >
                  <Image
                    alt={subject}
                    width={20}
                    height={20}
                    src={`/icons/${subject}.svg`}
                  />
                </div>
              </TableCell>
              <TableCell className="w-[20%] text-right">
                <div className="duration-text lg:hidden    items-center justify-center flex gap-2">
                  {duration}{" "}
                  <Image
                    src={"/icons/clock.svg"}
                    height={10}
                    width={10}
                    alt="clock"
                  />
                </div>
                <p className="hidden lg:inline">{duration} mins</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionList;
