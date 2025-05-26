export class jsonManipulator {

    public static parseStringToArray(str:string):Array<any> {

        const jsonStr = str
            .replace(/([{,]\s*)(\d+)(\s*:)/g, '$1"$2"$3') 
            .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');

        const obj = JSON.parse(jsonStr);

        return Object.values(obj);
    }
}