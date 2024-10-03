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
//             description: `Learn the Advanced ${course.title} concepts`,
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
//                   { challengeId: challenge.id, correct: true, text: "Je suis", imageSrc: "/me.svg", audioSrc: "/Je suis.mp3" },
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
//                   { challengeId: challenge.id, correct: false, text: "Je suis", imageSrc: "/Je suis1.svg", audioSrc: "/Je suis.mp3" },
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
//                challenges = await db
//                   .insert(schema.challenges)
//                   .values([
//                     { lessonId: lesson.id, type: "SELECT", question: '1.Qui est la personne qui vous élève quand vous êtes petit ?', order: 1 },
//                     { lessonId: lesson.id, type: "SELECT", question: '2.Quelle est la couleur du ciel ensoleillé ?', order: 2 },
//                     { lessonId: lesson.id, type: "SELECT", question: '3.Quel verbe signifie "manger" ?', order: 3 },
//                    ])
//                   .returning();
//               break;
//               case 2: // Lesson 2: Landmarks and Cities
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { lessonId: lesson.id, type: "SELECT", question: '1.Quelle est la danse traditionnelle française ?', order: 1 },
//                   { lessonId: lesson.id, type: "SELECT", question: '2.Qui est le membre de la famille le plus âgé ?', order: 2 },
//                   { lessonId: lesson.id, type: "SELECT", question: '3.Quelle est la couleur de l\'herbe ?', order: 3 },
//                 ])
//                 .returning();
//               break;
//               case 3: // Lesson 3: Educational Activities
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { lessonId: lesson.id, type: "SELECT", question: '1.Quel verbe signifie "aller à l\'école" ?', order: 1 },
//                   { lessonId: lesson.id, type: "SELECT", question: '2.Quelle est la fête française qui célèbre la fin de l\'année ?', order: 2 },
//                   { lessonId: lesson.id, type: "SELECT", question: '3.Qui est le membre de la famille qui vous aide à faire vos devoirs ?', order: 3 },
//                 ])
//                 .returning();
//               break;
            
//               case 4: // Lesson 4: Colors, Sports, and Dance
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { lessonId: lesson.id, type: "SELECT", question: '1. Quelle est la couleur du feu ?', order: 1 },
//                   { lessonId: lesson.id, type: "SELECT", question: '2. Quel verbe signifie "faire du sport" ?', order: 2 },
//                   { lessonId: lesson.id, type: "SELECT", question: '3. Quelle est la danse qui se danse en couple ?', order: 3 },
//                 ])
//                 .returning();
//               break;
            
//               case 5: // Lesson 5: Family, Sky, and Music
//               challenges = await db
//                 .insert(schema.challenges)
//                 .values([
//                   { lessonId: lesson.id, type: "SELECT", question: '1. Qui est le membre de la famille qui vous donne des conseils ?', order: 1 },
//                   { lessonId: lesson.id, type: "SELECT", question: '2. Quelle est la couleur du ciel la nuit ?', order: 2 },
//                   { lessonId: lesson.id, type: "SELECT", question: '3. Quel verbe signifie "écouter de la musique" ?', order: 3 },
//                 ])
//                 .returning();
//               break;
            
//           }

//           // Insert challenge options for each challenge in Unit 2
//           for (const challenge of challenges) {
//             switch (challenge.question) {
//               case '1.Qui est la personne qui vous élève quand vous êtes petit ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Le père", imageSrc: "/father.svg", audioSrc: "/Le père.mp3" },
//                   { challengeId: challenge.id, correct: true, text: "La mère", imageSrc: "/mother.svg", audioSrc: "/La mère.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Le frère", imageSrc: "/brother.svg", audioSrc: "/Le frère.mp3" },
//                 ]);
//                 break;
//               case '2.Quelle est la couleur du ciel ensoleillé ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: true, text: "Bleu", imageSrc: "/Bleu.svg", audioSrc: "/Bleu.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Rouge", imageSrc: "/red.svg", audioSrc: "/Rouge.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Vert", imageSrc: "/green.svg", audioSrc: "/Vert.mp3" },
//                 ]);
//                 break;
//               case '3.Quel verbe signifie "manger" ?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Danser", imageSrc: "/dance.svg", audioSrc: "/Danser.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Courir", imageSrc: "/run.svg", audioSrc: "/Courir.mp3" },
//                   { challengeId: challenge.id, correct: true, text: "Manger", imageSrc: "/eat.svg", audioSrc: "/Manger.mp3" },
//                 ]);
//                 break;
//                 case '1.Quelle est la danse traditionnelle française ?':
//                   await db.insert(schema.challengeOptions).values([
//                     { challengeId: challenge.id, correct: false, text: "La salsa", imageSrc: "/dance.svg", audioSrc: "/La salsa.mp3" },
//                     { challengeId: challenge.id, correct: true, text: "La valse", imageSrc: "/dance1.svg", audioSrc: "/La valse.mp3" },
//                     { challengeId: challenge.id, correct: false, text: "Le tango", imageSrc: "/dance2.svg", audioSrc: "/Le tango.mp3" },
//                   ]);
//                   break;
//                 case '2.Qui est le membre de la famille le plus âgé ?':
//                   await db.insert(schema.challengeOptions).values([
//                     { challengeId: challenge.id, correct: true, text: "Le grand-père", imageSrc: "/grandfather.svg", audioSrc: "/Le grand-père.mp3" },
//                     { challengeId: challenge.id, correct: false, text: "La grand-mère", imageSrc: "/grandmother.svg", audioSrc: "/La grand-mère.mp3" },
//                     { challengeId: challenge.id, correct: false, text: "Le père", imageSrc: "/father.svg", audioSrc: "/Le père.mp3" },
//                   ]);
//                   break;
//                 case '3.Quelle est la couleur de l\'herbe ?':
//                   await db.insert(schema.challengeOptions).values([
//                     { challengeId: challenge.id, correct: false, text: "Jaune", imageSrc: "/yellow.svg", audioSrc: "/Jaune.mp3" },
//                     { challengeId: challenge.id, correct: true, text: "Vert", imageSrc: "/green.svg", audioSrc: "/Vert.mp3" },
//                     { challengeId: challenge.id, correct: false, text: "Bleu", imageSrc: "/Bleu.svg", audioSrc: "/Bleu.mp3" },
//                   ]);
//                   break;
//                   case '1.Quel verbe signifie "aller à l\'école" ?':
//                     await db.insert(schema.challengeOptions).values([
//                       { challengeId: challenge.id, correct: false, text: "Étudier", imageSrc: "/study.svg", audioSrc: "/Étudier.mp3" },
//                       { challengeId: challenge.id, correct: false, text: "Travailler", imageSrc: "/work.svg", audioSrc: "/Travailler.mp3" },
//                       { challengeId: challenge.id, correct: true, text: "Aller", imageSrc: "/go.svg", audioSrc: "/Aller.mp3" },
//                     ]);
//                     break;
//                   case '2.Quelle est la fête française qui célèbre la fin de l\'année ?':
//                     await db.insert(schema.challengeOptions).values([
//                       { challengeId: challenge.id, correct: false, text: "Noël", imageSrc: "/christmass.svg", audioSrc: "/Noël.mp3" },
//                       { challengeId: challenge.id, correct: false, text: "La Saint-Valentin", imageSrc: "/valentine.svg", audioSrc: "/La Saint-Valentin.mp3" },
//                       { challengeId: challenge.id, correct: true, text: "Le réveillon de la Saint-Sylvestre", imageSrc: "/newyear.svg", audioSrc: "/Le réveillon de la Saint-Sylvestre.mp3" },
//                     ]);
//                     break;
//                   case '3.Qui est le membre de la famille qui vous aide à faire vos devoirs ?':
//                     await db.insert(schema.challengeOptions).values([
//                       { challengeId: challenge.id, correct: true, text: "La mère", imageSrc: "/mother.svg", audioSrc: "/La mère.mp3" },
//                       { challengeId: challenge.id, correct: false, text: "Le père", imageSrc: "/father.svg", audioSrc: "/Le père.mp3" },
//                       { challengeId: challenge.id, correct: false, text: "Le frère", imageSrc: "/brother.svg", audioSrc: "/Le frère.mp3" },
//                     ]);
//                     break;
//                     case '1. Quelle est la couleur du feu ?':
//                       await db.insert(schema.challengeOptions).values([
//                         { challengeId: challenge.id, correct: true, text: "Rouge", imageSrc: "/red.svg", audioSrc: "/Rouge.mp3" },
//                         { challengeId: challenge.id, correct: false, text: "Jaune", imageSrc: "/yellow.svg", audioSrc: "/Jaune.mp3" },
//                         { challengeId: challenge.id, correct: false, text: "Bleu", imageSrc: "/Bleu.svg", audioSrc: "/Bleu.mp3" },
//                       ]);
//                       break;
//                     case '2. Quel verbe signifie "faire du sport" ?':
//                       await db.insert(schema.challengeOptions).values([
//                         { challengeId: challenge.id, correct: false, text: "Danser", imageSrc: "/dance.svg", audioSrc: "/Danser.mp3" },
//                         { challengeId: challenge.id, correct: true, text: "Courir", imageSrc: "/run.svg", audioSrc: "/Courir.mp3" },
//                         { challengeId: challenge.id, correct: false, text: "Faire du sport", imageSrc: "/sports.svg", audioSrc: "/Faire du sport.mp3" },
//                       ]);
//                       break;
//                     case '3. Quelle est la danse qui se danse en couple ?':
//                       await db.insert(schema.challengeOptions).values([
//                         { challengeId: challenge.id, correct: false, text: "La salsa", imageSrc: "/dance1.svg", audioSrc: "/La salsa.mp3" },
//                         { challengeId: challenge.id, correct: true, text: "Le tango", imageSrc: "/dance2.svg", audioSrc: "/Le tango.mp3" },
//                         { challengeId: challenge.id, correct: false, text: "La valse", imageSrc: "/dance.svg", audioSrc: "La valse.mp3" },
//                       ]);
//                       break;
//                       case '1. Qui est le membre de la famille qui vous donne des conseils ?':
//                         await db.insert(schema.challengeOptions).values([
//                           { challengeId: challenge.id, correct: true, text: "Le père", imageSrc: "/father.svg", audioSrc: "/Le père.mp3" },
//                           { challengeId: challenge.id, correct: false, text: "La mère", imageSrc: "/mother.svg", audioSrc: "/La mère.mp3" },
//                           { challengeId: challenge.id, correct: false, text: "Le grand-père", imageSrc: "/grandfather.svg", audioSrc: "/Le grand-père.mp3" },
//                         ]);
//                         break;
//                       case '2. Quelle est la couleur du ciel la nuit ?':
//                         await db.insert(schema.challengeOptions).values([
//                           { challengeId: challenge.id, correct: false, text: "Bleu", imageSrc: "/Bleu.svg", audioSrc: "/Bleu.mp3" },
//                           { challengeId: challenge.id, correct: true, text: "Noir", imageSrc: "/black.svg", audioSrc: "/Noir.mp3" },
//                           { challengeId: challenge.id, correct: false, text: "Gris", imageSrc: "/Gris.svg", audioSrc: "/Gris.mp3" },
//                         ]);
//                         break;
//                       case '3. Quel verbe signifie "écouter de la musique" ?':
//                         await db.insert(schema.challengeOptions).values([
//                           { challengeId: challenge.id, correct: false, text: "Chanter", imageSrc: "/sing.svg", audioSrc: "/Chanter.mp3" },
//                           { challengeId: challenge.id, correct: false, text: "Danser", imageSrc: "/dance.svg", audioSrc: "/Danser.mp3" },
//                           { challengeId: challenge.id, correct: true, text: "Écouter", imageSrc: "/listen.svg", audioSrc: "/Écouter.mp3" },
//                         ]);
//                         break;
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
//             case 1: // Lesson 1: Family Vocabulary and Common Verbs
//             challenges = await db
//             .insert(schema.challenges)
//             .values([
//               { lessonId: lesson.id, type: "SELECT", question: '1. What is the French word for "grandmother"?', order: 1 },
//               { lessonId: lesson.id, type: "SELECT", question: '2. What is the French word for "yellow"?', order: 2 },
//               { lessonId: lesson.id, type: "SELECT", question: '3. What is the French verb for "to read"?', order: 3 },
//             ])
//             .returning();
//           break;
        

//           case 2: // Lesson 2: French Vocabulary
//           challenges = await db
//             .insert(schema.challenges)
//             .values([
//               { lessonId: lesson.id, type: "SELECT", question: '1. What is the French word for "tango"?', order: 1 },
//               { lessonId: lesson.id, type: "SELECT", question: '2. What is the French word for "cousin"?', order: 2 },
//               { lessonId: lesson.id, type: "SELECT", question: '3. What is the French word for "purple"?', order: 3 },
//             ])
//             .returning();
//           break;
        
//         case 3: // Lesson 3: French Vocabulary
//           challenges = await db
//             .insert(schema.challenges)
//             .values([
//               { lessonId: lesson.id, type: "SELECT", question: '1. What is the French verb for "to swim"?', order: 1 },
//               { lessonId: lesson.id, type: "SELECT", question: '2. What is the French word for "bistro"?', order: 2 },
//               { lessonId: lesson.id, type: "SELECT", question: '3. What is the French word for "uncle"?', order: 3 },
//             ])
//             .returning();
//           break;
        
//         case 4: // Lesson 4: French Vocabulary
//           challenges = await db
//             .insert(schema.challenges)
//             .values([
//               { lessonId: lesson.id, type: "SELECT", question: '1. What is the French word for "orange"?', order: 1 },
//               { lessonId: lesson.id, type: "SELECT", question: '2. What is the French verb for "to write"?', order: 2 },
//               { lessonId: lesson.id, type: "SELECT", question: '3. What is the French word for "waltz"?', order: 3 },
//             ])
//             .returning();
//           break;
        
//         case 5: // Lesson 5: French Vocabulary
//           challenges = await db
//             .insert(schema.challenges)
//             .values([
//               { lessonId: lesson.id, type: "SELECT", question: '1. What is the French word for "sister"?', order: 1 },
//               { lessonId: lesson.id, type: "SELECT", question: '2. What is the French word for "pink"?', order: 2 },
//               { lessonId: lesson.id, type: "SELECT", question: '3. What is the French verb for "to run"?', order: 3 },
//             ])
//             .returning();
//           break;
        


//           }

//           // Insert challenge options for each challenge in Unit 3
//           for (const challenge of challenges) {
//             switch (challenge.question) {
//               case '1. What is the French word for "grandmother"?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Mère", imageSrc: "/mother.svg", audioSrc: "/Mère.mp3" },
//                   { challengeId: challenge.id, correct: true, text: "Grand-mère", imageSrc: "/grandmother.svg", audioSrc: "/Grand-mère.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Tante", imageSrc: "/aunt.svg", audioSrc: "/Tante.mp3" },
//                 ]);
//                 break;
          
//               case '2. What is the French word for "yellow"?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Rouge", imageSrc: "/red.svg", audioSrc: "/Rouge.mp3" },
//                   { challengeId: challenge.id, correct: true, text: "Jaune", imageSrc: "/yellow.svg", audioSrc: "/Jaune.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Vert", imageSrc: "/green.svg", audioSrc: "/Vert.mp3" },
//                 ]);
//                 break;
          
//               case '3. What is the French verb for "to read"?':
//                 await db.insert(schema.challengeOptions).values([
//                   { challengeId: challenge.id, correct: false, text: "Écrire", imageSrc: "/write.svg", audioSrc: "/Écrire.mp3" },
//                   { challengeId: challenge.id, correct: true, text: "Lire", imageSrc: "/study.svg", audioSrc: "/Lire.mp3" },
//                   { challengeId: challenge.id, correct: false, text: "Parler", imageSrc: "/speak.svg", audioSrc: "/Parler.mp3" },
//                 ]);
//                 break;


//                 case '1. What is the French word for "dance"?':
//                   await db.insert(schema.challengeOptions).values([
//                     { challengeId: challenge.id, correct: false, text: "Salsa", imageSrc: "/dance.svg", audioSrc: "/Salsa.mp3" },
//                     { challengeId: challenge.id, correct: false, text: "Valse", imageSrc: "/dance1.svg", audioSrc: "/Valse.mp3" },
//                     { challengeId: challenge.id, correct: true, text: "Tango", imageSrc: "/dance2.svg", audioSrc: "/Tango.mp3" },
//                   ]);
//                   break;
              
//               case '2. What is the French word for "cousin"?':
//                   await db.insert(schema.challengeOptions).values([
//                     { challengeId: challenge.id, correct: false, text: "Frère", imageSrc: "/brother.svg", audioSrc: "/Frère.mp3" },
//                     { challengeId: challenge.id, correct: false, text: "Oncle", imageSrc: "/uncle.svg", audioSrc: "/Oncle.mp3" },
//                     { challengeId: challenge.id, correct: true, text: "Cousin", imageSrc: "/cousin.svg", audioSrc: "/Cousin.mp3" },
//                   ]);
//                   break;
              
//               case '3. What is the French word for "purple"?':
//                   await db.insert(schema.challengeOptions).values([
//                     { challengeId: challenge.id, correct: false, text: "Bleu", imageSrc: "/Bleu.svg", audioSrc: "/Bleu.mp3" },
//                     { challengeId: challenge.id, correct: false, text: "Vert", imageSrc: "/green.svg", audioSrc: "/Vert.mp3" },
//                     { challengeId: challenge.id, correct: true, text: "Violet", imageSrc: "/violet.svg", audioSrc: "/Violet.mp3" },
//                   ]);
//                   break;
              

  
//                   case '1. What is the French verb for "to swim"?':
//                     await db.insert(schema.challengeOptions).values([
//                       { challengeId: challenge.id, correct: true, text: "Nager", imageSrc: "/swim.svg", audioSrc: "/Nager.mp3" },
//                       { challengeId: challenge.id, correct: false, text: "Courir", imageSrc: "/run.svg", audioSrc: "/Courir.mp3" },
//                       { challengeId: challenge.id, correct: false, text: "Danser", imageSrc: "/dance.svg", audioSrc: "/Danser.mp3" },
//                     ]);
//                     break;
                
//                 case '2. What is the French word for "bistro"?':
//                     await db.insert(schema.challengeOptions).values([
//                       { challengeId: challenge.id, correct: false, text: "Café", imageSrc: "/cafe.svg", audioSrc: "/Café.mp3" },
//                       { challengeId: challenge.id, correct: false, text: "Restaurant", imageSrc: "/restaurant.svg", audioSrc: "/Restaurant.mp3" },
//                       { challengeId: challenge.id, correct: true, text: "Bistro", imageSrc: "/hotel1.svg", audioSrc: "/Bistro.mp3" },
//                     ]);
//                     break;
                
//                 case '3. What is the French word for "uncle"?':
//                     await db.insert(schema.challengeOptions).values([
//                       { challengeId: challenge.id, correct: false, text: "Père", imageSrc: "/father.svg", audioSrc: "/Père.mp3" },
//                       { challengeId: challenge.id, correct: true, text: "Oncle", imageSrc: "/uncle.svg", audioSrc: "/Oncle.mp3" },
//                       { challengeId: challenge.id, correct: false, text: "Frère", imageSrc: "/brother.svg", audioSrc: "/Frère.mp3" },
//                     ]);
//                     break;
                

    
//                     case '1. What is the French word for "orange"?':
//                       await db.insert(schema.challengeOptions).values([
//                           { challengeId: challenge.id, correct: false, text: "Red", imageSrc: "/red.svg", audioSrc: "/Red.mp3" },
//                           { challengeId: challenge.id, correct: false, text: "Yellow", imageSrc: "yellow.svg", audioSrc: "/Yellow.mp3" },
//                           { challengeId: challenge.id, correct: true, text: "Orange", imageSrc: "/Orange.svg", audioSrc: "/Orange.mp3" },
//                       ]);
//                       break;
                  
//                   case '2. What is the meaning of "écrire"?':
//                       await db.insert(schema.challengeOptions).values([
//                           { challengeId: challenge.id, correct: false, text: "To read", imageSrc: "/study.svg", audioSrc: "/To read.mp3" },
//                           { challengeId: challenge.id, correct: true, text: "To write", imageSrc: "/write.svg", audioSrc: "/To write.mp3" },
//                           { challengeId: challenge.id, correct: false, text: "To speak", imageSrc: "/speak.svg", audioSrc: "/To speak.mp3" },
//                       ]);
//                       break;
                  
//                   case '3. What is the meaning of "Waltz"?':
//                       await db.insert(schema.challengeOptions).values([
//                           { challengeId: challenge.id, correct: false, text: "Salsa", imageSrc: "/dance.svg", audioSrc: "/Salsa.mp3" },
//                           { challengeId: challenge.id, correct: true, text: "valse", imageSrc: "/dance1.svg", audioSrc: "/Waltz.mp3" },
//                           { challengeId: challenge.id, correct: false, text: "Tango", imageSrc: "/dance2.svg", audioSrc: "/Tango.mp3" },
//                       ]);
//                       break;
                  
  
//                       case '1. What is the meaning of "sœur"?':
//                         await db.insert(schema.challengeOptions).values([
//                             { challengeId: challenge.id, correct: false, text: "Mother", imageSrc: "/mother.svg", audioSrc: "/Mother.mp3" },
//                             { challengeId: challenge.id, correct: true, text: "Sister", imageSrc: "/sister.svg", audioSrc: "/Sister.mp3" },
//                             { challengeId: challenge.id, correct: false, text: "Aunt", imageSrc: "/aunt.svg", audioSrc: "/Aunt.mp3" },
//                         ]);
//                         break;
                    
//                     case '2. What is the French word for "pink"?':
//                         await db.insert(schema.challengeOptions).values([
//                             { challengeId: challenge.id, correct: false, text: "Red", imageSrc: "/red.svg", audioSrc: "/Red.mp3" },
//                             { challengeId: challenge.id, correct: true, text: "Rose", imageSrc: "/pink.svg", audioSrc: "/rose.mp3" },
//                             { challengeId: challenge.id, correct: false, text: "Green", imageSrc: "green.svg", audioSrc: "/Green.mp3" },
//                         ]);
//                         break;
                    
//                     case '3. What is the meaning of "courir"?':
//                         await db.insert(schema.challengeOptions).values([
//                             { challengeId: challenge.id, correct: true, text: "To run", imageSrc: "/run.svg", audioSrc: "/To run.mp3" },
//                             { challengeId: challenge.id, correct: false, text: "To walk", imageSrc: "/walk.svg", audioSrc: "/To walk.mp3" },
//                             { challengeId: challenge.id, correct: false, text: "To dance", imageSrc: "/dance.svg", audioSrc: "/To dance.mp3" },
//                         ]);
//                         break;
                    
    
        
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