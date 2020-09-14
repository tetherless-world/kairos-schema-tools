package models.schema

import models.json.JsonNodeLocation

final case class Steps(list: List[Step], sourceJsonNodeLocation: JsonNodeLocation)
