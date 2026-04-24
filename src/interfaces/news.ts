export interface NewsResp {
  status: string;
  totalResults: number;
  results: News[];
  nextPage: string;
}

export interface News {
  article_id: string;
  link: string;
  title: string;
  description: string;
  pubDate: Date;
  image_url: null | string;
  video_url: null | string;
  source_name: string;
  source_url: string;
  source_icon: string;
}
