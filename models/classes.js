export class EmployeeOrgApp {
    move(employeeID, supervisorID) {
        const employee = this.findEmployeeById(this.ceo, employeeID);
        const supervisor = this.findEmployeeById(this.ceo, supervisorID);
        const oldSupervisor = this.findOldSupervisor(this.ceo, employeeID);
        const movedSubortinates = [];
        if (employee.subordinates) {
            employee.subordinates.forEach((subordinate) => {
                oldSupervisor.subordinates.push(subordinate);
                movedSubortinates.push(subordinate);
            });
            employee.subordinates = [];
        }
        supervisor.subordinates.push(employee);
        const employeeIndex = oldSupervisor.subordinates.indexOf(employee);
        oldSupervisor.subordinates.splice(employeeIndex, 1);
        const history = new History(oldSupervisor, supervisor, employee, movedSubortinates);
        if (this.historic.length === this.historicIndex)
            this.historic.push(history);
        this.historicIndex++;
    }
    undo() {
        if (!this.historicIndex)
            return;
        const historic = this.historic[--this.historicIndex];
        const employeeIndex = historic.newSupervisor.subordinates.indexOf(historic.employeeMoved);
        historic.newSupervisor.subordinates.splice(employeeIndex, 1);
        historic.oldSupervisor.subordinates.push(historic.employeeMoved);
        if (historic.movedSubortinates)
            historic.movedSubortinates.forEach(subordinate => {
                const subordinateIndex = historic.oldSupervisor.subordinates.indexOf(subordinate);
                historic.oldSupervisor.subordinates.splice(subordinateIndex, 1);
                historic.employeeMoved.subordinates.push(subordinate);
            });
    }
    redo() {
        if (this.historicIndex === this.historic.length)
            return;
        this.move(this.historic[this.historicIndex].employeeMoved.uniqueId, this.historic[this.historicIndex].newSupervisor.uniqueId);
    }
    print() {
        console.log(this.ceo);
    }
    findEmployeeById(startingEmployee, id) {
        let index = 0;
        if (!startingEmployee)
            return;
        if (startingEmployee.uniqueId === id)
            return startingEmployee;
        let foundEmployee = startingEmployee.subordinates.find(subordinate => subordinate.uniqueId === id);
        while (!foundEmployee && index < startingEmployee.subordinates.length) {
            foundEmployee = this.findEmployeeById(startingEmployee.subordinates[index], id);
            index++;
        }
        return foundEmployee;
    }
    findOldSupervisor(startingEmployee, id) {
        let index = 0;
        let supervisor;
        let foundEmployee = startingEmployee.subordinates.find(subordinate => subordinate.uniqueId === id);
        if (foundEmployee)
            return startingEmployee;
        while (!supervisor && index < startingEmployee.subordinates.length) {
            supervisor = this.findOldSupervisor(startingEmployee.subordinates[index], id);
            index++;
        }
        return supervisor;
    }
    constructor(ceo) {
        this.historic = [];
        this.historicIndex = 0;
        this.ceo = ceo;
    }
}
export class History {
    constructor(oldSupervisor, newSupervisor, employeeMoved, movedSubortinates) {
        this.movedSubortinates = [];
        this.employeeMoved = employeeMoved;
        this.newSupervisor = newSupervisor;
        this.oldSupervisor = oldSupervisor;
        this.movedSubortinates = movedSubortinates;
    }
}
