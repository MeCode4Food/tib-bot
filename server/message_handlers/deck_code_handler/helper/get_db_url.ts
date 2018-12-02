
export function getDBUrl(deckQuery: string): string {
  let dbUrl = "http://";
  dbUrl += process.env.DB_API_URL ? process.env.DB_API_URL : "127.0.0.1";
  dbUrl += `:${process.env.DB_API_PORT}/card/decklist?code=${deckQuery}`;

  return dbUrl;
}
