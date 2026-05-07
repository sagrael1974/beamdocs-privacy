const workflowSteps = {
  scan: {
    kicker: "Scan",
    title: "Paper becomes a PDF.",
    body: "Start with a receipt, invoice or contract and turn it into a clean local PDF.",
    chip: "Camera ready",
  },
  review: {
    kicker: "Review",
    title: "Decide before saving.",
    body: "Rename the file, check OCR progress and place the document in the right folder.",
    chip: "OCR checking",
  },
  organize: {
    kicker: "Organize",
    title: "Your desk stays tidy.",
    body: "Smart Organization can suggest names, categories and folders while the files stay local.",
    chip: "Folder suggested",
  },
  sign: {
    kicker: "Sign or share",
    title: "Finish the document.",
    body: "Reuse a saved local signature with Pro, or share a PDF with another app when you choose.",
    chip: "Signature ready",
  },
};

const stepButtons = document.querySelectorAll("[data-step]");
const preview = document.querySelector("#workflow-preview");
const previewKicker = document.querySelector("[data-preview-kicker]");
const previewTitle = document.querySelector("[data-preview-title]");
const previewBody = document.querySelector("[data-preview-body]");
const previewChip = document.querySelector("[data-preview-chip]");

function setWorkflowStep(stepKey) {
  const step = workflowSteps[stepKey];
  if (!step) return;

  stepButtons.forEach((button) => {
    const isActive = button.dataset.step === stepKey;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  previewKicker.textContent = step.kicker;
  previewTitle.textContent = step.title;
  previewBody.textContent = step.body;
  previewChip.textContent = step.chip;

  preview.classList.remove("changed");
  window.requestAnimationFrame(() => preview.classList.add("changed"));
}

stepButtons.forEach((button) => {
  button.addEventListener("click", () => setWorkflowStep(button.dataset.step));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((section) => {
  revealObserver.observe(section);
});

const navLinks = document.querySelectorAll("[data-nav-section]");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.navSection === entry.target.id);
      });
    });
  },
  { rootMargin: "-42% 0px -48% 0px" }
);

navLinks.forEach((link) => {
  const section = document.getElementById(link.dataset.navSection);
  if (section) sectionObserver.observe(section);
});

function updateScrolledState() {
  document.body.classList.toggle("scrolled", window.scrollY > 12);
}

updateScrolledState();
window.addEventListener("scroll", updateScrolledState, { passive: true });
