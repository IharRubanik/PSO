/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import configPromise from "@/payload.config";
import { RootLayout } from "@payloadcms/next/layouts";
import React from "react";
import { importMap } from "./admin/importMap";
import { serverFunction } from "./serverFunction";
import "@payloadcms/next/css";

type Args = {
  children: React.ReactNode;
};

const Layout = ({ children }: Args) => (
  <RootLayout
    config={configPromise}
    importMap={importMap}
    serverFunction={serverFunction as any}
  >
    {children}
  </RootLayout>
);

export default Layout;
