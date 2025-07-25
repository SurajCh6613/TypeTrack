const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".container .input-field");
const time = document.querySelector(".time span");
const mistakes = document.querySelector(".mistakes span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

const paragraphs = [
  "Life is not about waiting for the storm to pass but learning to dance in the rain. Every challenge teaches resilience and hidden strength.",
  "The universe does not hurry, yet everything is accomplished. Patience is the art of trusting the process while taking small steps daily.",
  "Books are mirrors: you only see what you already carry inside. Reading reveals the depths of your own mind and soul.",
  "Technology can solve problems, but human connection solves the heart. Balance screens with eye contact and laughter.",
  "A river cuts through rock not by force but persistence. Your daily efforts, however small, compound into greatness over time.",
  "Stars cannot shine without darkness. Your struggles are part of the story that makes your light visible to others.",
  "Silence is the language of the wise. Listen more to understand, not just to reply. True wisdom often speaks softly.",
  "The best teachers are your last mistakes. Failure is tuition for success—pay attention, but never stop moving forward.",
  "Seasons change, and so do we. Growth requires letting go of what no longer serves you, even if it once felt like home.",
  "Gratitude is the antidote to despair. Name three things you’re thankful for today—it rewires your brain for joy.",
  "The sunrise painted the sky in hues of orange and pink, while birds chirped merrily across the quiet landscape. Children played near the meadow, their laughter echoing through the valley. In the distance, a bell rang softly, calling villagers to gather together.",
  "Technology is advancing rapidly, changing how we live and work. Smart devices connect our homes, while AI powers new innovations in healthcare and finance. As the digital world grows, so does the need for cybersecurity and ethical considerations in development.",
  "Beneath the waves, coral reefs teem with life. Fish of all colors dart through the currents, while sea turtles glide gracefully past. Marine biologists study these ecosystems, learning how to preserve their beauty and biodiversity for future generations to enjoy.",
  "A gentle breeze swept through the open field, rustling tall grasses under the golden sun. Bees hummed around wildflowers, and a red fox paused by the brook. Nature thrived untouched, a peaceful sanctuary for animals and humans seeking solitude alike.",
  "Libraries remain vital in communities, offering access to books, internet, and learning spaces. They host events, support job seekers, and provide safe environments. Even in a digital age, the public library continues to evolve, adapt, and serve all who enter.",
  "On a distant planet, explorers discovered ancient ruins hidden under red sands. Symbols etched in stone hinted at a lost civilization. Their mission: to uncover the past and ensure humanity learns from the rise and fall of alien societies long gone.",
  "The city skyline glittered as night fell, lights reflecting on wet pavement after rain. Cars whooshed past, and people hurried beneath umbrellas. Somewhere in a high-rise, a writer sipped coffee, capturing the rhythm of urban life with every word typed.",
  "Renewable energy is reshaping how we power the world. Wind turbines spin on open plains, and solar panels soak up sunlight on rooftops. As technology improves, costs drop, making clean energy more accessible and essential in the fight against climate change.",
  "A violinist stood alone in the plaza, music soaring through the night air. Passersby stopped, drawn by the melody. Coins clinked into a case, but the artist played for passion, not profit. Each note carried stories of love, loss, and timeless dreams.",
  "In the heart of the forest, a cabin stood untouched by time. Smoke curled from its chimney, and lantern light flickered through the windows. Inside, stories were shared by firelight, each tale a thread woven into the tapestry of generations past.",
  "Mountains towered above the valley, their peaks capped in snow. A lone hiker ascended the trail, breathing in the crisp air. Eagles circled overhead, and the scent of pine filled the breeze. Every step brought him closer to silence, solitude, and perspective.",
  "Artists sketch inspiration from chaos and calm alike. In paint, clay, and digital pixels, emotions take form. Galleries hum with quiet awe as visitors ponder meaning. Behind each piece is a story—of struggle, curiosity, or joy, waiting to be interpreted uniquely.",
  "History whispers from old architecture, weathered stone facades, and cobbled streets. Tourists snap photos, but locals know the deeper tales. Wars, romances, and revolutions etched into every corner. To walk these roads is to step through layers of forgotten time.",
  "In spring, the orchard blooms in waves of pink and white. Bees buzz between blossoms, collecting nectar. Children climb branches, tasting early fruit. Farmers work sunrise to sunset, nurturing trees that feed both body and spirit through each changing season.",
  "Books are portals to infinite worlds. Each page offers escape, knowledge, or a mirror to oneself. Fiction weaves empathy; nonfiction challenges thought. Whether hardcover or digital, stories endure, binding us through imagination across cultures and time periods alike.",
  "The market bustled with colors and voices. Stalls overflowed with spices, fruits, woven cloth, and handcrafted goods. Shouts of bargaining filled the air as locals mingled with tourists. Amid chaos, one could find a unique sense of place and identity.",
  "Rain began softly, tapping rooftops and windows. Streets gleamed under flickering lamplight as puddles formed. A couple walked silently, hand in hand, letting the cool drops soak them. In that moment, the city became a quiet, shimmering dreamscape of peace.",
  "At sea, everything changes. Time stretches, stars sharpen, and the horizon becomes both boundary and invitation. Sailors watch skies for signs, navigate by instinct and memory. Beneath the surface, a different world waits—ancient, mysterious, and full of unseen life.",
  "Languages carry history, identity, and worldview. When a language dies, a unique lens on reality vanishes. Linguists race to preserve endangered dialects, recording elders and teaching youth. Each word saved is a lifeline to cultural memory and human diversity.",
  "Dreams blur boundaries of the mind, mixing memory, fantasy, and desire. In sleep, logic surrenders to symbol. Psychologists study these patterns, seeking meaning. Artists draw from them, too. Every dream, like a fingerprint, reveals layers of the self still unexplored.",
];

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  // typingText.innerHTML = paragraphs[randomIndex];
  typingText.innerHTML = "";
  for (let char of paragraphs[randomIndex]) {
    typingText.innerHTML += `<span>${char}</span>`;
  }
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => input.focus());
  typingText.addEventListener("click", () => {
    input.focus();
  });
}

function initTyping() {
  const char = typingText.querySelectorAll("span");
  const typedChar = input.value.charAt(charIndex);
  if (charIndex < char.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTime, 1000);
      isTyping = true;
    }
    if (char[charIndex].innerText === typedChar) {
      char[charIndex].classList.add("correct");
    } else {
      mistake++;
      char[charIndex].classList.add("incorrect");
    }
    charIndex++;
    char[charIndex].classList.add("active");
    mistakes.innerHTML = mistake;
    cpm.innerText = charIndex - mistake;
  } else {
    clearInterval(timer);
    input.value = "";
  }
}
function initTime() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerText = timeLeft;
    const wpmVal = Math.round(
      ((charIndex - mistake) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm.innerText = wpmVal;
  } else {
    clearInterval(timer);
  }
}

function reset() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  time.innerHTML = timeLeft;
  charIndex = 0;
  mistake = 0;
  isTyping = false;
  input.value = "";
  wpm.innerText = 0;
  cpm.innerText = 0;
  mistakes.innerText = 0;
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);
loadParagraph();
