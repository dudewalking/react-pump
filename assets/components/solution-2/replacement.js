export let DataCheck = (function () {

    const wrongStates = [
        "10000",
        "10001",
        "10010",
        "10011",
        "10100",
        "10101",
        "10110",
        "10111",
        "11000",
        "11001",
        "11010",
        "11100",
        "11101",
        "11110",
        "11111"
    ];


    let checkState = function (currentState) {

        let objState = true;
        let markerColor = true;

        wrongStates.forEach((wrongState) => {
            if (wrongState === currentState) {
			    console.log(wrongState + " = " + currentState);
                objState = false;
                markerColor = false;
            }
        });

        return {
            objState: objState,
            markerColor: markerColor
        };
    };

    return {
        check: checkState,
    };
})();