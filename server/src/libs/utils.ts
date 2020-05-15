
export const createDocs = (count: number, obj: () => any): any[] => {
    let docs: any[] = [];
    for (let index = 0; index < count; index++) {
        docs = [...docs, obj()]
    }
    return docs;
};