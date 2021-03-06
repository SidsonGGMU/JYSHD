
export interface Data {
  temperature: number;
  LUA2MQTT: string;
}

export interface Result {
  _id: string;
  protocol: string;
  device: string;
  at: any;
  data: Data;
  _t: string;
  id_developer: string;
  created_at: number;
  owner: string;
}

export interface StreamResult {
  total_documents: number;
  result: Result[];
}

export interface DeviceGeolocationResult {
  total_documents: number;
  result: DeviceGeoLocation[];
}

export interface DeviceGeoLocation {
  _id: string;
  name: string;
  description: string;
  type: string;
  sensor: string;
  checksum?: any;
  time_zone: string;
  frequency_status: number;
  frequency_stream: number;
  status: string;
  enabled: boolean;
  properties: any[];
  id_asset?: any;
  id_group: string;
  id_model?: any;
  id_developer: string;
  created_at: number;
  owner: string;
  before_status: string;
  updated_at: number;
  updater: string;
  n_str: number;
  lon: number;
  lat: number;
}

export interface Request {
  type: string;
  query: string;
  language: string;
  unit: string;
}

export interface Location {
  name: string;
  country: string;
  region: string;
  lat: string;
  lon: string;
  timezone_id: string;
  localtime: string;
  localtime_epoch: number;
  utc_offset: string;
}

export interface Current {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
  is_day: string;
}

export interface WeatherData {
  request: Request;
  location: Location;
  current: Current;
}

export interface StreamSummary {
  month: string;
  data: Result[];
  minTemperature: number;
  maxTemperature: number;
  nbFire: number;
}
