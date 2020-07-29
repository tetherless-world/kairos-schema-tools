package formats.sdf

import edu.rpi.tw.twks.uri.Uri
import models.schema.SchemaPath

final class MalformedSchemaDataFormatDocumentException(message: String, val path: SchemaPath) extends Exception(message)
