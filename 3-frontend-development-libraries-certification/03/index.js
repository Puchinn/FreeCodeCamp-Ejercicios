import { buttons } from "./consts.js";

$(document).ready(() => {
  buttons.forEach((button) => {
    $("#buttons").append(`
      <button class="drum-pad btn btn-outline-primary" type="button" id=${button.name}>
      ${button.id}
      <audio class="clip" id="${button.id}" src="${button.src}" />
      </button>
      `);
  });

  $("#buttons").css({
    display: "grid",
    "grid-template-columns": "60px 60px 60px",
    gap: "10px",
  });

  $("button").each((i, ele) => {
    ele.onclick = () => {
      const id = ele.querySelector("audio").getAttribute("id");
      playAudio(id);
      setToDisplay(removeSlash(ele.id));
    };
  });

  $("audio").each((i, element) => {
    element.volume = $("input[type|=range]")[0].value / 100;
  });
});

$(document).keypress((e) => {
  const selectedKey = e.key.toUpperCase();
  const selectedButton = buttons.find((b) => b.id === selectedKey);
  if (selectedButton) {
    setToDisplay(removeSlash(selectedButton.name));
    playAudio(selectedKey);
  }
});

$("input[type|=range]").on("input", (e) => {
  setToDisplay(`volume: ${e.target.value}`);
  $("audio").each((i, ele) => {
    ele.volume = e.target.value / 100;
  });
});

function playAudio(id) {
  $(`#${id}`)[0].currentTime = 0;
  $(`#${id}`)[0].play();
}

function setToDisplay(text) {
  $("#display").html(text);
}

function removeSlash(text) {
  const formattedText = text.replaceAll("-", " ");
  return formattedText;
}

$("input[type|=checkbox]").on("change", (e) => {
  if (e.target.checked) {
    unmuteAudios();
  } else {
    muteAudios();
  }
});

function muteAudios() {
  $("audio").each((i, element) => {
    element.muted = true;
  });
}

function unmuteAudios() {
  $("audio").each((i, element) => {
    element.muted = false;
  });
}
