export let Algorithm = (function () {

    let calculate = function (controller, controllers) {

        switch (controller) {
        case "five": {
            if (!(controllers[0].isOpen && controllers[1].isOpen && controllers[2].isOpen && controllers[3].isOpen )) {
                console.log("opened 5");
                break;
            } else {
                console.log("must be closed 5");
                break;
            }
        }
        case "four": {
            if (!(controllers[0].isOpen && controllers[1].isOpen && controllers[2].isOpen) && controllers[4].isOpen) {
                console.log("opened 4");
                break;
            } else {
                console.log("must be closed 4");
                break;
            }
        }
        case "two": {
            if (!(controllers[0].isOpen && controllers[2].isOpen)  && controllers[3].isOpen && controllers[4].isOpen) {
                console.log("opened 2");
                break;
            } else {
                console.log("must be closed 2");
                break;
            }
        }
        case "three": {
            if (!controllers[0].isOpen && controllers[1].isOpen && controllers[3].isOpen && controllers[4].isOpen) {
                console.log("opened 3");
                break;
            } else {
                console.log("must be closed 3");
                break;
            }
        }
        case "one": {
            if (controllers[1].isOpen && !controllers[2].isOpen && controllers[3].isOpen && controllers[4].isOpen) {
                console.log("opened 1");
                break;
            } else {
                console.log("must be closed 1");
                break;
            }
        }
        default:
            console.log("no activity");
        }

    };

    return {
        calculate: calculate,
    };

})();



