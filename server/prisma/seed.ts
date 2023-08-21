import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

interface userDataProps {
  email: string;
  name: string;
}

const prisma = new PrismaClient();

const userIds: number[] = [];
const bloodTypes = ["A", "B", "O", "AB", "-A", "-B", "-O", "-AB"];
const userDatas: userDataProps[] = [
  {
    email: "admin@gmail.com",
    name: "Mr.Admin",
  },
  {
    email: "superadmin@gmail.com",
    name: "Super Admin",
  },
  {
    email: "masteradmin@gmail.com",
    name: "Master Admin",
  },
];

// User
async function createUser(userData: userDataProps) {
  const INITIAL_PASSWORD = "password";
  const hashedPassword = await bcrypt.hash(INITIAL_PASSWORD, 12);
  const { id } = await prisma.user.create({
    data: {
      email: userData.email,
      name: userData.name,
      hashedPassword,
      phone: "09769035912",
    },
  });

  userIds.push(id);
}

// Donor
async function createDonor() {
  await prisma.donor.create({
    data: {
      name: faker.person.firstName(),
      bloodType: faker.helpers.arrayElement(bloodTypes),
      phone: faker.phone.number("09#########"),
      address: faker.location.city(),
      dob: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
      userId: faker.helpers.arrayElement(userIds),
    },
  });
}

async function main() {
  const DONOR_COUNT = 100;

  for (let i = 0; i < userDatas.length; i++) {
    await createUser(userDatas[i]);
  }

  for (let i = 0; i < DONOR_COUNT; i++) {
    await createDonor();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
