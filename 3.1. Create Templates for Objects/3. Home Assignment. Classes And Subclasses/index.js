// @ts-check

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

class HumanResources extends Employee {
  /**
   * Description
   * @param {string} name
   * @param {number} salary
   */
  constructor(name, salary) {
    super();
    this.employeeName = name;
    this.salaryAmount = salary;
  }

  printTask() {
    console.log('Hire an employee.');
  }

  printWorkInfo() {
    const msg = `I work at ${this.companyName}.`;
    console.log(msg);
  }
}

class TeamLead extends Employee {
  /**
   * Description
   * @param {string} name
   * @param {number} salary
   */
  constructor(name, salary) {
    super();
    this.employeeName = name;
    this.salaryAmount = salary;
  }
  printTask() {
    console.log('Give instructions to other employees.');
  }

  printWorkInfo() {
    const msg = `I work at ${this.companyName}.`;
    console.log(msg);
  }
}

class Tester extends Employee {
  /**
   * Description
   * @param {string} name
   * @param {number} salary
   */
  constructor(name, salary) {
    super();
    this.employeeName = name;
    this.salaryAmount = salary;
  }
  printTask1() {
    console.log('Say that a code passes.');
  }

  printTask2() {
    console.log('Say that a code is rejected.');
  }

  printWorkInfo() {
    const msg = `I work at ${this.companyName}.`;
    console.log(msg);
  }
}

class Marketer extends Employee {
  /**
   * Description
   * @param {string} name
   * @param {number} salary
   */
  constructor(name, salary) {
    super();
    this.employeeName = name;
    this.salaryAmount = salary;
  }
  printTask1() {
    console.log('Promote the company they work at');
  }
  printTask2() {
    console.log('Show products to customers');
  }

  printWorkInfo() {
    const msg = `I work at ${this.companyName}.`;
    console.log(msg);
  }
}

class ProductOwner extends Employee {
  /**@type {Array<string>}*/
  companyProjects = [];
  /**
   * Description
   * @param {string} name
   * @param {number} salary
   */
  constructor(name, salary) {
    super();
    this.employeeName = name;
    this.salaryAmount = salary;
  }
  /**
   * Description
   * @param {string} project
   * @returns {void}
   */
  addProject(project) {
    this.companyProjects.push(project);
  }

  printTask() {
    console.log('Create new projects');
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

const hr = new HumanResources('Izuku', 2000);
hr.printTask();
hr.printWorkInfo();

const teamLead = new TeamLead('Izuku', 2000);
teamLead.printTask();
teamLead.printWorkInfo();

const tester = new Tester('Izuku', 2000);
tester.printTask1();
tester.printTask2();
tester.printWorkInfo();

const marketer = new Marketer('Izuku', 2000);
hr.printTask();
hr.printWorkInfo();

const productOwner = new ProductOwner('Izuku', 2000);
productOwner.printTask();
productOwner.printWorkInfo();
productOwner.addProject('Software for X company');
