module.exports = {
  '*.{js,jsx,ts,tsx}': ['npx prettier --write', 'npx eslint --fix'],
  '*.{md,json}': ['npx prettier --write'],
};
