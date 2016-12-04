export let Algorithm = (function () {

	let isSafe = false;
	let isCorrectOpen = false;
	let isOpen = false;
	let status = "Not active";
	let markerColor = "state-def";

	let calculate = function (controller, controllers, isOpened) {

		switch (controller) {
		case "five": {
			if (!(controllers[0].isOpen && controllers[1].isOpen && controllers[2].isOpen && controllers[3].isOpen )) {
				this.status = isOpened ? "opened 5" : "closed 5";
				this.markerColor = isOpened ? "state-safe" : "state-def";
				this.isCorrectOpen = isOpened;
				break;

			} else {
				this.status = "must be closed 5";
				this.markerColor = isOpened ? "state-danger" : "state-def";
				this.isCorrectOpen = false;
				break;

			}
		}
		case "four": {
			if (!(controllers[0].isOpen && controllers[1].isOpen && controllers[2].isOpen) && controllers[4].isOpen) {
				this.status = isOpened ? "opened 4" : "closed 4";
				this.markerColor = isOpened ? "state-safe" : "state-def";
				this.isCorrectOpen = isOpened;
				break;

			} else {
				this.status = "must be closed 4";
				this.markerColor = isOpened ? "state-danger" : "state-def";
				this.isCorrectOpen = false;
				break;

			}
		}
		case "two": {
			if (!controllers[0].isOpen && !controllers[2].isOpen && controllers[3].isOpen && controllers[4].isOpen) {
				this.status = isOpened ? "opened 2" : "closed 2";
				this.markerColor = isOpened ? "state-safe" : "state-def";
				this.isCorrectOpen = isOpened;
				break;

			} else {
				this.status = "must be closed 2";
				this.markerColor = isOpened ? "state-danger" : "state-def";
				this.isCorrectOpen = false;
				break;

			}
		}
		case "three": {
			if (!controllers[0].isOpen && !controllers[1].isOpen && controllers[3].isOpen && controllers[4].isOpen) {
				this.status = "must be closed 3";
				this.markerColor = isOpened ? "state-danger" : "state-def";
				this.isCorrectOpen = false;
				break;
			}
            else {
                this.status = "must be closed 3";
                this.markerColor = isOpened ? "state-danger" : "state-def";
                this.isCorrectOpen = false;
                break;
            }
		}
		case "one": {
			if (controllers[0].isOpen && controllers[1].isOpen && !controllers[2].isOpen && controllers[3].isOpen && controllers[4].isOpen) {
				this.isSafe = true;
				this.status = isOpened ? "opened 1" : "closed 1";
				this.markerColor = isOpened ? "state-safe" : "state-def";
				this.isCorrectOpen = isOpened;
				break;

			} else {
				this.status = "must be closed 1";
				this.markerColor = isOpened ? "state-danger" : "state-def";
				this.isCorrectOpen = false;
				break;

			}
		}
		default:
			console.log("no activity");
		}
	};

	return {
		calculate: calculate,
		isSafe: isSafe,
		isCorrectOpen: isCorrectOpen,
		isOpen: isOpen,
		status: status,
		markerColor: markerColor
	};

})();



