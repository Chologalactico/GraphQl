import { ApolloServer, gql } from "apollo-server";

const person = [
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
    allPerson: [Person]!
    findPerson(name: String!): Person
  }
`;

const resolvers = {
  Query: {
    personCount: () => person.length,
    allPerson: () => person,
    findPerson: (root, args) => {
      const { name } = args;
      return person.find((person) => person.name === name);
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

const server = new ApolloServer({
  typeDefs: typeDefinitions,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
