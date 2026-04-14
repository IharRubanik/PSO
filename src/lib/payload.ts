import { getPayload as getPayloadBase } from "payload";
import config from "@/payload.config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached: Promise<any> | null = null;

export function getPayload() {
  if (!cached) {
    cached = getPayloadBase({ config }).catch(() => null);
  }
  return cached;
}

export function isPayloadAvailable() {
  return !!process.env.PAYLOAD_SECRET && process.env.PAYLOAD_SECRET !== "";
}
