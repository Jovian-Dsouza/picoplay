const { PrismaClient } = require("@prisma/client");
const dayjs = require("dayjs");

const prisma = new PrismaClient();

async function main() {
  // Create sample users
//   const user1 = await prisma.user.create({
//     data: {
//       wallet_address: "user1-wallet-address",
//       username: "User1",
//       country_name: "Country1",
//       profile_image: "https://example.com/profile1.jpg",
//     },
//   });

//   const user2 = await prisma.user.create({
//     data: {
//       wallet_address: "user2-wallet-address",
//       username: "User2",
//       country_name: "Country2",
//       profile_image: "https://example.com/profile2.jpg",
//     },
//   });

  // Create sample questions
  const question1 = await prisma.question.create({
    data: {
      question_text: "What is the capital of France?",
      correct_answer: "Paris",
      answer_1: "Paris",
      answer_2: "London",
      answer_3: "Berlin",
      answer_4: "Madrid",
      image_url: "https://example.com/image1.jpg",
    },
  });

  const question2 = await prisma.question.create({
    data: {
      question_text: "What is 2 + 2?",
      correct_answer: "4",
      answer_1: "3",
      answer_2: "4",
      answer_3: "5",
      answer_4: "6",
      image_url: "https://example.com/image2.jpg",
    },
  });

  // Create sample tournament
  const tournament = await prisma.tournament.create({
    data: {
      start_timestamp: dayjs().toDate(),
      end_timestamp: dayjs().add(1, "hour").toDate(),
      prize_pool: 1000.0,
      entry_fee: 10.0,
      pool_address: "sample-pool-address",
      questions: {
        connect: [
          { question_id: question1.question_id },
          { question_id: question2.question_id },
        ],
      },
    },
  });

//   // Create sample user responses
//   await prisma.userResponse.create({
//     data: {
//       tournament_id: tournament.tournament_id,
//       question_id: question1.question_id,
//       wallet_address: user1.wallet_address,
//       selected_answer: "Paris",
//       response_time: dayjs().toDate(),
//     },
//   });

//   await prisma.userResponse.create({
//     data: {
//       tournament_id: tournament.tournament_id,
//       question_id: question2.question_id,
//       wallet_address: user2.wallet_address,
//       selected_answer: "4",
//       response_time: dayjs().toDate(),
//     },
//   });

  console.log("Sample tournament created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
