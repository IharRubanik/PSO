import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RichText({ content }: { content: any }) {
  if (!content) return null;
  return <LexicalRichText data={content} />;
}
