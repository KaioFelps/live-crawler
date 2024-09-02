export interface Presentable<T = object> {
    __present(): T
}

export class Presenter {
    public static map<T>(item: Presentable<T>) {
        return item.__present();
    }
}