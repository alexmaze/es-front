declare const require: (string) => any
declare module "*.json" {
    const value: any;
    export default value;
}
