var vacunasPasadas = [];
var vacunasCercanas = [];
var vacunasFuturas = [];

function calculateAgeInMonths(birthdate) {
    if (typeof birthdate !== 'string') {
         birthdate = birthdate.toString();
     }
    const parts = birthdate.split("/");
    const formattedBirthdate = `${parts[1]}/${parts[0]}/${parts[2]}`;
    const date = new Date(formattedBirthdate);
    const now = new Date();
    const diffInMilliseconds = now - date;
    const ageInMonths = Math.round(diffInMilliseconds / (2592000000));
    return ageInMonths;
}

function calculateVaccinationDate(birthdate, vaccineAgeInMonths) {
    // Split the birthdate into day, month, and year
    var [day, month, year] = birthdate.split("/");
    
    // JavaScript counts months from 0, so we subtract 1 from the month
    month--;
    
    // Create a new Date object with the birthdate
    var birthDate = new Date(year, month, day);
    
    var currentAgeInMonths = calculateAgeInMonths(birthdate);
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
    
    // Format the date as "DD/MM/YYYY"
    var day = vaccinationDate.getDate();
    var month = vaccinationDate.getMonth() + 1;
    var year = vaccinationDate.getFullYear();
    
    // Add leading zeros to day and month if they are less than 10
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    
    return day + '/' + month + '/' + year;
 }

//----------------------------------------------------------------      Vacunas
class NeumococoConjugada {
    constructor(birthdate) {
      this.birthdate = birthdate;
      this.NeumococoConjugada = 
      {
        nombre: "Neumococo Conjugada",
        status: 3,
        factoresDeRiesgo: [1,4],
        id: 24,
        dosis:[0,3],
        separacionDosis:[0,2,8],
        fechaVacunacion: this.calcularFechaVacunacion()
      };
    }
    calcularFechaVacunacion() {
      if(calculateAgeInMonths(this.birthdate) <= 2)
      {
          return calculateVaccinationDate(this.birthdate, 2)
      }
      else 
      {
          return calculateVaccinationDate(this.birthdate, 18*12)
      }
    }
}

class Pentavalente {
  constructor(birthdate) {
    this.birthdate = birthdate;
    this.Pentavalente = 
      {
        nombre: "Quíntuple/Pentavalente",
        status: 3,
        factoresDeRiesgo: [],
        id: 25,
        dosis:[0,4],
        separacionDosis:[0,2,2,9],
        fechaVacunacion: calculateVaccinationDate(this.birthdate, 2)
      };
    }
}

class IPV {
  constructor(birthdate) {
    this.birthdate = birthdate;
    this.IPV = 
      {
        nombre: "IPV",
        status: 3,
        factoresDeRiesgo: [],
        id: 26,
        dosis:[0,4],
        separacionDosis:[0,2,2,54],
        fechaVacunacion: calculateVaccinationDate(this.birthdate, 2)
      };
    }
}

class Rotavirus {
  constructor(birthdate) {
    this.birthdate = birthdate;
    this.Rotavirus = 
      {
        nombre: "Rotavirus",
        status: 3,
        factoresDeRiesgo: [],
        id: 27,
        dosis:[0,2],
        separacionDosis:[0,2],
        fechaVacunacion: calculateVaccinationDate(this.birthdate, 2)
      };
    }
}

class Meningococo {
  constructor(birthdate) {
    this.birthdate = birthdate;
    this.Meningococo = 
      {
        nombre: "Meningococo ACYW",
        status: 3,
        factoresDeRiesgo: [],
        id: 28,
        dosis:[0,3],
        separacionDosis:[0,2,10],
        fechaVacunacion: calculateVaccinationDate(this.birthdate, 3)
      };
    }
    calcularFechaVacunacion() {
      if(calculateAgeInMonths(this.birthdate) >= 2 && this.Meningococo.status == 2)
      {
        this.Meningococo.fechaVacunacion = calculateVaccinationDate(this.birthdate, 132) //Si no está vacunado con las dosis que arrancan a los 2 meses, se hace una dosis única a los 11 años
      }
    }
}

export default function completarArrayVacunas(birthdate) {

    
}
