package models.search

final case class SearchResults(documents: List[SearchDocument], total: Int)
