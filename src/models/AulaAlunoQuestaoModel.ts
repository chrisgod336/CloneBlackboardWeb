import api from "../services/api";

export default class AulaAlunoQuestao {
    private id_aluno:number;
    private id_aula:number;
    private id_questao:number;
    private id_resposta_aluno:number;
    private tx_tipo:string;
    private lo_acerto:string;

    constructor(
        id_aluno:number, 
        id_aula:number, 
        id_questao:number, 
        id_resposta_aluno:number, 
        tx_tipo:string, 
        lo_acerto:string
    ){
        this.id_aluno = id_aluno;
        this.id_aula = id_aula;
        this.id_questao = id_questao;
        this.id_resposta_aluno = id_resposta_aluno;
        this.tx_tipo = tx_tipo;
        this.lo_acerto = lo_acerto;
    }

    public getIdAluno():number {
        return this.id_aluno;
    }

    public getIdAula():number {
        return this.id_aula;
    }

    public getIdQuestao():number {
        return this.id_questao;
    }

    public getIdRespostaAluno():number {
        return this.id_resposta_aluno;
    }

    public setIdRespostaAluno(id_resposta_aluno:number):void {
        this.id_resposta_aluno = id_resposta_aluno;
    }

    public getTxTipo():string {
        return this.tx_tipo;
    }

    public getLoAcerto():string {
        return this.lo_acerto;
    }

    public setLoAcerto(lo_acerto:string):void {
        this.lo_acerto = lo_acerto;
    }

    //buscar questoes aula aluno
    public static async getAll(
        id_aula:number, 
        id_aluno:number
    ): Promise<object>{
        try{

           const response = await api.get(`/aulaAlunoQuestao/getAll?id_aluno=${id_aluno}&id_aula=${id_aula}`);
           const res = response.data;

            if(res?.success){

                const obj:Array<AulaAlunoQuestao> = res?.data.map((questao:any) => {
                    return new AulaAlunoQuestao(
                        questao.id_aluno,
                        questao.id_aula,
                        questao.id_questao,
                        questao.id_resposta_aluno,
                        questao.tx_tipo,
                        questao.lo_acerto
                    );
                });

                return {
                    success: true,
                    message: res?.message??'Questões da aula do aluno encontradas com sucesso.',
                    data: obj
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar buscar questões do aluno.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: "Erro ao tentar buscar questões do aluno."
            }
        }
    }

    //criar questao aula aluno
    public static async post(
        id_aula:number, 
        id_aluno:number, 
        id_questao:number, 
        id_resposta_aluno:number, 
        tx_tipo:string, 
        lo_acerto:string
    ): Promise<object>{
        try{

            const response = await api.post(
                `/aulaAlunoQuestao/post`,
                {
                    id_aula: id_aula,
                    id_aluno: id_aluno,
                    id_questao: id_questao,
                    id_resposta_aluno: id_resposta_aluno,
                    tx_tipo: tx_tipo,
                    lo_acerto: lo_acerto
                }
            );
            const res = response?.data;

            if(res?.success){

                const obj = new AulaAlunoQuestao(
                    id_aluno,
                    id_aula,
                    id_questao,
                    id_resposta_aluno,
                    tx_tipo,
                    lo_acerto
                );

                return{
                    success: true,
                    message: res?.message??'Questão da aula do aluno criada com sucesso.',
                    data: obj
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar criar questão do aluno.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??"Erro ao tentar criar questão do aluno."
            }
        }
    }

    //atualizar questao aula aluno
    public static async put(
        id_aula: number, 
        id_aluno: number,
        id_questao: number,
        id_resposta_aluno: number, 
        tx_tipo: string, 
        lo_acerto: string
    ): Promise<object>{
        try{

            const response = await api.put(
                'aulaAlunoQuestao/put',
                {
                    id_aula: id_aula,
                    id_aluno: id_aluno,
                    id_questao: id_questao,
                    id_resposta_aluno: id_resposta_aluno,
                    tx_tipo: tx_tipo,
                    lo_acerto: lo_acerto
                }
            );
            const res = response?.data;

            if(res?.suceess){

                return {
                    success: true,
                    message: res?.message??'Questão da aula do aluno atualizada com sucesso.',
                    data: this
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar atualizar questão do aluno.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??"Erro ao tentar atualizar questão do aluno."
            }
        }
    }

    //deletar questoes aula aluno
    public static async deleteAll(
        id_aula:number, 
        id_aluno:number
    ): Promise<object>{
        try{

           const response = await api.delete(`/aulaAlunoQuestao/deleteAll?id_aluno=${id_aluno}&id_aula=${id_aula}`);
           const res = response.data;

            if(res?.success){

                return {
                    success: true,
                    message: res?.message??'Questões da aula do aluno deletardas com sucesso.',
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar deltar questões do aluno.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: "Erro ao tentar deltar questões do aluno."
            }
        }
    }
}