/* script.js
   - typing role text
   - hamburger menu toggle
   - progress bars animate on scroll
   - stat counter animation
   - simple demo chatbot (predefined responses)
   - smooth nav link highlight (basic)
*/

// ===== typing / rotating roles =====
const roles = ["Web Developer", "YouTuber", "Freelancer", "Front‑End Developer", "UI/UX Learner"];
const roleEl = document.getElementById("dynamicRole");
let rIndex = 0, cIndex = 0, typing = true;

const typeSpeed = 75, deleteSpeed = 40, hold = 1000;

function typeTick(){
  const word = roles[rIndex];
  if (typing){
    cIndex++;
    roleEl.textContent = word.slice(0, cIndex);
    if (cIndex === word.length){
      typing = false;
      setTimeout(typeTick, hold);
    } else setTimeout(typeTick, typeSpeed);
  } else {
    cIndex--;
    roleEl.textContent = word.slice(0, cIndex);
    if (cIndex === 0){
      typing = true; rIndex = (rIndex+1)%roles.length;
      setTimeout(typeTick, 300);
    } else setTimeout(typeTick, deleteSpeed);
  }
}
document.addEventListener("DOMContentLoaded", ()=>{ typeTick(); });

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

// ===== DEMO chatbot =====
const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatClose = document.getElementById("chatClose");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const chatForm = document.getElementById("chatForm");

chatToggle.addEventListener("click", ()=>{
  if (chatWindow.style.display === "flex"){
    chatWindow.style.display = "none";
    chatToggle.style.transform = "scale(1)";
  } else {
    chatWindow.style.display = "flex";
    chatToggle.style.transform = "scale(1.08)";
    chatWindow.setAttribute("aria-hidden","false");
  }
});
chatClose.addEventListener("click", ()=>{
  chatWindow.style.display = "none";
  chatWindow.setAttribute("aria-hidden","true");
});

// simple demo responses
function botReply(msg){
  const text = msg.toLowerCase();
  if (text.includes("service") || text.includes("services")) return "I offer Web Design, Graphic Design, Video Editing and Freelance setup help.";
  if (text.includes("hire") || text.includes("price") || text.includes("cost")) return "Send me your project details — I'll reply with a timeline & quote.";
  if (text.includes("youtube") || text.includes("video")) return "I create & edit YouTube videos and thumbnails. Share your video idea!";
  if (text.includes("hello") || text.includes("hi")) return "Hello! How can I help you today?";
  if (text.includes("help")) return "You can ask about Services, Portfolio or how to hire me.";
  return "Nice question — this is a demo bot. For full chat, we'll connect real AI later.";
}

chatForm.addEventListener("submit", ()=>{
  const val = chatInput.value.trim();
  if (!val) return;
  // add user msg
  const userDiv = document.createElement("div");
  userDiv.className = "msg user";
  userDiv.textContent = val;
  chatBody.appendChild(userDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
  chatInput.value = "";

  // bot reply after small delay
  setTimeout(()=>{
    const reply = botReply(val);
    const botDiv = document.createElement("div");
    botDiv.className = "msg bot";
    botDiv.textContent = reply;
    chatBody.appendChild(botDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 700);
});
