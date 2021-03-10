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
  id: number = 0;
  @Mutation
  commitSetID(id: number) {
    this.id = id;
  }

  @Action
  async getProductByID() {
    const product = 
  }
}

const useStore = getModule<ProductStore>(ProductStore);
