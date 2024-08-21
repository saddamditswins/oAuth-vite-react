export const logger = (log: string, level?: string, trace?: any) => {
  console.log({
    log,
    level,
    trace,
  });
};
