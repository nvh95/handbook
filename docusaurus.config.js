// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "nvh95 Handbook",
  tagline: "Things that I learned every day.",
  url: "https://handbook.hung.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "nvh95", // Usually your GitHub org/user name.
  projectName: "handbook", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/nvh95/handbook/edit/main/",
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/nvh95/handbook/edit/main/",
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-JKBG6ZQT38",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "nvh95 Handbook",
        logo: {
          alt: "nvh95 Handbook",
          src: "img/logo.svg",
        },
        items: [
          // TODO: To think of a name
          // {
          //   type: "doc",
          //   docId: "intro",
          //   position: "left",
          //   label: "Tutorial",
          // },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://twitter.com/hung_dev",
            label: "Twitter",
            position: "right",
          },
          {
            href: "https://github.com/nvh95",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https://hung.dev",
            label: "Blog",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Content",
            items: [
              {
                label: "Blog",
                href: "https://hung.dev",
              },
              {
                label: "GitHub",
                href: "https://github.com/nvh95",
              },
            ],
          },
          {
            title: "Social Media",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/hung_dev",
              },
              {
                label: "Facebook",
                href: "https://www.facebook.com/hungdotdev",
              },
              {
                label: "Linked In",
                href: "https://www.linkedin.com/in/nvh95/",
              },
            ],
          },
          {
            title: "Products",
            items: [
              {
                label: "Jest Preview",
                href: "https://www.jest-preview.com",
              },
              {
                label: "Vitest Preview",
                href: "https://www.vitest-preview.com",
              },
              {
                label: "Trò chuyện IT",
                href: "https://trochuyenit.hung.dev/?utm_source=handbook",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} nvh95. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        appId: "6J72JX2WWN",
        apiKey: "7ca6f09d7c853f7ad6bc5f24876e077d",
        indexName: "handbook.hung.dev",
      },
    }),
};

module.exports = config;
