const form = document.getElementById("principalSignupForm");
const submitBtn = document.getElementById("submitBtn");
const messageBox = document.getElementById("formMessage");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  togglePassword.textContent = passwordInput.type === "password" ? "👁" : "🙈";
});

const fields = {
  fullName: document.getElementById("fullName"),
  schoolName: document.getElementById("schoolName"),
  officialEmail: document.getElementById("officialEmail"),
  contactNumber: document.getElementById("contactNumber"),
  password: document.getElementById("password")
};

const errors = {
  fullName: document.getElementById("fullNameError"),
  schoolName: document.getElementById("schoolNameError"),
  officialEmail: document.getElementById("officialEmailError"),
  contactNumber: document.getElementById("contactNumberError"),
  password: document.getElementById("passwordError")
};

function clearErrors() {
  Object.values(errors).forEach((el) => {
    el.textContent = "";
  });
  messageBox.className = "form-message";
  messageBox.style.display = "none";
  messageBox.textContent = "";
}

function setError(fieldName, message) {
  errors[fieldName].textContent = message;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
  clearErrors();
  let isValid = true;

  if (!fields.fullName.value.trim()) {
    setError("fullName", "Full name is required.");
    isValid = false;
  }

  if (!fields.schoolName.value.trim()) {
    setError("schoolName", "School name is required.");
    isValid = false;
  }

  if (!fields.officialEmail.value.trim()) {
    setError("officialEmail", "Official email is required.");
    isValid = false;
  } else if (!isValidEmail(fields.officialEmail.value.trim())) {
    setError("officialEmail", "Enter a valid email address.");
    isValid = false;
  }

  if (!fields.contactNumber.value.trim()) {
    setError("contactNumber", "Contact number is required.");
    isValid = false;
  }

  if (!fields.password.value.trim()) {
    setError("password", "Password is required.");
    isValid = false;
  } else if (fields.password.value.trim().length < 6) {
    setError("password", "Password must be at least 6 characters.");
    isValid = false;
  }

  return isValid;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const payload = {
    fullName: fields.fullName.value.trim(),
    schoolName: fields.schoolName.value.trim(),
    officialEmail: fields.officialEmail.value.trim(),
    contactNumber: fields.contactNumber.value.trim(),
    password: fields.password.value.trim()
  };

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = "Creating Account...";

    const response = await fetch("/api/principal-auth/signup", {
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
      messageBox.textContent = result.message || "Signup failed.";
      return;
    }

    messageBox.className = "form-message success";
    messageBox.style.display = "block";
    messageBox.textContent = result.message;

    form.reset();
  } catch (error) {
    messageBox.className = "form-message error";
    messageBox.style.display = "block";
    messageBox.textContent = "Unable to connect to server.";
    console.error(error);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Create Principal Account";
  }
});