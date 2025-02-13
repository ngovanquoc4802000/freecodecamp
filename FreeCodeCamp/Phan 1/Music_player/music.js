//  Higher Order Functions : các hàm lấy hàm khác làm tham số hoặc trả về hàm làm giá trị. Hàm được truyền dưới dạng tham số được gọi là hàm gọi lại.
//tìm hiểu sơ qua cái method find,forEach(), map(),join();

/* forEach: lặp qua từng mảng */
//arr.forEach((element, index, arr) => console.log(index, element, arr))

/* map: lặp qua từng mảng và trả  về 1 mảng  */
//const modifiedArray = arr.map(function (element, index, arr) { return element })

/* find: Trả về phần tử đầu tiên thỏa mãn điều kiện */
//const ages = [24, 22, 25, 32, 35, 18]
// const age = ages.find((age) => age < 20)

/* join(): từ mảng chuyển về dạng chuỗi */

//các khái niệm cơ bản như :
// 1.xử lý phát lại âm thanh,
// 2.quản lý danh sách phát,
// 3.triển khai các chức năng phát,
// 4.tạm dừng,
// 5.tiếp theo, trước đó và phát ngẫu nhiên

/* Làm 3 chức năng map + pause + play */
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  },
];

/* tìm hiểu về web audio */
const audio = new Audio();
/* Vì người dùng có thể xáo trộn
// và xóa các bài hát khỏi danh sách phát nên bạn sẽ cần
// tạo một bản sao của mảng allSongs mà không làm thay đổi bản gốc. */
let userData = {
  /* cần tạo bản sao */
  songs: [...allSongs],
  /* Xử lý thông tin của bài hát hiện tại và theo dõi thời gian phát lại */
  currentSong: null,
  songCurrentTime: 0,
};

/* /* show details array */
const renderSong = (array) => {
  const songsHTML = array
    .map((song) => {
      return `
    <li id="song-${song.id}" class="playlist-song">
      
    <button class="playlist-song-info" onclick="playSong(${song.id})">
       <span class="playlist-song-title">${song.title}</span>
       <span class="playlist-song-artist">${song.artist}</span>
       <span class="playlist-song-duration">${song.duration}</span>
      </button>
      
      <button class="playlist-song-delete" onclick="delete(${song.id})" arial-label="Delete ${song.title}>
      
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" 
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" 
      fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
      
      </button>

    </li>`;
    })
    .join("");
  playlistSongs.innerHTML = songsHTML;
};
//giúp ngăn ngừa lỗi khi truy cập các thuộc tính lồng nhau
// có thể null hoặc undefined
renderSong(sortSongs());

/* sắp xếp bảng chữ cái theo từ a-z */
//sort((a,b) => a.name < b.name ? -1 : 1)
function sortSongs() {
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  return userData?.songs;
}
/* trien khai cac bai hat */

/* find: điều kiện đúng sẽ truy xuất và kiểm tra từng index đầu tiên 
Nếu không có phần tử nào thoả mãn điều kiện , phương thức sẽ trả về undefined
*/
const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  //Điều này cho phần tử âm thanh biết nơi tìm dữ liệu âm thanh cho bài hát đã chọn.
  audio.src = song.src;
  // Điều này cho phần tử âm thanh biết nội dung sẽ hiển thị dưới dạng tiêu đề của bài hát.
  audio.title = song.title;
  //Trước khi phát bài hát, bạn cần đảm bảo rằng nó bắt đầu lại từ đầu.
  //Điều này có thể đạt được bằng cách sử dụng thuộc tính currentTime trên đối tượng âm thanh.
  //Điều kiện này sẽ kiểm tra xem không có bài hát hiện tại nào đang phát hoặc bài hát hiện tại
  //có khác với bài hát sắp được phát hay không.
  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    // để xử lý thời gian phát hiện tại của bài hát.
    // Điều này cho phép bạn tiếp tục bài hát hiện tại tại thời điểm nó bị tạm dừng.
    audio.currentTime = userData?.songCurrentTime;
  }
  //Lưu ý: Bạn không nên sử dụng toán tử chuỗi tùy chọn ?.
  // ở bước này vì userData.currentSong sẽ không có giá trị rỗng hoặc không được xác định tại thời điểm này.
  userData.currentSong = song;
  playButton.classList.add("playing");
  audio.play();
  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

const pauseSong = () => {
  //Để lưu trữ thời gian hiện tại của bài hát khi nó bị tạm dừng,
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove("playing");
  audio.pause();
};

/* indexOf: trả về chỉ mục đầu tiên nếu mà tại đó có thể tìm thấy 1
phần tử nhất định trong mảng hoặc k có thì trả về -1 */
const getCurrentSongIndex = () =>
  userData?.songs.indexOf(userData?.currentSong);

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();

    const nextSong = userData?.songs[currentSongIndex + 1];

    playSong(nextSong.id);
  }
};
const playPreviousSong = () => {
  if (userData?.currentSong === null) {
    return;
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];
    playSong(previousSong.id);
  }
};

/* lặp lại danh sách bằng phương thức forEach bỏ highlightCurrentSong và setPlayer vào fn playSong */
const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );
  playlistSongElements.forEach((songEl) => {
    /* sử dụng hàm removeAttribute() để loại bỏ attribute "aria-current"  */
    songEl.removeAttribute("aria-current");
  });
  if (songToHighlight) {
    songToHighlight.setAttribute("aria-current", "true");
  }
};
const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;
  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

//Bạn cần lấy bài hát hiện đang phát cho bài hát đầu tiên trong danh sách phát
const setPlayButtonAccessibleText = () => {
  //Bạn cần lấy bài hát hiện đang phát hoặc bài hát đầu tiên trong danh sách phát.
  const song = userData?.currentSong || userData?.songs[0];
  playButton.setAttribute(
    "aria-label",
    song.title ? `Play ${song.title}` : "Play"
  );
};

const shuffle = () => {
  /* Xáo trộn bằng toán ngẫu nhiên */
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;

  renderSong(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

/* sử dụng phương thức fillter để xoá id */
const deleteSong = (id) => {
  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSong(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();
  /* Trước khi xóa một bài hát, 
  bạn cần kiểm tra xem bài hát đó có đang phát hay không.
  Nếu đúng như vậy, bạn cần tạm dừng bài hát
   và phát bài hát tiếp theo trong danh sách phát. */
  if (userData?.currentSong.id === id) {
    //nếu trùng khớp thì đặt
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
  }
  //bạn cần kiểm tra xem danh sách phát có trống không
  //nếu đúng như vậy, bạn nên đặt lại đối tượng userData
  //về trạng thái ban đầu.
  if (userData?.songs.length === 0) {
    //Nếu danh sách phát trống, bạn cần tạo một resetButton element
    // createElement() là 1 DOM cho bạn tạo 1 element;
    const resetButton = document.createElement("button");
    // createTextNode() là 1 văn bản được tạo
    const resetText = document.createTextNode("Reset Playlist");

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    //Bạn cần thêm resetText vào resetButton và cả resetButton
    // cho phần tử danh sách playlistSongs
    // sử dụng appendChild()
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);
    resetButton.addEventListener("click",deleteSong)
    //Để đặt lại danh sách phát về trạng thái ban đ
    //đầu, hãy trải tất cả các Bài hát thành một mảng và gán nó cho
    resetButton.addEventListener('click',() => {
      userData?.songs = [...allSongs];
    })
  }
};


shuffleButton.addEventListener("click", shuffle);
playButton.addEventListener("click", () => {
  if (userData?.currentSong === null) {
    /* kiểm tra lúc nào khi người dùng nhấp */
    playSong(userData?.songs[0].id);
  } else {
    //khi đang hát nhấp về lại nó quay lại
    playSong(userData?.currentSong.id);
  }
});
previousButton.addEventListener("click", playPreviousSong);
nextButton.addEventListener("click", playNextSong);
pauseButton.addEventListener("click", pauseSong);
