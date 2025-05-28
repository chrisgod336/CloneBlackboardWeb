import api from "../services/api";

export default class AulaParte {
    private id:number;
    private id_aula:number;
    private tx_descricao:string;
    private tx_texto:string;
    private tx_dir_imagem:string;
    private tx_url_video:string;

    constructor(
        id:number, 
        id_aula:number, 
        tx_descricao:string, 
        tx_texto:string, 
        tx_dir_imagem:string, 
        tx_url_video:string
    ){
        this.id = id;
        this.id_aula = id_aula;
        this.tx_descricao = tx_descricao;
        this.tx_texto = tx_texto;
        this.tx_dir_imagem = tx_dir_imagem;
        this.tx_url_video = tx_url_video;
    }

    public getId():number {
        return this.id;
    }

    public getIdAula():number {
        return this.id_aula;
    }

    public getTxDescricao():string {
        return this.tx_descricao;
    }

    public getTxTexto():string {
        return this.tx_texto;
    }

    public getTxDirImagem():string {
        return this.tx_dir_imagem;
    }

    public getTxUrlVideo():string {
        return this.tx_url_video;
    }

    //buscas partes da aula
    public static async getAll(id_aula: number): Promise<object>{
        try{

            const response = await api.get(`/aulaParte/getAll?id_aula=${id_aula}`);
            const res = response?.data;

            if(res?.success){

                const obj:Array<AulaParte> = res?.data.map((aulaParte:any) => {
                    return new AulaParte(
                        aulaParte.id,
                        aulaParte.id_aula,
                        aulaParte.tx_descricao,
                        aulaParte.tx_texto,
                        aulaParte.tx_dir_imagem,
                        aulaParte.tx_url_video
                    )
                });

                return {
                    success: true,
                    message: res?.message??'Partes da aula encontradas com sucesso.',
                    data: obj
                }
            }else{
                throw new Error(res?.message??'Nenhuma parte da aula encontrada.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??'Erro ao tentar buscar as partes da aula'
            }
        }
    }

    //criar parte da aula
    public static async post(
        id:number, 
        id_aula: number, 
        tx_descricao:string, 
        tx_texto:string, 
        tx_dir_imagem:string, 
        tx_url_video:string
    ): Promise<object>{
        try{

            const response = await api.post(
                '/aulaParte/post',
                {
                    id: id,
                    id_aula: id_aula,
                    tx_descricao: tx_descricao,
                    tx_texto: tx_texto,
                    tx_dir_imagem: tx_dir_imagem,
                    tx_url_video: tx_url_video
                }
            );
            const res = response?.data;

            if(res?.success){

                const obj = new AulaParte(
                    id,
                    id_aula,
                    tx_descricao,
                    tx_texto,
                    tx_dir_imagem,
                    tx_url_video
                );

                return {
                    success: true,
                    message: res?.message??'Parte da aula criada com sucesso.',
                    data: obj
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar criar parte da aula.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??'Erro ao tentar criar parte da aula.',
            }
        }
    }

    //atualizar parte da aula
    public async put(
        tx_descricao:string, 
        tx_texto:string, 
        tx_dir_imagem:string, 
        tx_url_video:string
    ): Promise<object>{
        try{

            const response = await api.put(
                '/aulaParte/put',
                {
                    id: this.id,
                    id_aula: this.id_aula,
                    tx_descricao: tx_descricao,
                    tx_texto: tx_texto,
                    tx_dir_imagem: tx_dir_imagem,
                    tx_url_video: tx_url_video
                }
            );
            const res = response?.data;

            if(res?.success){

                this.tx_descricao = tx_descricao;
                this.tx_texto = tx_texto;
                this.tx_dir_imagem = tx_dir_imagem;
                this.tx_url_video = tx_url_video;

                return {
                    success: true,
                    message: res?.message??'Parte da aula atualizada com sucesso.',
                    data: this
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar editar parte da aula.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message: error?.message??'Error ao tentar editar a parte da aula',
            }
        }
    }
}