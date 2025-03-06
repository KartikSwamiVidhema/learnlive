module.exports = {
  root: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react/prop-types": "off",
    "no-unused-vars": ["warn"], // Show warnings for unused variables instead of errors
    "react/no-unescaped-entities": "off", // Allow unescaped quotes in JSX
    "no-undef": "off", // Prevent errors for 'process' being undefined
    "react-hooks/exhaustive-deps": "warn", // Warn for missing dependencies in useEffect
    "react/jsx-key": "error" // Ensure unique keys in lists
  },
};
