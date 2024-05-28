"use client";

import Skeleton from "@/components/skeleton";
import { useDeleteObject } from "@/services/delete-object";
import { useGetObject } from "@/services/get-object";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function SingleObjectPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { data } = useGetObject(params.id);
  const deleteObject = useDeleteObject();

  const handleDelete = async () => {
    await deleteObject.mutate(params.id);
  };

  if (!data) return <Skeleton />;
  return (
    <div className="text-white space-y-8 p-4 lg:p-8">
      <button
        onClick={() => window.history.back()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded"
      >
        Back
      </button>

      <h1 className="text-2xl">Full Details of - {data?.name}</h1>

      <h4>
        Color - <span className="font-bold">{data?.color}</span>
      </h4>

      <h4>
        Capacity - <span className="font-bold">{data?.capacity}</span>
      </h4>

      <h6 className="text-sm">
        Date Created -{" "}
        <span className="font-bold">
          {format(new Date(data?.createdAt), "yyyy-MM-dd: HH:mm:ss")}
        </span>
      </h6>

      <h6 className="text-sm">
        Last Updated -{" "}
        <span className="font-bold">
          {format(new Date(data?.updatedAt), "yyyy-MM-dd: HH:mm:ss")}
        </span>
      </h6>

      <section className="flex">
        <button
          onClick={() => router.push(`/edit?id=${params.id}`)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded ml-2"
        >
          Delete
        </button>
      </section>
    </div>
  );
}
