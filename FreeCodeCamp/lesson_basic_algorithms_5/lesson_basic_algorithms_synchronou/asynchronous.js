const postsContainer = document.getElementById("posts-container");

const forumLatest =
  "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";

//xử lý ngày giờ của Activity
const timeAgo = (time) => {
  const currentTime = new Date();
  const lastPost = new Date(time);
  // tôi muốn tính toán sự khác biệt
  // giữa thời gian hiện tại và thời gian hoạt động cuối cùng về 1 chủ đề
  // điều này sẽ cho phép bạn hiển thị số thời gian trôi qua kể từ khi 1 chủ đề có bất kì hoạt động nào

  const minutes = Math.floor((currentTime - lastPost) / 60000);
  const hours = Math.floor((currentTime - lastPost) / 3600000);
  const days = Math.floor((currentTime - lastPost) / 86400000);

  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  if (hours < 24) {
    return `${hours}h ago`;
  }
  return `${days}d ago`;
};

// Xử lý phần views được xem 1 định dạng dễ đọc hơn
const viewCount = (views) => {
  if (views >= 1000) {
    return `${Math.floor(views / 1000)}k`;
  }
  return views;
};

//Xử lý Category chứa tất cả các danh mục diễn đàn và tên lớp cho kiểu dáng
const allCategories = {
  299: { category: "Career Advice", className: "career" },
  409: { category: "Project Feedback", className: "feedback" },
  417: { category: "freeCodeCamp Support", className: "support" },
};
const forumCategory = (id) => {
  // luư trữ tên danh mục
  let selectedCategory = {};
  //kiem tra thử 1 đối tượng đó có id
  if (allCategories.hasOwnProperty(id)) {
    const { category, className } = allCategories[id];
    selectedCategory.category = category;
    selectedCategory.className = className;
  } else {
    // neu id khong hiển thị danh mục;
    selectedCategory.category = "General";
    selectedCategory.className = "general";
    selectedCategory.id = 1;
  }
  //Mỗi danh mục sẽ có url chỉ vào danh mục trên
  const url = `${forumCategoryUrl}/${selectedCategory.className}/${id}`;
  const linkText = selectedCategory.category;
  const linkClass = `category ${selectedCategory.className}`;
  return `<a href="${url}" class="${linkClass}" target="_blank">${linkText}</a>`;
};

// Xử lý danh sách hình ảnh Avatar của người đại diện
// cho tất cả người dùng tham gia vào cuộc trò chuyện cho chủ đề đó
const avatars = (posters, users) => {
  return posters.map((poster) => {
    // tìm id đó có trong mảng poster hay không
    const user = users.find((user) => user.id === poster.user_id);
    if (user) {
      const avatar = user.avatar_template.replace(/{size}/,30);
      const userAvatarUrl = avatar.startsWith("/user_avatar/") ? avatarUrl.concat(avatar) : avatar;
      return `<img src="${userAvatarUrl}" alt="${user.name}" />`
    }
  }).join("")
};

const fetchData = async () => {
  try {
    const res = await fetch(forumLatest)
      .then((res) => res.json())
      .then((data) => data);
    console.log(res);
    showLatestPosts(res);
  } catch (err) {
    console.log(err);
  }
};
fetchData();

const showLatestPosts = (data) => {
  const { topic_list, users } = data;

  const { topics } = topic_list;
  postsContainer.innerHTML = topics
    .map((item) => {
      const {
        id,
        title,
        views,
        posts_count,
        slug,
        posters,
        category_id,
        bumped_at,
      } = item;
      return `
      <tr>
        <td>
          <a href="${forumTopicUrl}${slug}/${id}" target="_blank" class="post-title">${title}</a>
    ${forumCategory(category_id)}
        </td>
        <td>
         <div class="avatar-container">
          ${avatars(posters,users)}
         </div>
        </td>
        <td>${posts_count - 1}</td>
        <td>${viewCount(views)}</td>
        <td>${timeAgo(bumped_at)}</td>
      </tr>`;
    })
    .join("");
};
