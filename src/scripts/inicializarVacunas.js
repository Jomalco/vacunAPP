function calculateAgeInMonths(birthdate) {
    const currentDate = new Date();
    const birthDate = new Date(birthdate);
    const ageInMilliseconds = currentDate - birthDate;
    const millisecondsInMonth = 1000 * 60 * 60 * 24 * 30.4375; 
    const ageInMonths = Math.floor(ageInMilliseconds / millisecondsInMonth);
    return ageInMonths;
}

function calculateAgeInYears(birthdate) {
    const currentDate = new Date();
    const birthDate = new Date(birthdate);
    const ageInMilliseconds = currentDate - birthDate;
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25; 
    const ageInYears = Math.floor(ageInMilliseconds / millisecondsInYear);
    return ageInYears;
}

function defineGroup(birthdate) {
    const ageInMonths = calculateAgeInMonths(birthdate)
    var group = 0;
    if (ageInMonths <= 6) { group = 1 }
    else if (ageInMonths > 6 && ageInMonths <= 24) { group = 2 }
    else if (ageInMonths >= 48) { group = 3 }
    return group;
}

export default function inicializarVacunas(birthdate) {
    const bd = birthdate;
    const group = defineGroup(bd)
    
}