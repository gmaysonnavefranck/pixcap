import { Employee, IEmployeeOrgApp, IHistory} from "./interfaces";
export class EmployeeOrgApp implements IEmployeeOrgApp {
  public ceo: Employee;
  private historic: Array<History> = []
  private historicIndex: number = 0;


  move(employeeID: number, supervisorID: number): void {
    const employee = this.findEmployeeById(this.ceo, employeeID)
    const supervisor = this.findEmployeeById(this.ceo, supervisorID)
    if(!employee || !supervisor) return console.error("not found")
    const oldSupervisor = this.findOldSupervisor(this.ceo, employeeID)

    const movedSubortinates: Array<Employee> = [];
    
    if(employee.subordinates) {
      employee.subordinates.forEach((subordinate: Employee) => {
        oldSupervisor.subordinates.push(subordinate)
        movedSubortinates.push(subordinate)
      });
      employee.subordinates = []
    }
    supervisor.subordinates.push(employee)
    
    const employeeIndex: number = oldSupervisor.subordinates.indexOf(employee)
    oldSupervisor.subordinates.splice(employeeIndex, 1)

    const history: History = new History(oldSupervisor, supervisor, employee, movedSubortinates)
    if(this.historic.length === this.historicIndex)
      this.historic.push(history)
    this.historicIndex++;
  }

  undo(): void {
    if(!this.historicIndex) return
    const historic = this.historic[--this.historicIndex]
    const employeeIndex = historic.newSupervisor.subordinates.indexOf(historic.employeeMoved)
    historic.newSupervisor.subordinates.splice(employeeIndex, 1)
    historic.oldSupervisor.subordinates.push(historic.employeeMoved)
    if(historic.movedSubortinates)
      historic.movedSubortinates.forEach(subordinate => {
        const subordinateIndex = historic.oldSupervisor.subordinates.indexOf(subordinate)
        historic.oldSupervisor.subordinates.splice(subordinateIndex, 1)
        historic.employeeMoved.subordinates.push(subordinate)
      })
  }

  redo(): void {
    if(this.historicIndex === this.historic.length) return
    this.move(this.historic[this.historicIndex].employeeMoved.uniqueId, this.historic[this.historicIndex].newSupervisor.uniqueId)
  }
  
  print(): void {
    console.log(this.ceo)
  }


  findEmployeeById(startingEmployee: Employee, id: number): any {
    let index = 0;
    if(!startingEmployee) return
    if(startingEmployee.uniqueId === id)
      return startingEmployee
    let foundEmployee = startingEmployee.subordinates.find(subordinate => subordinate.uniqueId === id)
    while(!foundEmployee && index < startingEmployee.subordinates.length) {
      foundEmployee = this.findEmployeeById(startingEmployee.subordinates[index], id)
      index++;
    }
    return foundEmployee
  }

  findOldSupervisor(startingEmployee: Employee, id: number): Employee {
    let index = 0;
    let supervisor!: Employee;
    let foundEmployee = startingEmployee.subordinates.find(subordinate => subordinate.uniqueId === id)
    if(foundEmployee)
      return startingEmployee
    while(!supervisor && index < startingEmployee.subordinates.length) {
      supervisor = this.findOldSupervisor(startingEmployee.subordinates[index], id)
      index++;
    }
    return supervisor
  }

  constructor (ceo: Employee) {
    this.ceo = ceo;
  }
}

export class History implements IHistory{
  public movedSubortinates: Array<Employee> = [];
  public oldSupervisor: Employee;
  public newSupervisor: Employee;
  public employeeMoved: Employee
  
  constructor (oldSupervisor: Employee, 
               newSupervisor: Employee, 
               employeeMoved: Employee,
               movedSubortinates: Array<Employee>) {
    this.employeeMoved = employeeMoved;
    this.newSupervisor = newSupervisor;
    this.oldSupervisor = oldSupervisor;
    this.movedSubortinates = movedSubortinates;
  }
}