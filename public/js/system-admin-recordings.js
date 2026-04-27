let systemAdmin =
  JSON.parse(localStorage.getItem("systemAdminAuth") || "null") ||
  JSON.parse(sessionStorage.getItem("systemAdminAuth") || "null");

if (!systemAdmin) {
  systemAdmin = {
    fullName: "Hifza Fayyaz",
    role: "system-admin",
    email: "systemadmin@tiny2wise.com"
  };

  localStorage.setItem("systemAdminAuth", JSON.stringify(systemAdmin));
}

function getInitials(name = "Hifza Fayyaz") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

if (systemAdmin) {
  const displayName = systemAdmin.fullName || "Hifza Fayyaz";

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
    localStorage.removeItem("systemAdminAuth");
    sessionStorage.removeItem("systemAdminAuth");
    window.location.href = "principal-signin.html";
  });
}