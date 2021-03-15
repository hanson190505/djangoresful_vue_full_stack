export interface IProvider extends IMixinModel {
  full_name: string; //models.CharField(max_length=512)
  short_name: string; //models.CharField(max_length=64)
  CEO?: string; //models.CharField(max_length=64, null=True)
  addr?: string; //models.CharField(max_length=512, null=True)
  website?: string; //models.CharField(max_length=512, null=True)
  phone?: string; //models.CharField(max_length=128, null=True)
  collaborate_at?: string; //models.DateField(null=True)
  is_collaborate?: number; //models.IntegerField(default=1)
  collaborate_level?: number; //models.IntegerField(default=1)
  linkman?: string; //models.CharField(max_length=64, null=True)
  linkman_phone?: string; //models.CharField(max_length=128, null=True)
  linkman_email?: string; //models.CharField(max_length=128, null=True)
}
