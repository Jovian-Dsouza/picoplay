// insertSampleQuestions.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sampleQuestions = [
  {
    question_text: "What is 2 + 2?",
    correct_answer: "4",
    answer_1: "3",
    answer_2: "4",
    answer_3: "5",
    answer_4: "6",
    image_url: null,
  },
];

const insertSampleQuestions = async () => {
  for (const question of sampleQuestions) {
    await prisma.question.create({
      data: question,
    });
  }
  console.log("Sample questions inserted successfully.");
};

insertSampleQuestions()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
