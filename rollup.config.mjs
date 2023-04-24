import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve'
import terser from "@rollup/plugin-terser";
import nodePolyfills from "rollup-plugin-polyfill-node";
import dts from "rollup-plugin-dts";

import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: false,
      },
      {
        file: pkg.module,
        format: "es",
        sourcemap: false,
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.build.json",
        sourceMap: false,
      }),
      resolve(),
      commonjs({
        include: ["./node_modules/**"],
      }),
      nodePolyfills(),
      terser(),
    ],
    external: [
      "fs",
      "util",
      "path",
      "node-fetch",
      "child_process",
      "domain",
    ],
  },
  {
    input: "./lib/types/index.d.ts",
    output: [{ file: pkg.types, format: "es" }],
    plugins: [dts.default()],
  },
];
