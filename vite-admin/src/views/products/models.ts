import { IImageModel } from '@/views/upload/image';
export interface ICategory extends IMixinModel {
  pid?: ICategory;
  name: string;
}

export interface IProduct extends IMixinModel {
  category?: ICategory | string;
  name: string;
  number: string;
  image?: IImageModel;
  title?: string;
  desc?: string;
  is_new?: number;
  is_hot?: number; //models.IntegerField(default=0)
  stock?: number; //models.IntegerField(default=999)
  stock_warning?: number; //models.IntegerField(default=10)
  provider?: number; //models.ForeignKey(Provider, on_delete=models.CASCADE, null=True)
  brand?: string; //models.CharField(max_length=64, null=True)
}
