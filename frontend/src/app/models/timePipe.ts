import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nicetime'
})
export class TimePipe implements PipeTransform{
    transform(n: number ) : string {
        //N is in milliseconds
        //Parse this time to the format hh:mm:ss or mm:ss
        let hours = Math.floor(n / 3600000);
        let minutes = Math.floor((n % 3600000) / 60000);
        let seconds = Math.floor((n % 60000) / 1000);
        let hoursStr = hours < 10 ? "0" + hours.toString() : hours.toString();
        let minutesStr = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
        let secondsStr = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
        if(hours == 0){
            return minutesStr + ":" + secondsStr;
        }
        return hoursStr + ":" + minutesStr + ":" + secondsStr;
    }
}
