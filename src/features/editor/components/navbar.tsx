import Logo from "@/features/editor/components/logo";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  CloudDownload,
  CloudUpload,
  FileImage,
  HardDriveUpload,
  MousePointer2,
  Redo2,
  Undo2,
} from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center h-14 p-2 gap-4">
      <Logo />
      <div className="w-full flex items-center gap-2 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button>File</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="min-w-32 sm:min-w-80 max-w-32 sm:max-w-80"
          >
            <DropdownMenuLabel className="text-ellipsis overflow-hidden text-nowrap">
              Graphic Design Saas Platform YouTube Thumbnail
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-2 cursor-pointer">
              <CloudDownload />
              Import JSON file
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 cursor-pointer">
              <CloudUpload />
              Export JSON file
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 cursor-pointer">
              <FileImage />
              Export JPG
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 cursor-pointer">
              <FileImage />
              Export PNG
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 cursor-pointer">
              <FileImage />
              Export SVG
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button>Resize</Button>
        <Button variant={"ghost"} size={"icon"}>
          <MousePointer2 />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <Undo2 />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <Redo2 />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <HardDriveUpload />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
