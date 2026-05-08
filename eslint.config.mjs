import { defineConfig } from "eslint/config";
import next from "eslint-config-next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import firebaseRulesPlugin from "@firebase/eslint-plugin-security-rules";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  {
    ignores: ["dist/**/*", ".next/**/*"] // Make sure to ignore build files
  },
  {
    extends: [...next],
    rules: {
        "react-hooks/set-state-in-effect": "off",
        "react-hooks/exhaustive-deps": "off"
    }
  },
  firebaseRulesPlugin.configs['flat/recommended']
]);
