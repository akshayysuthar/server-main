// Get a reference to the Firebase Firestore service
const db = firebase.firestore();
const storageRef = firebase.storage().ref();

// Handle form submission to add a new movie review to Firebase


const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

      // Get the form data
      const title = document.getElementById("title").value;
      const year = document.getElementById("year").value;
      const status = document.getElementById("status").value;
      const content = document.getElementById("content").value;
      const link1080p = document.getElementById("link1080p").value;
      const link720p = document.getElementById("link720p").value;
      const link480p = document.getElementById("link480p").value;
      const postId = document.getElementById("postId").value;
      const imageFile = document.getElementById("image").files[0];
  
  // Upload image to Firebase storage
  const imageRef = storageRef.child(`telegram-post/${title}/${imageFile.name}`);
  imageRef.put(imageFile)
    .then((snapshot) => {
      // Retrieve image URL and save to Firestore
      return snapshot.ref.getDownloadURL();
    })
    .then((imageUrl) => {
      // Save to Firestore with the specified ID
      return db.collection('telegram-post').doc(postId).set({
        title,
        imageUrl,
        year,
        status,
        content,
        link1080p,
        link720p,
        link480p,
        timestamp: Date(),
      });
    })
    .then(() => {
      // Reset form fields
      e.target.reset();
      console.log('Post added successfully.');
      alert("movie post added successfully");
    })
    .catch((error) => {
      console.error(error);
    });
});
