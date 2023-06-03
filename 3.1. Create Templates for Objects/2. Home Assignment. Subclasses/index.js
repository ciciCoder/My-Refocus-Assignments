// @ts-check
/**
 * @abstract
 *
 */
class Employee {
  /**
   * @abstract
   * @type {string}
   */
  employeeName;
  /**
   * @abstract
   * @type {number}
   */
  salaryAmount;
  /**@type {string} */
  companyName;

  constructor() {
    this.companyName = 'MHA';
  }

  printIntroduction() {
    const msg = `Hi my name is ${this.employeeName}.`;
    console.log(msg);
  }

  printSalaryAmount() {
    const msg = `${this.employeeName}'s salary is $${this.salaryAmount}.`;
    console.log(msg);
  }
}
/**
 * @extends Employee
 * @class
 */
class Developer extends Employee {
  /**@type {string} */
  speciality;
  /**
   * Description
   * @param {string} name
   * @param {string} speciality
   * @param {number} salary
   */
  constructor(name, speciality, salary) {
    super();
    this.employeeName = name;
    this.salaryAmount = salary;
    this.speciality = speciality;
  }

  printSpeciality() {
    const msg = `I am a web developer specializing in ${this.speciality}.`;
    console.log(msg);
  }

  printWorkInfo() {
    const msg = `I work at ${this.companyName}.`;
    console.log(msg);
  }
}
const izuku = new Developer('Izuku', 'front-end development', 2000);
izuku.printIntroduction();
izuku.printSalaryAmount();
izuku.printSpeciality();
izuku.printWorkInfo();
