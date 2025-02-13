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

let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};
const audio = new Audio();

const playSong = (id) => {
  const songs = userData?.songs.find((song) => song.id === id);
  audio.title = songs.title;
  audio.src = songs.src;

  if (
    userData?.currentSong === null ||
    userData?.currentSong?.id !== songs.id
  ) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = songs;
  playButton.classList.add("playing");
  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
};

const pause = () => {
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove("playing");
  audio.pause();
};

const nextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const songNext = userData?.songs[currentSongIndex + 1];
    playSong(songNext.id);
  }
};

const previousSong = () => {
  if (userData?.currentSong === null) return;
  else {
    const currentSongIndex = getCurrentSongIndex();
    const previous = userData?.songs[currentSongIndex - 1];
    playSong(previous.id);
  }
};

// click theo content 1
const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );
  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });
  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
};
// hiển thị title bài hát 1
const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;
  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

//điều đầu tiên quan trọng là phải hiển thị title bài hát khi
// user chưa có click vào bài hát nào 2

const setPlayButtonAccessibleText = () => {
  // bài hát có hiện tại đang hát or bản đầu tiên

  const songs = userData?.currentSong || userData?.songs[0];
  playButton.setAttribute(
    "aria-label",
    songs?.title ? `Play ${songs.title}` : "Play"
  );
};
// xáo trộn và thực hiện cập nhận quản lý sau khi xáo trộn 3
const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;
  // Bạn cũng nên kết xuất lại các bài hát, tạm dừng bài hát hiện đang phát,
  // đặt hiển thị trình phát và đặt lại văn bản có thể truy cập vào nút phát.
  renderSong(userData?.songs);
  pause();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

// xoá bài hát 4
const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    // khi 1 bài hát đang phát ta phải xoá bài đó ln
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pause();
    setPlayerDisplay();
  }
  // khi xoá
  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSong(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();
  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];

      renderSong(sortSongs());
      setPlayButtonAccessibleText();
      resetButton.remove();
    });
  }
};

// tất cả các chức năng cốt lõi hiện đã có sẵn . vấn đề là khi hát kết thúc
// lại không qua bài khác
audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

  if (nextSongExists) {
    nextSong();
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;

    pause();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
});
const renderSong = () => {
  const songsHTML = userData.songs
    .map((song) => {
      return ` <li id="song-${song.id}" class="playlist-song">
      
    <button class="playlist-song-info" onclick="playSong(${song.id})">
       <span class="playlist-song-title">${song.title}</span>
       <span class="playlist-song-artist">${song.artist}</span>
       <span class="playlist-song-duration">${song.duration}</span>
      </button>
      
      <button class="playlist-song-delete" onclick="deleteSong(${song.id})" arial-label="Delete ${song.title}>
      
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

const getCurrentSongIndex = () =>
  userData?.songs.indexOf(userData?.currentSong);

playButton.addEventListener("click", () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong?.id);
  }
});
pauseButton.addEventListener("click", pause);

nextButton.addEventListener("click", nextSong);

previousButton.addEventListener("click", previousSong);

shuffleButton.addEventListener("click", shuffle);

const sortSongs = () => {
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
};
renderSong(sortSongs());
