import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

function ensureSinceTime(uptimeDate: Date): string {
  const currentDate = new Date();

  const duration = formatDistance(uptimeDate, currentDate, {
    includeSeconds: true,
    addSuffix: true,
    locale: ptBR,
  });

  return duration;
}

export { ensureSinceTime };
