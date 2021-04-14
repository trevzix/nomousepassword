// List of allowed characters for each of the checkbox label buttons
const characterGroups = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~",
};

const inputBox = document.getElementById("inputbox");
const outputBox = document.getElementById("outputbox");

inputBox.addEventListener("keypress", (x) => {
  if (x.key == "Enter" && inputBox.value.split(" ").length > 1) {
    // Reset the value of outputValue everytime enter is pressed
    let outputValue = "";

    // grab first and second argument
    const firstArgument = inputBox.value.split(" ")[0];
    const secondArgument = inputBox.value.split(" ")[1];

    // check it's validity
    if (!firstArgumentValidity(firstArgument)) {
      console.log("first argument is invalid");
    }
    if (!secondArgumentValidity(secondArgument)) {
      console.log("second argument is invalid");
    }

    const lengthSyntaxes = {
      s: 6,
      m: 12,
      l: 24,
      x: 48,
    };

    const outputLength =
      parseInt(secondArgument) <= 128
        ? parseInt(secondArgument)
        : lengthSyntaxes[secondArgument];

    const dividedBy = Math.floor(outputLength / firstArgument.length);

    // loop through each letter inside of firstArgument
    firstArgument.split("").forEach((x) => {
      if (x === "n" || x === "d") {
        for (let y = 0; y < dividedBy; y++) {
          outputValue +=
            characterGroups.numbers[indexRandomizer(characterGroups.numbers)];
        }
      }
      if (x === "l") {
        for (let y = 0; y < dividedBy; y++) {
          outputValue +=
            characterGroups.lowercase[
              indexRandomizer(characterGroups.lowercase)
            ];
        }
      }
      if (x === "u") {
        for (let y = 0; y < dividedBy; y++) {
          outputValue +=
            characterGroups.uppercase[
              indexRandomizer(characterGroups.uppercase)
            ];
        }
      }
      if (x === "s" || x === "p") {
        for (let y = 0; y < dividedBy; y++) {
          outputValue +=
            characterGroups.symbols[indexRandomizer(characterGroups.symbols)];
        }
      }
    });

    // Sometimes the value of the variable password will not match the length that we need, in that case we create a while loop that randomly grabs value from one of the labelBtnsToggled and adds to password until it's length is the same as the variable length.

    while (outputValue.length != outputLength) {
      const characterGroupsProps = [
        "lowercase",
        "uppercase",
        "numbers",
        "symbols",
      ];
      // randomProp will choose between one of the values of the array above
      let randomProp =
        characterGroupsProps[indexRandomizer(characterGroupsProps)];
      // Now lets grab the value by looking at the object characterGroups
      let randomPropValue = characterGroups[randomProp];

      outputValue += randomPropValue[indexRandomizer(randomPropValue)];
    }

    outputBox.value = shuffleString(outputValue);
  }
});

function indexRandomizer(x) {
  return Math.floor(Math.random() * x.length);
}

// check the validity of firstArgument
// return true if the argument is validy else false
function firstArgumentValidity(x) {
  const acceptedChars = "dlnsu";
  const check = x
    .split("")
    .map((x) => acceptedChars.includes(x))
    .filter((x) => x === false);
  if (check.length > 0) {
    return false;
  }
  return true;
}

// check the validity of secondArgument
// return true if the argument is validy else false
function secondArgumentValidity(x) {
  if (parseInt(x) <= 128) {
    return true;
  }

  if (x.length > 1) {
    return false;
  }

  const acceptedChars = "lmsx";
  const check = x
    .split("")
    .map((x) => acceptedChars.includes(x))
    .filter((x) => x === false);
  if (check.length > 0) {
    return false;
  }
  return true;
}

function shuffleString(x) {
  let xResult = x.split(""); // turn string into array
  for (let i = xResult.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = xResult[i];
    xResult[i] = xResult[j];
    xResult[j] = temp;
  }
  return xResult.join("");
}

// ==================================

// Hotkeys

document.addEventListener("keydown", (x) => {
  if (x.ctrlKey && x.key === "y") {
    const message = document.querySelector(".inputs__message");

    message.classList.remove("show");

    outputBox.select();
    document.execCommand("copy");

    message.classList.add("show");

    inputBox.focus();

    setTimeout(() => {
      message.classList.remove("show");
    }, 2500);
  }

  if (x.ctrlKey && x.key === "i") {
    inputBox.focus();
    window.location.hash = "inputs";
  }
});

// ==================================

// 3. Nav links

const links = document.querySelectorAll(".links");

links.forEach((link) => {
  link.addEventListener("click", (x) => {
    if (link.innerHTML == "Instructions") {
      window.location.hash = "instructions";
    }
    if (link.innerHTML == "Syntax") {
      window.location.hash = "syntax";
    }
    if (link.innerHTML == "Hotkeys") {
      window.location.hash = "hotkeys";
    }
  });
});

// ==================================

// 4. Scroll to top  button

scrollTop = document.querySelector(".scroll-top");

// When the user scrolls down 400px from the top of the document, show the button
window.onscroll = () => {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    scrollTop.style.display = "block";
  } else {
    scrollTop.style.display = "none";
  }
};
