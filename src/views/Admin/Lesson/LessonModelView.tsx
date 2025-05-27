import Swal from "sweetalert2"

export const postAll = (
    description:string,
    part1:any,
    part2:any,
    part3:any,
    questions:any
) => {
    try{
        alert('TESTE')
        console.log('Desc: ', description);
        console.log('Part1: ', part1);
        console.log('Part2: ', part2);
        console.log('Part3: ', part3);
        console.log('Questions: ', questions);
    }catch(error:any){
        Swal.fire({
            title: 'Erro!',
            text: 'Erro aon tentar criar questão.',
            icon: 'error'
        })
        console.error(error);
        return {
            success: false
        }
    }
}