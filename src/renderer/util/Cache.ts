import Store from "electron-store"
import { getCacheHome } from "./paths"

export class Cache {
  private static instance: Cache
  private readonly store: Store<Record<string, string>>

  private constructor() {
    this.store = new Store({
      name: "cache",
      cwd: getCacheHome()
    })
  }

  public static getInstance(): Cache {
    if (!this.instance) {
      this.instance = new Cache()
    }

    return this.instance
  }

  public getCurrentNotebook(): string | null {
    return this.store.get("currentNotebook") || null
  }

  public setCurrentNotebook(currentNotebook: string): void {
    this.store.set("currentNotebook", currentNotebook)
    // When setting a new current notebook the old current note would be invalid
    this.store.delete("currentNote")
  }

  public getCurrentNote(): string | null {
    return this.store.get("currentNote") || null
  }

  public setCurrentNote(currentNote: string): void {
    this.store.set("currentNote", currentNote)
  }
}
