import Swal from "sweetalert2"

import Aluno from "../../../models/AlunoModel"
import { BootstrapColors } from "../../../constants/Colors";

export const post = async (
    tx_nome: string,
    tx_login: string
) => {
    try{

        if(!tx_nome || !tx_login){
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Campos Nome e Login são obrigatórios.',
                confirmButtonColor: BootstrapColors.primary
            });
            return{
                success: false
            }
        }else if(tx_nome.length < 4 || tx_login.length < 4){
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Campos Nome e Login devem possuir no mínimo 4 caracteres.',
                confirmButtonColor: BootstrapColors.primary
            });
            return{
                success: false
            }
        }

        const response:any = await Aluno.post(
            tx_nome,
            tx_login
        )

        if(response.success){
            return {
                success: true,
                data: response.data
            }
        }else{
            throw new Error(response.message||'Erro desconhecido.');
        }

    }catch(error:any){
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Erro ao tentar criar aluno.',
            confirmButtonColor: BootstrapColors.primary
        });
        return {
            success: false
        }
    }
}

export const get = async(
    id: number
) => {
        try{

        const response:any = await Aluno.get(
            id
        );

        if(response.success){
            return {
                success: true,
                data: response.data
            }
        }else{
            throw new Error(response.message||'Erro desconhecido.');
        }

    }catch(error:any){
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Erro ao tentar encontrar aluno.',
            confirmButtonColor: BootstrapColors.primary
        });
        return {
            success: false
        }
    }
}

export const put = async (
    aluno:Aluno,
    tx_nome:string,
    tx_login:string
) => {
    try{

        if(!tx_nome || !tx_login){
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Campos Nome e Login são obrigatórios.',
                confirmButtonColor: BootstrapColors.primary
            });
            return{
                success: false
            }
        }else if(tx_nome.length < 4 || tx_login.length < 4){
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Campos Nome e Login devem possuir no mínimo 4 caracteres.',
                confirmButtonColor: BootstrapColors.primary
            });
            return{
                success: false
            }
        }

        const response:any = await aluno.put(
            tx_nome,
            tx_login
        );

        if(response.success){
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Aluno atualizado com sucesso.',
                confirmButtonColor: BootstrapColors.primary
            });
            return {
                success: true,
                data: response.data
            }
        }else{
            throw new Error(response.message||'Erro desconhecido.');
        }

    }catch(error:any){
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Erro ao tentar atualizar aluno.',
            confirmButtonColor: BootstrapColors.primary
        });
        return {
            success: false
        }
    }
}

export const del = async (
    aluno:Aluno
) => {
    try{

        const response:any = await aluno.delete();
        if(response.success){
            return {
                success: true
            }
        }else{
            throw new Error(response.message||'Erro desconhecido.');
        }

    }catch(error:any){
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Erro ao tentar deletar aluno.',
            confirmButtonColor: BootstrapColors.primary
        });
        return {
            success: false
        }
    }
}