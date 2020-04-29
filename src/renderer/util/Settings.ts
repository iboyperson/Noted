import { getConfigHome } from './paths';
import * as fs from 'fs';
import * as path from 'path';
import { ThemeName } from 'vickymd/theme';

const CONFIG_FILE = 'settings.json'

interface SettingsItems {
  theme: ThemeName
  currentNotebook: string | null
}

export class Settings {
  private static instance: Settings
  private readonly path: string = path.join(getConfigHome(), CONFIG_FILE)
  private settings: SettingsItems


  private constructor() {
    if(!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, "{}")
    }

    this.settings = this.readSettings()
  }

  public static getInstance(): Settings {
    if (!this.instance) {
      this.instance = new Settings()
    }

    return this.instance
  }

  public getTheme(): ThemeName {
    return this.settings.theme || 'one-dark'
  }

  public setTheme(theme: ThemeName): void {
    this.settings.theme = theme
    this.saveSettings()
  }

  public getCurrentNotebook(): string | null {
    return this.settings.currentNotebook || null
  }

  public setCurrentNotebook(notebook: string): void {
    this.settings.currentNotebook = notebook
    this.saveSettings()
  }

  public saveSettings(): void {
    fs.promises.writeFile(this.path, JSON.stringify(this.settings))
  }

  private readSettings(): SettingsItems {
    return JSON.parse(fs.readFileSync(this.path).toString())
  }

}
