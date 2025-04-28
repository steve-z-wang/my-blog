export interface Post {
    post_id?: number;
    publish_at: number; // Unix timestamp
    title: string;
    content: string;
    tags: string[]; // Array of tags
}