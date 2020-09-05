namespace SpriteKind {
    export const Tile = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (InGame) {
        for (let Location of tiles.getTilesByType(myTiles.tile1)) {
            tiles.setWallAt(Location, !(sprites.readDataBoolean(grid.getSprites(Location)[0], "Road")))
        }
        Path = scene.aStar(tiles.getTilesByType(myTiles.tile5)[0], tiles.getTilesByType(myTiles.tile4)[0])
        scene.followPath(Car, Path, 50)
        if (!(scene.spriteIsFollowingPath(Car))) {
            game.showLongText("Dang, the roads aren't connected!", DialogLayout.Bottom)
        } else {
            while (!(Done)) {
                pause(100)
            }
            game.showLongText("You did it!", DialogLayout.Bottom)
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (InGame) {
        if (!(Selected) && grid.getSprites(grid.getLocation(Cursor)).length > 1) {
            Selected = true
            Cursor.image.replace(1, 4)
            SelectedTile = grid.getSprites(grid.getLocation(Cursor))[0]
            grid.moveWithButtons(SelectedTile)
        } else if (Selected && grid.getSprites(grid.getLocation(SelectedTile)).length < 3) {
            if (on_legal_tile(grid.spriteCol(SelectedTile), grid.spriteRow(SelectedTile))) {
                Selected = false
                Cursor.image.replace(4, 1)
                grid.place(Cursor, grid.getLocation(SelectedTile))
                grid.moveWithButtons(Cursor)
            }
        }
    }
})
function on_legal_tile (x: number, y: number) {
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(x, y), myTiles.tile4)) {
        return false
    }
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(x, y), myTiles.tile5)) {
        return false
    }
    return true
}
scene.onPathCompletion(SpriteKind.Player, function (sprite, location) {
    Done = true
})
function add_tile (tile: Sprite, x: number, y: number) {
    grid.place(tile, tiles.getTileLocation(x, y))
    Tiles.push(tile)
    sprites.setDataBoolean(tile, "Road", true)
}
function run_level (startx: number, starty: number, endx: number, endy: number) {
    grid.snap(Cursor)
    grid.moveWithButtons(Cursor)
    Cursor.setFlag(SpriteFlag.Invisible, false)
    scene.cameraFollowSprite(Cursor)
    InGame = true
    Done = false
}
function clear_tiles () {
    for (let Sprite2 of Tiles) {
        Sprite2.destroy()
        Tiles.removeAt(Tiles.indexOf(Sprite2))
    }
}
function level_1 () {
    tiles.setTilemap(tiles.createTilemap(hex`0a0008000101010101010101010101010101010101010101010301010101010102010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101`, img`
        . . . . . . . . . . 
        . . . . . . . . . . 
        . . . . . . . . . . 
        . . . . . . . . . . 
        . . . . . . . . . . 
        . . . . . . . . . . 
        . . . . . . . . . . 
        . . . . . . . . . . 
        `, [myTiles.transparency16,myTiles.tile1,myTiles.tile4,myTiles.tile5], TileScale.Sixteen))
    add_tile(sprites.create(sprites.vehicle.roadHorizontal, SpriteKind.Tile), 2, 2)
    add_tile(sprites.create(sprites.vehicle.roadHorizontal, SpriteKind.Tile), 3, 2)
    add_tile(sprites.create(sprites.vehicle.roadHorizontal, SpriteKind.Tile), 4, 4)
    add_tile(sprites.create(sprites.vehicle.roadHorizontal, SpriteKind.Tile), 5, 2)
    add_tile(sprites.create(sprites.vehicle.roadHorizontal, SpriteKind.Tile), 6, 2)
    add_tile(sprites.create(sprites.vehicle.roadHorizontal, SpriteKind.Tile), 7, 2)
    tiles.placeOnRandomTile(Car, myTiles.tile5)
    run_level(1, 2, 8, 2)
}
let SelectedTile: Sprite = null
let Path: tiles.Location[] = []
let Done = false
let Selected = false
let InGame = false
let Tiles: Sprite[] = []
let Car: Sprite = null
let Cursor: Sprite = null
Cursor = sprites.create(img`
    1 1 1 . . . . . . . . . . 1 1 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 1 1 . . . . . . . . . . 1 1 1 
    `, SpriteKind.Player)
Cursor.setFlag(SpriteFlag.StayInScreen, true)
Cursor.setFlag(SpriteFlag.ShowPhysics, false)
Cursor.setFlag(SpriteFlag.Invisible, true)
Cursor.z = 10
Car = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . 2 4 2 2 2 2 2 2 c 2 . . . 
    . . 2 c 4 2 2 2 2 2 2 c c 2 . . 
    . 2 c c 4 4 4 4 4 4 2 c c 4 2 d 
    . 2 c 2 e e e e e e e b c 4 2 2 
    . 2 2 e b b e b b b e e b 4 2 2 
    . 2 e b b b e b b b b e 2 2 2 2 
    . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 
    . e e e e e e f e e e f e 2 d d 
    . e e e e e e f e e f e e e 2 d 
    . e e e e e e f f f e e e e e e 
    . e f f f f e e e e f f f e e e 
    . . f f f f f e e f f f f f e . 
    . . . f f f . . . . f f f f . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
Car.z = 5
Tiles = []
InGame = false
Selected = false
Done = false
level_1()
game.onUpdate(function () {
    if (Selected) {
        grid.place(Cursor, grid.getLocation(SelectedTile))
    }
})
