export interface PathNavigationMeta {
	label?: string;
	shortLabel?: string;
	description?: string;
	directorySummary?: string;
	meta?: string;
	order?: number;
	topNav?: boolean;
}

export interface NoteNavigationNode extends PathNavigationMeta {
	segment: string;
	children?: readonly NoteNavigationNode[];
}

function compareByOrder(a: PathNavigationMeta, b: PathNavigationMeta): number {
	return (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);
}

function segmentToTitle(segment: string): string {
	return segment
		.replace(/-/g, " ")
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

export const noteNavigationTree = [
	{
		segment: "tools",
		label: "工具使用",
		shortLabel: "工具",
		description: "工欲善其事，必先利其器。环境配置、脚本与效率工作流",
		directorySummary: "常用开发工具、配置指南与工作流实践。",
		meta: "常用工具配置与效率工作流",
		order: 10,
		topNav: true,
	},
	{
		segment: "study",
		label: "学习",
		shortLabel: "学习",
		description: "理论推导、核心算法与学术思考的深度研习",
		directorySummary: "深度学习理论、论文梳理与算法实现手稿。",
		meta: "专业知识树与系统理论沉淀",
		order: 20,
		topNav: true,
	},
	{
		segment: "logs",
		label: "记录",
		shortLabel: "记录",
		description: "日常备忘、踩坑解决与阶段性实践总结",
		directorySummary: "技术避坑备忘、阶段总结与日常手记。",
		meta: "日常实践与阶段性备忘",
		order: 30,
		topNav: true,
	},
	{
		segment: "reading",
		label: "读书与思考",
		shortLabel: "读书",
		description: "在书卷与微光中沉淀，人文社科与思维反思",
		directorySummary: "书籍阅读手记、思想启发与深度思考。",
		meta: "书卷阅读与心智认知沉淀",
		order: 40,
		topNav: true,
	},
] satisfies readonly NoteNavigationNode[];

function flattenNavigationTree(
	nodes: readonly NoteNavigationNode[],
	parentPath = "",
	accumulator: Record<string, PathNavigationMeta> = {}
): Record<string, PathNavigationMeta> {
	for (const node of nodes) {
		const path = parentPath ? `${parentPath}/${node.segment}` : node.segment;
		if (accumulator[path]) {
			throw new Error(`Duplicate navigation path: ${path}`);
		}

		const { segment: _segment, children, ...meta } = node;
		accumulator[path] = meta;

		if (children?.length) {
			flattenNavigationTree(children, path, accumulator);
		}
	}

	return accumulator;
}

export const topLevelNoteNavigation = [...noteNavigationTree].sort(compareByOrder);
export const topLevelNoteNavigationSegments = topLevelNoteNavigation.map((node) => node.segment);
export const pathNavigationMeta = flattenNavigationTree(noteNavigationTree);

export function getTopLevelNoteNavigation() {
	return topLevelNoteNavigation;
}

export function getFallbackNavigationLabel(path: string): string {
	const lastSegment = path.split("/").at(-1) ?? path;
	return segmentToTitle(lastSegment);
}
