document
  .getElementById("add-movie-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get the form data
    const title = document.getElementById("title").value;
    const year = document.getElementById("year").value;
    const status = document.getElementById("status").value;
    const content = document.getElementById("content").value;
    const link1080p = document.getElementById("link1080p").value;
    const link720p = document.getElementById("link720p").value;
    const link480p = document.getElementById("link480p").value;
    const postId = document.getElementById("id").value;
    const imageFile = document.getElementById("image").value;

    // Upload image to Firebase storage
    const imageRef = storageRef.child(`post/${title}/${imageFile.name}`);
    imageRef.put(imageFile)
    .then((snapshot) => {
      // Retrieve image URL and save to Firestore
      return snapshot.ref.getDownloadURL();
    });
.then((imageUrl))
    // Add the movie review data to Firebase Firestore
    db.collection("telegram-post")
      .add({
        title,
        year,
        status,
        content,
        link1080p,
        link720p,
        link480p,
        timestamp: Date(),
      })
      .then(() => {
        alert("Review added successfully");
        document.getElementById("add-review-form").reset();
      })
      .catch((error) => {
        console.error("Error adding review:", error);
        alert("An error occurred while adding the review");
      });
  });