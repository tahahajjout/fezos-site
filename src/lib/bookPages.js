// The price list as book pages of a fixed size: a category longer than `perPage` services
// continues on the next page. Pages are then grouped into views: a two-page spread, or one page.

export function paginate(categories, perPage) {
  return categories.flatMap((category) => {
    const pages = []
    for (let i = 0; i < category.services.length; i += perPage) {
      pages.push({ category, services: category.services.slice(i, i + perPage), continued: i > 0 })
    }
    return pages
  })
}

export function toViews(pages, perView) {
  const views = []
  for (let i = 0; i < pages.length; i += perView) views.push(pages.slice(i, i + perView))
  return views
}

/** View that holds the first page of a category (0 if not found). */
export function viewOfCategory(views, id) {
  return Math.max(0, views.findIndex((view) => view.some((p) => p.category.id === id && !p.continued)))
}
