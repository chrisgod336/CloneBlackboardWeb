import api from "../services/api";

export default class AulaAluno {
    private id_aluno:number;
    private id_aula:number;
    private lo_finalizado:string;
    private nu_acertos:number;
    private nu_erros:number;
    private tx_parte1:string;
    private tx_parte2:string;
    private tx_parte3:string;

    constructor(
        id_aluno:number, 
        id_aula:number, 
        lo_finalizado:string, 
        nu_acertos:number, 
        nu_erros:number,
        tx_parte1:string,
        tx_parte2:string,
        tx_parte3:string
    ){
        this.id_aluno = id_aluno;
        this.id_aula = id_aula;
        this.lo_finalizado = lo_finalizado;
        this.nu_acertos = nu_acertos;
        this.nu_erros = nu_erros;
        this.tx_parte1 = tx_parte1;
        this.tx_parte2 = tx_parte2;
        this.tx_parte3 = tx_parte3;
    }

    public getIdAluno():number{
        return this.id_aluno;
    }

    public getIdAula():number{
        return this.id_aula;
    }

    public getLoFinalizado():string{
        return this.lo_finalizado;
    }

    public getNuAcertos():number{
        return this.nu_acertos;
    }

    public getNuErros():number{
        return this.nu_erros;
    }

    public getTxParte1():string{
        return this.tx_parte1;
    }

    public getTxParte2():string{
        return this.tx_parte2;
    }

    public getTxParte3():string{
        return this.tx_parte3;
    }

    //buscar aula aluno
    public static async get(
        id_aluno:number, 
        id_aula:number
    ): Promise<object>{
        try{

            const response = await api.get(`/aulaAluno/get?id_aluno=${id_aluno}&id_aula=${id_aula}`);
            const res = response.data;

            if(res?.success){

                const aulaAluno = res?.data;

                const obj = new AulaAluno(
                    id_aluno,
                    id_aula,
                    aulaAluno.lo_finalizado,
                    aulaAluno.nu_acertos,
                    aulaAluno.nu_erros,
                    aulaAluno.tx_parte1,
                    aulaAluno.tx_parte2,
                    aulaAluno.tx_parte3
                );

                return {
                    success: true,
                    message: res?.message??'Aula do aluno encontrada com sucesso.',
                    data: obj
                }

            }else{
                throw new Error(res?.message??"Aula do aluno não encontrada.");
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??"Erro ao buscar aula do aluno."
            }
        }
    }

    //criar aula aluno
    public static async post(
        id_aluno:number, 
        id_aula:number,
        lo_finalizado:string,
        nu_acertos:number,
        nu_erros:number,
        tx_parte1:string,
        tx_parte2:string,
        tx_parte3:string
    ): Promise<object>{
        try{

            const response = await api.post(
                '/aulaAluno/post',
                {
                    id_aluno: id_aluno,
                    id_aula: id_aula,
                    lo_finalizado: lo_finalizado,
                    nu_acertos: nu_acertos,
                    nu_erros: nu_erros,
                    tx_parte1: tx_parte1,
                    tx_parte2: tx_parte2,
                    tx_parte3: tx_parte3
                }
            );
            const res = response.data;

            if(res?.success){

                const obj = new AulaAluno(
                    id_aluno,
                    id_aula,
                    lo_finalizado,
                    nu_acertos,
                    nu_erros,
                    tx_parte1,
                    tx_parte2,
                    tx_parte3
                );

                return {
                    success: true,
                    message: 'Aula do aluno criada com sucesso',
                    data: obj
                }
            }else{
                throw new Error(res?.message??"Erro ao tentar criar aula do aluno.");
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??"Erro ao tentar criar aula do aluno."
            }
        }
    }

    //atualizar aula aluno
    public async put(
        lo_finalizado:string, 
        nu_acertos:number, 
        nu_erros:number,
        tx_parte1:string,
        tx_parte2:string,
        tx_parte3:string
    ): Promise<object>{
        try {

            const response = await api.put(
                '/aulaAluno/put',
                {
                    id_aluno: this.id_aluno,
                    id_aula: this.id_aula,
                    lo_finalizado: lo_finalizado,
                    nu_acertos: nu_acertos,
                    nu_erros: nu_erros,
                    tx_parte1: tx_parte1,
                    tx_parte2: tx_parte2,
                    tx_parte3: tx_parte3
                }
            );
            const res = response?.data;

            if(res?.success){

                this.lo_finalizado = lo_finalizado;
                this.nu_acertos = nu_acertos;
                this.nu_erros = nu_erros;
                this.tx_parte1 = tx_parte1;
                this.tx_parte2 = tx_parte2;
                this.tx_parte3 = tx_parte3;

                return {
                    success: true,
                    message: res?.message??'Aula do aluno editada com sucesso.',
                    data: this
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar editar aula do aluno.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??"Erro ao tentar editar aula do aluno."
            }
        }
    }

    //montar aula aluno
    public static async make(
        id: number
    ): Promise<object>{
        try {

            const response = await api.get(`/aulaAluno/make?id_aluno=${id}`);
            const res = response?.data;

            if(res?.success){

                return {
                    success: true,
                    message: res?.message??'Aula do aluno montada com sucesso.',
                    data: res?.data
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar montar aula do aluno.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??"Erro ao tentar montar aula do aluno."
            }
        }
    }
}