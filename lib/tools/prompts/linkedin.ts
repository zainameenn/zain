import type { LibraryPrompt } from "./types";

// LinkedIn tools the Prompt Library doesn't cover yet: Experience descriptions and Skills. Written in the
// library's own format, with the rules from the November 2026 LinkedIn package (truthful claims only, a job
// posting is vocabulary and never evidence, a conservative 2,000 character cap, up to 100 skills is a limit,
// not a target). Sent after MASTER like every other tool prompt.

export const LINKEDIN_NEW: Record<string, LibraryPrompt> = {
  "linkedin-experience-description-generator": {
    output: "text",
    what: "description",
    window: { "3 to 5 bullet points": { min: 250, max: 1000 }, "Short paragraph": { min: 250, max: 700 }, Both: { min: 500, max: 1600 } },
    prompt: `TASK: Write one LinkedIn Experience description for a single role.

INPUTS
Job title
Main responsibilities (their own notes)
Employment type
Career level
Type of work
Format
Focus
Company or client type (optional)
Confirmed results (figures, team sizes, dates) (optional)
Job posting text (vocabulary only, never evidence) (optional)
Language

LENGTH
Follow the Format input: 3 to 5 bullet points is 250 to 1,000 characters, Short paragraph is 250 to 700, Both is 500 to 1,600. Never over 2,000.

WHAT GOOD LOOKS LIKE
Someone outside the company should understand what this person did, at what scope, and what changed because of it.
Every line starts from something in their notes. Write one bullet per real note and never add a bullet, collaborator, meeting, tool or duty the notes do not mention, even if that leaves only three bullets. A summary sentence may only combine what the notes already say. Do not add how or how often the work happened ("closely", "regular sessions", "day to day") or why it mattered unless the notes say so. Turn each rough note into a clear action: a strong verb, the task or project, and the context. Add a result only when a confirmed result was given.
Follow the Focus input for what to lead with: responsibilities, projects, outcomes, leadership or the tools they used.
Bullets: 3 to 5 lines, each beginning with "• ", one idea per line, no full stop needed. Short paragraph: two to four plain sentences in first person without "I" at the start of every sentence. Both: a one or two sentence summary, a blank line, then 3 to 5 bullets.
Interns, students and volunteers: describe the real contribution honestly, including group work, without making it sound like a senior role.

RULES
Never invent numbers, percentages, revenue, team sizes, budgets, clients, tools or dates. If no result was given, describe the work accurately instead of guessing an outcome. Never use a placeholder that looks like a claim.
A job posting is only a source of wording. Never present its requirements as things this person did.
Do not repeat the job title as the first words. Do not start with "Responsible for".
No emoji, no hashtags, no headings.

Return only the description.`,
  },

  "linkedin-skills-generator": {
    output: "json",
    prompt: `TASK: Build one organised LinkedIn skills list for this person.

INPUTS
Role
What they need
Career stage
Field
Number of suggestions
Skills mix
Skills they confirm they have (optional)
Job posting text (optional)

WHAT GOOD LOOKS LIKE
Three separate lists, never mixed:
1. Confirmed: only skills from "Skills they confirm they have", cleaned into the standard names LinkedIn and recruiters use ("pivot tables" becomes "Pivot Tables" or, if it clearly belongs, "Microsoft Excel"). Never add a skill here that they did not list.
2. Suggested to verify: skills that are relevant to the role, the field and the job posting, which they might have but have not confirmed. Give exactly the requested number of suggestions, or fewer if a smaller set is genuinely all that fits. For each, one short line on what evidence would support it on their profile (a project, a task in a job, a course).
3. Learning gaps: up to 5 skills the target role or job posting asks for that look new to them, with one short line on why each matters. Only include this list when they asked for a target role, skills gap ideas, or pasted a job posting.
Group every skill as "Tools and technologies", "Industry knowledge" or "Interpersonal skills".
Follow the Skills mix: Tools and software leans on named tools, Technical methods on methods and techniques, Business skills on industry knowledge and interpersonal skills, Balanced mixes all three.
Use recognisable skill names (2 to 4 words), not sentences or slogans. No soft filler such as "Hardworking" or "Team player". No duplicates across lists.
A job posting tells you what the role wants. It never proves the person has it.
LinkedIn allows up to 100 skills; that is a limit, not a target.

RETURN
JSON: {"confirmed": [{"skill": "...", "group": "..."}], "suggested": [{"skill": "...", "group": "...", "evidence": "one short line"}], "gaps": [{"skill": "...", "why": "one short line"}]}`,
  },
};
