import { Button } from "@/components/ui/button";
import { Editor } from "@/features/editor/types";
import { Minimize, ZoomIn, ZoomOut } from "lucide-react";

type Props = {
  editor: Editor | undefined;
};

const Footer = ({ editor }: Props) => {
  return (
    <footer className="h-10 bg-zinc-900 w-full flex items-center overflow-x-auto px-2 gap-1 shrink-0 flex-row-reverse">
      {/* Auto zoom will reset the zoom to default */}
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => editor?.autoZoom()}
      >
        <Minimize />
      </Button>
      <Button size={"icon"} variant={"ghost"} onClick={() => editor?.zoomIn()}>
        <ZoomIn />
      </Button>
      <Button size={"icon"} variant={"ghost"} onClick={() => editor?.zoomOut()}>
        <ZoomOut />
      </Button>
    </footer>
  );
};

export default Footer;
