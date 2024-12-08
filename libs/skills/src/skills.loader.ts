/*
 * Load all skill adapters (platforms and tools) in the application.
 */
export function loadSkills() {
  const requireSkill = (require as any).context(
    // The relative path to the skills directory
    '.',
    // Whether to look into subdirectories
    true,
    // A regular expression to match skill adapter files
    /\.adapter\.(ts|js)$/,
  );

  requireSkill.keys().forEach((fileName: string) => {
    requireSkill(fileName);
  });
}
