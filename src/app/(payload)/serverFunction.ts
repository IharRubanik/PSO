"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import configPromise from "@/payload.config";
import { handleServerFunctions } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap";

export async function serverFunction(args: any) {
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  });
}
