

class TimeConverter  {
    constructor(props) {
      
    }

    timeStringToNumber(timeString) {
        return (
          parseInt(timeString.substring(0, 2) * 60) +
          parseInt(timeString.substring(3, 5))
        );
      }
      numToTimeString(num) {
        let hours = Math.floor(num / 60);
        let minutes = (num - hours * 60) * 100;
    
        hours = hours.toString().length < 2 ? "0" + hours : hours;
        minutes = minutes.toString().length < 2 ? minutes + "0" : minutes;
        return hours + ":" + minutes.toString().substring(0, 2);
      }
}
export default TimeConverter;
