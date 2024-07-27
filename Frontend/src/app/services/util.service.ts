import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  convertDateTimeToMilliseconds(targetDateTime: Date): string {
    const currentDateTime = new Date();
    const calculatedMilliseconds = targetDateTime.getTime() - currentDateTime.getTime();
    return calculatedMilliseconds > 0 ? this.calculateTime(calculatedMilliseconds) : 'Started';
  }

  private calculateTime(duration: number): string {
    const totalSeconds = Math.floor(duration / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

    let result = '';
    if (days > 0) result += `${days} day${days > 1 ? 's' : ''} `;
    if (hours > 0) result += `${hours} hour${hours > 1 ? 's' : ''} `;
    if (minutes > 0) result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    if (!result) result += '< minute';

    return result.trim();
  }
}
