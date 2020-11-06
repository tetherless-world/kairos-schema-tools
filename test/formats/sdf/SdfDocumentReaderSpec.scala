package formats.sdf

import java.util.UUID

import edu.rpi.tw.twks.uri.Uri
import io.github.tetherlessworld.twxplore.lib.base.WithResource
import models.schema.{BeforeAfterStepOrder, ContainerContainedStepOrder, OverlapsStepOrder}
import models.validation.ValidationMessageType
import org.scalatest.{Matchers, WordSpec}
import stores.ConfData

import scala.io.Source

class SdfDocumentReaderSpec extends WordSpec with Matchers with WithResource {
  "Schema data format document reader" can {
    "return a valid document even if JSON parsing fails" in {
      val sourceUri = Uri.parse("urn:uuid:" + UUID.randomUUID().toString)
      withResource(new SdfDocumentReader(Source.fromString(""), sourceUri)) { reader =>
        val document = reader.read()
        document.id should equal(sourceUri)
        document.validationMessages.size should be > 0
        val validationMessage = document.validationMessages(0)
        validationMessage.`type` should equal(ValidationMessageType.Fatal)
        validationMessage.message should not be empty
      }
    }

    "read the coordinated bombing attack TA1 example" in {
      val testDocument = ConfData.coordinatedBombingAttackTa1
      withResource(new SdfDocumentReader(Source.fromString(testDocument.sourceJson), testDocument.id)) { reader =>
        val document = reader.read()

        document.id should equal(testDocument.id)
        document.sdfVersion should equal(testDocument.sdfVersion)
        document.sourceJson should not be empty
        document.task2 should be(None)
        document.validationMessages should be(List())

        val primitives = document.primitives
        primitives.size should be(2)
        for (primitive <- primitives) {
          primitive.slots.size should be > 3
        }

        val schemas = document.schemas
        schemas.size should equal(1)
        val schema = schemas(0)
//        schema.aka should not be None
//        for (aka <- schema.aka.get) {
//          schema.aka should not be empty
//        }
        schema.comments should not be None
        // schema has empty comment
//        for (comment <- schema.comments.get) {
//          comment should not be empty
//        }
        schema.description should be("A coordinated effort by mulitple parties that results in a bombing attack")
        schema.entityRelations should not be empty
        for (entityRelation <- schema.entityRelations) {
          entityRelation.comments should not be None
          entityRelation.comments.get should not be empty
        }
        schema.name should be("Coordinated Bombing Attack")
        schema.order should not be empty
        for (order <- schema.order) {
          order.stepIds should not be empty
          for (stepId <- order.stepIds) {
            schema.steps.list.exists(_.id == stepId) should be (true)
          }
        }
        schema.order.exists(order => order.comments.isDefined && order.comments.get.nonEmpty) should be (true)
        schema.order.exists(order => order.flags.isDefined && order.flags.get.nonEmpty) should be (true)
        schema.order.exists(_.isInstanceOf[BeforeAfterStepOrder]) should be (true)
        schema.order.exists(_.isInstanceOf[ContainerContainedStepOrder]) should be (true)
        schema.order.exists(_.isInstanceOf[OverlapsStepOrder]) should be (true)
        schema.privateData should not be None
        schema.privateData.get should include("Performers can place any keys/values they wish here")
        schema.slots should not be empty
        for (slot <- schema.slots) {
          slot.roleName should not be empty
        }
        for (aka <- schema.slots.find(_.aka.isDefined).get.aka.get) {
          aka should not be empty
        }
        schema.slots.exists(_.entityTypes.isDefined) should be (true)
        schema.slots.exists(_.refvar.isDefined) should be(true)
        schema.steps.list should not be empty
        for (step <- schema.steps.list) {
          step.name should not be empty
          step.participants should not be None
          val participants = step.participants.get
          participants should not be empty
          for (participant <- participants) {
            participant.name should not be empty
            participant.entityTypes.get.entityTypes should not be empty
          }
        }
        schema.steps.list.exists(_.achieves.isDefined) should be(true)
        for (aka <- schema.steps.list.find(_.aka.isDefined).get.aka.get) {
          aka should not be empty
        }
        for (comment <- schema.steps.list.find(_.comments.isDefined).get.comments.get) {
          comment should not be empty
        }
        schema.steps.list.exists(_.references.isDefined) should be(true)
        schema.steps.list.exists(_.maxDuration.isDefined) should be (true)
        schema.steps.list.exists(_.minDuration.isDefined) should be (true)
        schema.steps.list.exists(_.requires.isDefined) should be(true)
//        schema.`super` should not be None
        schema.ta2 should be (false)
//        schema.version should equal("caci-07.20.2020")
      }
    }

    "read the WTC TA2 example" in {
      val testDocument = ConfData.wtcTa2
      withResource(new SdfDocumentReader(Source.fromString(testDocument.sourceJson), testDocument.id)) { reader =>
        val document = reader.read()

        document.id should equal(testDocument.id)
        document.sdfVersion should equal(testDocument.sdfVersion)
        document.sourceJson should not be empty
        document.task2 should be(Some(false))
        document.validationMessages should be(List())

        val primitives = document.primitives
        primitives.size should be(2)
        for (primitive <- primitives) {
          primitive.slots.size should be > 3
        }

        val schemas = document.schemas
        schemas.size should equal(1)
        val schema = schemas(0)
        //        schema.aka should not be None
        //        for (aka <- schema.aka.get) {
        //          schema.aka should not be empty
        //        }
        schema.comments should not be None
        // schema has empty comment
        //        for (comment <- schema.comments.get) {
        //          comment should not be empty
        //        }
        schema.description should be("A terrorist attack on the World Trade Center, carried out on 2/26/1993, when a truck bomb detonated below the North Tower")
        schema.entities should not be None
        schema.entities.get should not be empty
        for (entity <- schema.entities.get) {
          entity.name should not be empty
        }
        schema.entities.get.exists(_.comments.isDefined) should be(true)
        schema.entities.get.exists(_.refvar.isDefined) should be(true)
        schema.entityRelations should not be empty
        for (entityRelation <- schema.entityRelations) {
          entityRelation.provenances.get should not be empty
          entityRelation.provenances should not be None
        }
        schema.name should be("World Trade Center 1993 Attack")
        schema.order should not be empty
        for (order <- schema.order) {
          order.stepIds should not be empty
          for (stepId <- order.stepIds) {
            schema.steps.list.exists(_.id == stepId) should be(true)
          }
        }
        schema.order.exists(order => order.comments.isDefined && order.comments.get.nonEmpty) should be(true)
        schema.order.exists(order => order.flags.isDefined && order.flags.get.nonEmpty) should be(true)
        schema.order.exists(_.isInstanceOf[BeforeAfterStepOrder]) should be(true)
        schema.order.exists(_.isInstanceOf[ContainerContainedStepOrder]) should be(true)
        schema.order.exists(_.isInstanceOf[OverlapsStepOrder]) should be(true)
        schema.privateData should not be None
        schema.privateData.get should include("Performers can place any keys/values they wish here")
        schema.provenanceData should not be None
        schema.provenanceData.get should not be empty
        for (provenanceDataObject <- schema.provenanceData.get) {
          provenanceDataObject.childId should not be empty
          provenanceDataObject.mediaType should not be empty
          provenanceDataObject.label should not be empty
        }
        schema.slots should not be empty
        for (slot <- schema.slots) {
          slot.roleName should not be empty
        }
        for (aka <- schema.slots.find(_.aka.isDefined).get.aka.get) {
          aka should not be empty
        }
        schema.slots.exists(_.entityTypes.isDefined) should be(true)
        schema.slots.exists(_.refvar.isDefined) should be(true)
        schema.steps.list should not be empty
        for (step <- schema.steps.list) {
          step.name should not be empty
          step.participants should not be None
          val participants = step.participants.get
          participants should not be empty
          for (participant <- participants) {
            participant.name should not be empty
            participant.entityTypes should not be None
            participant.entityTypes.get.entityTypes should not be empty
            if (participant.values.isDefined) {
              participant.values.get should not be empty
              for (value <- participant.values.get) {
                //              value.confidence should be >= 0
                value.provenances should not be empty
              }
            }
          }
          step.provenances should not be None
          step.provenances.get should not be empty
          if (step.temporalObjects.isDefined) {
            step.temporalObjects.get should not be empty
            for (temporalObject <- step.temporalObjects.get) {
              if (!temporalObject.absoluteTime.isDefined && !temporalObject.duration.isDefined && !temporalObject.earliestEndTime.isDefined && !temporalObject.earliestStartTime.isDefined && !temporalObject.latestEndTime.isDefined && !temporalObject.latestStartTime.isDefined) {
                throw new IllegalArgumentException("must define at least one of those fields")
              }
              temporalObject.label should not be empty
            }
          }
        }
        schema.steps.list.exists(_.achieves.isDefined) should be(true)
        for (aka <- schema.steps.list.find(_.aka.isDefined).get.aka.get) {
          aka should not be empty
        }
        for (comment <- schema.steps.list.find(_.comments.isDefined).get.comments.get) {
          comment should not be empty
        }
        schema.steps.list.exists(_.references.isDefined) should be(true)
        schema.steps.list.exists(_.maxDuration.isDefined) should be(true)
        schema.steps.list.exists(_.minDuration.isDefined) should be(true)
        //        schema.steps.list.exists(_.requires.isDefined) should be(true)
        schema.steps.list.exists(_.temporalObjects.isDefined) should be(true)
        schema.ta2 should be(true)
      }
    }
  }
}
