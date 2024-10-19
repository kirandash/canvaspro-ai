"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { useDuplicateProject } from "@/features/projects/api/use-duplicate-project";
import { useFetchProjects } from "@/features/projects/api/use-fetch-projects";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  BadgeHelp,
  CircleAlert,
  Copy,
  Ellipsis,
  File,
  LoaderPinwheel,
  SquareArrowOutUpRight,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

dayjs.extend(relativeTime);

const RecentDesigns = () => {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchProjects();
  const [ConfirmDialog, confirm] = useConfirmDialog(
    "Warning!",
    "Are you sure you want to delete this project?"
  );

  const mutation = useCreateProject();
  const duplicateMutation = useDuplicateProject();
  const deleteMutation = useDeleteProject();
  const router = useRouter();

  const handleCopy = (id: string) => {
    duplicateMutation.mutate(
      {
        id,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/design/${data.id}/edit`);
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  const handleDelete = async (id: string) => {
    const okToDelete = await confirm();

    if (!okToDelete) {
      return;
    }

    deleteMutation.mutate(
      {
        id,
      },
      {
        onSuccess: ({ data }) => {
          toast.success(`Project ${data.name} deleted successfully`);
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  const handleCreate = () => {
    mutation.mutate(
      {
        name: "Untitled design",
        json: "",
        height: 800,
        width: 800,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/design/${data.id}/edit`);
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  if (status === "pending") {
    return (
      <div className="flex w-full h-36 justify-center items-center">
        <LoaderPinwheel className="animate-spin h-[38px] w-[38px]" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col space-y-4 w-full justify-center items-center">
        <div className="px-4 text-red-500 flex gap-1">
          <CircleAlert />
          Failed to fetch designs
        </div>
        <Button asChild variant={"secondary"}>
          <Link href="mailto:dummy@bgwebagency.in" className="flex gap-1">
            <BadgeHelp /> Help
          </Link>
        </Button>
      </div>
    );
  }

  if (!data.pages.length || !data.pages[0].data.length) {
    return (
      <div className="flex flex-col space-y-2 justify-center items-center">
        <File height={100} width={100} />
        <div className="flex flex-col justify-center items-center">
          <h3 className="font-bold">Possibilities await</h3>
          <p>
            Get started by{" "}
            <Button
              variant={"link"}
              onClick={handleCreate}
              disabled={mutation.isPending}
            >
              creating a design.
            </Button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ConfirmDialog />
      <h3>Recent designs</h3>
      <Table>
        <TableBody>
          {data.pages.map((group) => (
            <>
              {group.data.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    {project.thumbnailUrl && (
                      <img
                        width={56}
                        height={56}
                        src={project.thumbnailUrl}
                        alt="Design thumbnail"
                        className="rounded-md object-cover size-14"
                      />
                    )}
                  </TableCell>
                  <TableCell
                    className="cursor-pointer"
                    onClick={() => router.push(`/design/${project.id}/edit`)}
                  >
                    {project.name}
                  </TableCell>
                  <TableCell
                    className="cursor-pointer"
                    onClick={() => router.push(`/design/${project.id}/edit`)}
                  >
                    {project.width} x {project.height}
                  </TableCell>
                  <TableCell
                    className="cursor-pointer"
                    onClick={() => router.push(`/design/${project.id}/edit`)}
                  >
                    {dayjs(project.updatedAt).fromNow()}
                  </TableCell>
                  <TableCell className="flex items-center justify-end">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} size="icon">
                          <Ellipsis />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="min-w-32 sm:min-w-80 max-w-32 sm:max-w-80"
                      >
                        <DropdownMenuItem
                          className="cursor-pointer flex gap-2"
                          onClick={() =>
                            // open in a new tab
                            window.open(`/design/${project.id}/edit`, "_blank")
                          }
                        >
                          <SquareArrowOutUpRight />
                          Open in a new tab
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer flex gap-2"
                          onClick={() => handleCopy(project.id)}
                          disabled={duplicateMutation.isPending}
                        >
                          <Copy />
                          Make a copy
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer flex gap-2"
                          onClick={() => handleDelete(project.id)}
                        >
                          <Trash />
                          Move to trash
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>
      {hasNextPage && (
        <div className="flex justify-center w-full">
          <Button
            variant={"ghost"}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
};

export default RecentDesigns;
