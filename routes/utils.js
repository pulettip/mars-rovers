var utils = {};
var limit_x, limit_y;

const directionArray = ['N', 'E', 'S', 'W'];

const between = (num, a, b) => num >= a && num <= b;

const validCoordinates = (x, y) => !Number.isNaN(x) && !Number.isNaN(y) && x >= 0 && y >= 0;

const getNumbers = (x, y) => [Number(x), Number(y)];

const controlPosition = (x, y) => between(x, 0, limit_x) && between(y, 0, limit_y);

const rotate = (mov, dir) => {
    let index = directionArray.indexOf(dir);
    if (mov == 'R') index++;
    else index--;
    index = index > 3 ? 0 : index < 0 ? 3 : index;
    return directionArray[index];
};

const EstablishGrid = (coordinates) => {
    let coord_array = coordinates.split(' ');
    if (coord_array.length != 2) return "Error - Unexpected value for coordinates";
    let [x, y] = coord_array;
    if (!validCoordinates(x, y)) return "Wrong values for coordinates x: " + x + " - y: " + y;
    return getNumbers(x, y);
};

const processMovementsRover = (initial_position, movements) => {
    const buildResponse = (journey, error, success=false, result=null) => {
        return {
            success: success,
            result: result,
            journey: journey,
            error: error
        };
    };
    
    const init_array = initial_position.split(' ');
    const mov_array = movements.split('');
    let x = 0, y = 0, coord, dir, mov, journey_array = [];
    
    if (init_array.length != 3) return buildResponse([], "Error - Unexpected value for initial position");
    [x, y, dir] = init_array;
    
    if (!validCoordinates(x, y)) return buildResponse([], "Error - Wrong values for coordinates x: " + x + " - y: " + y);
    
    [x, y] = getNumbers(x, y);
    if (!controlPosition(x, y)) return buildResponse(journey_array, "Error - Initial position outside of limits: x: " + x + " - y: " + y);

    dir = dir.toUpperCase();
    if (directionArray.indexOf(dir) < 0) return buildResponse(journey_array, "Error - Unexpected value {" + dir + "} for initial direction");
    
    journey_array.push([x, y, dir]);
    
    for (var i = 0; i < mov_array.length; i++) {
        mov = mov_array[i].toUpperCase();
        if (mov == 'R' || mov == 'L') dir = rotate(mov, dir);
        else if (mov == 'M') {
            if (dir == 'N') y++;
            else if (dir == 'E') x++;
            else if (dir == 'S') y--;
            else if (dir == 'W') x--;
        } else return buildResponse(journey_array, "Error - Unexpected value {" + mov + "} in Movement number " + (i+1).toString());
        
        journey_array.push([x, y, dir, mov]);
        if (!controlPosition(x, y)) return buildResponse(journey_array, "Error - Rover position outside of limits after movement number " + (i+1).toString() + ": x: " + x + " - y: " + y);
    }
    
    return buildResponse(journey_array, null, true, [x, y, dir]);
};

utils.processStringInput = (input) => {
    if (typeof input !== 'string') return {error: "Error - Input should be a string", success: false, input: input};

    let inputs = input.split('\n');
    inputs = inputs.map(elem => elem.trim());           // Remove spaces in lines that could affect results
    
    try {
        const resp = EstablishGrid(inputs[0]);
        if (!Array.isArray(resp)) return {error: resp, success: false, input: input};
        [limit_x, limit_y] = resp;
    }
    catch (e) {
        console.error(e);
        return {error: "Error - Unexpected Error while Establishing Grid dimensions", success: false};
    }
    
    let rovers = [], rover_object, rover_number;
    for (var i = 1; i < inputs.length; i++) {
        rover_number = (i == 1 ? i : (i / 2) + 0.5);
        try {
            if (typeof inputs[i+1] == 'undefined') rover_object = {error: "Error - Only one line of instruction found for Rover number " + rover_number.toString(), success: false, journey: []}
            else rover_object = processMovementsRover(inputs[i], inputs[i+1]);
        }
        catch (e) {
            console.error(e);
            rover_object = {error: "Error - Unexpected Error while processing Rover number " + rover_number.toString(), success: false};
        }
        rover_object["rover_number"] = rover_number;
        rovers.push(rover_object);
        i++;        // Add one to i since we use two elements
    }

    return {rovers_result: rovers, success: true};
}


module.exports = utils;