export type Pagination = {
    currentPage : number;
    pageSize : number;
    totalCount: number;
    totalPages: number;
}

export type paginatedResult<T> = {
    items : T[];
    metadata: Pagination;
}