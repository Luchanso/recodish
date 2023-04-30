export const promiseChain = async <T>(promises: (() => Promise<T>)[]) => {
    for (const promise of promises) {
        await promise();
    }
};
