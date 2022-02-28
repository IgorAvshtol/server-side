export interface UpdateBookDto {
  id: number;
  authors: string;
  dateUTC: string;
  departureDate: string;
  description: string;
  pages: number;
  sections: string;
  senderEmail: string;
  senderId: number;
  title: string;
  likes: number[];
}
