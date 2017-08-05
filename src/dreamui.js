function DreamUI() {
    this.openBackhider = function (onClick) {
        var backhider = document.createElement("div");
        if (document.getElementsByClassName("backhider").length < 0) {
            backhider = document.createElement("div");
        } else {
            document.getElementsByClassName("backhider")[0];
        }
        backhider.className = "dream backhider";

        document.body.appendChild(backhider);
        setTimeout(function () {
            backhider.classList.add("open");
        }, 100);

        backhider.addEventListener("click", function () {
            onClick();
        });

        return backhider;
    }
    this.closeBackhider = function (backhider) {
        if (backhider == undefined) {
            if (document.getElementsByClassName("backhider")[0] != undefined) {
                document.getElementsByClassName("backhider")[0].classList.remove("open");

                setTimeout(function () {
                    document.getElementsByClassName("backhider")[0].outerHTML = "";
                }, 800);
            }
        } else {
            backhider.classList.remove("open");
            setTimeout(function () {
                backhider.outerHTML = "";
            }, 800);
        }
    }
    //opens prompt

    this.prompt = function (message, text, okayText, callback) {
        var promptElement = document.createElement("div");
        promptElement.style.zIndex = "1001";
        promptElement.className = "dream prompt";
        var promptMessageElement = document.createElement("div");
        var promptInputElement = document.createElement("input");
        var promptButtonElement = document.createElement("div");
        promptMessageElement.innerHTML = message;
        promptMessageElement.classList.add("text");
        promptInputElement.value = text;
        promptButtonElement.className = "dream button fluid";
        promptButtonElement.innerHTML = okayText;
        promptInputElement.className = "dream input fluid";
        promptElement.appendChild(promptMessageElement);
        promptElement.appendChild(promptInputElement);
        promptElement.appendChild(promptButtonElement);
        document.body.appendChild(promptElement);

        var backhider;
        backhider = this.openBackhider(function () {
            promptElement.classList.remove("open");
            new DreamUI().closeBackhider(backhider);
        });

        setTimeout(function () {
            promptElement.classList.add("open");
        }, 100);
        var ret = "";
        promptButtonElement.addEventListener("click", function () {
            promptElement.classList.remove("open");
            setTimeout(function () {
                promptElement.outerHTML = ""
            }, 500);
            new DreamUI().closeBackhider();
            callback(promptInputElement.value);
        });
    }

    this.message = function (title, message, okayText, onDone) {
        var promptElement = document.createElement("div");
        promptElement.style.zIndex = "1001";
        promptElement.className = "dream prompt";
        var promptTitleElement = document.createElement("div");
        var promptMessageElement = document.createElement("div");
        var promptButtonElement = document.createElement("div");
        promptMessageElement.innerHTML = message;
        promptMessageElement.classList.add("text");
        promptTitleElement.classList.add("title");
        promptTitleElement.innerHTML = title;
        promptButtonElement.className = "dream button fluid";
        promptButtonElement.innerHTML = okayText;
        if (okayText == undefined) {
            promptButtonElement.innerHTML = "Okay";
        }
        promptElement.appendChild(promptTitleElement);

        promptElement.appendChild(promptMessageElement);
        promptElement.appendChild(promptButtonElement);
        document.body.appendChild(promptElement);

        var backhider;
        backhider = this.openBackhider(function () {
            promptElement.classList.remove("open");
            new DreamUI().closeBackhider(backhider);
        });

        setTimeout(function () {
            promptElement.classList.add("open");
        }, 100);
        var ret = "";
        promptButtonElement.addEventListener("click", function () {
            if (onDone != undefined)
                onDone();
            promptElement.classList.remove("open");
            setTimeout(function () {
                promptElement.outerHTML = ""
            }, 500);
            new DreamUI().closeBackhider();
        });
    }

    this.ask = function (title, message, yesText,noText, onDone) {
        var promptElement = document.createElement("div");
        promptElement.style.zIndex = "1001";
        promptElement.className = "dream prompt";
        var promptTitleElement = document.createElement("div");
        var promptMessageElement = document.createElement("div");
        promptMessageElement.innerHTML = message;
        promptMessageElement.classList.add("text");
        promptTitleElement.classList.add("title");
        promptTitleElement.innerHTML = title;
        var promptButtonYesElement = document.createElement("button");
        promptButtonYesElement.className = "dream button halfWidth";

        promptButtonYesElement.innerHTML = yesText;
        var promptButtonNoElement = document.createElement("button");
        promptButtonNoElement.className = "dream button halfWidth";

        promptButtonNoElement.innerHTML = noText;



        var buttonContainer = document.createElement("div");
        if (yesText == undefined) {
            promptButtonYesElement.innerHTML = "Yes";
        }
        if (noText == undefined) {
            promptButtonNoElement.innerHTML = "No";
        }
        promptElement.appendChild(promptTitleElement);

        promptElement.appendChild(promptMessageElement);
        promptElement.appendChild(promptButtonNoElement);
        promptElement.appendChild(promptButtonYesElement);

        
        document.body.appendChild(promptElement);
        var backhider;
        backhider = this.openBackhider(function () {
        });

        setTimeout(function () {
            promptElement.classList.add("open");
        }, 100);
        var ret = "";
        promptButtonYesElement.addEventListener("click", function () {
            if (onDone != undefined)
                onDone(true);
            promptElement.classList.remove("open");
            setTimeout(function () {
                promptElement.outerHTML = ""
            }, 500);
            new DreamUI().closeBackhider();
        });

        promptButtonNoElement.addEventListener("click", function () {
            if (onDone != undefined)
                onDone(false);
            promptElement.classList.remove("open");
            setTimeout(function () {
                promptElement.outerHTML = ""
            }, 500);
            new DreamUI().closeBackhider();
        });
    }
}
