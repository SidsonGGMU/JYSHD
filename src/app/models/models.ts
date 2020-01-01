
export interface Data {
  temperature: number;
  LUA2MQTT: string;
}

export interface Result {
  _id: string;
  protocol: string;
  device: string;
  at: number;
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
