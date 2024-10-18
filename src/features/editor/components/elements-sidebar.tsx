import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ElementsSidebarHeader from "@/features/editor/components/elements-sidebar-header";
import Shape from "@/features/editor/components/shape";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import { Editor, SelectedTool } from "@/features/editor/types";
import { useFetchImages } from "@/features/images/api/use-fetch-images";
import { cn } from "@/lib/utils";
import { Circle, CircleAlert, LoaderPinwheel, Square } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaDiamond } from "react-icons/fa6";
import { IoTriangle } from "react-icons/io5";
import { MdHexagon, MdPentagon } from "react-icons/md";

type Props = {
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
  editor: Editor | undefined;
};

const ElementsSidebar = ({
  selectedTool,
  onChangeSelectedTool,
  editor,
}: Props) => {
  const { data, isError, isPending } = useFetchImages();

  return (
    <aside
      className={cn(
        "bg-neutral-800 shadow z-50 w-90 h-full flex flex-col relative",
        selectedTool === "shapes" ? "visible" : "hidden"
      )}
    >
      {/* Shapes */}
      <ElementsSidebarHeader title="Shapes" />
      <ScrollArea className="whitespace-nowrap">
        <div className="flex w-max space-x-2 p-4">
          <Shape onClick={() => editor?.addRectangle()} icon={Square} />
          <Shape onClick={() => editor?.addCircle()} icon={Circle} />
          <Shape onClick={() => editor?.addTriangle()} icon={IoTriangle} />
          <Shape
            onClick={() => editor?.addInverseTriangle()}
            icon={IoTriangle}
            className="rotate-180"
          />
          <Shape onClick={() => editor?.addDiamond()} icon={FaDiamond} />
          <Shape onClick={() => editor?.addPentagon()} icon={MdPentagon} />
          <Shape onClick={() => editor?.addHexagon()} icon={MdHexagon} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Photos */}
      <ElementsSidebarHeader title="Photos" />
      {isPending && (
        <div className="px-4">
          <LoaderPinwheel className="animate-spin" />
        </div>
      )}
      {isError && (
        <div className="px-4 text-red-500 flex gap-1">
          <CircleAlert />
          Failed to fetch images
        </div>
      )}
      <ScrollArea className="whitespace-nowrap">
        <div className="grid grid-cols-3 gap-2 p-4">
          {data?.images.map((image, index: number) => (
            <Button
              key={index}
              className="relative size-[100px] overflow-hidden group"
              onClick={() => editor?.addPhoto(image.urls.regular)}
            >
              <Image
                fill
                key={index}
                src={image.urls.small}
                alt={image.alt_description ?? "Image"}
                className="rounded-md object-cover"
              />
              <Link
                href={image.links.html}
                target="_blank"
                className="absolute left-0 right-0 bottom-0 hover:underline text-xs text-white font-bold opacity-0 group-hover:opacity-100 bg-zinc-700/90 w-full"
              >
                {image.user.name}
              </Link>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <ToolSidebarClose onClick={() => onChangeSelectedTool("select")} />
    </aside>
  );
};

export default ElementsSidebar;
