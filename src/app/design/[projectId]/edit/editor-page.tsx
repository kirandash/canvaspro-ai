"use client";
import { Button } from "@/components/ui/button";
import Editor from "@/features/editor/components/editor";
import { useFetchProject } from "@/features/projects/api/use-fetch-project";
import {
  ArrowLeft,
  BadgeHelp,
  CircleAlert,
  LoaderPinwheel,
} from "lucide-react";
import Link from "next/link";

type Props = {
  projectId: string;
};

const EditorPage = ({ projectId }: Props) => {
  const { data, isLoading, isError } = useFetchProject(projectId);

  if (isLoading || !data) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <LoaderPinwheel className="animate-spin h-[38px] w-[38px]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col space-y-4 w-full h-screen justify-center items-center">
        <div className="px-4 text-red-500 flex gap-1">
          <CircleAlert />
          Failed to fetch design
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/" className="flex gap-1">
              <ArrowLeft /> Go back
            </Link>
          </Button>
          <Button asChild variant={"secondary"}>
            <Link href="mailto:dummy@bgwebagency.in" className="flex gap-1">
              <BadgeHelp /> Help
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return <Editor initialData={data} />;
};

export default EditorPage;
