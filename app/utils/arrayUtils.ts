export default class ArrayUtils {
    public static async numberToString(numbers: String[]) {
        let result = new Array();
        for (let i = 0; i < numbers.length; i++) {
            result[i] = '\'' + numbers[i] + '\'';
        }
        return result;
    }
}