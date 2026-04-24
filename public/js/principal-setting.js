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

function showMessage(elementId, message) {
  const messageBox = document.getElementById(elementId);

  if (!messageBox) return;

  messageBox.textContent = message;
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
  }, 2500);
}

const profileForm = document.getElementById("profileForm");
const calendarForm = document.getElementById("calendarForm");
const securityForm = document.getElementById("securityForm");
const twoFactorToggle = document.getElementById("twoFactorToggle");
const twoFactorStatus = document.getElementById("twoFactorStatus");

if (profileForm) {
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showMessage("profileMessage", "School profile updated successfully.");
  });
}

if (calendarForm) {
  calendarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showMessage("calendarMessage", "Academic calendar updated successfully.");
  });
}

if (securityForm) {
  securityForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showMessage("securityMessage", "Security settings updated successfully.");
    securityForm.reset();

    if (twoFactorStatus) {
      twoFactorStatus.textContent = "Status: Disabled";
    }
  });
}

if (twoFactorToggle && twoFactorStatus) {
  twoFactorToggle.addEventListener("change", () => {
    twoFactorStatus.textContent = twoFactorToggle.checked
      ? "Status: Enabled"
      : "Status: Disabled";
  });
}