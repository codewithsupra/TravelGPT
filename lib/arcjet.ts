// lib/arcjet.ts
import arcjet, { tokenBucket } from "@arcjet/next";

export const aj = arcjet({
  key: process.env.ARCJET_KEY, // Get your site key from https://app.arcjet.com
  rules: [
    tokenBucket({
      mode: "LIVE", // or "DRY_RUN" while testing
      characteristics: ["userId"],
      refillRate: 5,
      interval: 86400, // 86400 seconds = 24 hours. adjust if you meant 10s.
      capacity: 30,
    }),
  ],
});
