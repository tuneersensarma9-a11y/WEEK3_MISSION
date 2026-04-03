const input = document.getElementById("searchInput");
const loading = document.getElementById("loading");
const card = document.getElementById("profileCard");
const error = document.getElementById("error");

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    fetchUser(input.value);
  }
});

async function fetchUser(username) {
  // Reset UI
  error.classList.add("hidden");
  card.classList.add("hidden");
  loading.classList.remove("hidden");

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    // Error handling
    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    displayUser(data);
  } catch (err) {
    error.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }
}

function displayUser(user) {
  document.getElementById("avatar").src = user.avatar_url;
  document.getElementById("name").innerText =
  user.name ? `${user.name} (@${user.login})` : user.login;
  document.getElementById("bio").innerText = user.bio || "No Bio Available";
  document.getElementById("joined").innerText =
    "Joined: " + new Date(user.created_at).toDateString();

  const portfolio = document.getElementById("portfolio");
  portfolio.href = user.blog || "#";
  portfolio.innerText = user.blog ? "Portfolio" : "No Portfolio";

  card.classList.remove("hidden");
}