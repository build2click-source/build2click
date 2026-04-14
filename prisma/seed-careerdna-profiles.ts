import { PrismaClient } from ".prisma/careerdna-client";

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Career DNA Assessment Platform Profiles (20 Generic Profiles)...');

  const profiles = [
    { title: 'Software & Technology Professional', description: 'Designs, develops, and implements technology solutions, software applications, and IT systems.', targetVector: JSON.stringify([3.0, 3.5, 4.5, 2.5, 4.0, 3.5, 5.0, 2.0, 2.5, 3.0, 4.0, 4.8, 3.5, 5.0]) },
    { title: 'Healthcare & Medical Professional', description: 'Provides medical care, diagnoses illnesses, or manages patient health and wellbeing.', targetVector: JSON.stringify([4.0, 4.8, 4.8, 3.0, 3.5, 3.5, 4.5, 2.0, 5.0, 3.0, 3.5, 3.5, 4.0, 4.0]) },
    { title: 'Business & Finance Executive', description: 'Plans, directs, and coordinates business operations, financial activities, and investments.', targetVector: JSON.stringify([4.5, 3.5, 4.8, 2.5, 3.5, 2.0, 3.5, 2.0, 3.0, 5.0, 4.8, 4.5, 4.0, 4.2]) },
    { title: 'Sales & Marketing Specialist', description: 'Develops marketing campaigns, manages client relationships, and drives business growth.', targetVector: JSON.stringify([4.8, 4.0, 4.2, 2.5, 4.5, 2.0, 3.0, 4.0, 4.5, 5.0, 3.5, 3.5, 4.5, 3.8]) },
    { title: 'Engineering & Technical Professional', description: 'Uses scientific and mathematical principles to design processes, structures, and systems.', targetVector: JSON.stringify([3.2, 3.5, 4.5, 2.0, 4.0, 4.8, 4.8, 2.5, 2.5, 3.0, 3.5, 4.8, 3.2, 4.8]) },
    { title: 'Education & Training Professional', description: 'Facilitates learning and develops curriculum for students and adult learners.', targetVector: JSON.stringify([4.2, 4.5, 4.2, 3.0, 4.0, 2.0, 3.0, 3.5, 5.0, 3.8, 3.0, 3.5, 4.5, 3.5]) },
    { title: 'Creative & Design Specialist', description: 'Produces artistic expressions, graphic designs, multimedia, or written content.', targetVector: JSON.stringify([3.5, 3.8, 4.0, 3.0, 5.0, 3.0, 2.5, 5.0, 3.0, 4.0, 2.5, 2.5, 3.8, 3.5]) },
    { title: 'Scientific & Research Professional', description: 'Conducts laboratory analysis, data science modeling, or experimental research.', targetVector: JSON.stringify([2.5, 3.5, 4.8, 2.5, 4.5, 2.5, 5.0, 2.5, 2.0, 3.0, 4.0, 5.0, 4.0, 4.8]) },
    { title: 'Legal & Advisory Professional', description: 'Provides legal counsel, representation, and strategic advisory services.', targetVector: JSON.stringify([4.5, 3.0, 4.8, 3.0, 4.2, 2.0, 4.5, 2.5, 3.5, 5.0, 3.5, 3.5, 5.0, 4.8]) },
    { title: 'Operations & Logistics Manager', description: 'Oversees supply chains, production facilities, or civil construction projects.', targetVector: JSON.stringify([4.2, 3.8, 4.5, 2.5, 3.5, 4.5, 3.0, 2.0, 3.5, 4.8, 4.0, 4.0, 3.5, 4.0]) },
    { title: 'Human Resources Professional', description: 'Manages employee relations, recruitment, and organizational culture.', targetVector: JSON.stringify([4.8, 4.2, 4.0, 2.5, 4.2, 2.0, 3.0, 3.5, 4.8, 4.5, 4.0, 3.5, 4.2, 4.0]) },
    { title: 'Financial Analyst', description: 'Evaluates financial data to guide business investments and strategic decisions.', targetVector: JSON.stringify([3.5, 3.0, 5.0, 2.0, 3.5, 2.5, 3.8, 2.0, 2.5, 4.5, 4.8, 5.0, 3.8, 4.2]) },
    { title: 'Civil Engineer', description: 'Designs and supervises large construction projects, roads, and infrastructure.', targetVector: JSON.stringify([3.8, 3.5, 4.5, 2.0, 4.0, 5.0, 4.5, 2.5, 2.5, 3.5, 4.0, 4.8, 3.5, 4.5]) },
    { title: 'Registered Nurse', description: 'Provides hands-on patient care and educates patients about health conditions.', targetVector: JSON.stringify([4.5, 4.8, 4.5, 3.5, 3.8, 3.5, 4.0, 2.5, 5.0, 3.0, 3.5, 3.5, 4.0, 4.0]) },
    { title: 'Data Analyst', description: 'Gathers, cleans, and analyzes data to help organizations make business decisions.', targetVector: JSON.stringify([3.2, 3.2, 4.8, 2.0, 4.5, 2.5, 5.0, 2.0, 2.5, 3.5, 4.5, 4.8, 3.5, 5.0]) },
    { title: 'Public Relations Specialist', description: 'Creates and maintains a favorable public image for the organization they represent.', targetVector: JSON.stringify([4.8, 4.0, 3.8, 3.0, 4.5, 2.0, 3.0, 4.2, 4.5, 4.8, 3.5, 3.5, 4.5, 4.0]) },
    { title: 'Project Manager', description: 'Coordinates people and resources to ensure projects are completed on time.', targetVector: JSON.stringify([4.5, 4.0, 4.8, 2.5, 4.0, 2.5, 3.5, 2.5, 4.0, 4.8, 4.5, 4.0, 4.2, 4.2]) },
    { title: 'Mechanical Engineer', description: 'Designs, develops, and tests mechanical and thermal sensors and devices.', targetVector: JSON.stringify([3.2, 3.5, 4.5, 2.0, 4.0, 5.0, 4.8, 2.5, 2.0, 3.0, 3.5, 4.8, 3.5, 4.8]) },
    { title: 'Graphic Designer', description: 'Creates visual concepts to communicate ideas that inspire and inform consumers.', targetVector: JSON.stringify([3.5, 3.8, 3.8, 2.5, 5.0, 2.5, 2.5, 5.0, 3.0, 3.5, 2.5, 2.5, 3.8, 3.5]) },
    { title: 'Business Consultant', description: 'Advises companies on how to improve efficiency, profitability, and strategy.', targetVector: JSON.stringify([4.5, 3.8, 4.5, 2.5, 4.2, 2.0, 4.0, 2.5, 3.8, 4.8, 4.2, 4.5, 4.5, 4.5]) }
  ]

  // Clear out existing profiles to guarantee we reduce strictly to these 10 core generic categories
  console.log('🧹 Purging existing profiles...')
  await prisma.occupationalProfile.deleteMany({})

  console.log('🔧 Seeding the updated 20 profiles (extended to 42 dimensions)...')
  for (const profile of profiles) {
    const baseVector = JSON.parse(profile.targetVector);
    // Expand to 42 dimensions by padding the SJT/Values section with neutral (2.5) baseline scores
    const extendedVector = [...baseVector, ...Array(28).fill(2.5)];

    await prisma.occupationalProfile.create({
      data: {
        ...profile,
        targetVector: JSON.stringify(extendedVector)
      }
    })
  }

  console.log('✅ 20 Generic Occupational Profiles seeded successfully.')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
