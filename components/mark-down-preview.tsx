import { useEffect, useState } from "react";
import { renderMarkdownPreview } from "@/utils/renderMarkdownPreview";
import { FullscreenToggle } from "./ui/fullscreen-toggle";

export function MarkdownPreview({ output }: { output: string }) {
  const [htmlPreview, setHtmlPreview] = useState("");

  useEffect(() => {
    const render = async () => {
      const html = await renderMarkdownPreview(output);
      setHtmlPreview(html);
    };

    render(); // call when output changes
  }, [output]);

  return (
    <FullscreenToggle title="Markdown Preview" contentClassName="min-h-[300px]">
      <div
        className="min-h-[300px] p-4 border rounded-md bg-background prose prose-sm max-w-none dark:prose-invert overflow-auto"
        dangerouslySetInnerHTML={{ __html: htmlPreview }}
      />
    </FullscreenToggle>
  );
}
