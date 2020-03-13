class HttpClient {
  get(path: string) {
    return Promise.resolve({ body: { path } });
  }
}
export const httpClient = new HttpClient();
