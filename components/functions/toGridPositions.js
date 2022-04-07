const GRID_SIZE = 75;
export function toGridPositions(_x, _y) {
    let x = (Math.floor(_x / GRID_SIZE) * GRID_SIZE);
    let y = Math.floor(_y / GRID_SIZE) * GRID_SIZE;
    return { x, y }
}