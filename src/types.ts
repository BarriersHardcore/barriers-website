export interface NavLink {
    label: string;
    href: string;
  }
  
  export interface AboutData {
    title: string;
    content: string;
  }
  
  export interface MusicData {
    title: string;
    content: string;
    albums: {
      title: string;
      releaseYear: number;
    }[];
  }
  
  export interface GigsData {
    title: string;
    content: string;
    gigs: {
      date: string;
      venue: string;
      location: string;
    }[];
  }
  
  export interface ContactData {
    title: string;
    content: string;
  }  