/**
 * Nếu value là undefined/null thì ném ra Error với message
 * Ngược lại trả về value đã chắc chắn tồn tại
 */
export function ensureExists<T>(value: T | undefined | null, message: string): T {
    if (value == null) {
        throw new Error(message);
    }
    return value;
}
