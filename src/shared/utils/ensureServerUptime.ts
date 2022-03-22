import { add } from 'date-fns';

interface IServerUptime {
  uptime: number;
  uptimeDate: Date;
}

function ensureServerUptime(): IServerUptime {
  const uptime = process.uptime();
  const uptimeDate = add(new Date(), { seconds: -uptime });

  return { uptime, uptimeDate };
}

export { ensureServerUptime };
