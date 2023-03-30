const firestore = firebase.firestore();
const db = firestore.collection("telegram-post");

// Get the movie's ID from the query parameter
var postId = new URLSearchParams(window.location.search).get("id");

db.doc(postId)
  .get()
  .then((doc) => {
    const post = doc.data();

    // Populate the form with the existing movie data
    document.getElementById("status").value = post.status;
  })
  .catch((error) => {
    console.error("Error retrieving movie data:", error);
    alert("An error occurred while retrieving the movie data");
  });

// Handle form submission to update the movie data in Firebase
document.getElementById("edit-form").addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the form data
  const status = document.getElementById("status").value;

  // Update the movie data in Firebase
  db.doc(postId)
    .update({
      status,
    })
    .then(() => {
      alert("Movie data updated successfully");
    })
    .catch((error) => {
      console.error("Error updating movie data:", error);
      alert("An error occurred while updating the movie data");
    });
});

// Get the movie data from Firebase Firestore
db.doc(postId)
  .get()
  .then((doc) => {
    // Check if the movie exists
    if (!doc.exists) {
      console.error(`Post with ID "${movieId}" does not exist`);
      alert("The movie you are looking for could not be found");
      return;
    }
    const post = doc.data();
    document.getElementById("head").innerHTML += `${post.title}`;
    document.getElementById(
      "image"
    ).innerHTML += `<img src="${post.imageUrl}" alt="${post.title}">`;
    document.getElementById("status").innerHTML += `${post.status}`;
    document.getElementById("post-title").innerHTML += `${post.title}`;
    document.getElementById("post-content").innerHTML += `
    <div id="text" contenteditable>
      <p>${post.title} (${post.year}) 1080p 720p 480p HDRip x264 AAC ESubs ${post.content}.Mkv</p>
      <p>📤 Download & Streaming Link :-</p>
      <p>🔰1080p :- ${post.link1080p}</p>
      <p>🔰720p :- ${post.link720p}</p>
      <p>🔰480p :- ${post.link480p}</p>
    </div>
    `;
  });
