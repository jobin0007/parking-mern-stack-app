// export default function calculateFee(startTime: Date, endTime: Date, firstHourRate: number, additionalHourRate: number): number {
//     const durationInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); 

//     if (durationInHours <= 1) {
//         return firstHourRate;
//     }

//     const additionalHours = durationInHours - 1; 
//     const additionalFee = additionalHours * additionalHourRate; 
//     return firstHourRate + additionalFee; 
// }

 export  function calculateFee(startTime, endTime, firstHourRate, additionalHourRate) {
    const durationInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

    if (durationInHours <= 1) {
        return firstHourRate;
    }

    const additionalHours = durationInHours - 1;
    const additionalFee = additionalHours * additionalHourRate;
    
    return firstHourRate + additionalFee;
}



