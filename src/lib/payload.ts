import { getPayload as getPayloadBase } from "payload";
import config from "@/payload.config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached: ReturnType<typeof getPayloadBase> | null = null;

export function getPayload() {
  if (!cached) {
    cached = getPayloadBase({ config });
  }
  return cached;
}
