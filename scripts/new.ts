// import "dotenv/config";
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";

// import * as schema from "../db/schema";

// const sql = neon(process.env.DATABASE_URL!);
// // @ts-ignore
// const db = drizzle(sql, { schema });

// const main = async () => {
//   try {
//     console.log("Seeding database");

//     // Delete all existing data
//     // await Promise.all([
//     //   db.delete(schema.userProgress),
//     //   db.delete(schema.challenges),
//     //   db.delete(schema.units),
//     //   db.delete(schema.lessons),
//     //   db.delete(schema.courses),
//     //   db.delete(schema.challengeOptions),
//     //   db.delete(schema.userSubscription),
//     // ]);

//     // Insert French course
//     const courses = await db
//       .insert(schema.courses)
//       .values([{ title: "French", imageSrc: "/fr.svg" }])
//       .returning();

//     // For each course, insert units
//     for (const course of courses) {
//       const units = await db
//         .insert(schema.units)
//         .values([
//           {
//             courseId: course.id,
//             title: "Unit 1",
//             description: `Learn the basics of ${course.title}`,
//             order: 1,
//           },
//           {
//             courseId: course.id,
//             title: "Unit 2",
//             description: `Learn intermediate concepts of ${course.title}`,
//             order: 2,
//           },
//           {
//             courseId: course.id,
//             title: "Unit 3",
//             description: `Advanced ${course.title} concepts`,
//             order: 3,
//           },
          
//         ])
//         .returning();

//       // Insert lessons for Unit 1 (Basic)
//       const unit1 = units.find(u => u.order === 1);
//       const unit2 = units.find(u => u.order === 2);

//       if (unit1) {
//         const lessons1 = await db
//           .insert(schema.lessons)
//           .values([
//             { unitId: unit1.id, title: "Greetings and Basic Phrases", order: 1 },
//             { unitId: unit1.id, title: "Colors and Objects", order: 2 },
//             { unitId: unit1.id, title: "Verbs and Pronouns", order: 3 },
//             { unitId: unit1.id, title: "Basic Nouns", order: 4 },
//             { unitId: unit1.id, title: "Common Expressions", order: 5 },
//           ])
//           .returning();

//         // Insert challenges and options for each lesson in Unit 1
//         for (const lesson of lessons1) {
//           let challenges;
//           switch (lesson.order) {
//             case 1: // Lesson 1: Greetings and Basic Phrases
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { lessonId: lesson.id, type: "SELECT", question: '1.What does "Bonjour" mean in English?', order: 1 },
//                   { lessonId: lesson.id, type: "SELECT", question: "2.Which of the following is a French color?", order: 2 },
//                   { lessonId: lesson.id, type: "SELECT", question: '3.What is the French word for "water"?', order: 3 },
//                 ])
//                 .returning();
//               break;
//             case 2: // Lesson 2: Colors and Objects
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { lessonId: lesson.id, type: "SELECT", question: '1.How do you say "I am" in French?', order: 1 },
//                   { lessonId: lesson.id, type: "SELECT", question: '2.What is the French word for "friend"?', order: 2 },
//                   { lessonId: lesson.id, type: "SELECT", question: '3.What does "Merci" mean in English?', order: 3 },
//                 ])
//                 .returning();
//               break;
//             case 3: // Lesson 3: Verbs and Pronouns
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { lessonId: lesson.id, type: "SELECT", question: '1.Which of the following is a French fruit?', order: 1 },
//                   { lessonId: lesson.id, type: "SELECT", question: '2.How do you say "good morning" in French?', order: 2 },
//                   { lessonId: lesson.id, type: "SELECT", question: '3.What is the French word for "book"?', order: 3 },
//                 ])
//                 .returning();
//               break;
//             case 4: // Lesson 4: Basic Nouns
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { lessonId: lesson.id, type: "SELECT", question: '1.What does "Au revoir" mean in English?', order: 1 },
//                   { lessonId: lesson.id, type: "SELECT", question: '2.Which of the following is a French animal?', order: 2 },
//                   { lessonId: lesson.id, type: "SELECT", question: '3.How do you say "I like" in French?', order: 3 },
//                 ])
//                 .returning();
//               break;
//             case 5: // Lesson 5: Common Expressions
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { lessonId: lesson.id, type: "SELECT", question: '1.What is the French word for "house"?', order: 1 },
//                   { lessonId: lesson.id, type: "SELECT", question: '2.What does "S\'il vous plaît" mean in English?', order: 2 },
//                   { lessonId: lesson.id, type: "SELECT", question: '3.Which of the following is a French holiday?', order: 3 },
//                 ])
//                 .returning();
//               break;
//           }

//           // Insert challenge options for each challenge in Unit 1
//           for (const challenge of challenges) {
//             switch (challenge.question) {
//               case '1.What does "Bonjour" mean in English?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Goodbye", imageSrc: "/Goodbye.svg", audioSrc: "/goodbye.mp3" },
//                   { challengeId: challenge.id, correct: true, text: "Hello", imageSrc: "/Hello.svg", audioSrc: "/hello.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Thank you", imageSrc: "/Thank you.svg", audioSrc: "/thankyou.mp3" },
//                 ]);
//                 break;
//               case "2.Which of the following is a French color?":
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Verde", imageSrc: "/Verde.svg", audioSrc: "/Verde.mp3" },
//                   { challengeId: challenge.id, correct: true, text: "Bleu", imageSrc: "/Bleu.svg", audioSrc: "/Bleu.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Gris", imageSrc: "/Gris.svg", audioSrc: "/Gris.mp3" },
//                 ]);
//                 break;
//               case '3.What is the French word for "water"?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "L'eau", imageSrc: "/L'eau.svg", audioSrc: "/L'eau.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Le pain", imageSrc: "/Le pain.svg", audioSrc: "/Le pain.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Le fromage", imageSrc: "/Le fromage.svg", audioSrc: "/Le fromage.mp3" },
//                 ]);
//                 break;
//               case '1.How do you say "I am" in French?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Je m'appelle" , imageSrc: "/woman.svg", audioSrc: "/Je m'appelle.mp3"},
//                   { challengeId: challenge.id, correct: true, text: "Je suis", imageSrc: "/Je suis1.svg", audioSrc: "/Je suis.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Je fait", imageSrc: "/general.svg", audioSrc: "/Je fait.mp3" },
//                 ]);
//                 break;
//               case '2.What is the French word for "friend"?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Amour", imageSrc: "/Amour1.svg", audioSrc: "/Amour.mp3" },
//                   { challengeId: challenge.id, correct: true, text: "Ami", imageSrc: "/Ami.svg", audioSrc: "/Ami.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Famille", imageSrc: "/Famille.svg", audioSrc: "/Famille.mp3" },
//                 ]);
//                 break;
//               case '3.What does "Merci" mean in English?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Sorry", imageSrc: "/Sorry.svg", audioSrc: "/Sorry.mp3"   },
//                   { challengeId: challenge.id, correct: true, text: "Thank you", imageSrc: "/Thank you.svg", audioSrc: "/thankyou.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Yes", imageSrc: "/Yes.svg", audioSrc: "/Yes.mp3" },
//                 ]);
//                 break;
//               case '1.Which of the following is a French fruit?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Pomme" , imageSrc: "/Pomme.svg", audioSrc: "/Pomme.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Carrot", imageSrc: "/Carrot.svg", audioSrc: "/Carrot.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Orange" , imageSrc: "/Orange.svg", audioSrc: "/Orange.mp3"},
//                 ]);
//                 break;
//               case '2.How do you say "good morning" in French?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Bonjour", imageSrc: "/Bonjour.svg", audioSrc: "/Bonjour.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Bonne nuit", imageSrc: "/Bonne nuit.svg", audioSrc: "/Bonne nuit.mp3" },
//                   { challengeId: challenge.id, correct: true, text: "Bon matin" , imageSrc: "/Bon matin.svg", audioSrc: "/Bon matin.mp3"},
//                 ]);
//                 break;
//               case '3.What is the French word for "book"?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Livre", imageSrc: "/Livre.svg", audioSrc: "/Livre.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Journal", imageSrc: "/Journal.svg", audioSrc: "/Journal.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Pencil", imageSrc: "/Pencil.svg", audioSrc: "/Pencil.mp3" },
//                 ]);
//                 break;
//               case '1.What does "Au revoir" mean in English?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Hello", imageSrc: "/Hello.svg", audioSrc: "/Hello.mp3" },
//                   { challengeId: challenge.id, correct: true, text: "Goodbye", imageSrc: "/Goodbye.svg", audioSrc: "/Goodbye.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Thank you", imageSrc: "/Thank you.svg", audioSrc: "/thankyou.mp3" },
//                 ]);
//                 break;
//               case '2.Which of the following is a French animal?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Chat", imageSrc: "/chat1.svg", audioSrc: "/Chat.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Dog", imageSrc: "/Dog.svg", audioSrc: "/Dog.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Bird", imageSrc: "/Bird.svg", audioSrc: "/Bird.mp3" },
//                 ]);
//                 break;
//               case '3.How do you say "I like" in French?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "J'aime", imageSrc: "/J'aime.svg", audioSrc: "/J'aime.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Je suis", imageSrc: "/Je suis1", audioSrc: "/Je suis.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Je m'appelle", imageSrc: "/general.svg", audioSrc: "/Je m'appelle.mp3" },
//                 ]);
//                 break;
//               case '1.What is the French word for "house"?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Maison", imageSrc: "/Maison.svg", audioSrc: "/Maison.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Appartement", imageSrc: "/Appartement.svg", audioSrc: "/Appartement.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Hotel", imageSrc: "/Hotel.svg", audioSrc: "/Hotel.mp3" },
//                 ]);
//                 break;
//               case '2.What does "S\'il vous plaît" mean in English?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Please" , imageSrc: "/Please.svg", audioSrc: "/Please.mp3"},
//                   { challengeId: challenge.id, correct: false, text: "Yes",imageSrc: "/Yes.svg", audioSrc: "/Yes.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "No", imageSrc: "/No.svg", audioSrc: "/No.mp3"},
//                 ]);
//                 break;
//               case '3.Which of the following is a French holiday?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Noël", imageSrc: "/Noël.svg", audioSrc: "/Noël.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Halloween",imageSrc: "/Halloween.svg", audioSrc: "/Halloween.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Thanksgiving", imageSrc: "/Thanksgiving.svg", audioSrc: "/Thanksgiving.mp3" },
//                 ]);
//                 break;
//             }
//           }
//         }
//       }

//       // Insert lessons for Unit 2 (Intermediate)
//       if (unit2) {
//         const lessons2 = await db
//           .insert(schema.lessons)
//           .values([
//             { unitId: unit2.id, title: "Famous Figures", order: 1 },
//             { unitId: unit2.id, title: "Landmarks and Cities", order: 2 },
//             { unitId: unit2.id, title: "French Culture", order: 3 },
//             { unitId: unit2.id, title: "History and Literature", order: 4 },
//             { unitId: unit2.id, title: "Art and Cuisine", order: 5 },
//           ])
//           .returning();

//         // Insert challenges and options for each lesson in Unit 2
//         for (const lesson of lessons2) {
//           let challenges;
//           switch (lesson.order) {
//             case 1: // Lesson 1: Famous Figures
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { lessonId: lesson.id, type: "SELECT", question: '1.Quel est le nom du célèbre peintre français qui a créé la Joconde ?', order: 1 },
//                   { lessonId: lesson.id, type: "SELECT", question: '2.Quel est le nom de la célèbre tour située à Paris ?', order: 2 },
//                   { lessonId: lesson.id, type: "SELECT", question: '3.Quel est le pronom personnel qui remplace le nom d\'une personne ou d\'un animal ?', order: 3 },
//                 ])
//                 .returning();
//               break;
//             case 2: // Lesson 2: Landmarks and Cities
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { lessonId: lesson.id, type: "SELECT", question: '1.Quel est le nom du mois qui suit juin ?', order: 1 },
//                   { lessonId: lesson.id, type: "SELECT", question: '2.Quel est le nom du célèbre écrivain français qui a écrit "Les Misérables" ?', order: 2 },
//                   { lessonId: lesson.id, type: "SELECT", question: '3.Quel est le nom de la ville française célèbre pour ses vignobles ?', order: 3 },
//                 ])
//                 .returning();
//               break;
//             case 3: // Lesson 3: French Culture
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { lessonId: lesson.id, type: "SELECT", question: '1.Quel est le nom du célèbre chanteur français qui a chanté "La Vie en rose" ?', order: 1 },
//                   { lessonId: lesson.id, type: "SELECT", question: '2.Quel est le nom de la fête française qui célèbre la Révolution française ?', order: 2 },
//                   { lessonId: lesson.id, type: "SELECT", question: '3.Quel est le nom du célèbre musée situé à Paris ?', order: 3 },
//                 ])
//                 .returning();
//               break;
//            case 4: // Lesson 4: History and Literature
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { lessonId: lesson.id, type: "SELECT", question: '1.Quel est le nom de la célèbre rivière qui traverse Paris ?', order: 1 },
//                   { lessonId: lesson.id, type: "SELECT", question: '2.Quel est le nom du célèbre fromage français ?', order: 2 },
//                   { lessonId: lesson.id, type: "SELECT", question: '3.Quel est le nom du célèbre peintre français qui a créé "Impression, soleil levant" ?', order: 3 },
//                 ])
//                 .returning();
//               break;
//             case 5: // Lesson 5: Art and Cuisine
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { lessonId: lesson.id, type: "SELECT", question: '1.Quel est le nom de la célèbre station de métro située à Paris ?', order: 1 },
//                   { lessonId: lesson.id, type: "SELECT", question: '2.Quel est le nom du célèbre écrivain français qui a écrit "Le Petit Prince" ?', order: 2 },
//                   { lessonId: lesson.id, type: "SELECT", question: '3.Quel est le nom de la célèbre région française célèbre pour ses plages et son climat méditerranéen ?', order: 3 },
//                 ])
//                 .returning();
//               break;
//           }

//           // Insert challenge options for each challenge in Unit 2
//           for (const challenge of challenges) {
//             switch (challenge.question) {
//               case '1.Quel est le nom du célèbre peintre français qui a créé la Joconde ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Léonard de Vinci", imageSrc: "/woman.svg", audioSrc: "/Léonard de Vinci.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Claude Monet", imageSrc: "/woman.svg", audioSrc: "/Claude Monet.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Pierre-Auguste Renoir", imageSrc: "/woman.svg", audioSrc: "/Pierre-Auguste Renoir.mp3" },
//                 ]);
//                 break;
//               case '2.Quel est le nom de la célèbre tour située à Paris ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "La Tour Eiffel", imageSrc: "/woman.svg", audioSrc: "/La Tour Eiffel.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "La Tour Montparnasse", imageSrc: "/woman.svg", audioSrc: "/La Tour Montparnasse.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "La Tour de Notre-Dame", imageSrc: "/woman.svg", audioSrc: "/La Tour de Notre-Dame.mp3" },
//                 ]);
//                 break;
//               case '3.Quel est le pronom personnel qui remplace le nom d\'une personne ou d\'un animal ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Je", imageSrc: "/woman.svg", audioSrc: "/Je.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Tu",imageSrc: "/woman.svg", audioSrc: "/Tu.mp3" },
//                   { challengeId: challenge.id, correct: true, text: "Il", imageSrc: "/woman.svg", audioSrc: "/Il.mp3" },
//                 ]);
//                 break;
//               case '1.Quel est le nom du mois qui suit juin ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Juillet", imageSrc: "/woman.svg", audioSrc: "/Juillet.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Août", imageSrc: "/woman.svg", audioSrc: "/Août.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Septembre", imageSrc: "/woman.svg", audioSrc: "/Septembre.mp3" },
//                 ]);
//                 break;
//               case '2.Quel est le nom du célèbre écrivain français qui a écrit "Les Misérables" ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Victor Hugo", imageSrc: "/woman.svg", audioSrc: "/Victor Hugo.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Gustave Flaubert" , imageSrc: "/woman.svg", audioSrc: "/Gustave Flaubert.mp3"},
//                   { challengeId: challenge.id, correct: false, text: "Émile Zola" , imageSrc: "/woman.svg", audioSrc: "/Émile Zola.mp3" },
//                 ]);
//                 break;
//               case '3.Quel est le nom de la ville française célèbre pour ses vignobles ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Bordeaux", imageSrc: "/woman.svg", audioSrc: "/Bordeaux.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Lyon", imageSrc: "/woman.svg", audioSrc: "/Lyon.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Marseille",imageSrc: "/woman.svg", audioSrc: "/Marseille.mp3" },
//                 ]);
//                 break;
//               case '1.Quel est le nom du célèbre chanteur français qui a chanté "La Vie en rose" ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Édith Piaf", imageSrc: "/woman.svg", audioSrc: "/Édith Piaf.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Charles Aznavour", imageSrc: "/woman.svg", audioSrc: "/Charles Aznavour.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Yves Montand" , imageSrc: "/woman.svg", audioSrc: "/Yves Montand.mp3"},
//                 ]);
//                 break;
//               case '2.Quel est le nom de la fête française qui célèbre la Révolution française ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "La Fête de la Bastille", imageSrc: "/woman.svg", audioSrc: "/La Fête de la Bastille.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "La Fête de l\'Indépendance",imageSrc: "/woman.svg", audioSrc: "/La Fête de l\'Indépendance.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "La Fête du Travail" , imageSrc: "/woman.svg", audioSrc: "/La Fête du Travail.mp3"},
//                 ]);
//                 break;
//               case '3.Quel est le nom du célèbre musée situé à Paris ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Le Louvre", imageSrc: "/woman.svg", audioSrc: "/Le Louvre.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Le Musée d\'Orsay" , imageSrc: "/woman.svg", audioSrc: "/Le Musée d\'Orsay.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Le Musée Rodin", imageSrc: "/woman.svg", audioSrc: "/Le Musée Rodin.mp3" },
//                 ]);
//                 break;
//               case '1.Quel est le nom de la célèbre rivière qui traverse Paris ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "La Seine", imageSrc: "/woman.svg", audioSrc: "/La Seine.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "La Loire", imageSrc: "/woman.svg", audioSrc: "/La Loire.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Le Rhône", imageSrc: "/woman.svg", audioSrc: "/Le Rhône.mp3" },
//                 ]);
//                 break;
//               case '2.Quel est le nom du célèbre fromage français ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Le Camembert", imageSrc: "/woman.svg", audioSrc: "/Le Camembert.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Le Brie" , imageSrc: "/woman.svg", audioSrc: "/Le Brie.mp3"},
//                   { challengeId: challenge.id, correct: false, text: "Le Roquefort", imageSrc: "/woman.svg", audioSrc: "/Le Roquefort.mp3" },
//                 ]);
//                 break;
//               case '3.Quel est le nom du célèbre peintre français qui a créé "Impression, soleil levant" ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Claude Monet",imageSrc: "/woman.svg", audioSrc: "/Claude Monet.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Pierre-Auguste Renoir", imageSrc: "/woman.svg", audioSrc: "/Pierre-Auguste Renoir.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Camille Pissarro", imageSrc: "/woman.svg", audioSrc: "/Camille Pissarro.mp3" },
//                 ]);
//                 break;
//               case '1.Quel est le nom de la célèbre station de métro située à Paris ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "La Gare du Nord", imageSrc: "/woman.svg", audioSrc: "/La Gare du Nord.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "La Gare de Lyon", imageSrc: "/woman.svg", audioSrc: "/La Gare de Lyon.mp3" },
//                   { challengeId: challenge.id, correct: true, text: "La Station de métro Châtelet" , imageSrc: "/woman.svg", audioSrc: "/La Station de métro Châtelet.mp3" },
//                 ]);
//                 break;
//               case '2.Quel est le nom du célèbre écrivain français qui a écrit "Le Petit Prince" ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Antoine de Saint-Exupéry", imageSrc: "/woman.svg", audioSrc: "/Antoine de Saint-Exupéry.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Gustave Flaubert", imageSrc: "/woman.svg", audioSrc: "/Gustave Flaubert.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Émile Zola", imageSrc: "/woman.svg", audioSrc: "/Émile Zola.mp3" },
//                 ]);
//                 break;
//               case '3.Quel est le nom de la célèbre région française célèbre pour ses plages et son climat méditerranéen ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "La Bretagne", imageSrc: "/woman.svg", audioSrc: "/La Bretagne.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "La Normandie", imageSrc: "/woman.svg", audioSrc: "/La Normandie.mp3" },
//                   { challengeId: challenge.id, correct: true, text: "La Provence-Alpes-Côte d'Azur" , imageSrc: "/woman.svg", audioSrc: "/La Provence-Alpes-Côte d'Azur.mp3"},
//                 ]);
//                 break;
//             }
//           }
//         }
//       }
//       const unit3 = units.find(u => u.order === 3);
//       if (unit3) {
//         const lessons3 = await db
//           .insert(schema.lessons)
//           .values([
//             { unitId: unit3.id, title: "Advanced French Literature", order: 1 },
//             { unitId: unit3.id, title: "French Geography", order: 2 },
//             { unitId: unit3.id, title: "French History", order: 3 },
//             { unitId: unit3.id, title: "French Arts", order: 4 },
//             { unitId: unit3.id, title: "French Culture", order: 5 },
//           ])
//           .returning();

//         // Insert challenges and options for each lesson in Unit 3
//         for (const lesson of lessons3) {
//           let challenges;
//           switch (lesson.order) {
//             case 1: // Lesson 1: Advanced French Literature
//               challenges = await db
//                .insert(schema.challenges)
//                .values([
//                { lessonId: lesson.id, type: "SELECT", question: '1.Quel est le nom du célèbre roman de Victor Hugo ?', order: 1 },
//                { lessonId: lesson.id, type: "SELECT", question: '2.Qui est l\'auteur de la célèbre pièce de théâtre "Le Cid" ?', order: 2 },
//                { lessonId: lesson.id, type: "SELECT", question: '3.Qui est l\'auteur de la célèbre nouvelle "Le Père Goriot" ?', order: 3 },
//               ])
//               .returning();
//              break;      
//              case 2: // Lesson 2: French Geography
//              challenges = await db
//                .insert(schema.challenges)
//                .values([
//                  { lessonId: lesson.id, type: "SELECT", question: '1.Quel est le nom du fleuve qui traverse la ville de Lyon ?', order: 1 },
//                  { lessonId: lesson.id, type: "SELECT", question: '2.Quel est le nom du pays qui partage une frontière avec la France à l\'est ?', order: 2 },
//                  { lessonId: lesson.id, type: "SELECT", question: '3.Quel est le nom du mont le plus haut de France ?', order: 3 },
//                ])
//                .returning();
//              break;
//             case 3: // Lesson 3: French History
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { lessonId: lesson.id, type: "SELECT", question: '1.Qui est le fondateur de la ville de Marseille ?', order: 1 },
//                   { lessonId: lesson.id, type: "SELECT", question: '2.Quel est le nom du département français qui abrite la célèbre ville de Bordeaux ?', order: 2 },
//                   { lessonId: lesson.id, type: "SELECT", question: '3.Quel est le nom du célèbre philosophe français qui a écrit "Discours de la méthode" ?', order: 3 },
//                 ])
//                 .returning();
//               break;
//               case 4: // Lesson 4: French Arts
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { 
//                     lessonId: lesson.id, 
//                     type: "SELECT", 
//                     question: '1.Quel est le nom du musée qui abrite la célèbre peinture "La Joconde" ?', 
//                     order: 1 
//                   },
//                   { 
//                     lessonId: lesson.id, 
//                     type: "SELECT", 
//                     question: '2.Quel est le nom du célèbre peintre français qui a créé la série "Les Demoiselles d\'Avignon" ?', 
//                     order: 2 
//                   },
//                   { 
//                     lessonId: lesson.id, 
//                     type: "SELECT", 
//                     question: '3.Qui est l\'auteur de la célèbre pièce de théâtre "Phèdre" ?', 
//                     order: 3 
//                   },
//                 ])
//                 .returning();
//               break;
//             case 5: // Lesson 5: French Culture
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { lessonId: lesson.id, type: "SELECT", question: '1.Quel est le nom du célèbre festival de musique qui se tient chaque année à Aix-en-Provence ?', order: 1 },
//                   { lessonId: lesson.id, type: "SELECT", question: '2.Quel est le nom du célèbre château qui se trouve dans la Loire-Atlantique ?', order: 2 },
//                   { lessonId: lesson.id, type: "SELECT", question: '3.Quel est le nom du fleuve qui traverse la ville de Paris ?', order: 3 },
//                 ])
//                 .returning();
//               break;
//           }

//           // Insert challenge options for each challenge in Unit 3
//           for (const challenge of challenges) {
//             switch (challenge.question) {
//               case '1.Quel est le nom du célèbre roman de Victor Hugo ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Les Misérables" , imageSrc: "/woman.svg", audioSrc: "/Les Misérables.mp3"},
//                   { challengeId: challenge.id, correct: true, text: "Notre-Dame de Paris",imageSrc: "/woman.svg", audioSrc: "/Notre-Dame de Paris.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Le Comte de Monte-Cristo", imageSrc: "/woman.svg", audioSrc: "/Le Comte de Monte-Cristo.mp3" },
//                 ]);
//                 break;
//               case '2.Qui est l\'auteur de la célèbre pièce de théâtre "Le Cid" ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Molière", imageSrc: "/woman.svg", audioSrc: "/Molière.mp3" },
//                   { challengeId: challenge.id, correct: true, text: "Corneille", imageSrc: "/woman.svg", audioSrc: "/Corneille.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Racine",imageSrc: "/woman.svg", audioSrc: "/Racine.mp3" },
//                 ]);
//                 break;
//               case '3.Qui est l\'auteur de la célèbre nouvelle "Le Père Goriot" ?':
//                     await db.insert(schema.challengeOptions).values([
//                       { challengeId: challenge.id, correct: false, text: "Gustave Flaubert", imageSrc: "/woman.svg", audioSrc: "/Gustave Flaubert.mp3" },
//                       { challengeId: challenge.id, correct: true, text: "Honoré de Balzac", imageSrc: "/woman.svg", audioSrc: "/Honoré de Balzac.mp3" },
//                       { challengeId: challenge.id, correct: false, text: "Émile Zola",imageSrc: "/woman.svg", audioSrc: "/Émile Zola.mp3" },
//                     ]);
//                     break;
//               case '1.Quel est le nom du fleuve qui traverse la ville de Lyon ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Rhône" , imageSrc: "/woman.svg", audioSrc: "/Rhône.mp3"},
//                   { challengeId: challenge.id, correct: false, text: "Saône", imageSrc: "/woman.svg", audioSrc: "/Saône.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Loire" , imageSrc: "/woman.svg", audioSrc: "/Loire.mp3"},
//                 ]);
//                 break;
//               case '2.Qui est l\'auteur de la célèbre nouvelle "Le Père Goriot" ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Allemagne",imageSrc: "/woman.svg", audioSrc: "/Allemagne.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Belgique" ,imageSrc: "/woman.svg", audioSrc: "/Belgique.mp3"},
//                   { challengeId: challenge.id, correct: false, text: "Suisse", imageSrc: "/woman.svg", audioSrc: "/Suisse.mp3" },
//                 ]);
//                 break;
//               case '3.Quel est le nom du mont le plus haut de France ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Mont Blanc", imageSrc: "/woman.svg", audioSrc: "/Mont Blanc.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Mont Ventoux", imageSrc: "/woman.svg", audioSrc: "/Mont Ventoux.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Mont Saint-Michel", imageSrc: "/woman.svg", audioSrc: "/Mont Saint-Michel.mp3" },
//                 ]);
//                 break;
//               case '1.Qui est le fondateur de la ville de Marseille ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "les Grecs", imageSrc: "/woman.svg", audioSrc: "/les Grecs.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "les Romains", imageSrc: "/woman.svg", audioSrc: "/les Romains.mp3"},
//                   { challengeId: challenge.id, correct: false, text: "les Gaulois", imageSrc: "/woman.svg", audioSrc: "/les Gaulois.mp3" },
//                 ]);
//                 break;
//               case '2.Quel est le nom du département français qui abrite la célèbre ville de Bordeaux ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Gironde", imageSrc: "/woman.svg", audioSrc: "/Gironde.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Dordogne", imageSrc: "/woman.svg", audioSrc: "/Dordogne.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Charente", imageSrc: "/woman.svg", audioSrc: "/Charente.mp3" },
//                 ]);
//                 break;
//               case '3.Quel est le nom du célèbre philosophe français qui a écrit "Discours de la méthode" ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "René Descartes", imageSrc: "/woman.svg", audioSrc: "/René Descartes.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Voltaire", imageSrc: "/woman.svg", audioSrc: "/Voltaire.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Jean-Jacques Rousseau", imageSrc: "/woman.svg", audioSrc: "/Jean-Jacques Rousseau.mp3" },
//                 ]);
//                 break;
//               case '1.Quel est le nom du musée qui abrite la célèbre peinture "La Joconde" ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Musée d'Orsay", imageSrc: "/woman.svg", audioSrc: "/Musée d'Orsay.mp3" },
//                   { challengeId: challenge.id, correct: true, text: "Musée du Louvre", imageSrc: "/woman.svg", audioSrc: "/Musée du Louvre.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Musée Rodin", imageSrc: "/woman.svg", audioSrc: "/Musée Rodin.mp3" },
//                 ]);
//                 break;
//               case '2.Quel est le nom du pays qui partage une frontière avec la France à l\'est ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Pablo Picasso", imageSrc: "/woman.svg", audioSrc: "/Pablo Picasso.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Henri Matisse", imageSrc: "/woman.svg", audioSrc: "/Henri Matisse.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Claude Monet", imageSrc: "/woman.svg", audioSrc: "/Claude Monet.mp3" },
//                 ]);
//                 break;
//               case '3.Qui est l\'auteur de la célèbre pièce de théâtre "Phèdre" ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Racine", imageSrc: "/woman.svg", audioSrc: "/Racine.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Molière" , imageSrc: "/woman.svg", audioSrc: "/Molière.mp3"},
//                   { challengeId: challenge.id, correct: false, text: "Corneille", imageSrc: "/woman.svg", audioSrc: "/Corneille.mp3" },
//                 ]);
//                 break;
//               case '1.Quel est le nom du célèbre festival de musique qui se tient chaque année à Aix-en-Provence ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Festival d'Aix-en-Provence", imageSrc: "/woman.svg", audioSrc: "/Festival d'Aix-en-Provence.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Festival de Cannes",imageSrc: "/woman.svg", audioSrc: "/Festival de Cannes.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Festival de Jazz de Montreux",imageSrc: "/woman.svg", audioSrc: "/Festival de Jazz de Montreux.mp3" },
//                 ]);
//                 break;
//               case '2.Quel est le nom du célèbre château qui se trouve dans la Loire-Atlantique ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Château de Chambord",imageSrc: "/woman.svg", audioSrc: "/Château de Chambord.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Château de Chenonceau", imageSrc: "/woman.svg", audioSrc: "/Château de Chenonceau.mp3" },
//                   { challengeId: challenge.id, correct: true, text: "Château d'Angers", imageSrc: "/woman.svg", audioSrc: "/Château d'Angers.mp3" },
//                 ]);
//                 break;
//               case '3.Quel est le nom du fleuve qui traverse la ville de Paris ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Seine", imageSrc: "/woman.svg", audioSrc: "/Seine.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Marne", imageSrc: "/woman.svg", audioSrc: "/Marne.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Oise" , imageSrc: "/woman.svg", audioSrc: "/Oise.mp3"},
//                 ]);
//                 break;
//             }
//           }
//         }
//       }
//     }

//     console.log("Database seeded successfully for French (Basic, Intermediate, and Advanced)");
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to seed French database");
//   }
// };

   

// main();