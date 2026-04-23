import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
  // Clear existing data
  await prisma.$queryRaw`TRUNCATE loan_copies, loans, media_copies, media, authors, users RESTART IDENTITY CASCADE;`;

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: { name: "Alisson", email: "alisson@test.com", role: "ADMIN" }
    }),
    prisma.user.create({
      data: { name: "John Doe", email: "john@test.com", role: "GUEST" }
    }),
    prisma.user.create({
      data: { name: "Jane Smith", email: "jane@test.com", role: "EMPLOYEE" }
    }),
  ]);

  // Create authors
  const authors = await Promise.all([
    prisma.author.create({ data: { name: "Robert Martin" } }),
    prisma.author.create({ data: { name: "Martin Fowler" } }),
  ]);

  // Create media
  const mediaItems = await Promise.all([
    prisma.media.create({
      data: {
        title: "Clean Code",
        mediaType: "BOOK",
        authorId: authors[0].id
      }
    }),
    prisma.media.create({
      data: {
        title: "Refactoring",
        mediaType: "BOOK",
        authorId: authors[1].id
      }
    }),
  ]);

  // Create media copies
  const copies = await Promise.all([
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[0].id, copyNumber: 1, currentStatus: "AVAILABLE" }
    }),
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[0].id, copyNumber: 2, currentStatus: "AVAILABLE" }
    }),
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[1].id, copyNumber: 1, currentStatus: "AVAILABLE" }
    }),
  ]);

  console.log('Seed completed successfully!');
} catch (error) {
  console.error('Seed failed:', error);
} finally {
  await prisma.$disconnect();
}