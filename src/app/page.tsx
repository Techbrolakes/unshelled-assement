"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Skeleton from "@/components/skeleton";
import { useGetAllObjects } from "@/services/get-objects";
import { format } from "date-fns";
import PaginateData from "@/components/paginate-data";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const { data } = useGetAllObjects(currentPage);

  useEffect(() => {
    router.push(`/?page=${currentPage}`);
  }, [currentPage, router]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!data) return <Skeleton />;
  return (
    <div className="text-white min-h-screen space-y-14 py-4">
      <h1 className="text-3xl">List of objects</h1>

      <section className="grid grid-cols-3 gap-10">
        {data?.posts?.map(({ _id, name, color, createdAt }: any) => (
          <div
            onClick={() => router.push(`/${_id}`)}
            key={_id}
            className="bg-[#2A2B3E] hover:bg-[#1C1E32] cursor-pointer p-4 h-full shadow-lg rounded-lg space-y-6"
          >
            <h1>{name}</h1>
            <p>Color - {color}</p>
            <h6 className="text-sm">
              Date Created -
              {format(new Date(createdAt), "yyyy-MM-dd: HH:mm:ss")}
            </h6>
          </div>
        ))}
      </section>

      <PaginateData
        pagination={data?.pagination!}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
