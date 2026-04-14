import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export function RichText({ content }: { content: SerializedEditorState | null }) {
  if (!content) return null;
  return <LexicalRichText data={content} />;
}
