function removeActiveClass() {
  const activeBtns = document.getElementsByClassName("active");
  for (let btn of activeBtns) {
    btn.classList.remove("active");
  }
}
function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => {
      displayCategories(data.categories);
    });
}
function loadVideos(videoTitle = "") {
  const url = `https://openapi.programming-hero.com/api/phero-tube/videos?title=${videoTitle}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}
const loadVideoDetails = (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
};
const displayVideoDetails = (video) => {
  console.log(video);
  const videoDetails = document.getElementById("video_details");
  videoDetails.showModal();
  const detailsContainer = document.getElementById("details_container");
  detailsContainer.innerHTML = `
      <article class="relative overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
  <img
    alt=""
    src="${video.thumbnail}"
    class="absolute inset-0 h-full w-full object-cover"
  />

  <div class="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
    <div class="p-4 sm:p-6">
      <p class="flex gap-3 text-sm text-gray-400">${video.authors[0].profile_name} </p>

      <a href="#">
        <h3 class="mt-0.5 text-lg text-white">${video.title}</h3>
      </a>

      <p class="mt-2  text-sm/relaxed text-white/95">${video.description}</p>
    </div>
  </div>
</article>
  `;
};
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
                                <img src="${
                                  video.authors[0].profile_picture
                                }" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="description">
                        <h2 class="text-sm font-semibold">${video.title}</h2>
                        <p class="flex gap-3 text-sm text-gray-400">${
                          video.authors[0].profile_name
                        } 
                        ${
                          video.authors[0].verified === true
                            ? ` <img class="w-5 h-5"
                                src="https://img.icons8.com/?size=96&id=QMxOVe0B9VzG&format=png"
                                alt="verification-sign">`
                            : " "
                        }
                        </p>
                        <p class="text-sm text-gray-400">${
                          video.others.views
                        } views</p>
                    </div>
                </div>
                <button onclick=loadVideoDetails("${
                  video.video_id
                }") class="btn btn-block">Show Details</button>
            </div>
    `;
    videoContainer.appendChild(videoCard);
  });
};

const sortByViews = () => {
  document.getElementById("sort-by-view");
  const url = "https://openapi.programming-hero.com/api/phero-tube/videos";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const videos = data.videos;
      videos.sort(
        (a, b) => parseViews(b.others.views) - parseViews(a.others.views)
      );
      displayVideos(videos);
      // console.log(videos);
    });
};
const parseViews = (views) => {
  return Number(views.replace(/K/, "000").replace(/M/, "000000"));
};

document.getElementById("search-input").addEventListener("keyup", (event) => {
  // input e ki dicche seita return korbe
  const input = event.target.value;
  // console.log(input);
  loadVideos(input);
});
// Function Call
loadCategories();
// loadVideos();
