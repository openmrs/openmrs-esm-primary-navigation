import { openmrsFetch, fhirBaseUrl } from "@openmrs/esm-api";

export function searchLocationsFhir(
  location: string,
  abortController: AbortController
) {
  return openmrsFetch(`${fhirBaseUrl}/Location?name=${location}`, {
    method: "GET",
    signal: abortController.signal
  });
}

export function setSessionLocation(
  locationUuid: string,
  abortController: AbortController
): Promise<any> {
  return openmrsFetch("/ws/rest/v1/appui/session", {
    method: "POST",
    body: { location: locationUuid },
    headers: {
      "Content-Type": "application/json"
    },
    signal: abortController.signal
  });
}
