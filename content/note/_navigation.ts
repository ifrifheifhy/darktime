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
		segment: "study",
		label: "研习笔记",
		shortLabel: "研习",
		description: "理论推导、核心算法与学术思考的沉淀",
		directorySummary: "深度学习理论、论文梳理与算法实现手稿。",
		meta: "在书卷与推导中沉淀知识脉络",
		order: 10,
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
