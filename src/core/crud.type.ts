export type NoInfer<T> = [T][T extends unknown ? 0 : never];
