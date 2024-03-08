export interface Config {
  time: number,
  capitals: boolean,
}
export interface ConfigField {
  [key: string]: number | string;
}
export interface ConfigContextType {
  config: Config, 
  updateConfig: (field: ConfigField) => void
}