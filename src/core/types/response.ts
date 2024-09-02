export type ResponseData<S, E> = {
    success: true,
    data: S
} | {
    success: false,
    error: E
}
