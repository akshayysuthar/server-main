const firestore = firebase.firestore();
const postRef = firestore.collection("telegram-post");

// Retrieve all post from Firestore
postRef
  .get()
  .then((querySnapshot) => {
    const allpost = [];
    querySnapshot.forEach((doc) => {
      allpost.push({
        id: doc.id,
        title: doc.data().title.toLowerCase(),
        // imageUrl: doc.data().imageUrl,
      });
    });
    const postList = document.getElementById("post-list");
    const searchBox = document.getElementById("search");
    let timeout = null;
    searchBox.addEventListener("input", () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const searchTerm = searchBox.value
        let postHTML = "";
        allpost.forEach((post) => {
          if (post.title.includes(searchTerm)) {
            postHTML += `
                ${post.title}
                    `;
          }
        });
        postList.innerHTML = postHTML;
        const postPosters = postList.querySelectorAll(".post-imageUrl");
        postPosters.forEach((postPoster) => {
          postPoster.addEventListener("click", () => {
            const postId = postPoster.parentNode
              .getAttribute("href")
              .split("=")[1];
            window.location.href = `post.html?id=${postId}`;
          });
        });
      }, 300);
    });
  })
  .catch((error) => {
    console.error(error);
  });
