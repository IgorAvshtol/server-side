export class CreateBookDto {
  authors: string;
  departureDate: string;
  description: string;
  pages: number;
  section: string;
  senderEmail: string;
  imageURL: string;
  dateUTC: string;
  senderId: number;
  title: string;
  likes: number[];
}
