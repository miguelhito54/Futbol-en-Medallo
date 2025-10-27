import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import path from "node:path"; // ✅ corregido

export default defineConfig({
  site: "https://janedoe.com",
  base: "/",
  trailingSlash: "ignore",
  prefetch: { prefetchAll: true },
  integrations: [
    react(),
    sitemap(),
    tailwind({ config: { applyBaseStyles: false } }),
    AutoImport({
      imports: [
        "@components/common/Button.astro",
        "@shortcodes/Accordion",
        "@shortcodes/Notice",
        "@shortcodes/Youtube",
        "@shortcodes/Tabs",
        "@shortcodes/Tab",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [remarkCollapse, { test: "Table of contents" }],
      remarkMath,
    ],
    rehypePlugins: [[rehypeKatex, {}]],
    shikiConfig: {
      themes: {
        light: "light-plus",
        dark: "dark-plus",
      },
    },
    extendDefaultPlugins: true,
  },

  vite: {
    resolve: {
      alias: {
        "@components": path.resolve("./src/components"),
        "@shortcodes": path.resolve("./src/shortcodes"),
      },
    },
  },
});
