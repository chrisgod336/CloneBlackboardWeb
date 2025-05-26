import api from "../services/api";

export default class Aula {
    private id:number;
    private tx_descricao: string;

    constructor(
        id:number, 
        tx_descricao: string
    ) {
        this.id = id;
        this.tx_descricao = tx_descricao;
    }

    public getId():number {
        return this.id;
    }

    public getTxDescricao():string {
        return this.tx_descricao;
    }

    //buscar todas as aulas
    public static async getAll(): Promise<object>{
        try {

            const response = await api.get('/aula/getAll');
            const res = response?.data;

            if(res?.success){

                const obj:Array<Aula> = res?.data.map((aula:any) => {
                    return new Aula(
                        aula.id, 
                        aula.tx_descricao
                    );
                })

                return {
                    success: true,
                    message: res?.message??'Aulas encontradas com sucesso.',
                    data: obj
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar buscar as aulas.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??'Error ao tentar buscar aulas.'
            }
        }
    }

    //buscar uma aula
       public static async get(id:number): Promise<object>{
        try {

            const response = await api.get('/aula/get');
            const res = response?.data;

            if(res?.success){

                const obj:Aula = new Aula(
                    res.data.id,
                    res.data.tx_descricao
                );

                return {
                    success: true,
                    message: res?.message??'Aula encontrada com sucesso.',
                    data: obj
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar buscar as aula.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??'Error ao tentar buscar aula.'
            }
        }
    }

    //criar uma aula
    public static async post(tx_descricao: string): Promise<object>{
        try{

            const response = await api.post(
                '/aula/post', 
                {
                    tx_descricao: tx_descricao
                }
            );
            const res = response?.data;

           if(res?.success){

                const id = res?.data?.id;
                const obj = new Aula(
                    id,
                    tx_descricao
                );

                return {
                    success: true,
                    message: res?.message??'Aula criada com sucesso.',
                    data: obj
                }
           }else{
                throw new Error(res?.message??'Erro ao tentar criar a aula.');
           }
        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??'Erro ao tentar criar a aula.'
            }
        }
    }

    //editar uma aula
    public async put(
        tx_descricao: string
    ): Promise<object>{
        try{

            const response = await api.put(
                '/aula/put',
                {
                    id: this.id,
                    tx_descricao: tx_descricao
                }
            );
            const res = response?.data;

            if(res?.success){

                this.tx_descricao = tx_descricao;

                return {
                    success: true,
                    message: res?.message??'Dados da aula editados com sucesso.',
                    data: this
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar editar dados da aula.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: 'Erro ao tentar editar dados da aula.'
            }
        }
    }

    //deletar uma aula
    public async delete(): Promise<object> {
        try {

            const response = await api.delete(`/aula/delete?id=${this.id}`);
            const res = response?.data;

            if (res?.success) {
                return {
                    success: true,
                    message: res?.menssage??'Aula deletada com sucesso.'
                };
            } else {
                throw new Error(res?.message??'Erro ao tentar deletar aula');
            }

        } catch (error: any) {
            console.error(error);
            return {
                success: false,
                message: error?.message??'Erro ao tentar deletar aula.'
            };
        }
    }
}