import type { ImageMetadata } from "astro";
import {
  getSiteConfig,
  isExternalHref,
  type TopDomain,
} from "../../../../content/site-config";
import noteArtwork from "../images/destinations/note.svg";
import projectArtwork from "../images/destinations/project.svg";

export interface ProfileLink {
  label: string;
  href: string;
  icon: "github" | "email" | "bilibili" | "leetcode";
  iconSrc?: string;
}

export const profile = {
  avatar: "http://oss.rainerseventeen.cn/blog/basic/personal_pic_colorful.jpg",
  name: "darktime",
  motto: "于暗夜中研磨光景，在书卷与代码间沉淀。",
  description: "欢迎来到 darktime 主站。",
  links: [
    {
      label: "GitHub",
      href: "https://github.com/darktime-cn",
      icon: "github" as const,
    },
    {
      label: "Email",
      href: "mailto:contact@darktime.cn",
      icon: "email" as const,
    },
  ] satisfies ProfileLink[],
};

export interface FeaturedRepo {
  owner: string;
  name: string;
  description: string;
}

export interface AboutPageMarkdownSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  cards?: AboutPageLinkCard[];
}

export interface AboutPageLinkCard {
  title: string;
  href: string;
  description: string;
  ctaLabel: string;
  domainLabel: string;
  eyebrow: string;
  icon: "steam";
  external: boolean;
}

export interface Destination {
  key: TopDomain;
  label: string;
  href: string;
  description: string;
  ctaLabel: string;
  external: boolean;
  available: boolean;
  status?: string;
  domainLabel: string;
  eyebrow: string;
  artwork: ImageMetadata;
  artworkAlt: string;
  accentClass: string;
}

const HOME_DESTINATION_ORDER: TopDomain[] = ["note", "project"];

const DESTINATION_ARTWORK: Record<
  TopDomain,
  Pick<Destination, "artwork" | "artworkAlt" | "accentClass">
> = {
  note: {
    artwork: noteArtwork,
    artworkAlt: "学习板块知识库入口",
    accentClass:
      "from-[#cba153]/15 via-transparent to-[#3d5a80]/15 dark:from-[#cba153]/10 dark:via-[#1e1c1a] dark:to-[#3d5a80]/10",
  },
  project: {
    artwork: projectArtwork,
    artworkAlt: "项目与作品展台入口",
    accentClass:
      "from-[#3d5a80]/15 via-transparent to-[#cba153]/15 dark:from-[#3d5a80]/10 dark:via-[#1e1c1a] dark:to-[#cba153]/10",
  },
};

export const destinations: Destination[] = HOME_DESTINATION_ORDER.map((key) => {
  const site = getSiteConfig(key);
  const artworkMeta = DESTINATION_ARTWORK[key];

  return {
    key,
    label: site.label,
    href: site.href,
    description: site.description,
    ctaLabel: site.homeCtaLabel,
    external: isExternalHref(site.href),
    available: site.available,
    status: site.status,
    domainLabel: site.domainLabel,
    eyebrow: site.eyebrow,
    ...artworkMeta,
  };
});

export const featuredRepos: FeaturedRepo[] = [
  {
    owner: "darktime-cn",
    name: "darktime-core",
    description: "darktime 个人站主系统，包含学习知识库与项目展台。",
  },
  {
    owner: "darktime-cn",
    name: "paper-tracker",
    description: "论文检索、去重、提炼与知识脉络归档的自动化工具系统。",
  },
  {
    owner: "darktime-cn",
    name: "dive-into-deep-learning",
    description: "深度学习原理复现、实验测试与系统性笔记实现代码。",
  },
  {
    owner: "darktime-cn",
    name: "MultiRAG-Doc",
    description: "多模态文档结构化解析与检索增强生成（RAG）实践。",
  },
];

export const aboutPage = {
  heroTitle: "关于",
  heroDescription: "于暗夜中研磨光景，在书卷与代码间沉淀。",
  teaser: "专注于深度学习算法、开源项目构建，以及长久的思考与记录。",
  introParagraphs: [
    "darktime 意为暗夜研习与沉淀的时刻。在喧嚣的世界中，留出一隅静谧之地，供思维延展与打磨作品。",
    "这里专注于两件事：其一是『学习』——系统梳理知识树、深度研读与技术复盘；其二是『项目』——将构想化为切实可用的代码工具与作品。",
  ],
  summary: ["博观而约取，厚积而薄发。"],
  markdownSections: [
    {
      title: "关于站长",
      paragraphs: [
        "一名专注技术与创造的开发者。热爱探索深度学习、算法设计、系统架构以及精美的手艺感工程实现。",
      ],
      bullets: [
        "深度学习与大语言模型工程落地",
        "算法设计与系统级工具研发",
        "知识库长线维护与开源项目实践",
      ],
    },
    {
      title: "学习初心",
      paragraphs: [
        "知识不应是浮光掠影的碎片，而应如古典手稿般层层沉淀、结实生长。在学习板块中，持续记录并公开深度学习、核心算法与工程实践的研读思考。",
      ],
    },
    {
      title: "项目实践",
      paragraphs: [
        "拒绝纸上谈兵，力求每一处设计与每一段代码都有其清晰的目的与优雅的美感。所有开源项目与工程实践将在项目板块持续迭代。",
      ],
    },
  ] satisfies AboutPageMarkdownSection[],
} as const;
