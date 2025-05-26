import api from "../services/api";

export default class Admin{
    private id: number;
    private tx_login: string;
    private tx_senha: string;

    constructor(
        id:number, 
        tx_login:string, 
        tx_senha:string
    ) {
        this.id = id;
        this.tx_login = tx_login;
        this.tx_senha = tx_senha;
    }

    public getId():number{
        return this.id;
    }

    public getLogin():string{
        return this.tx_login;
    }

    //Buscar o administrador pelo login e pela senha
    public static async get(
        tx_login:string, 
        tx_senha:string
    ): Promise<object> {

        try{

            const response = await api.get(`/admin/get?tx_login=${tx_login}&tx_senha=${tx_senha}`);
            const res = response?.data;

            if(res.success){

                const admin = res.data;

                const obj = new Admin(
                    admin.id, 
                    tx_login, 
                    tx_senha
                );

                return {
                    success: true,
                    message: res.message,
                    data: obj
                }
            }else{
                throw new Error(res?.message??'Erro ao tentar realizar login.');
            }

        }catch(error:any){
            console.error(error);
            return {
                success: false,
                message:  error?.message??'Error ao tentar realizar login.'
            }
        }
    }
}