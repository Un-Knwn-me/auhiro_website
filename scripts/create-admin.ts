import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as readline from "readline";

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log("\n=== Auhiro Motors Admin User Creation ===\n");

  // Get user input
  const name = await question("Admin Name: ");
  const email = await question("Admin Email: ");
  const password = await question("Admin Password (min 8 chars): ");

  if (password.length < 8) {
    console.error("\nError: Password must be at least 8 characters");
    process.exit(1);
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.error(`\nError: User with email ${email} already exists`);
    process.exit(1);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("\n✓ Admin user created successfully!");
  console.log(`  Name: ${user.name}`);
  console.log(`  Email: ${user.email}`);
  console.log(`  Role: ${user.role}`);
  console.log("\nYou can now login at /admin/login");
}

main()
  .catch((error) => {
    console.error("\nError creating admin user:", error.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    rl.close();
  });
