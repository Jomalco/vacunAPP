var vacunasPasadas = [];
var vacunasIndefinidas = [];
var vacunasFuturas = [];

export default function completarArrayVacunas() {
  neumo = new NeumococoConjugada("27/08/1999")
  vacunasIndefinidas.push(NeumococoConjugada)
}


//--------------------------------------------------------

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
      this.birthdate = birthdate
      this.nombre = "Neumococo Conjugada"
      this.status = 3
      this.factoresDeRiesgo = [1,4]
      this.id = 24
      this.dosis = [0,3]
      this.separacionDosis = [0,2,8]
      this.fechaVacunacion = this.calcularFechaVacunacion()
      };
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
    this.birthdate = birthdate
    this.nombre = "Quíntuple/Pentavalente"
    this.status = 3
    this.factoresDeRiesgo = []
    this.id = 25
    this.dosis = [0,4]
    this.separacionDosis = [0,2,2,9]
    this.fechaVacunacion = calculateVaccinationDate(this.birthdate, 2)
    };
}

class IPV {
  constructor(birthdate) {
    this.birthdate = birthdate
    this.nombre = "IPV"
    this.status = 3
    this.factoresDeRiesgo = []
    this.id = 26
    this.dosis = [0,4]
    this.separacionDosis = [0,2,2,54]
    this.fechaVacunacion = calculateVaccinationDate(this.birthdate, 2)
  };
}

class Rotavirus {
  constructor(birthdate) {
    this.birthdate = birthdate
    this.nombre = "Rotavirus"
    this.status = 3
    this.factoresDeRiesgo = []
    this.id = 27
    this.dosis = [0,2]
    this.separacionDosis = [0,2]
    this.fechaVacunacion = calculateVaccinationDate(this.birthdate, 2)
  };
}

class Meningococo {
  constructor(birthdate) {
      this.birthdate = birthdate
      this.nombre = "Meningococo ACYW"
      this.status = 3
      this.factoresDeRiesgo = []
      this.id = 28
      this.dosis = [0,3]
      this.separacionDosis = [0,2,10]
      this.fechaVacunacion = this.calcularFechaVacunacion()
    }
  
  	setStatus(n) {
    	this.status = n;
      	this.fechaVacunacion = this.calcularFechaVacunacion();
    }
      
    calcularFechaVacunacion() {
      if(calculateAgeInMonths(this.birthdate) >= 2 && this.status == 2)
      {
        return calculateVaccinationDate(this.birthdate, 132) 
      }
      else
      {
        return calculateVaccinationDate(this.birthdate, 3)
      }
    }
}

class Antigripal {
  constructor(birthdate) {
      this.birthdate = birthdate
      this.nombre = "Antigripal"
      this.status = 3
      this.factoresDeRiesgo = [2,6,8]
      this.id = 29
      this.dosis = [0,2]
      this.separacionDosis = [0,1]
      this.fechaVacunacion = this.calcularFechaVacunacion()
    }

    calcularFechaVacunacion() {
      if(calculateAgeInMonths(this.birthdate) >= 2 && this.status == 2)
      {
        return calculateVaccinationDate(this.birthdate, 132) 
      }
      else
      {
        return calculateVaccinationDate(this.birthdate, 3)
      }
    }
}
export default function completarArrayVacunas(birthdate) {

    
}
