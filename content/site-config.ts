export type TopDomain = "note" | "project";
export type SiteKey = "main" | TopDomain;

type PublicSiteEnvKey =
	| "PUBLIC_MAIN_SITE_URL"
	| "PUBLIC_NOTE_SITE_URL"
	| "PUBLIC_PROJECT_SITE_URL";

export type SiteEnv = Partial<Record<PublicSiteEnvKey, string>>;

interface BaseSiteConfig {
	label: string;
	siteTitle: string;
	description: string;
	cardDescription: string;
	domainLabel: string;
	eyebrow: string;
	defaultHref: string;
	available: boolean;
	homeCtaLabel: string;
	navCtaLabel: string;
	status?: string;
}

export interface SiteConfig extends Omit<BaseSiteConfig, "defaultHref"> {
	key: SiteKey;
	href: string;
}

const SITE_CONFIG_REGISTRY: Record<SiteKey, BaseSiteConfig> = {
	main: {
		label: "Home",
		siteTitle: "darktime",
		description: "个人主站，沉淀知识与研磨作品。",
		cardDescription: "总览与归宿",
		domainLabel: "darktime.cn",
		eyebrow: "Home Base",
		defaultHref: "/",
		available: true,
		homeCtaLabel: "返回首页",
		navCtaLabel: "返回首页",
	},
	note: {
		label: "Study",
		siteTitle: "学习",
		description: "沉淀理论体系、论文研读、算法与实践笔耕。",
		cardDescription: "知识与研习",
		domainLabel: "note.darktime.cn",
		eyebrow: "Knowledge & Study",
		defaultHref: "/",
		available: true,
		homeCtaLabel: "进入知识库",
		navCtaLabel: "进入知识库",
	},
	project: {
		label: "Projects",
		siteTitle: "项目",
		description: "独立开发、开源构想与工程实践作品。",
		cardDescription: "作品与实践",
		domainLabel: "darktime.cn/#projects",
		eyebrow: "Craft & Works",
		defaultHref: "/#projects",
		available: true,
		homeCtaLabel: "浏览精选项目",
		navCtaLabel: "浏览项目",
	},
};

function resolveSiteUrl(envVar: string | undefined, fallback: string): string {
	return envVar?.trim() || fallback;
}

export function getSiteUrls(env: SiteEnv = import.meta.env): Record<SiteKey, string> {
	return {
		main: resolveSiteUrl(env.PUBLIC_MAIN_SITE_URL, SITE_CONFIG_REGISTRY.main.defaultHref),
		note: resolveSiteUrl(env.PUBLIC_NOTE_SITE_URL, SITE_CONFIG_REGISTRY.note.defaultHref),
		project: resolveSiteUrl(env.PUBLIC_PROJECT_SITE_URL, SITE_CONFIG_REGISTRY.project.defaultHref),
	};
}

export function getSiteConfig<K extends SiteKey>(
	key: K,
	env: SiteEnv = import.meta.env
): SiteConfig & { key: K } {
	const { defaultHref: _defaultHref, ...config } = SITE_CONFIG_REGISTRY[key];
	return {
		key,
		...config,
		href: getSiteUrls(env)[key],
	};
}

export function isExternalHref(href: string): boolean {
	return /^https?:\/\//.test(href);
}
