namespace SpriteKind {
    export const Tile = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (InGame) {
        if (!(Selected)) {
            for (let Location of tiles.getTilesByType(myTiles.tile1)) {
                tiles.setWallAt(Location, !(sprites.readDataBoolean(grid.getSprites(Location)[0], "Road")))
            }
            Path = scene.aStar(tiles.getTilesByType(myTiles.tile5)[0], tiles.getTilesByType(myTiles.tile4)[0])
            scene.followPath(Car, Path, 50)
            if (!(scene.spriteIsFollowingPath(Car))) {
                game.showLongText("Dang, the roads aren't connected!", DialogLayout.Bottom)
            } else {
                scene.cameraFollowSprite(Car)
                while (!(Done)) {
                    pause(100)
                }
                game.showLongText("You did it!", DialogLayout.Bottom)
            }
        } else {
            game.showLongText("Please place down your tile!", DialogLayout.Bottom)
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (InGame && !(scene.spriteIsFollowingPath(Car))) {
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
    InGame = false
    Done = true
})
function add_tile (tile: Sprite, x: number, y: number) {
    grid.place(tile, tiles.getTileLocation(x, y))
    Tiles.push(tile)
    sprites.setDataBoolean(tile, "Road", true)
}
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    if (grid.getSprites(grid.getLocation(Cursor)).length > 2 && Selected) {
        grid.move(SelectedTile, 0, -1)
    }
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    if (grid.getSprites(grid.getLocation(Cursor)).length > 2 && Selected) {
        grid.move(SelectedTile, -1, 0)
    }
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    if (grid.getSprites(grid.getLocation(Cursor)).length > 2 && Selected) {
        grid.move(SelectedTile, 1, 0)
    }
})
function run_level (startx: number, starty: number, endx: number, endy: number) {
    grid.snap(Cursor)
    grid.moveWithButtons(Cursor)
    Cursor.setFlag(SpriteFlag.Invisible, false)
    Car.setFlag(SpriteFlag.Invisible, false)
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
function level_2 () {
    tiles.setTilemap(tiles.createTilemap(hex`0a0008000101010101010101010101010101010101010101010301010101010101010101010101010101010101010101010101010101010101010101010101010102010101010101010101010101010101010101`, img`
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
    add_tile(sprites.create(sprites.vehicle.roadHorizontal, SpriteKind.Tile), 4, 2)
    add_tile(sprites.create(sprites.vehicle.roadHorizontal, SpriteKind.Tile), 5, 4)
    add_tile(sprites.create(sprites.vehicle.roadHorizontal, SpriteKind.Tile), 6, 2)
    add_tile(sprites.create(sprites.vehicle.roadHorizontal, SpriteKind.Tile), 7, 2)
    add_tile(sprites.create(sprites.vehicle.roadTurn2, SpriteKind.Tile), 8, 1)
    add_tile(sprites.create(sprites.vehicle.roadVertical, SpriteKind.Tile), 8, 3)
    add_tile(sprites.create(sprites.vehicle.roadVertical, SpriteKind.Tile), 8, 4)
    add_tile(sprites.create(sprites.vehicle.roadVertical, SpriteKind.Tile), 8, 5)
    add_tile(sprites.create(sprites.vehicle.roadTurn4, SpriteKind.Tile), 8, 6)
    add_tile(sprites.create(sprites.vehicle.roadHorizontal, SpriteKind.Tile), 7, 6)
    add_tile(sprites.create(sprites.vehicle.roadHorizontal, SpriteKind.Tile), 6, 6)
    add_tile(sprites.create(sprites.vehicle.roadHorizontal, SpriteKind.Tile), 5, 6)
    add_tile(sprites.create(sprites.vehicle.roadHorizontal, SpriteKind.Tile), 4, 6)
    add_tile(sprites.create(sprites.vehicle.roadHorizontal, SpriteKind.Tile), 3, 6)
    add_tile(sprites.create(sprites.vehicle.roadHorizontal, SpriteKind.Tile), 2, 6)
    tiles.placeOnRandomTile(Car, myTiles.tile5)
    run_level(1, 2, 1, 6)
}
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    if (grid.getSprites(grid.getLocation(Cursor)).length > 2 && Selected) {
        grid.move(SelectedTile, 0, 1)
    }
})
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
Car.setFlag(SpriteFlag.Invisible, true)
Tiles = []
InGame = false
Selected = false
Done = false
level_2()
game.onUpdate(function () {
    if (Selected) {
        grid.place(Cursor, grid.getLocation(SelectedTile))
    }
    if (Car.vx > 0) {
        Car.setImage(img`
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
            `)
    }
    if (Car.vx < 0) {
        Car.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 2 2 2 2 2 2 2 2 . . 
            . . . . . 2 c 2 2 2 2 2 2 4 2 . 
            . . . . 2 c c 2 2 2 2 2 2 4 c 2 
            . . d 2 4 c c 2 4 4 4 4 4 4 c c 
            . d 2 2 4 c b e e e e e e e 2 c 
            . 2 2 2 4 b e e b b b e b b e 2 
            . 2 2 2 2 2 e b b b b e b b b e 
            . 2 2 2 2 e 2 2 2 2 2 e 2 2 2 e 
            . 2 d d 2 e f e e e f e e e e e 
            . d d 2 e e e f e e f e e e e e 
            . e e e e e e e f f f e e e e e 
            . e e e e f f f e e e e f f f f 
            . . . e f f f f f e e f f f f f 
            . . . . f f f f . . . . f f f . 
            . . . . . . . . . . . . . . . . 
            `)
    }
    if (Car.vy > 0) {
        Car.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 2 2 2 2 2 2 . . . . 
            . . . . . 2 2 4 4 2 2 2 2 . . . 
            . . . . . c 4 2 2 2 2 2 c . . . 
            . . . . 2 c 4 2 2 2 2 2 c 2 . . 
            . . . e 2 c 4 2 2 2 2 2 c 2 e . 
            . . . f 2 c 4 2 2 2 2 2 c 2 f . 
            . . . f e c 2 2 2 2 2 2 c e f . 
            . . . f 2 c 2 b b b b 2 c 2 f . 
            . . . e 2 2 b c c c c b 2 2 e . 
            . . . e e b c c c c c c b e e . 
            . . . f e 4 4 4 4 4 4 4 4 e f . 
            . . . f e d 2 2 2 2 2 2 d e f . 
            . . . . 2 d d 2 2 2 2 d d 2 f . 
            . . . . f 2 d 2 2 2 2 d 2 f . . 
            . . . . . e 2 2 2 2 2 2 e . . . 
            `)
    }
    if (Car.vy < 0) {
        Car.setImage(img`
            . . . . . . e e c c e e . . . . 
            . . . . . e 2 2 2 2 2 2 e . . . 
            . . . . 2 c 2 2 2 2 2 2 c 2 . . 
            . . . e 2 c 4 2 2 2 2 2 c 2 e . 
            . . . f 2 2 4 2 2 2 2 2 c 2 f . 
            . . . f 2 2 4 2 2 2 2 2 2 2 f . 
            . . . f 2 2 4 2 2 2 2 2 2 2 f . 
            . . . f 2 c 2 4 4 2 2 2 c 2 f . 
            . . . e 2 c e c c c c e c 2 e . 
            . . . e 2 e c b b b b c e 2 e . 
            . . . e 2 e b b b b b b e 2 e . 
            . . . e e e e e e e e e e e e . 
            . . . f e d e e e e e e d e f . 
            . . . f e 2 d e e e e d 2 e f . 
            . . . f f e e e e e e e e f f . 
            . . . . f f . . . . . . f f . . 
            `)
    }
})
