const soundsElement = document.querySelector("#sounds");

(async () => {
  const sounds = await getSounds();
  addSoundsToPage(sounds);
})();

async function getSounds() {
  const response = await fetch("./sounds.json");
  const json = await response.json();
  return json;
}
let prevplayer;

function addSoundsToPage(sounds) {
  sounds.forEach((sound) => {
    const soundDiv = document.createElement("div");
    soundDiv.className = "sound";
    const soundTitle = document.createElement("h2");
    soundTitle.textContent = sound.title;
    soundDiv.appendChild(soundTitle);

    const player = document.createElement("audio");
    player.setAttribute("src", `sounds/${sound.src}`);
    soundDiv.appendChild(player);

    soundDiv.addEventListener("mousedown", () => {
      soundDiv.style.backgroundColor = "lightgray";
      if (prevplayer) prevplayer.pause();
      player.currentTime = 0;
      player.play();
      prevplayer = player;
    });

    soundDiv.addEventListener("mouseup", () => {
      soundDiv.style.backgroundColor = "";
    });

    soundsElement.appendChild(soundDiv);
  });
}
