import { ApolloServer, gql } from "apollo-server";
import { v1 as uuid } from "uuid";

const persons = [
  {
    age: 100,
    name: "juan",
    phone: "3024567890",
    street: "calle backend",
    city: "colombina",
    id: "sdnfbksbvsjbvjsnf",
  },
  {
    age: 23,
    name: "Lia",
    street: "calle backend",
    city: "colombina",
    id: "sdn-fbk-sbvsj-bvjsnf",
  },
  {
    age: 15,
    name: "Diego",
    phone: "3024567890",
    street: "calle backend",
    city: "colombina",
    id: "sdn-fbks-HJKL-bvjs-asdfr",
  },
];

const typeDefinitions = gql`
  type Address {
    street: String!
    city: String!
  }
  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons: [Person]!
    findPerson(name: String!): Person
  }
  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
  }
`;
//Endopoitn GET
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) => {
      const { name } = args;
      return persons.find((person) => person.name === name);
    },
  },
  //Endpoint Post,Put,Delete
  Mutation: {
    addPerson: (root, args) => {
      //Se puede hacer de las dos formas ya que el ...args toma todos los datos
      // const {name,phone,street,city} = args
      const person = { ...args, id: uuid() };
      persons.push(person); //update datebase with newPerson
      return person;
    },
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
  //   Person: {
  //     canDrink: (root) => root.age > 18,
  //     address: (root) => `${root.street},${root.city}`,
  //     check: () => "OK",
  //   },
};
//Conexión con la base de datos,en este caso apollo
const server = new ApolloServer({
  typeDefs: typeDefinitions,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
