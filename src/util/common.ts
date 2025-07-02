// Imports
import { Players, Workspace } from "@rbxts/services";

// Func Exports
export function getPlayerFromCharacter(character: Character): Player | undefined {
    for (const player of Players.GetPlayers()) {
        if (player.Character === character) {
            return player
        }
    }
    return undefined
}

// Const Exports
export const LOCAL_PLAYER = Players.LocalPlayer as Player
export const CAMERA = Workspace.CurrentCamera as Camera