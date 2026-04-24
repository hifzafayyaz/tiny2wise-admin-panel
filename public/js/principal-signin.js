const API_BASE_URL = "http://127.0.0.1:5000";

const form = document.getElementById("principalSigninForm");
const signinBtn = document.getElementById("signinBtn");
const messageBox = document.getElementById("formMessage");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

const fields = {
  officialEmail: document.getElementById("officialEmail"),
  password: document.getElementById("password"),
  rememberMe: document.getElementById("rememberMe")
};

const errors = {
  officialEmail: document.getElementById("officialEmailError"),
  password: document.getElementById("passwordError")
};

if (togglePassword) {
  togglePassword.addEventListener("click", () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    togglePassword.textContent = passwordInput.type === "password" ? "👁" : "🙈";
  });
}

function clearErrors() {
  Object.values(errors).forEach((el) => {
    if (el) el.textContent = "";
  });

  messageBox.className = "form-message";
  messageBox.style.display = "none";
  messageBox.textContent = "";
}

function setError(fieldName, message) {
  if (errors[fieldName]) {
    errors[fieldName].textContent = message;
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
  clearErrors();

  let isValid = true;

  const email = fields.officialEmail.value.trim();
  const password = fields.password.value.trim();

  if (!email) {
    setError("officialEmail", "Email is required.");
    isValid = false;
  } else if (!isValidEmail(email)) {
    setError("officialEmail", "Enter a valid email address.");
    isValid = false;
  }

  if (!password) {
    setError("password", "Password is required.");
    isValid = false;
  }

  return isValid;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const payload = {
    officialEmail: fields.officialEmail.value.trim(),
    password: fields.password.value.trim()
  };

  try {
    signinBtn.disabled = true;
    signinBtn.textContent = "Signing In...";

    const response = await fetch(`${API_BASE_URL}/api/principal-auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      messageBox.className = "form-message error";
      messageBox.style.display = "block";
      messageBox.textContent = result.message || "Incorrect email or password.";
      return;
    }

    localStorage.removeItem("principalAuth");
    sessionStorage.removeItem("principalAuth");
    localStorage.removeItem("systemAdminAuth");
    sessionStorage.removeItem("systemAdminAuth");

    if (result.data.role === "system-admin") {
      const storage = fields.rememberMe && fields.rememberMe.checked ? localStorage : sessionStorage;
      storage.setItem("systemAdminAuth", JSON.stringify(result.data));

      messageBox.className = "form-message success";
      messageBox.style.display = "block";
      messageBox.textContent = result.message || "System Admin sign in successful.";

      setTimeout(() => {
        window.location.href = "system-admin-dashboard.html";
      }, 700);

      return;
    }

    const storage = fields.rememberMe && fields.rememberMe.checked ? localStorage : sessionStorage;
    storage.setItem("principalAuth", JSON.stringify(result.data));

    messageBox.className = "form-message success";
    messageBox.style.display = "block";
    messageBox.textContent = result.message || "Principal sign in successful.";

    setTimeout(() => {
      window.location.href = "principal-dashboard.html";
    }, 700);
  } catch (error) {
    console.error("Sign in error:", error);

    messageBox.className = "form-message error";
    messageBox.style.display = "block";
    messageBox.textContent = `Unable to connect to server: ${error.message}`;
  } finally {
    signinBtn.disabled = false;
    signinBtn.textContent = "Sign In";
  }
});