export const accessEndpointMap = {
  ADMINISTRADOR: "/api/adm",
  MEDICO:        "/api/adm/medico",
  ENFERMAGEM:    "/api/adm/enfermeiro",
  PESQUISADOR:   "/api/adm/pesquisador",
} as const;

export type AccessLevel = keyof typeof accessEndpointMap;
