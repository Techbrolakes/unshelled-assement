export const paginationUtil = ({ page, perpage, total }: { page: number; perpage: number; total: number }) => {
  return {
    // Get the next page number
    currentPage: Number(page),

    // Get the previous page number
    hasNext: page < Math.ceil(total / perpage),

    hasPrevious: page > 1,

    // Get the page size
    lastPage: Math.ceil(total / perpage),

    // Check if there is a next page
    next: page + 1,

    // Get the total number of records
    pageSize: perpage,

    // Check if there is a previous page
    prevPage: page - 1,

    // Get the current page number
    total: total,
  };
};
