package models.graphql

import play.api.mvc.Request
import services.Services
import stores.Store

final class GraphQlSchemaContext(request: Request[_], val services: Services, val store: Store)
