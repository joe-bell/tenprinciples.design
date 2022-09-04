const config = {
  "*": (filenames) => [
    `prettier --ignore-unknown --no-error-on-unmatched-pattern --write ${filenames
      .map((filename) => `'${filename}'`)
      .join(" ")}`,
  ],
};

export default config;
