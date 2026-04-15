import type { Adapter } from "@payloadcms/plugin-cloud-storage/types";
import { del, put } from "@vercel/blob";

export const vercelBlobAdapter: Adapter = () => {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const storeId = token
    ?.match(/^vercel_blob_rw_([a-z\d]+)_/i)?.[1]
    ?.toLowerCase();
  const baseURL = storeId
    ? `https://${storeId}.public.blob.vercel-storage.com`
    : "";

  return {
    name: "vercel-blob-direct",
    handleUpload: async ({ file }) => {
      if (!token) return;
      await put(file.filename, file.buffer, {
        access: "public",
        token,
        addRandomSuffix: false,
        allowOverwrite: true,
      });
    },
    handleDelete: async ({ filename }) => {
      if (!token) return;
      try {
        await del(`${baseURL}/${filename}`, { token });
      } catch {
        // swallow — file may already be gone
      }
    },
    generateURL: ({ filename }) => `${baseURL}/${filename}`,
    staticHandler: async (_req, { params }) => {
      if (!baseURL) {
        return new Response("Blob storage not configured", { status: 500 });
      }
      return new Response(null, {
        status: 302,
        headers: { Location: `${baseURL}/${params.filename}` },
      });
    },
  };
};
