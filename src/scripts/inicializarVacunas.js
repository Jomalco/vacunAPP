
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

function calculateVaccinationDate(birthdate, vaccineAgeInMonths) {
    // Split the birthdate into day, month, and year
    var [day, month, year] = birthdate.split("/");
    
    // JavaScript counts months from 0, so we subtract 1 from the month
    month--;
    
    // Create a new Date object with the birthdate
    var birthDate = new Date(year, month, day);
    
    var currentAgeInMonths = calculateAgeInMonths(birthDate);
    var monthsUntilVaccine = vaccineAgeInMonths - currentAgeInMonths;
    
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth();
    var currentDate = new Date().getDate();
    
    var vaccineYear = currentYear;
    var vaccineMonth = currentMonth + monthsUntilVaccine;
    
    // Check if the month overflowed into the next year
    if (vaccineMonth > 11) {
      vaccineYear++;
      vaccineMonth = vaccineMonth - 12;
    }
    
    var vaccinationDate = new Date(vaccineYear, vaccineMonth, currentDate);
    return formatDate(vaccinationDate);
  }
  

export default function inicializarVacunas(birthdate) {
    const bd = calculateAgeInMonths(birthdate);
    
    
}