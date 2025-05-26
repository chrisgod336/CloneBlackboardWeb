import { BootstrapColors } from "../../constants/Colors"

export class ColorChoiser {
    public static nivelVariant = (nivel: string): 'danger' | 'warning' | 'secondary' | 'primary' | 'success' => {
        if(!nivel){
            return 'secondary';
        }
        switch(nivel.toLowerCase().trim()) {
            case 'muito baixo':
                return 'danger';
            case 'baixo':
                return 'warning';
            case 'medio':
                return 'secondary';
            case 'alto':
                return 'primary';
            case 'muito alto':
                return 'success';
            default:
                return 'secondary'; 
        }
    }
}