// Imports
import { RunService, Players } from "@rbxts/services"
import { LOCAL_PLAYER, CAMERA } from "util/common"

// Types
/**
 * Used to store data for a character model in the world.
 * Stores drawings, and other related data.
 */
type PlayerTrackingData = {
    name: DrawingText
    box: DrawingSquare
    distance: DrawingText
    chams: Highlight
}

type PlayerToggleType = "Name" | "Box" | "Chams" | "Distance"

// Constants
const HEAD_OFFSET: Vector3 = new Vector3(0, 0.5, 0)
const LEG_OFFSET: Vector3 = new Vector3(0, 3, 0)

// Main
class esp {
    constructor() {}

    private players: Map<Player, PlayerTrackingData> = new Map()
    private toggles: Map<PlayerToggleType, boolean> = new Map([
        ["Name", true],
        ["Box", true],
        ["Chams", true],
        ["Distance", true]
    ])

    public init() {
        // Start tracking players joining.
        Players.PlayerAdded.Connect((player: Player) => {
            this.addPlayerToEsp(player)
        })

        // Start tracking players leaving.
        Players.PlayerRemoving.Connect((player: Player) => {
            this.removePlayerFromEsp(player)
        })

        // Get the initial population of players.
        for (let player of Players.GetPlayers()) {
            this.addPlayerToEsp(player)
        }

        // Setup main render loop.
        RunService.RenderStepped.Connect(() => this.render())
    }

    private render() {
        for (const [player, data] of this.players) {
            // Ensure character exists, is spawned, and not dead before proceeding.
            let character = player.Character as Character | undefined
            if (character === undefined || !character.FindFirstChild("Spawned")) {
                this.makeDrawingInvisible(player, data)
                continue
            }

            // Get the root part of the character.
            let rootPart = character.HumanoidRootPart

            // Ensure that the character is on screen and not on your team.
            let [rootPosition, onScreen] = CAMERA.WorldToViewportPoint(rootPart.Position)
            if (onScreen === false || player.Team === LOCAL_PLAYER.Team) {
                this.makeDrawingInvisible(player, data)
                continue
            }

            // Get the head and leg positions for drawing.
            let headPosition = CAMERA.WorldToViewportPoint(character.Head.Position.add(HEAD_OFFSET))[0]
            let legPosition = CAMERA.WorldToViewportPoint(rootPart.Position.sub(LEG_OFFSET))[0]

            // Do main rendering logic for the esp.
            for (const [type, enabled] of this.toggles) {
                switch (type) {
                    case "Box":
                        data.box.Size = new Vector2(1000 / rootPosition.Z, headPosition.Y - legPosition.Y)
                        data.box.Position = new Vector2(rootPosition.X - data.box.Size.X / 2, rootPosition.Y - data.box.Size.Y / 2)
                        data.box.Visible = enabled
                        break
                    case "Name":
                        data.name.Text = player.Name
                        data.name.Position = new Vector2(rootPosition.X, (rootPosition.Y + data.box.Size.Y / 2) - 11.5)
                        data.name.Visible = enabled
                        break
                    case "Distance":
                        let localCharacter = LOCAL_PLAYER.Character as Character
                        let localHumanoidRootPart = localCharacter.HumanoidRootPart
                        let distance = (localHumanoidRootPart.Position.sub(rootPart.Position)).Magnitude

                        data.distance.Text = string.format("%i studs", math.ceil(distance))
                        data.distance.Position = new Vector2(rootPosition.X, (rootPosition.Y - data.box.Size.Y / 2) + 0.2)
                        data.distance.Visible = enabled
                        break
                    case "Chams":
                        data.chams.Enabled = enabled
                        break
                }
            }
        }
    }

    private addPlayerToEsp(player: Player) {
        // Make sure we're not adding the local player.
        if (player === LOCAL_PLAYER) {
            return
        }

        // Ensure character exists before proceeding.
        if (!player.Character) {
            player.CharacterAdded.Wait()
        }

        // TODO Optimize this maybe?
        // Go through the game and look for every highlight not named "Chams" and destroy it.
        // Highlights have a limit set by Roblox that go up to 31 instances.
        for (let instance of game.GetDescendants()) {
            if (instance.IsA("Highlight") && instance.Name !== "Chams") {
                instance.Destroy()
            }
        }

        // Create drawings for the player.
        let name = new Drawing("Text") as DrawingText; name.Center = true; name.Outline = true; name.Size = 13; name.Color = new Color3(1, 1, 1); name.Visible = false
        let box = new Drawing("Square") as DrawingSquare; box.Transparency = 1; box.Thickness = 1; box.Color = new Color3(1, 1, 1); box.Filled = false; box.Visible = false
        let distance = new Drawing("Text") as DrawingText; distance.Center = true; distance.Outline = true; distance.Size = 12; distance.Color = new Color3(1, 1, 1); distance.Visible = false
        let chams = new Instance("Highlight"); chams.FillColor = Color3.fromRGB(119, 0, 200); chams.FillTransparency = 0.1; chams.Adornee = player.Character; chams.Parent = player.Character; chams.DepthMode = Enum.HighlightDepthMode.AlwaysOnTop; chams.OutlineTransparency = 1; chams.Enabled = false; chams.Name = "Chams"

        // Create the player tracking data.
        let playerData: PlayerTrackingData = {
            name,
            box,
            distance,
            chams
        }

        // Add to players map.
        this.players.set(player, playerData)
    }

    private removePlayerFromEsp(player: Player) {

    }

    private makeDrawingInvisible(player: Player, data: PlayerTrackingData) {
        data.name.Visible = false
        data.box.Visible = false
        data.chams.Enabled = false
        data.distance.Visible = false
    }
}

// Export
export default esp