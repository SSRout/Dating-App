import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeago',
})
export class TimeAgoPipe implements PipeTransform {
  transform(date: any): string {
    if (!date) return '';

    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (seconds < 30) {
      return 'just now';
    }

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [key, value] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / value);
      if (interval >= 1) {
        return interval === 1
          ? interval + ' ' + key + ' ago'
          : interval + ' ' + key + 's ago';
      }
    }

    return 'just now';
  }
}
