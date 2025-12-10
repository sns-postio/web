export interface InstagramPost {
  id: number;
  postId: string;
  mediaType: string;
  mediaUrl: string;
  permalink: string;
  publishedAt: string;
  caption: string | null;
  commentsCount: number;
  likeCount: number;
}

export interface InstagramPostsPayload {
  items: InstagramPost[];
  total: number;
  page: number;
  limit: number;
}

export interface InstagramPostsParams {
  connectId: string;
  page?: number;
  limit?: number;
}

export interface InstagramFeedUploadRequest {
  connectId: string;
  caption?: string;
  files: File[];
}

export interface InstagramReelUploadRequest {
  connectId: string;
  caption?: string;
  file: File;
}

export interface InstagramStoryUploadRequest {
  connectId: string;
  file: File;
}
