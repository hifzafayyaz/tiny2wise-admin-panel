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

document.querySelectorAll(".dot").forEach((dot) => {
  dot.addEventListener("click", () => {
    if (!dot.classList.contains("present") && !dot.classList.contains("absent")) {
      dot.classList.add("present");
      return;
    }

    if (dot.classList.contains("present")) {
      dot.classList.remove("present");
      dot.classList.add("absent");
      return;
    }

    dot.classList.remove("absent");
  });
});