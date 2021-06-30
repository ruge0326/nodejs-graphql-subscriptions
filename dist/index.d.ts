interface ConnectionParams {
    [paramName: string]: any;
}
declare type GetSubscriptionParams = {
    url: string;
    query: string;
    variables?: any;
    connectionParams: ConnectionParams;
    onData: (value: object) => void;
    onError: (error: any) => void;
};
export declare const getSubscription: ({ url, query, variables, onData, onError, connectionParams }: GetSubscriptionParams) => import("zen-observable-ts").ZenObservable.Subscription;
export {};
