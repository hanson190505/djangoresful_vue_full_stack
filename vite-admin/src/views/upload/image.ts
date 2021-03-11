import { ETag } from '@/components/types';

export interface IImageModel {
  id?: number;
  owner?: string;
  alt?: string;
  url?: string;
  showEdit?: false;
  uploadState?: ETag;
}
