"use client";

import Skeleton from "@/components/skeleton";
import { useEditObject } from "@/services/edit-object";
import { useGetObject } from "@/services/get-object";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditObjectPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data } = useGetObject(id!);
  const updateObject = useEditObject();

  const methods = useForm();

  useEffect(() => {
    methods.reset({
      name: data?.name || null,
      color: data?.color || null,
      capacity: data?.capacity || null,
    });
  }, [data, methods]);

  function onSubmit(data: any) {
    const payload = {
      name: data.name,
      color: data.color,
      capacity: data.capacity,
    };

    updateObject.mutate({ id, payload });
  }

  if (!data) return <Skeleton />;
  return (
    <div className="text-white space-y-12 p-4 lg:p-8">
      <button
        onClick={() => window.history.back()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded"
      >
        Back
      </button>

      <h1 className="text-2xl">Edit Object</h1>

      <form className="space-y-12">
        <input
          {...methods.register("name")}
          id="name"
          type="text"
          placeholder="Enter Gadget Name"
          className=" p-3 focus:outline-none w-full bg-[#3D3F55] placeholder:text-white placeholder:text-sm"
        />

        <input
          {...methods.register("color")}
          id="color"
          type="text"
          placeholder="Enter Color Name"
          className=" p-3 focus:outline-none w-full bg-[#3D3F55] placeholder:text-white placeholder:text-sm"
        />

        <input
          {...methods.register("capacity")}
          id="capacity"
          type="text"
          placeholder="Enter Capacity"
          className=" p-3 focus:outline-none w-full bg-[#3D3F55] placeholder:text-white placeholder:text-sm"
        />
        {/* add button */}
        <button
          onClick={methods.handleSubmit(onSubmit)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded"
        >
          {updateObject.isPending ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
