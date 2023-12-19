export default function completarArrayVacunas(birthdate) {
  let arrayVacunas = [];
  let date = birthdate
  let NeumococoConjugad = new NeumococoConjugada(date)
  arrayVacunas.push(NeumococoConjugad)
  let Pentavalent = new Pentavalente(date)
  arrayVacunas.push(Pentavalent)
  let IP = new IPV(date)
  arrayVacunas.push(IP)
  let Meningococ = new Meningococo(date)
  arrayVacunas.push(Meningococ)
  let Antigripa = new Antigripal(date)
  arrayVacunas.push(Antigripa)
  let Hepatitis = new HepatitisA(date)
  arrayVacunas.push(Hepatitis)
  let Rotaviru = new Rotavirus(date)
  arrayVacunas.push(Rotaviru)
  let TripleVira = new TripleViral(date)
  arrayVacunas.push(TripleVira)
  let Varicel = new Varicela(date)
  arrayVacunas.push(Varicel)

  var arrayVacunas2 = declassify(arrayVacunas)

  console.log(arrayVacunas2)
  return  arrayVacunas2
}

function declassify(arr) {
  let vacunasData = arr.map(vacuna => {
    return {
        birthdate: vacuna.birthdate,
        nombre: vacuna.nombre,
        status: vacuna.status,
        factoresDeRiesgo: vacuna.factoresDeRiesgo,
        id: vacuna.id,
        dosis: vacuna.dosis,
        separacionDosis: vacuna.separacionDosis,
        fechaVacunacion: vacuna.fechaVacunacion,
        MD: 0
    }
  });
  return vacunasData
}


//--------------------------------------------------------

function calculateAgeInMonths(birthdate) {
  const parts = birthdate.split("/");
  const birthYear = Number(parts[2]);
  const birthMonth = Number(parts[1]);
  const birthDay = Number(parts[0]);

  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1; // January is 0 in JavaScript
  const nowDay = now.getDate();

  let ageInMonths = (nowYear - birthYear) * 12 + (nowMonth - birthMonth);

  // Subtract one month if the birth day has not occurred yet in the current month
  if (nowDay < birthDay) {
      ageInMonths--;
  }

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

 function calculateStatus(vaccinedate) {
  const [day, month, year] = vaccinedate.split("/");
  const date = new Date(year, month - 1, day);
  const currentDate = new Date();
  date.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  if (date < currentDate) {
    return 3;
  } else {
    return 2;
  }
 }
//----------------------------------------------------------------      Vacunas
class NeumococoConjugada {
    constructor(birthdate) {
      this.birthdate = birthdate
      this.nombre = "Neumococo Conjugada"
      this.status = calculateStatus(this.calcularFechaVacunacion())
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
    this.status = calculateStatus(calculateVaccinationDate(this.birthdate, 2))
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
    this.status = calculateStatus(calculateVaccinationDate(this.birthdate, 2))
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
    this.status = calculateStatus(calculateVaccinationDate(this.birthdate, 2))
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
      this.status = calculateStatus(this.calcularFechaVacunacion())
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
      this.status = calculateStatus(this.calcularFechaVacunacion())
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

class HepatitisA {
  constructor(birthdate) {
      this.birthdate = birthdate
      this.nombre = "Hepatitis A"
      this.status = calculateStatus(calculateVaccinationDate(this.birthdate, 12))
      this.factoresDeRiesgo = [2,6,8]
      this.id = 30
      this.dosis = [0,1]
      this.separacionDosis = [0]
      this.fechaVacunacion = calculateVaccinationDate(this.birthdate, 12)
    }
}

class TripleViral { //TODO
  constructor(birthdate) {
      this.birthdate = birthdate
      this.nombre = "Triple Viral"
      this.status = calculateStatus(this.calcularFechaVacunacion())
      this.factoresDeRiesgo = [2,6,8] //TODO
      this.id = 31
      this.dosis = [0,2]
      this.separacionDosis = [0,1] //TODO
      this.fechaVacunacion = this.calcularFechaVacunacion() //TODO
    }

    calcularFechaVacunacion() { //TODO
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

class Varicela {
  constructor(birthdate) {
      this.birthdate = birthdate
      this.nombre = "Varicela"
      this.status = calculateStatus(calculateVaccinationDate(this.birthdate, 15))
      this.factoresDeRiesgo = [2,6,8]
      this.id = 32
      this.dosis = [0,2]
      this.separacionDosis = [0,45]
      this.fechaVacunacion = calculateVaccinationDate(this.birthdate, 15)
    }
}

