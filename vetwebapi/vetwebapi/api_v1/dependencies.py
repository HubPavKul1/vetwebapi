from fastapi import Query


def get_pagination_params(
    # page must be greater than 0
    page: int = Query(1, gt=0),
    # per_page must be greater than 0
    per_page: int = Query(9, gt=0),
):
    return {"page": page, "per_page": per_page}
