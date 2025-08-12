"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { subjects } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject") || "";

  const [subjectQuery, setSubjectQuery] = useState("");

  useEffect(() => {
    let newUrl;

    if (subjectQuery === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subjectQuery,
      });
    }
    router.push(newUrl, { scroll: false });
  }, [subjectQuery]);

  return (
    <div>
      <Select
        name="subject"
        onValueChange={setSubjectQuery}
        value={subjectQuery}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={"all"} value={"all"}>
            All
          </SelectItem>
          {subjects.map((sub) => (
            <SelectItem key={sub} value={sub}>
              {sub}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubjectFilter;
