export function clampProgress(progress: number) {
  return Math.min(1, Math.max(0, progress));
}

export function getJourneyStageIndex(progress: number, stageCount: number) {
  if (stageCount < 1) return 0;

  return Math.min(
    stageCount - 1,
    Math.floor(clampProgress(progress) * stageCount),
  );
}

export function getStageRange(index: number, stageCount: number) {
  if (stageCount < 1) return [0, 1] as const;

  const safeIndex = Math.min(stageCount - 1, Math.max(0, index));
  return [safeIndex / stageCount, (safeIndex + 1) / stageCount] as const;
}

export function getStageLocalProgress(
  progress: number,
  index: number,
  stageCount: number,
) {
  const [start, end] = getStageRange(index, stageCount);
  return clampProgress(
    (clampProgress(progress) - start) /
      Math.max(end - start, Number.EPSILON),
  );
}
