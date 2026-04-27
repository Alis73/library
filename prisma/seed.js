import 'dotenv/config';
import prisma from '../src/config/db.js';
import bcrypt from 'bcrypt';

try {
  // Clear existing data
  await prisma.$queryRaw`TRUNCATE loan_copies, loans, media_copies, media, authors, users RESTART IDENTITY CASCADE;`;

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: { 
        name: "Alisson Zavala", 
        email: "alisson@test.com", 
        password: await bcrypt.hash("123456789", 10), 
        role: "ADMIN" 
      }
    }),
    prisma.user.create({
      data: { 
        name: "John Doe", 
        email: "john@test.com", 
        password: await bcrypt.hash("123456789", 10), 
        role: "GUEST" 
      }
    }),
    prisma.user.create({
      data: { 
        name: "Jane Smith", 
        email: "jane@test.com", 
        password: await bcrypt.hash("123456789", 10), 
        role: "EMPLOYEE" 
      }
    }),
    prisma.user.create({
      data: { 
        name: "Bob Johnson", 
        email: "bob@test.com", 
        password: await bcrypt.hash("123456789", 10), 
        role: "GUEST" 
      }
    }),
    prisma.user.create({
      data: { 
        name: "Mary Cooper", 
        email: "mary@test.com", 
        password: await bcrypt.hash("123456789", 10), 
        role: "GUEST" 
      }
    }),
  ]);

  // Create authors
  const authors = await Promise.all([
    prisma.author.create({ data: { name: "Robert Martin" } }),
    prisma.author.create({ data: { name: "Martin Fowler" } }),
    prisma.author.create({ data: { name: "Andrew Hunt" } }),
    prisma.author.create({ data: { name: "Eric Evans" } }),
    prisma.author.create({ data: { name: "Steve McConnell" } }),
    prisma.author.create({ data: { name: "Donald Knuth" } }),
  ]);

  // Create media
  const mediaItems = await Promise.all([
    prisma.media.create({
      data: {
        title: "Clean Code",
        mediaType: "BOOK",
        authorId: authors[0].id,
        publicationYear: new Date("2008-01-01")
      }
    }),
    prisma.media.create({
      data: {
        title: "Refactoring",
        mediaType: "BOOK",
        authorId: authors[1].id,
        publicationYear: new Date("1999-01-01")
      }
    }),
    prisma.media.create({
      data: {
        title: "The Pragmatic Programmer",
        mediaType: "BOOK",
        authorId: authors[2].id,
        publicationYear: new Date("1999-10-01")
      }
    }),
    prisma.media.create({
      data: {
        title: "Domain Driven Design",
        mediaType: "BOOK",
        authorId: authors[3].id,
        publicationYear: new Date("2003-08-01")
      }
    }),
    prisma.media.create({
      data: {
        title: "Code Complete",
        mediaType: "BOOK",
        authorId: authors[4].id,
        publicationYear: new Date("2004-06-01")
      }
    }),
    prisma.media.create({
      data: {
        title: "The Art of Computer Programming",
        mediaType: "BOOK",
        authorId: authors[5].id,
        publicationYear: new Date("1968-01-01")
      }
    }),
    prisma.media.create({
      data: {
        title: "National Geographic",
        mediaType: "MAGAZINE",
        authorId: authors[0].id,
        publicationYear: new Date("2023-01-01")
      }
    }),
    prisma.media.create({
      data: {
        title: "The Matrix",
        mediaType: "DVD",
        authorId: authors[1].id,
        publicationYear: new Date("1999-03-01")
      }
    }),
  ]);

  // Create media copies
  const copies = await Promise.all([
    // Clean Code - 3 copies
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[0].id, copyNumber: 1, currentStatus: "AVAILABLE" }
    }),
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[0].id, copyNumber: 2, currentStatus: "AVAILABLE" }
    }),
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[0].id, copyNumber: 3, currentStatus: "AVAILABLE" }
    }),
    // Refactoring - 2 copies
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[1].id, copyNumber: 1, currentStatus: "AVAILABLE" }
    }),
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[1].id, copyNumber: 2, currentStatus: "AVAILABLE" }
    }),
    // Pragmatic Programmer - 2 copies
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[2].id, copyNumber: 1, currentStatus: "AVAILABLE" }
    }),
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[2].id, copyNumber: 2, currentStatus: "AVAILABLE" }
    }),
    // Domain Driven Design - 2 copies
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[3].id, copyNumber: 1, currentStatus: "AVAILABLE" }
    }),
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[3].id, copyNumber: 2, currentStatus: "AVAILABLE" }
    }),
    // Code Complete - 1 copy
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[4].id, copyNumber: 1, currentStatus: "AVAILABLE" }
    }),
    // Art of Computer Programming - 1 copy
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[5].id, copyNumber: 1, currentStatus: "AVAILABLE" }
    }),
    // National Geographic - 3 copies
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[6].id, copyNumber: 1, currentStatus: "AVAILABLE" }
    }),
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[6].id, copyNumber: 2, currentStatus: "AVAILABLE" }
    }),
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[6].id, copyNumber: 3, currentStatus: "AVAILABLE" }
    }),
    // The Matrix - 2 copies
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[7].id, copyNumber: 1, currentStatus: "AVAILABLE" }
    }),
    prisma.mediaCopy.create({
      data: { mediaId: mediaItems[7].id, copyNumber: 2, currentStatus: "AVAILABLE" }
    }),
  ]);

  // Create some loans
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);

  const loan1 = await prisma.loan.create({
    data: {
      borrowerId: users[1].id, // John Doe
      dueDate
    }
  });

  // Add copies to loan
  await prisma.loanCopy.create({
    data: { loanId: loan1.id, copyId: copies[0].id }
  });

  // Update copy status
  await prisma.mediaCopy.update({
    where: { id: copies[0].id },
    data: { currentStatus: "CHECKEDOUT" }
  });

  console.log('Seed completed successfully!');
} catch (error) {
  console.error('Seed failed:', error);
} finally {
  await prisma.$disconnect();
}