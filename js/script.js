function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}
function loadVideos() {
  const url = "https://openapi.programming-hero.com/api/phero-tube/videos";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
}
// {category_id: '1001', category: 'Music'}
function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (const cat of categories) {
    const categoriesDiv = document.createElement("div");
    categoriesDiv.innerHTML = `
         <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    categoryContainer.append(categoriesDiv);
  }
}

// authors
// :
// [{…}]
// category_id
// :
// "1001"
// description
// :
// "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// others
// :
// {views: '100K', posted_date: '16278'}
// thumbnail
// :
// "https://i.ibb.co/L1b6xSq/shape.jpg"
// title
// :
// "Shape of You"
// video_id
// :
// "aaaa"
// [[Prototype]]
// :
// Object
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videos.forEach((video) => {
    console.log(video);
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
loadVideos();
