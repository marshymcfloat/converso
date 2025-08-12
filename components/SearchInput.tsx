"use client";

import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import Image from "next/image";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") || "";

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebouncefn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(delayDebouncefn);
  }, [searchParams, searchQuery, router, pathname]);

  return (
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Image src="/icons/search.svg" height={15} width={15} alt="search" />
      <input
        type="text"
        placeholder="Search companions..."
        className="outline-none"
        value={searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
      />
    </div>
  );
};

export default SearchInput;
