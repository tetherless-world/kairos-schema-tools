package models.schema

import models.json.JsonNodeLocation

final case class Steps(sourceJsonNodeLocation: JsonNodeLocation, steps: List[Step])
