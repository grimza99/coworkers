export {};

declare global {
  interface GroupApiResponse {
    teamId: string;
    updatedAt: string;
    createdAt: string;
    image: string;
    name: string;
    id: number;
  }
}
