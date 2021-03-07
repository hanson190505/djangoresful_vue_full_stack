import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import { IProduct } from './models';

@Module
export class ProductStore extends VuexModule {
  product: IProduct = {
    name: '',
    number: '',
  };
}
