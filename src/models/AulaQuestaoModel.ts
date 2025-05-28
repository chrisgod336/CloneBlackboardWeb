import api from "../services/api";

export default class AulaQuestao {
    private id:number;
    private id_aula:number;
    private id_parte:number;
    private tx_descricao:string;
    private tx_alternativas:string;
    private id_resposta:number;

    constructor(
        id:number, 
        id_aula:number, 
        id_parte:number, 
        tx_descricao:string, 
        tx_alternativas:string, 
        id_resposta:number
    ){
        this.id = id;
        this.id_aula = id_aula;
        this.id_parte = id_parte;
        this.tx_descricao = tx_descricao;;
        this.tx_alternativas = tx_alternativas;
        this.id_resposta = id_resposta;
    }

    public getId():number{
        return this.id;
    }

    public getIdAula():number{
        return this.id_aula;
    }

    public getIdParte():number{
        return this.id_parte;
    }

    public getTxDescricao():string{
        return this.tx_descricao;
    }

    public getTxAlternativas():Array<any> | string{
        return this.tx_alternativas;
    }

    public getIdResposta():number{
        return this.id_resposta;
    }

    //buscas questoes da aula
    public static async getAll(id_aula:number): Promise<object> {
        try{

            const response = await api.get(`/aulaQuestao/getAll?id_aula=${id_aula}`);
            const res = response?.data;
            
            if(res?.success){

                const obj:Array<any> = res?.data.map((aulaQuestao: any) => {
                    return new AulaQuestao(
                        aulaQuestao.id,
                        aulaQuestao.id_aula,
                        aulaQuestao.id_parte,
                        aulaQuestao.tx_descricao,
                        aulaQuestao.tx_alternativas,
                        aulaQuestao.id_resposta
                    );
                })

                return {
                    success: true,
                    message: res?.message??'Questões da aula encontradas com sucesso.',
                    data: obj
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar buscar questões da aula.')
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??"Erro ao tentar buscar questões da aula."
            }
        }
    }

    //criar questao da aula
    public static async post(
        id_aula: number,
        id_parte:number, 
        tx_descricao:string, 
        tx_alternativas:string, 
        id_resposta:number
    ): Promise<object> {
        try{

            const response = await api.post(
                '/aulaQuestao/post', 
                {
                    id_aula: id_aula,
                    id_parte: id_parte,
                    tx_descricao: tx_descricao,
                    tx_alternativas: tx_alternativas,
                    id_resposta: id_resposta
                }
            );
            const res = response?.data;

            if(res?.success){

                const id = res?.data?.id;

                const obj = new AulaQuestao(
                    id,
                    id_aula,
                    id_parte,
                    tx_descricao,
                    tx_alternativas,
                    id_resposta
                );

                return {
                    success: true,
                    message: res?.message??'Questão da aula criada com sucesso.',
                    data: obj
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar criar questão da aula.')
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??"Erro ao tentar criar questão da aula."
            }
        }
    }

    //atualizar questao da aula
    public async put(
        id_parte:number, 
        tx_descricao:string, 
        tx_alternativas:string, 
        id_resposta:number
    ): Promise<object> {
        try{

            const response = await api.put(
                '/aulaQuestao/put',
                {
                    id: this.id,
                    id_aula: this.id_aula,
                    id_parte: id_parte,
                    tx_descricao: tx_descricao,
                    tx_alternativas: tx_alternativas,
                    id_resposta: id_resposta,
                }
            );
            const res = response?.data;

            if(res){

                this.id_parte = id_parte;
                this.tx_descricao = tx_descricao;
                this.tx_alternativas = tx_alternativas;
                this.id_resposta = id_resposta;

                return {
                    success: true,
                    message: res?.message??'Questão da aula atualizada com sucesso.',
                    data: this
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar atualizar questão da aula.')
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??"Erro ao tentar editar questão da aula."
            }
        }
    }

    //deletar questao da aula
    public async delete(): Promise<object> {
        try{    

            const response = await api.delete(`/aulaQuestao/delete?id=${this.id}&id_aula=${this.id_aula}`);
            const res = response?.data;

            if(res?.success){
                return {
                    success: true,
                    message: res?.message??'Questão da aula deletada com sucesso.'
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar deletar questão da aula.')
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??"Erro ao tentar deletar questão da aula."
            }
        }
    }

    //deletar questoes da aula
    public async deleteAll(): Promise<object> {
        try{    

            const response = await api.delete(`/aulaQuestao/deleteAll?id_aula=${this.id_aula}`);
            const res = response?.data;

            if(res?.success){
                return {
                    success: true,
                    message: res?.message??'Questões da aula deletadas com sucesso.'
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar deletar questões da aula.')
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??"Erro ao tentar deletar questões da aula."
            }
        }
    }
}