package validators

import models.schema.{DefinitionPath, Participant, Schema}
import models.sdfDocument.SdfDocument
import models.validation.{ValidationMessage, ValidationMessageType}

import scala.concurrent.Future

object ParticipantRefvarConstraintsValidator extends SdfDocumentValidator {
  private def validateParticipantsWithRefvar(participants: List[Participant], refvar: String, schema: Schema): List[ValidationMessage] = {
    if (participants.length == 1) {
      return List()
    }

    def validateEntityTypes(): List[ValidationMessage] = {
      val participantEntityTypes = participants.map(_.entityTypes)
      if (participantEntityTypes.forall(_ == participantEntityTypes.head)) {
        return List()
      }
      List(ValidationMessage(s"participants with refvar ${refvar} do not have the same entity types", schema.path, ValidationMessageType.Warning))
    }

    def validateReferences(): List[ValidationMessage] = {
      val participantReferences = participants.map(_.references)
      if (participantReferences.forall(_ == participantReferences.head)) {
        return List()
      }
      List(ValidationMessage(s"participants with refvar ${refvar} do not have the same references", schema.path, ValidationMessageType.Warning))
    }

    validateEntityTypes() ++ validateReferences()
  }


  override def validateSdfDocument(sdfDocument: SdfDocument): Future[List[ValidationMessage]] =
    Future.successful(sdfDocument.schemas.flatMap(schema => {
      schema.steps.list
        .flatMap(step => step.participants.getOrElse(List())
          .flatMap(participant => participant.refvar.map(refvar => (refvar, participant)))).groupBy(_._1).values.flatMap(
        participantsWithRefvar => validateParticipantsWithRefvar(participants = participantsWithRefvar.map(_._2), refvar = participantsWithRefvar(0)._1, schema = schema))
    }))
}
