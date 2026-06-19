const categories = [
  { name: "Feelings", color: "#ffcc80", emoji: "🦁" },
  { name: "Self-Esteem", color: "#c5e1a5", emoji: "🌟" },
  { name: "Home Life", color: "#b3e5fc", emoji: "🏠" },
  { name: "School", color: "#d1c4e9", emoji: "🎒" },
  { name: "Relationships", color: "#f8bbd0", emoji: "🤝" },
  { name: "Coping", color: "#b2dfdb", emoji: "🌈" }
];

const cards = [
  {
    category: "Feelings",
    question: "If your feeling right now was an animal, what animal would it be?",
    easier: "Pick one: turtle, puppy, lion, owl, bee, or something else.",
    deeper: "What makes that animal feel like you today?"
  },
  {
    category: "Feelings",
    question: "If your mood was weather, what would the weather be?",
    easier: "Sunny, rainy, stormy, cloudy, windy, snowy, or foggy?",
    deeper: "What would help the weather feel a little safer?"
  },
  {
    category: "Feelings",
    question: "Where do you notice this feeling in your body?",
    easier: "Head, chest, stomach, hands, legs, throat, or nowhere?",
    deeper: "What does that body feeling seem to be telling you?"
  },
  {
    category: "Self-Esteem",
    question: "What is something your brain is really good at?",
    easier: "Remembering, noticing, building, drawing, helping, solving, imagining, or something else?",
    deeper: "How do you know you are good at that?"
  },
  {
    category: "Self-Esteem",
    question: "What is one thing you wish adults understood about you?",
    easier: "You can answer with words, drawing, pointing, or choosing from examples.",
    deeper: "What would change if adults understood that better?"
  },
  {
    category: "Home Life",
    question: "At home, where do you feel most calm?",
    easier: "Bedroom, couch, kitchen, outside, with a pet, with a person, or somewhere else?",
    deeper: "What makes that place feel calm?"
  },
  {
    category: "Home Life",
    question: "What is something at home that feels easy, and something that feels hard?",
    easier: "You can just name one easy thing or one hard thing.",
    deeper: "Who notices when it feels hard?"
  },
  {
    category: "School",
    question: "If school was a video game level, what level would it be right now?",
    easier: "Easy, medium, hard, boss level, glitchy, boring level, or bonus round?",
    deeper: "What part of the level is hardest?"
  },
  {
    category: "School",
    question: "What is one part of the school day you wish you could skip, pause, or make shorter?",
    easier: "Morning, class, lunch, recess, transitions, bus, homework, or something else?",
    deeper: "What makes that part difficult?"
  },
  {
    category: "Relationships",
    question: "Who feels safe to be around?",
    easier: "It can be a person, pet, character, or nobody right now.",
    deeper: "What does that person or pet do that helps you feel safe?"
  },
  {
    category: "Relationships",
    question: "What kind of friend do you like being around?",
    easier: "Quiet, funny, playful, calm, honest, shares interests, gives space, or something else?",
    deeper: "How can people tell when you want space?"
  },
  {
    category: "Coping",
    question: "What helps your brain when things feel too loud, too fast, or too much?",
    easier: "Headphones, quiet, movement, drawing, pressure, a break, a pet, or a trusted person?",
    deeper: "How could we make that easier to ask for?"
  },
  {
    category: "Coping",
    question: "What is one way your body says, ‘I need a break’?",
    easier: "Do you get quiet, move around, hide, cry, yell, freeze, laugh, or something else?",
    deeper: "What can adults do when they notice that sign?"
  }
];

let selectedCategories = new Set();
let usedCards = [];
let currentCard = null;

const categoryButtons = document.getElementById("categoryButtons");
const cardCategory = document.getElementById("cardCategory");
const cardQuestion = document.getElementById("cardQuestion");
const cardPrompt = document.getElementById("cardPrompt");
const randomCardBtn = document.getElementById("randomCardBtn");
const resetBtn = document.getElementById("resetBtn");
const easyBtn = document.getElementById("easyBtn");
const deeperBtn = document.getElementById("deeperBtn");
const card = document.getElementById("card");

function buildCategoryButtons() {
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.textContent = `${cat.emoji} ${cat.name}`;
    btn.style.background = cat.color;

    btn.addEventListener("click", () => {
      if (selectedCategories.has(cat.name)) {
        selectedCategories.delete(cat.name);
        btn.classList.remove("active");
      } else {
        selectedCategories.add(cat.name);
        btn.classList.add("active");
      }
    });

    categoryButtons.appendChild(btn);
  });
}

function drawCard() {
  let availableCards = cards.filter(card => {
    const categoryMatch = selectedCategories.size === 0 || selectedCategories.has(card.category);
    const notUsed = !usedCards.includes(card);
    return categoryMatch && notUsed;
  });

  if (availableCards.length === 0) {
    usedCards = [];
    availableCards = cards.filter(card => selectedCategories.size === 0 || selectedCategories.has(card.category));
  }

  currentCard = availableCards[Math.floor(Math.random() * availableCards.length)];
  usedCards.push(currentCard);

  showCard(currentCard.question, "Tip: Let the child answer in their own way. They can also pass.");
}

function showCard(questionText, promptText) {
  cardCategory.textContent = currentCard.category;
  cardQuestion.textContent = questionText;
  cardPrompt.textContent = promptText;

  const catInfo = categories.find(cat => cat.name === currentCard.category);
  cardCategory.style.background = catInfo ? "#26a69a" : "#26a69a";
  card.style.borderColor = catInfo ? catInfo.color : "#5e35b1";
}

easyBtn.addEventListener("click", () => {
  if (!currentCard) return;
  showCard(currentCard.easier, "Easier version: offer choices, visuals, drawing, or pointing.");
});

deeperBtn.addEventListener("click", () => {
  if (!currentCard) return;
  showCard(currentCard.deeper, "Go deeper only if the child seems comfortable.");
});

randomCardBtn.addEventListener("click", drawCard);

resetBtn.addEventListener("click", () => {
  usedCards = [];
  currentCard = null;
  cardCategory.textContent = "Ready";
  cardQuestion.textContent = "Cards reset. Choose a pile or draw randomly.";
  cardPrompt.textContent = "Tip: Kids can answer with words, pointing, drawing, animals, colors, movement, or “pass.”";
  card.style.borderColor = "#5e35b1";
});

buildCategoryButtons();
