import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Dossier d'exemples/scripts non applicatif (héberge ses propres artefacts) :
    "skills/**",
    // Fichiers AppleDouble générés en archiving sur macOS :
    "**/__MACOSX/**",
    "node_modules/**",
    // Artefacts locaux :
    "db/**",
  ]),
]);

export default eslintConfig;
