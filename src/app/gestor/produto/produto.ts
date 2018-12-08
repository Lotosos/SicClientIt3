import { Categoria} from '../categoria/categoria';
export class Produto {
    id: number;
    nome : string;
    categoria : Categoria;
    altura :  string;
    largura: string;
    profundidade: string;
}