import api from "../services/api";

export default class Aluno {
    private id:number;
    private tx_nome:string;
    private tx_login:string;
    private tx_senha:string;
    private tx_nivel:string;
    private nu_acertos_texto:number;
    private nu_erros_texto:number;
    private nu_acertos_imagem:number;
    private nu_erros_imagem:number;
    private nu_acertos_video:number;
    private nu_erros_video:number;
    private feedback?:string;

    constructor(
        id:number, 
        tx_nome:string, 
        tx_login:string, 
        tx_senha:string, 
        tx_nivel:string, 
        nu_acertos_texto:number, 
        nu_erros_texto:number, 
        nu_acertos_imagem:number,
        nu_erros_imagem:number, 
        nu_acertos_video:number, 
        nu_erros_video:number,
        feedback?:string
    ){
        this.id = id;
        this.tx_nome = tx_nome;
        this.tx_login = tx_login;
        this.tx_senha = tx_senha;
        this.tx_nivel = tx_nivel;
        this.nu_acertos_texto = nu_acertos_texto;
        this.nu_erros_texto = nu_erros_texto;
        this.nu_acertos_imagem = nu_acertos_imagem;
        this.nu_erros_imagem = nu_erros_imagem;
        this.nu_acertos_video = nu_acertos_video;
        this.nu_erros_video = nu_erros_video;
        this.feedback = feedback || undefined;
    }

    public getId():number{
        return this.id;
    }

    public getTxNome():string{
        return this.tx_nome;
    }

    public getTxLogin():string{
        return this.tx_login;
    }

    public getTxNivel():string{
        return this.tx_nivel;
    }

    public getNuAcertosTexto():number{
        return this.nu_acertos_texto;
    }

    public getNuErrosTexto():number{
        return this.nu_erros_texto;
    }

    public getNuAcertosImagem():number{
        return this.nu_acertos_imagem;
    }

    public getNuErrosImagem():number{
        return this.nu_erros_imagem;
    }

    public getNuAcertosVideo():number{
        return this.nu_acertos_video;
    }

    public getNuErrosVideo():number{
        return this.nu_erros_video;
    }

    public getFeedback():string | undefined{
        return this.feedback;
    }

    //login do aluno
    public static async login(
        tx_login:string, 
        tx_senha:string
    ):Promise<object> {
        try{

            const response = await api.get(`/aluno/login?tx_login=${tx_login}&tx_senha=${tx_senha}`);
            const res = response.data;

            if(res?.success){

                const aluno = res.data;

                const obj = new Aluno(
                    aluno.id,
                    aluno.tx_nome,
                    tx_login,
                    tx_senha,
                    aluno.tx_nivel,
                    aluno.nu_acertos_texto,
                    aluno.nu_erros_texto,
                    aluno.nu_acertos_imagem,
                    aluno.nu_erros_imagem,
                    aluno.nu_acertos_video,
                    aluno.nu_erros_video,
                    aluno.feedback
            );

             return {
                    success: true,
                    message: res.message??'Login realizado com sucesso.',
                    data: obj
                }
    
            }else{
                return {status: false, mensagem: res?.message??"Login ou senha inválidos"};
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??"Erro ao tentar logar com aluno."
            }
        }
    }

    //buscar dados do aluno
    public static async get(id:number): Promise<object> {
        try{

           const response = await api.get(`/aluno/get?id=${id}`);
           const res = response?.data;

            if(res.success){

                const aluno = res.data;

                const obj = new Aluno(
                    aluno.id,
                    aluno.tx_nome,
                    aluno.tx_login,
                    aluno.tx_senha,
                    aluno.tx_nivel,
                    aluno.nu_acertos_texto,
                    aluno.nu_erros_texto,
                    aluno.nu_acertos_imagem,
                    aluno.nu_erros_imagem,
                    aluno.nu_acertos_video,
                    aluno.nu_erros_video,
                    aluno.feedback
            );

                return {
                    success: true,
                    message: res.message??'Aluno encontrado com sucesso.',
                    data: obj
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar buscar dados do aluno.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??"Erro ao tentar buscar dados do aluno."
            }
        }
    }

    //buscar dados dos alunos
    public static async getAll(): Promise<object> {
        try{

            const response = await api.get('/aluno/getAll');
            const res = response?.data;

            if(res?.success){

                const alunos:Array<Aluno> = res.data.map((aluno: any) =>{
                    return new Aluno(
                        aluno?.id,
                        aluno?.tx_nome,
                        aluno?.tx_login,
                        aluno?.tx_senha,
                        aluno?.tx_nivel,
                        aluno?.nu_acertos_texto,
                        aluno?.nu_erros_texto,
                        aluno?.nu_acertos_imagem,
                        aluno?.nu_erros_imagem,
                        aluno?.nu_acertos_video,
                        aluno?.nu_erros_video
                    )
                })

                return {
                    success: true,
                    message: res?.message??'Alunos encontrados com sucesso.',
                    data: alunos
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar buscar alunos.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??'Erro ao tentar buscar alunos.',
            }
        }
    }

    //criar aluno
    public static async post(
        tx_nome:string, 
        tx_login:string
    ): Promise<object>{
        try{

            const response = await api.post(
                '/aluno/post', 
                {
                    tx_nome: tx_nome,
                    tx_login: tx_login
                }
            );

            const res = response.data;

            if(res?.success){

                const id = res?.data?.id;

                const obj = new Aluno(
                    id,
                    tx_nome,
                    tx_login,
                    'senha1234',
                    'muito baixo',
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                )                

                return {
                    success: true,
                    message: res?.message??'Aluno criado com sucesso.',
                    data: obj
                }
            }else{
                throw new Error('Erro ao tentar criar aluno.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??'Erro ao tentar criar aluno.',
            }
        }
    }

    //atualizar aluno
    public async put(
        tx_nome:string, 
        tx_login:string, 
        // tx_nivel:string, 
        // nu_acertos_texto:number,
        // nu_erros_texto:number, 
        // nu_acertos_imagem:number,
        // nu_erros_imagem:number, 
        // nu_acertos_video:number,
        // nu_erros_video:number
    ): Promise<object>{
        try{

            const response = await api.put(
                `/aluno/put`,
                {
                    id: this.id,
                    tx_nome: tx_nome,
                    tx_login: tx_login,
                    // tx_nivel: tx_nivel,
                    // nu_acertos_texto: nu_acertos_texto,
                    // nu_erros_texto: nu_erros_texto,
                    // nu_acertos_imagem: nu_acertos_imagem,
                    // nu_erros_imagem: nu_erros_imagem,
                    // nu_acertos_video: nu_acertos_video,
                    // nu_erros_video: nu_erros_video
                }
            );

            const res = response?.data;

            if(res?.success){

                this.tx_nome = tx_nome;
                this.tx_login = tx_login;
                // this.tx_nivel = tx_nivel;
                // this.nu_acertos_texto = nu_acertos_texto;
                // this.nu_erros_texto = nu_erros_texto;
                // this.nu_acertos_imagem = nu_acertos_imagem;
                // this.nu_erros_imagem = nu_erros_imagem;
                // this.nu_acertos_video = nu_acertos_video;
                // this.nu_erros_video = nu_erros_video;

                return {
                    success: true,
                    message: res?.message??'Aluno editado com sucesso.',
                    data: this
                }
            }else{
                throw new Error('Erro ao tentar editar aluno.');
            }

        }catch(error:any){
            console.error(error);
            return{
                success: false,
                message: error?.message??'Erro ao tentar editar aluno.'
            }
        }
    }

    //deletar aluno
    public async delete(): Promise<object>{
        try{


            const response = await api.delete(`/aluno/delete?id=${this.id}`);
            console.log('response: ', response);
            const res = response?.data;


            if(res?.success){
                return {
                    success: true,
                    message: res?.message??'Aluno deletado com sucesso.',
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar deletar aluno.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??'Erro ao tentar deletar aluno.',
            }
        }
    }

    //recalcular questoes de todos alunos
    public static async recalculate(): Promise<object> {
        try{

            const response = await api.post('/aluno/recalculate');
            const res = response?.data;

            if(res?.success){
                return {
                    success: true,
                    message: 'Questões dos alunos recalculadas com sucesso.'
                };
            }else{
                throw new Error(res?.message??'Erro ao tentar recalcular questões dos alunos.');
            }
        
        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??'Erro ao tentar recalcular questões dos alunos.',
            }
        }
    }
}