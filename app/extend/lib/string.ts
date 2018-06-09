export default {
    camelize(str: string): string {
        return str.replace(/[_-][a-z]/ig, s => s[1].toUpperCase());
    }
}
