import { Employee } from "./models/interfaces.js"
import { EmployeeOrgApp } from "./models/classes.js"

const maryBlue: Employee = {
  uniqueId: 3,
  name: "Mary Blue",
  subordinates: []
}

const willTurner: Employee = {
  uniqueId: 6,
  name: "Will Turner",
  subordinates: []
}

const thomasBrown: Employee = {
  uniqueId: 9,
  name: "Thomas Brown",
  subordinates: []
}

const harryTobs: Employee = {
  uniqueId: 8,
  name: "Harry Tobs",
  subordinates: [thomasBrown]
}

const georgeCarrey: Employee = {
  uniqueId: 10,
  name: "George Carrey",
  subordinates: []
}

const garyStyles: Employee = {
  uniqueId: 11,
  name: "Gary Styles",
  subordinates: []
}

const bruceWillis: Employee = {
  uniqueId: 12,
  name: "Bruce Willis",
  subordinates: []
}

const sophieTurner: Employee = {
  uniqueId: 14,
  name: "Sophie Turner",
  subordinates: []
} 

const georginaFlangy: Employee = {
  uniqueId: 13,
  name: "Georgina Flangy",
  subordinates: [sophieTurner]
}

const tylerSimpson: Employee = {
  uniqueId: 7,
  name: "Tyler Simpson",
  subordinates: [harryTobs, georgeCarrey, garyStyles]
}

const tinaTeff: Employee = {
  uniqueId: 5,
  name: "Tina Teff",
  subordinates: [willTurner]
}

const bobSaget: Employee = {
  uniqueId: 4,
  name: "Bob Saget",
  subordinates: [tinaTeff]
}

const cassandraReynolds: Employee = {
  uniqueId: 2,
  name: "Cassandra Reynolds",
  subordinates: [maryBlue, bobSaget]
}

const sarahDonald: Employee = {
  uniqueId: 1,
  name: "Sarah Donald",
  subordinates: [cassandraReynolds]
}

const ceo: Employee = {
  uniqueId: 0,
  name: "Mark Zuckerberg",
  subordinates: [sarahDonald, tylerSimpson, bruceWillis, georginaFlangy]
}



const app = new EmployeeOrgApp(ceo)
app.move(7,3)
app.move(12,6)
app.undo()
app.redo()
app.undo()
app.redo()
app.print()

