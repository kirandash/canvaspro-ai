import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useGenerateImage } from "@/features/ai/api/use-generate-image";
import ElementsSidebarHeader from "@/features/editor/components/elements-sidebar-header";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import { Editor, SelectedTool } from "@/features/editor/types";
import { usePaywall } from "@/features/subscription/hooks/use-paywall";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import { useState } from "react";

type Props = {
  selectedTool: SelectedTool;
  onChangeSelectedTool: (tool: SelectedTool) => void;
  editor: Editor | undefined;
};

const AISidebar = ({ selectedTool, onChangeSelectedTool, editor }: Props) => {
  const paywall = usePaywall();
  const mutation = useGenerateImage();
  const [prompt, setPrompt] = useState("");

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (paywall.shouldShowPaywall) {
      paywall.triggerPaywall();
      return;
    }

    mutation.mutateAsync({ prompt }).then(({ data }) => {
      editor?.addPhoto(data);
    });
  };
  return (
    <aside
      className={cn(
        "bg-neutral-800 shadow z-50 w-90 h-full flex flex-col relative",
        selectedTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ElementsSidebarHeader title="AI image generator" />
      <ScrollArea className="whitespace-nowrap">
        <form className="flex flex-col space-y-2 p-4" onSubmit={onFormSubmit}>
          <Textarea
            disabled={mutation.isPending}
            placeholder="Enter 5+ words to describe Ex: 'photograph of a dancing cat, swimming pool background'"
            minLength={15}
            required
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="flex gap-1"
          >
            Generate image
            <Crown className="size-3 fill-zinc-300" />
          </Button>
        </form>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ToolSidebarClose onClick={() => onChangeSelectedTool("select")} />
    </aside>
  );
};

export default AISidebar;
