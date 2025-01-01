import {dirname} from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

const eslintConfig = [...compat.extends("next/core-web-vitals")];

//My custom rules
eslintConfig.push({
    rules: {
        "no-shadow": "off",
        "no-undef": "off",
        indent: ["error", 4, {SwitchCase: 1}],
        "object-curly-spacing": [1, "never"],
        "no-trailing-spaces": "error",
        "comma-dangle": "error",
        "comma-spacing": ["error", {before: false, after: true}],
        "comma-style": ["error", "last"],
        curly: ["error", "all"],
        "array-bracket-spacing": ["error", "never"],
        semi: ["error", "always"],
        quotes: [1, "double"],
        "eol-last": ["error", "never"],
        "keyword-spacing": "off"
    }
});

export default eslintConfig;