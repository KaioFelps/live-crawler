export interface Presentable<T = object> {
    __present(): T
}

export class Presenter {
    public static map(item: Presentable) {
        return item.__present();
    }
}