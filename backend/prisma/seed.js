import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Seed Malaysian Standards
  await seedMalaysianStandards();

  // Seed Sample Users
  await seedSampleUsers();

  // Seed Weather Data
  await seedWeatherData();

  // Seed Material Alerts
  await seedMaterialAlerts();

  console.log('✅ Database seeding completed!');
}

async function seedMalaysianStandards() {
  console.log('📋 Skipping seeding Malaysian standards due to missing Standard model in schema');
}

async function seedSampleUsers() {
  console.log('👥 Seeding sample users...');

  const users = [
    {
      email: 'admin@contractors.my',
      name: 'System Administrator',
      role: 'ADMIN'
    },
    {
      email: 'ahmad@civileng.my',
      name: 'Ahmad bin Abdullah',
      role: 'CONTRACTOR'
    },
    {
      email: 'sarah@electrical.my',
      name: 'Sarah Lim',
      role: 'CONTRACTOR'
    },
    {
      email: 'mohd@consultant.my',
      name: 'Mohd Hassan',
      role: 'CLIENT'
    }
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user
    });
  }

  console.log(`✅ Seeded ${users.length} sample users`);
}

async function seedWeatherData() {
  console.log('🌤️ Skipping seeding weather data due to missing WeatherData model in schema');
}

async function seedMaterialAlerts() {
  console.log('⚠️ Skipping seeding material alerts due to missing MaterialAlert model in schema');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
