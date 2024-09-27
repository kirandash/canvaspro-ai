import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ElementsSidebarHeader from "@/features/editor/components/elements-sidebar-header";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import { Editor, SelectedTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { UploadDropzone } from "@bytescale/upload-widget-react";
import { useState } from "react";

type Props = {
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
  editor: Editor | undefined;
};

const bytescaleApiKey = process.env.NEXT_PUBLIC_BYTESCALE_API_KEY;
if (!bytescaleApiKey) {
  throw new Error("Please provide the NEXT_PUBLIC_BYTESCALE_API_KEY env var");
}

const options = {
  // locale: {
  //   orDragDropFile: "...or drag and drop your file",
  //   uploadFileBtn: "Upload your file",
  // },
  apiKey: bytescaleApiKey, // This is your API key.
  maxFileCount: 1,
  showFinishButton: true, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
  styles: {
    colors: {
      primary: "#377dff",
    },
  },
};

const UploadsSidebar = ({
  selectedTool,
  onChangeSelectedTool,
  editor,
}: Props) => {
  const [currentImgUrl, setCurrentImgUrl] = useState<string | null>(null);
  return (
    <aside
      className={cn(
        "bg-neutral-800 shadow z-50 w-90 h-full flex flex-col relative",
        selectedTool === "uploads" ? "visible" : "hidden"
      )}
    >
      <ElementsSidebarHeader title="Uploads" />
      <ScrollArea className="whitespace-nowrap">
        <div className="flex p-4">
          <UploadDropzone
            // The key helps us to reset the component when the image is uploaded
            key={currentImgUrl}
            options={options}
            onUpdate={({ uploadedFiles }) => {
              console.log(uploadedFiles.map((x) => x.fileUrl).join("\n"));
              // editor?.addPhoto(uploadedFiles[0].fileUrl);
            }}
            onComplete={(files) => {
              // alert(files.map((x) => x.fileUrl).join("\n"));
              editor?.addPhoto(files[0].fileUrl);
              setCurrentImgUrl(files[0].fileUrl);
            }}
            width="100%"
            height="226px"
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ToolSidebarClose onClick={() => onChangeSelectedTool("select")} />
    </aside>
  );
};

export default UploadsSidebar;
