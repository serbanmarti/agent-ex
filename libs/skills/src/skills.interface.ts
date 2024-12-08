/*
 * Interface for skills (platforms/tools) that can be used by the agent.
 *
 * We should have a separate interface for platforms and tools, but for the sake of simplicity in this exercise,
 * we define just this single one to be used by both.
 */
export interface Skill {
  execute(): void;
}
