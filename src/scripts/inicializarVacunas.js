
/* 
function calculateAgeInYears(birthdate) {
    const currentDate = new Date();
    const birthDate = new Date(birthdate);
    const ageInMilliseconds = currentDate - birthDate;
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25; 
    const ageInYears = Math.floor(ageInMilliseconds / millisecondsInYear);
    return ageInYears;
}
*/

function calculateAgeInMonths(birthdate) {
    const currentDate = new Date();
    const birthDate = new Date(birthdate);
    const ageInMilliseconds = currentDate - birthDate;
    const millisecondsInMonth = 1000 * 60 * 60 * 24 * 30.4375; 
    const ageInMonths = Math.floor(ageInMilliseconds / millisecondsInMonth);
    return ageInMonths;
}
export default function inicializarVacunas(birthdate) {
    const bd = calculateAgeInMonths(birthdate);
    
    
}