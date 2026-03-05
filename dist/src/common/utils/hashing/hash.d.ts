export declare function hash(plainText: string, salt?: number): Promise<string>;
export declare function compare(plainText: string, hash: string): Promise<boolean>;
