import { EmployeeOrgApp } from "./models/classes.js";
const maryBlue = {
    uniqueId: 3,
    name: "Mary Blue",
    subordinates: []
};
const willTurner = {
    uniqueId: 6,
    name: "Will Turner",
    subordinates: []
};
const thomasBrown = {
    uniqueId: 9,
    name: "Thomas Brown",
    subordinates: []
};
const harryTobs = {
    uniqueId: 8,
    name: "Harry Tobs",
    subordinates: [thomasBrown]
};
const georgeCarrey = {
    uniqueId: 10,
    name: "George Carrey",
    subordinates: []
};
const garyStyles = {
    uniqueId: 11,
    name: "Gary Styles",
    subordinates: []
};
const bruceWillis = {
    uniqueId: 12,
    name: "Bruce Willis",
    subordinates: []
};
const sophieTurner = {
    uniqueId: 14,
    name: "Sophie Turner",
    subordinates: []
};
const georginaFlangy = {
    uniqueId: 13,
    name: "Georgina Flangy",
    subordinates: [sophieTurner]
};
const tylerSimpson = {
    uniqueId: 7,
    name: "Tyler Simpson",
    subordinates: [harryTobs, georgeCarrey, garyStyles]
};
const tinaTeff = {
    uniqueId: 5,
    name: "Tina Teff",
    subordinates: [willTurner]
};
const bobSaget = {
    uniqueId: 4,
    name: "Bob Saget",
    subordinates: [tinaTeff]
};
const cassandraReynolds = {
    uniqueId: 2,
    name: "Cassandra Reynolds",
    subordinates: [maryBlue, bobSaget]
};
const sarahDonald = {
    uniqueId: 1,
    name: "Sarah Donald",
    subordinates: [cassandraReynolds]
};
const ceo = {
    uniqueId: 0,
    name: "Mark Zuckerberg",
    subordinates: [sarahDonald, tylerSimpson, bruceWillis, georginaFlangy]
};
const app = new EmployeeOrgApp(ceo);
app.move(7, 3);
app.move(12, 6);
app.undo();
app.redo();
app.undo();
app.redo();
app.print();
