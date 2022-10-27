// TODO: vite type is any

export const devServer = async (opts: any) => {
  const { runVite } = await import('../utils/vite');
  await runVite(opts);
};

