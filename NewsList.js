document.addEventListener("DOMContentLoaded", () => {
  const createButton = document.getElementById("create-button");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("close-modal");

  createButton.addEventListener("click", () => {
    window.location.href = "CreateNews.html";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  fetch("https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news")
    .then((response) => response.json())
    .then((data) => {
      const newsContainer = document.getElementById("news-container");
      data.forEach((newsItem) => {
        const row = document.createElement("tr");
        row.innerHTML = `
              <td>${newsItem.id}</td>
              <td>${newsItem.title}</td>
              <td>${newsItem.category}</td>
              <td>${newsItem.likes}</td>
              <td>${formatDate(newsItem.dateUpdated)}</td>
              <td>${formatDate(newsItem.dateCreated)}</td>
              <td>
                <button class="delete-button" data-id="${
                  newsItem.id
                }">Delete</button>
                <button class="update-button" data-id="${
                  newsItem.id
                }">Update</button>
              </td>
            `;
        newsContainer.appendChild(row);
      });

      document.querySelectorAll(".update-button").forEach((button) => {
        button.addEventListener("click", (event) => {
          const newsId = event.target.getAttribute("data-id");
          window.location.href = `CreateNews.html?id=${newsId}`;
        });
      });

      document.querySelectorAll(".delete-button").forEach((button) => {
        button.addEventListener("click", (event) => {
          const newsId = event.target.getAttribute("data-id");
          const row = event.target.closest("tr");
          fetch(`https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/${newsId}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.ok) {
                row.remove();
                modal.style.display = "block";
              } else {
                alert("Failed to delete news");
              }
            })
            .catch((error) => {
              console.error("Error deleting news:", error);
              alert("An error occurred while deleting the news");
            });
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching news:", error);
    });
});

function formatDate(dateString) {
  const options = { month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
