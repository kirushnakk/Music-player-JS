const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistUI = document.getElementById("playlist");

const songs = [
  {
    title: "Relaxing Beat",
    artist: "DJ Calm",
    src: "song1.mp3",
    cover: "cover1.jpg"
  },
  {
    title: "Chill Vibes",
    artist: "LoFi Boy",
    src: "song2.mp3",
    cover: "cover2.jpg"
  },
  {
    title: "Morning Energy",
    artist: "RiseUp",
    src: "song3.mp3",
    cover: "cover3.jpg"
  }
];

let current = 0;

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.innerText = song.title;
  artist.innerText = song.artist;
  cover.src = song.cover;
  playPauseBtn.innerText = "▶️";
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerText = "⏸";
  } else {
    audio.pause();
    playPauseBtn.innerText = "▶️";
  }
}

function nextSong() {
  current = (current + 1) % songs.length;
  loadSong(current);
  audio.play();
  playPauseBtn.innerText = "⏸";
}

function prevSong() {
  current = (current - 1 + songs.length) % songs.length;
  loadSong(current);
  audio.play();
  playPauseBtn.innerText = "⏸";
}

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("loadedmetadata", () => {
  durationEl.innerText = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

function updateProgress() {
  if (!isNaN(audio.duration)) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent;
    currentTimeEl.innerText = formatTime(audio.currentTime);
    durationEl.innerText = formatTime(audio.duration);
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

// Load playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.title + " – " + song.artist;
  li.onclick = () => {
    current = index;
    loadSong(current);
    audio.play();
    playPauseBtn.innerText = "⏸";
  };
  playlistUI.appendChild(li);
});

// Initialize
loadSong(current);
