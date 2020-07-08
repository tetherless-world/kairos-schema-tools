package formats.sdf.vocabulary

import edu.rpi.tw.twks.uri.Uri
import io.github.tetherlessworld.scena.PropertyGetters
import org.apache.jena.rdf.model.Resource

trait KairosProperties extends PropertyGetters {
  def akas: List[String] = getPropertyObjectStrings(KAIROS.aka)
  def comments: List[String] = getPropertyObjectStrings(KAIROS.comment)
  def references: List[Uri] = getPropertyObjectResourceUris(KAIROS.reference).map(Uri.parse(_))
  def schemas: List[Resource] = getPropertyObjectResources(KAIROS.schemas)
  def steps: List[Resource] = getPropertyObjectResources(KAIROS.steps)
  def supers: List[Uri] = getPropertyObjectResourceUris(KAIROS.`super`).map(Uri.parse(_))
  def sdfVersions: List[String] = getPropertyObjectStrings(KAIROS.sdfVersion)
}
