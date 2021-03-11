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
  is_product?: number; //models.IntegerField(default=0)
  color?: any; //models.JSONField(null=True)
  material?: string; //models.CharField(max_length=128, null=True)
  size?: string; //models.CharField(max_length=128, null=True)
  weight?: number; //models.DecimalField(default=0, max_digits=6, decimal_places=2)
  custom_log?: any; //models.JSONField(null=True)
}
