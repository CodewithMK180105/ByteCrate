// utils/renderMarkdownPreview.ts
import { marked } from "marked";
import DOMPurify from "dompurify";

// Optional: Configure marked (for GFM & line breaks)
marked.setOptions({
  gfm: true,
  breaks: true,
});

export const renderMarkdownPreview = async (markdown: string): Promise<string> => {
  const dirtyHtml = await marked.parse(markdown); // marked.parse returns a Promise
  const cleanHtml = DOMPurify.sanitize(dirtyHtml); // sanitize HTML
  return cleanHtml;
};
