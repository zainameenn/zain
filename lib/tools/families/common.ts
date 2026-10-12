import { FAIR_USE } from "../links";

// Copy the spec gives once (on the bio page) and every AI tool reuses.

export const ERROR_TEXT = "Something broke on our side. Your answers are still here, so hit the button again.";

/** "We send your answers to an AI model to write your bios. Nothing gets posted for you." */
export const dataNote = (what: string) => `We send your answers to an AI model to write your ${what}. Nothing gets posted for you.`;

/** "Is this X free?" answered with the fair use line. */
export const freeFaq = (tool: string) => ({ q: `Is this ${tool} free?`, a: `Yes. ${FAIR_USE}` });

export const fmt = (n: number) => n.toLocaleString("en-US");
