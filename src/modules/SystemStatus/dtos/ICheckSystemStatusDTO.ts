interface ICheckSystemStatusDTO {
  server_uptime: number;
  server_online_since: string;
  total_physical_person_checks_since_uptime: number;
  total_blacklisted_physical_people: number;
}

export { ICheckSystemStatusDTO };
