/* script.js
   - typing role text
   - hamburger menu toggle
   - progress bars animate on scroll
   - stat counter animation
   - simple demo chatbot (predefined responses)
   - smooth nav link highlight (basic)
*/

// ===== typing / rotating roles ====
const roles = [
  "Cybersecurity Learner",
  "Cloud Security Learner",
  "Web Developer",
  "AWS & Linux Learner",
  "Ethical Hacking Learner"
];

const roleEl = document.getElementById("dynamicRole");

let rIndex = 0;
let cIndex = 0;
let typing = true;

const typeSpeed = 70;
const deleteSpeed = 40;
const hold = 1200;

function typeTick() {
  if (!roleEl) return;

  const word = roles[rIndex];

  if (typing) {
    cIndex++;
    roleEl.textContent = word.substring(0, cIndex);

    if (cIndex >= word.length) {
      typing = false;
      setTimeout(typeTick, hold);
    } else {
      setTimeout(typeTick, typeSpeed);
    }

  } else {
    cIndex--;
    roleEl.textContent = word.substring(0, cIndex);

    if (cIndex <= 0) {
      typing = true;
      rIndex = (rIndex + 1) % roles.length;
      setTimeout(typeTick, 300);
    } else {
      setTimeout(typeTick, deleteSpeed);
    }
  }
}

document.addEventListener("DOMContentLoaded", typeTick);



// ===== hamburger for mobile nav =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger?.addEventListener("click", ()=>{
  if (navLinks.style.display === "flex") navLinks.style.display = "";
  else navLinks.style.display = "flex";
});

// ===== progress bars fill when in view =====
const progressEls = document.querySelectorAll(".progress");
function animateProgress(){
  progressEls.forEach(p=>{
    const rect = p.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40){
      const percent = p.getAttribute("data-percent") || "0";
      const span = p.querySelector("span");
      span.style.width = percent + "%";
      // update label
      const strong = p.querySelector("strong");
      if (strong) strong.textContent = percent + "%";
    }
  });
}
window.addEventListener("scroll", animateProgress);
window.addEventListener("load", animateProgress);

// ===== stat counters (count up) =====
const statEls = document.querySelectorAll(".stat-number");
let statStarted = false;
function animateStats(){
  if (statStarted) return;
  const el = statEls[0];
  if (!el) return;
  if (el.getBoundingClientRect().top < window.innerHeight - 80){
    statStarted = true;
    statEls.forEach(s=>{
      const target = parseInt(s.getAttribute("data-target")) || 0;
      let val = 0;
      const step = Math.max(1, Math.floor(target/40));
      const t = setInterval(()=>{
        val += step;
        if (val >= target){
          s.textContent = s.getAttribute("data-target") + (s.getAttribute("data-target") < 10 ? "" : "+");
          clearInterval(t);
        } else s.textContent = val + (target>10 ? "+" : "");
      }, 30);
    });
  }
}
window.addEventListener("scroll", animateStats);
window.addEventListener("load", animateStats);

// ===== smooth link active highlight (basic) =====
const links = document.querySelectorAll(".nav-links a");
function setActiveLink(){
  let index = 0;
  const sections = ["home","about","skills","services","portfolio","contact"];
  for (let i=0;i<sections.length;i++){
    const s = document.getElementById(sections[i]);
    if (!s) continue;
    const top = s.getBoundingClientRect().top;
    if (top <= 120) index = i;
  }
  links.forEach(a=>a.classList.remove("active"));
  if (links[index]) links[index].classList.add("active");
}
window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);
// ===== UPGRADED PORTFOLIO CHATBOT =====
const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatClose = document.getElementById("chatClose");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const chatForm = document.getElementById("chatForm");

// Open / close chatbot
chatToggle?.addEventListener("click", () => {
  const isOpen = chatWindow.style.display === "flex";

  if (isOpen) {
    chatWindow.style.display = "none";
    chatToggle.style.transform = "scale(1)";
    chatWindow.setAttribute("aria-hidden", "true");
  } else {
    chatWindow.style.display = "flex";
    chatToggle.style.transform = "scale(1.08)";
    chatWindow.setAttribute("aria-hidden", "false");
    chatInput?.focus();
  }
});

chatClose?.addEventListener("click", () => {
  chatWindow.style.display = "none";
  chatToggle.style.transform = "scale(1)";
  chatWindow.setAttribute("aria-hidden", "true");
});


// ===== BOT KNOWLEDGE =====
function botReply(msg) {
  const text = msg.toLowerCase().trim();

  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey")
  ) {
    return "Hey! 👋 I'm Subojit's portfolio assistant. Ask me about his skills, projects, services, education, or contact details.";
  }

  if (
    text.includes("skill") ||
    text.includes("skills") ||
    text.includes("technology") ||
    text.includes("technologies")
  ) {
    return "💻 Subojit's current skills include HTML, CSS, JavaScript, Web Development, Cloud Computing, Linux, and Cybersecurity fundamentals.";
  }

  if (
    text.includes("project") ||
    text.includes("projects") ||
    text.includes("portfolio")
  ) {
    return "🚀 You can explore Subojit's projects in the Portfolio section. He is currently building web projects and exploring Cloud & Cybersecurity.";
  }

  if (
    text.includes("service") ||
    text.includes("services")
  ) {
    return "🛠️ Current services include Website Development, Web Apps & JavaScript Utilities, basic Flutter App Development, and basic Cybersecurity-focused web practices.";
  }

  if (
    text.includes("education") ||
    text.includes("study") ||
    text.includes("college") ||
    text.includes("bca")
  ) {
    return "🎓 Subojit is currently pursuing a BCA in Cloud Computing & Cyber Security.";
  }

  if (
    text.includes("cyber") ||
    text.includes("security") ||
    text.includes("hacking")
  ) {
    return "🛡️ Subojit is learning Cybersecurity and Ethical Hacking through hands-on practice, focusing on safe and ethical security learning.";
  }

  if (
    text.includes("cloud") ||
    text.includes("aws") ||
    text.includes("linux")
  ) {
    return "☁️ Subojit is exploring Cloud Computing, AWS, Linux, and Cloud Security.";
  }

  if (
    text.includes("hire") ||
    text.includes("contact") ||
    text.includes("work") ||
    text.includes("freelance")
  ) {
    return "🤝 Interested in working with Subojit? Use the Contact section of this portfolio to send a message.";
  }

  if (
    text.includes("youtube") ||
    text.includes("video")
  ) {
    return "🎥 Subojit also creates tech-related content on YouTube. Check the YouTube icon in the portfolio's social links.";
  }

  if (
    text.includes("who are you") ||
    text.includes("about you")
  ) {
    return "🤖 I'm Subojit's portfolio assistant. I help visitors learn about his skills, projects, services, education, and technical interests.";
  }

  if (text.includes("help")) {
    return "💡 Try asking: What are your skills? What projects have you made? What services do you offer? What are you studying? Or how can I contact you?";
  }

  return "🤖 I'm still learning! Try asking me about Skills, Projects, Services, Education, Cybersecurity, Cloud, YouTube, or Contact.";
}


// ===== MESSAGE CREATOR =====
function addMessage(message, type = "bot") {
  const div = document.createElement("div");

  div.className = `msg ${type}`;
  div.textContent = message;

  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;

  return div;
}


// ===== TYPING INDICATOR =====
function showTyping() {
  const typing = document.createElement("div");

  typing.className = "msg bot typing-indicator";
  typing.innerHTML = "<span></span><span></span><span></span>";

  chatBody.appendChild(typing);
  chatBody.scrollTop = chatBody.scrollHeight;

  return typing;
}


// ===== SEND MESSAGE =====
chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const val = chatInput.value.trim();

  if (!val) return;

  // User message
  addMessage(val, "user");

  chatInput.value = "";

  // Bot typing animation
  const typing = showTyping();

  setTimeout(() => {
    typing.remove();

    const reply = botReply(val);

    addMessage(reply, "bot");
  }, 700);
});


// ===== ENTER KEY =====
chatInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm?.requestSubmit();
  }
});


// ===== WELCOME MESSAGE =====
if (chatBody && chatBody.children.length === 0) {
  setTimeout(() => {
    addMessage(
      "Hi! 👋 I'm Subojit's AI-style portfolio assistant. How can I help you?"
    );
  }, 300);
       }
