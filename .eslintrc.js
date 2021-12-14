module.exports = {
    extends: ["react-app", "plugin:prettier/recommended"],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": [
            "warn",
            {
                endOfLine: "auto"
            }
        ],
        semi: [1, "always"],
        "no-undef": "error",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "no-useless-escape": "off",
        "no-template-curly-in-string": "off"
    }
};
