import { faker } from "@faker-js/faker";
import { Todo, User } from "@/typings";

export function generateUser(): User {
  return {
    id: faker.datatype.number(100_000),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    username: faker.name.firstName(),
    address: {
      street: faker.address.street(),
      suite: faker.address.secondaryAddress(),
      city: faker.address.city(),
      zipcode: faker.address.zipCode(),
      geo: {
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
      },
    },
    company: {
      name: faker.company.companyName(),
      bs: faker.company.bs(),
      catchPhrase: faker.company.catchPhrase(),
    },
    website: faker.internet.url(),
  };
}

export function generateTodo(): Todo {
  return {
    id: faker.datatype.number(100_000),
    title: faker.lorem.sentence(),
    completed: faker.datatype.boolean(),
    userId: faker.datatype.number(100_000),
  };
}

export function generateTodos(count = 5): Todo[] {
  return Array.from({ length: count }, generateTodo);
}

export function generateUsers(count = 5): User[] {
  return Array.from({ length: count }, generateUser);
}
