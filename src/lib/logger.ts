export const logger = (log: string, level?: string, trace?: any) => {
  import.meta.env.DEV
    ? console.log({
        log,
        level,
        trace,
      })
    : null;
};
