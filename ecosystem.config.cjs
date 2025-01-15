module.exports = {
  apps: [
    {
      name: "spn-website",
      exec_mode: "fork",
      instances: "1",
      script: "./.output/server/index.mjs",
    },
  ],
};
