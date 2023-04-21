import type { Options } from "tsup";

const config: Options = {
  entry: [
    "src/index.tsx",
    "MyAwsomeComponent.css",
  ],
  outDir: "dist",
  dts: true,
  sourcemap: true,
  format: [/* "iife", */ "cjs", "esm"],
};

export default config;