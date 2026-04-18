/**
 * O*NET Web Services REST Client for CareerDNA
 */
export class ONetClient {
  private apiKey: string;
  private baseUrl = "https://api-v2.onetcenter.org";

  constructor() {
    this.apiKey = process.env.ONET_API_KEY || "";
    if (!this.apiKey) {
       console.warn("Missing O*NET credentials! Please set ONET_API_KEY in .env.local");
    }
  }

  private async fetchONet(path: string) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        "X-API-Key": this.apiKey,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`O*NET API Error (${response.status}): ${err}`);
    }

    return response.json();
  }

  async searchOccupations(keyword: string) {
    const raw = await this.fetchONet(`/mnm/search?keyword=${encodeURIComponent(keyword)}`);
    if (raw.career) {
      return { occupation: raw.career.map((c: any) => ({ occupation: c })) };
    }
    return raw;
  }

  async getInterests(socCode: string) {
    return this.fetchONet(`/online/occupations/${socCode}/details/interests`);
  }

  async getWorkStyles(socCode: string) {
    return this.fetchONet(`/online/occupations/${socCode}/details/work_styles`);
  }

  async getAbilities(socCode: string) {
    return this.fetchONet(`/online/occupations/${socCode}/details/abilities`);
  }

  async getWorkValues(socCode: string) {
    return this.fetchONet(`/online/occupations/${socCode}/details/work_values`);
  }

  async getOccupationDetails(socCode: string) {
    return this.fetchONet(`/online/occupations/${socCode}`);
  }
}

export const onetClient = new ONetClient();
