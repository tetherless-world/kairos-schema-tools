package validators

import java.nio.file.Files

import javax.inject.Inject
import models.schema.{DefinitionPath, EntityTypes}
import models.sdfDocument.SdfDocument
import models.validation.{ValidationMessage, ValidationMessageType}
import org.apache.jena.rdf.model.{Model, ModelFactory, ResourceFactory}
import org.apache.jena.riot.RiotException
import org.apache.jena.vocabulary.RDF
import org.slf4j.LoggerFactory
import play.api.Configuration
import stores.FsStoreConfiguration

import scala.collection.JavaConverters._
import scala.concurrent.Future

class ChronosOntologyValidator @Inject() (configuration: Configuration) extends SdfDocumentValidator {
  private val logger = LoggerFactory.getLogger(classOf[ChronosOntologyValidator])
  private object Namespaces {
    val GLO = "http://www.ibm.com/GLO#"
    val KAIROS_TAGSET = "http://www.kairos.com/kairosTagset#"
    val KAIROS_WIKIDATA = "https://www.wikidata.org/wiki/";
  }

  private def readChronosOntology(): Option[Model] = {
    val fsStoreConfiguration = FsStoreConfiguration.fromConfiguration(configuration)
    if (!fsStoreConfiguration.isDefined) {
      return None
    }

    val ttlFilePath = fsStoreConfiguration.get.dataDirectoryPath.resolve("CHRONOS.ttl")
    if (!Files.isRegularFile(ttlFilePath)) {
      logger.warn("unable to locate CHRONOS ontology definition at {}", ttlFilePath)
      return None
    }

    val model = ModelFactory.createDefaultModel()
    try {
      model.read(ttlFilePath.toUri.toString)
    } catch {
      case e: RiotException => {
        logger.error("error reading CHRONOS ontology at {}:", ttlFilePath.toString, e.asInstanceOf[Any])
        return None
      }
    }

    Some(model)
  }

  private val chronosOntology: Option[Model] = readChronosOntology()

  def enabled = chronosOntology.isDefined


  private def validateEntityTypesAgainstWikidata(entityTypes: EntityTypes, path: DefinitionPath, reference: String): List[ValidationMessage] = {
    if (!reference.startsWith(Namespaces.KAIROS_WIKIDATA)) {
      logger.info("{}: ignoring non-Wikidata reference {}", path.asInstanceOf[Any], reference.asInstanceOf[Any])
      return List()
    }
    val qnode = reference.substring(Namespaces.KAIROS_WIKIDATA.length)
    val wdidStatements = chronosOntology.get.listStatements(null, ResourceFactory.createProperty(Namespaces.GLO + "WDID"), ResourceFactory.createPlainLiteral(qnode)).asScala.toList
    if (wdidStatements.isEmpty) {
      logger.info("{}: no CHRONOS resource for Wikidata QNode {}", path.toString.asInstanceOf[Any], qnode.asInstanceOf[Any])
      return List()
    }
    val wdidStatement = wdidStatements(0)
    val domainEntityResource = wdidStatement.getSubject
    if (!domainEntityResource.isURIResource) {
      logger.info("{}: no CHRONOS URI resource for Wikidata QNode {}", path.toString.asInstanceOf[Any], qnode.asInstanceOf[Any])
      return List()
    }
    val typeStatement = domainEntityResource.getProperty(RDF.`type`)
    if (typeStatement == null) {
      logger.info("{}: CHRONOS resource {} corresponding to Wikidata QNode {} has no rdf:type statement", path, domainEntityResource.getURI, qnode)
      return List()
    }
    if (typeStatement.getObject != ResourceFactory.createResource(Namespaces.GLO + "DomainEntity")) {
      logger.warn("{}: CHRONOS resource {} with Wikidata QNode {} is not a DomainEntity", path.toString.asInstanceOf[Object], domainEntityResource.getURI.asInstanceOf[Object], qnode.asInstanceOf[Object])
      return List()
    }
    val mapsToStatement = domainEntityResource.getProperty(ResourceFactory.createProperty(Namespaces.GLO + "mapsTo"))
    if (mapsToStatement == null) {
      logger.warn("{}: CHRONOS resource {} with Wikidata QNode {} has no mapsTo statement", path.toString.asInstanceOf[Object], domainEntityResource.getURI.asInstanceOf[Object], qnode.asInstanceOf[Object])
      return List()
    }
    if (!mapsToStatement.getObject.isURIResource) {
      logger.warn("{}: CHRONOS resource {} with Wikidata QNode {} mapsTo a non-URI resource", path.toString.asInstanceOf[Object], domainEntityResource.getURI.asInstanceOf[Object], qnode.asInstanceOf[Object])
      return List()
    }
    val mapsToResourceUri = mapsToStatement.getObject.asResource().getURI
    if (!mapsToResourceUri.startsWith(Namespaces.KAIROS_TAGSET)) {
      logger.warn("{}: CHRONOS resource {} with Wikidata QNode {} mapsTo a non-tagset resource: {}", path, domainEntityResource.getURI, qnode, mapsToResourceUri)
      return List()
    }
    val expectedEntityType = mapsToResourceUri.substring(Namespaces.KAIROS_TAGSET.length)
    if (!entityTypes.entityTypes.exists(entityType => entityType.value == expectedEntityType)) {
      logger.warn("{}: Wikidata QNode {} reference maps to entity type {} via CHRONOS domain entity {}, but entity type not found in set: ", path, qnode, expectedEntityType, domainEntityResource.getURI, entityTypes.entityTypes.map(_.value).mkString(" "))
      List(ValidationMessage(s"Wikidata QNode ${qnode} reference maps to entity type ${expectedEntityType} via CHRONOS domain entity ${domainEntityResource.getURI}, but entity type not found in set: ${entityTypes.entityTypes.map(_.value).mkString(" ")}", path, ValidationMessageType.Warning))
    } else {
      logger.info("{}: Wikidata QNode {} reference maps correctly to expected entity type {} via CHRONOS domain entity {}", path, qnode, expectedEntityType, domainEntityResource.getURI)
      List()
    }
  }

  override def validateSdfDocument(sdfDocument: SdfDocument): Future[List[ValidationMessage]] = {
    if (!chronosOntology.isDefined) {
      return Future.successful(List())
    }
//    chronosOntology.get.write(System.out)
    Future.successful(sdfDocument.schemas.flatMap(schema => schema.steps.list.flatMap(step => step.participants.getOrElse(List()).flatMap(participant => {
      if (participant.entityTypes.isDefined && participant.references.isDefined) {
        participant.references.get.flatMap(reference => validateEntityTypesAgainstWikidata(entityTypes = participant.entityTypes.get, path = participant.path, reference = reference))
      } else {
        List()
      }
    }))))
  }
}
