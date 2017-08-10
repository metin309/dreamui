function DreamUI() {
    this.Dropdown = function () {
        document.querySelectorAll(".dream.dropdown").forEach(function (element) {
            var data = new Array();

            data = element.querySelectorAll(".data")[0].querySelectorAll(".item");
            console.log(element.offsetTop);

            if (element.querySelector(".active") != undefined) {
                element.querySelector(".active").innerHTML = data[0].innerHTML;
            } else {
                var active = document.createElement("div");
                active.className = "active"
                active.innerHTML = data[0].innerHTML;
                element.appendChild(active);
            }
            element.addEventListener("click", function () {
                var drop = document.createElement("div");
                drop.className = "dream drop flat";
                drop.style.top = (element.offsetTop + element.clientHeight + 4) + "px";
                drop.style.left = element.offsetLeft + "px";

                data.forEach(function (dataItem) {
                    var item = document.createElement("div");
                    item.className = "dream dropitem";
                    item.innerHTML = dataItem.innerHTML;
                    drop.appendChild(item);
                    item.addEventListener("click", function () {
                        if (element.querySelector(".active") != undefined) {
                            element.getElementsByClassName("active")[0].innerHTML = dataItem.innerHTML;

                            if (dataItem.getAttribute("value") != undefined) {
                                element.setAttribute("value", dataItem.getAttribute("value"));
                            }
                        } else {
                            var active = document.createElement("div");
                            active.className = "active"

                            active.innerHTML = dataItem.innerHTML;
                            element.appendChild(active);

                            if (dataItem.getAttribute("value") != undefined) {
                                element.setAttribute("value", dataItem.getAttribute("value"));
                            }
                        }
                    });

                });
                window.addEventListener("click", function (event) {
                    if (!element.contains(event.target) || (event.target == element && drop.classList.contains("open"))) {
                        drop.classList.remove("open");
                        setTimeout(function () {
                            drop.outerHTML = "";
                        }, 800);
                    }
                });
                document.body.appendChild(drop);
                setTimeout(function () {
                    drop.classList.add("open");
                }, 100);
            });
        });
    }

    this.openPanel = function (settings, panel) {
        var position;
        if (panel.classList.contains("left")) {
            position = "left";
        }
        if (panel.classList.contains("right")) {
            position = "right";
        }
        if (panel.classList.contains("top")) {
            position = "top";
        }
        if (panel.classList.contains("bottom")) {
            position = "bottom";
        }

        var page = document.querySelector(".dream.page");
        switch (position) {
            case "left":
                panel.classList.add("open");
                page.style.cssText += "margin-left:15%;";
                console.log("a");
                break;
            case "top":
                panel.classList.add("open");
                page.style.cssText += "margin-top:7%;";
                console.log("a");
                break;
            case "right":
                panel.classList.add("open");
                page.style.cssText += "margin-right:15%;";
                console.log("a");
                break;
            case "bottom":
                panel.classList.add("open");
                page.style.cssText += "margin-bottom:7%;";
                console.log("a");
                break;
        }
        if (settings.backhider == true) {
            new DreamUI().openBackhider(function () {
                new DreamUI().closeBackhider();
                new DreamUI().closePanel(panel);
            });
        }
    }
    this.closePanel = function (panel) {
        var position;
        if (panel.classList.contains("left")) {
            position = "left";
        }
        if (panel.classList.contains("right")) {
            position = "right";
        }
        if (panel.classList.contains("top")) {
            position = "top";
        }
        if (panel.classList.contains("bottom")) {
            position = "bottom";
        }

        var page = document.querySelector(".dream.page");
        switch (position) {
            case "left":
                panel.classList.remove("open");
                page.style.cssText += "margin-left:0;";
                console.log("a");
                break;
            case "top":
                panel.classList.remove("open");
                page.style.cssText += "margin-top:0;";
                console.log("a");
                break;
            case "right":
                panel.classList.remove("open");
                page.style.cssText += "margin-right:0;";
                console.log("a");
                break;
            case "bottom":
                panel.classList.remove("open");
                page.style.cssText += "margin-bottom:0;";
                console.log("a");
                break;
        }

    }
    this.togglePanel = function (settings, panel) {
        if (panel.classList.contains("open")) {
            new DreamUI().closePanel(panel);
        } else {
            new DreamUI().openPanel(settings, panel);
        }
    }
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
                document.querySelectorAll(".backhider").forEach(function (backhider) {
                    backhider.classList.remove("open");
                });
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

    this.prompt = function (settings, callback) {
        var promptElement = document.createElement("div");
        if (settings.position == undefined) {
            settings.position = "top";
        }
        promptElement.style.zIndex = "1001";
        promptElement.className = "dream prompt " + settings.position;
        var promptMessageElement = document.createElement("div");
        var promptInputElement = document.createElement("input");
        var promptButtonElement = document.createElement("div");
        promptMessageElement.innerHTML = settings.message;
        promptMessageElement.classList.add("text");
        promptInputElement.value = settings.value;
        promptButtonElement.className = "dream button fluid";
        promptButtonElement.innerHTML = settings.buttonText;
        promptInputElement.className = "dream input fluid";
        promptElement.appendChild(promptMessageElement);
        promptElement.appendChild(promptInputElement);
        promptElement.appendChild(promptButtonElement);
        document.body.appendChild(promptElement);

        var backhider;
        backhider = this.openBackhider(function () {
            promptElement.classList.remove("open");
            new DreamUI().closeBackhider(backhider);
            setTimeout(function () {
                promptElement.outerHTML = "";
            }, 500);
        });

        setTimeout(function () {
            promptElement.classList.add("open");
        }, 100);
        var ret = "";
        promptButtonElement.addEventListener("click", function () {
            promptElement.classList.remove("open");
            setTimeout(function () {
                promptElement.outerHTML = "";
            }, 500);
            new DreamUI().closeBackhider();
            callback(promptInputElement.value);
        });
    }

    this.message = function (settings, onDone) {
        var promptElement = document.createElement("div");
        if (settings.position == undefined) {
            settings.position = "top";
        }
        promptElement.style.zIndex = "1001";
        promptElement.className = "dream message " + settings.position;
        var promptTitleElement = document.createElement("div");
        var promptMessageElement = document.createElement("div");
        var promptButtonElement = document.createElement("div");
        promptMessageElement.innerHTML = settings.message;
        promptMessageElement.classList.add("text");
        promptTitleElement.classList.add("title");
        promptTitleElement.innerHTML = settings.title;
        promptButtonElement.className = "dream button fluid";
        promptButtonElement.innerHTML = settings.buttonText;
        if (settings.buttonText == undefined) {
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

    this.ask = function (settings, onDone) {
        var promptElement = document.createElement("div");
        if (settings.position == undefined) {
            settings.position = "top";
        }
        promptElement.style.zIndex = "1001";
        promptElement.className = "dream prompt " + settings.position;
        var promptTitleElement = document.createElement("div");
        var promptMessageElement = document.createElement("div");
        promptMessageElement.innerHTML = settings.message;
        promptMessageElement.classList.add("text");
        promptTitleElement.classList.add("title");
        promptTitleElement.innerHTML = settings.title;
        var promptButtonYesElement = document.createElement("button");
        promptButtonYesElement.className = "dream button halfWidth";

        promptButtonYesElement.innerHTML = settings.yesButtonText;
        var promptButtonNoElement = document.createElement("button");
        promptButtonNoElement.className = "dream button halfWidth";

        promptButtonNoElement.innerHTML = settings.noButtonText;



        var buttonContainer = document.createElement("div");
        if (settings.yesButtonText == undefined) {
            promptButtonYesElement.innerHTML = "Yes";
        }
        if (settings.noButtonText == undefined) {
            promptButtonNoElement.innerHTML = "No";
        }
        promptElement.appendChild(promptTitleElement);

        promptElement.appendChild(promptMessageElement);
        promptElement.appendChild(promptButtonNoElement);
        promptElement.appendChild(promptButtonYesElement);


        document.body.appendChild(promptElement);
        var backhider;
        backhider = this.openBackhider(function () {});

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

    //dialog
    this.openDialog = function (dialogElement) {
        dialogElement.classList.add("open");
        dialogElement.style.zIndex = "1001";

        console.log(dialogElement.clientHeight);
        if (!dialogElement.classList.contains("top") && !dialogElement.classList.contains("bottom") && !dialogElement.classList.contains("right") && !dialogElement.classList.contains("left"))
            dialogElement.style.cssText += "top:calc( 50% - " + (dialogElement.clientHeight) + "px )!important;";
        console.log(dialogElement.clientTop);

        var backhider;
        backhider = this.openBackhider(function () {
            dialogElement.classList.remove("open");
            new DreamUI().closeBackhider();
        });
    }
    this.closeDialog = function (dialogElement) {
        dialogElement.classList.remove("open");
        new DreamUI().closeBackhider();
    }



    //helpbar
    this.helpbar = function (settings, onButtonClick) {
        if (settings.position == undefined) {
            settings.position = "bottom";
        }
        if (settings.buttonText == undefined) {
            settings.buttonText = "DONE";
        }
        if (settings.duration == undefined) {
            settings.duration = 3200;
        }
        var helpbar = document.createElement("div");
        helpbar.className = "dream helpbar"
        var doneButton = document.createElement("button");
        doneButton.className = "dream transparent secondary flat button right-floating";
        doneButton.innerHTML = settings.buttonText;
        var message = document.createElement("span");
        message.className = "left-floating";
        message.innerHTML = settings.message;

        helpbar.appendChild(doneButton);
        helpbar.appendChild(message);

        if (settings.position == "bottom") {
            helpbar.classList.add("bottom");
        } else {
            helpbar.classList.add("top");
        }

        if (document.querySelectorAll(".dream.helpbar").length > 0) {
            var int;
            int = setInterval(function () {
                if (document.querySelectorAll(".dream.helpbar").length == 0) {
                    document.body.appendChild(helpbar);
                    clearInterval(int);
                    setTimeout(function () {
                        if (settings.duration != "infinite") {
                            helpbar.style.cssText += "animation-fill-mode: backwards;";
                            setTimeout(function () {
                                helpbar.outerHTML = "";
                            }, 400);
                        }
                    }, settings.duration);
                }
            }, 200);
        } else {
            document.body.appendChild(helpbar);

            setTimeout(function () {
                if (settings.duration != "infinite") {
                    helpbar.style.cssText += "animation-fill-mode: backwards;";
                    setTimeout(function () {
                        helpbar.outerHTML = "";
                    }, 400);
                }
            }, settings.duration);
        }

        doneButton.addEventListener("click", function () {
            if (onButtonClick != undefined) {
                onButtonClick();
            }
            helpbar.style.cssText += "animation-fill-mode: backwards;";
            setTimeout(function () {
                helpbar.outerHTML = "";
            }, 400);
            helpbar.style.cssText += "animation-fill-mode: backwards;";
            setTimeout(function () {
                helpbar.outerHTML = "";
            }, 400);

        });
    }
}
