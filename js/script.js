function removeActiveClass() {
  const activeBtns = document.getElementsByClassName("active");
  for (let btn of activeBtns) {
    btn.classList.remove("active");
  }
}
function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}
function loadVideos() {
  const url = "https://openapi.programming-hero.com/api/phero-tube/videos";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}

const loadCategoryVideos = (id) => {
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedBtn = document.getElementById(`btn-${id}`);
      clickedBtn.classList.add("active");
      // console.log(clickedBtn);
      displayVideos(data.category);
    });
};
// {category_id: '1001', category: 'Music'}
function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (const cat of categories) {
    const categoriesDiv = document.createElement("div");
    categoriesDiv.innerHTML = `
         <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    categoryContainer.append(categoriesDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `
           <div class="col-span-full py-20 flex flex-col justify-center items-center">
                <img src="./assets/Icon.png" alt="icon">
                <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
            </div>
    `;
    return;
  }
  videos.forEach((video) => {
    // console.log(video);
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
      <div class="card bg-base-100">
                <figure class="relative">
                    <img class="w-full h-[200px] object-cover"
                        src="${video.thumbnail}" alt="videos" />
                    <span class="text-sm bg-black text-white absolute bottom-2 right-2 px-2 rounded">3hrs 56 min
                        ago</span>
                </figure>
                <div class="flex gap-3 py-4">
                    <div class="profile-img">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 rounded-full ring ring-offset-2 w-9">
                                <img src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                    </div>
                    <div class="description">
                        <h2 class="text-sm font-semibold">${video.title}</h2>
                        <p class="flex gap-3 text-sm text-gray-400">${video.authors[0].profile_name} <img class="w-5 h-5"
                                src="https://img.icons8.com/?size=96&id=QMxOVe0B9VzG&format=png"
                                alt="verification-sign"></p>
                        <p class="text-sm text-gray-400">${video.others.views} views</p>
                    </div>

                </div>
            </div>
    `;
    videoContainer.appendChild(videoCard);
  });
};

// Function Call
loadCategories();
// loadVideos();
