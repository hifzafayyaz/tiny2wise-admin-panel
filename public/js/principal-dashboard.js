const principal =
  JSON.parse(localStorage.getItem("principalAuth") || "null") ||
  JSON.parse(sessionStorage.getItem("principalAuth") || "null");

if (!principal) {
window.location.replace("principal-signin.html");
}

function getInitials(name = "Dr. Adnan") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

if (principal) {
  const displayName = principal.fullName || "Dr. Adnan";

  document.getElementById("principalName").textContent = displayName;
  document.getElementById("sidebarName").textContent = displayName;
  document.getElementById("sidebarInitials").textContent = getInitials(displayName);
}

const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const logoutBtn = document.getElementById("logoutBtn");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("principalAuth");
  sessionStorage.removeItem("principalAuth");
  window.location.href = "/signin";
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    sidebar.classList.remove("open");
  });
});

let principal =
  JSON.parse(localStorage.getItem("principalAuth") || "null") ||
  JSON.parse(sessionStorage.getItem("principalAuth") || "null");

if (!principal) {
  principal = {
    fullName: "Dr. Adnan",
    role: "principal",
    officialEmail: "principal@tiny2wise.com"
  };

  localStorage.setItem("principalAuth", JSON.stringify(principal));
}

function getInitials(name = "Dr. Adnan") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

if (principal) {
  const displayName = principal.fullName || "Dr. Adnan";

  document.getElementById("principalName").textContent = displayName;
  document.getElementById("sidebarName").textContent = displayName;
  document.getElementById("sidebarInitials").textContent = getInitials(displayName);
}

const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const logoutBtn = document.getElementById("logoutBtn");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("principalAuth");
    sessionStorage.removeItem("principalAuth");
    window.location.href = "principal-signin.html";
  });
}