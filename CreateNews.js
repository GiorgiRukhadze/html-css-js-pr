document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("news-form");
  const cancelButton = document.getElementById("cancel-button");

  cancelButton.addEventListener("click", () => {
    form.reset();
  });

  const urlParams = new URLSearchParams(window.location.search);
  const newsId = urlParams.get("id");

  function populateFormForUpdate(newsId) {
    fetch(`https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/${newsId}`)
      .then((response) => response.json())
      .then((data) => {
        form.title.value = data.title;
        form.description.value = data.description;
        form.category.value = data.category;
        form.editorFirstName.value = data.editorFirstName;
        form.editorLastName.value = data.editorLastName;
      })
      .catch((error) => {
        console.error("Error fetching news details:", error);
        alert("Failed to fetch news details. Please try again.");
      });
  }

  if (newsId) {
    populateFormForUpdate(newsId);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      editorFirstName: form.editorFirstName.value,
      editorLastName: form.editorLastName.value,
    };

    const requestMethod = newsId ? "PUT" : "POST";
    const apiUrl = newsId
      ? `https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/${newsId}`
      : "https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news";

    fetch(apiUrl, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        showSuccessMessage();
        window.location.href = "newslist.html";
      })
      .catch((error) => {
        console.error("Error creating/updating news:", error);
        alert("Failed to save news. Please try again.");
      });
  });
});

function validateForm() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const category = document.getElementById("category").value.trim();
  const editorFirstName = document
    .getElementById("editorFirstName")
    .value.trim();
  const editorLastName = document.getElementById("editorLastName").value.trim();

  if (
    !title ||
    !description ||
    !category ||
    !editorFirstName ||
    !editorLastName
  ) {
    alert("Please fill in all fields.");
    return false;
  }

  return true;
}

function showSuccessMessage() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "block";
  } else {
    console.error("Modal element not found.");
  }
}
