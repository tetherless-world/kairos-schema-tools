package validators.ksfValidationApi

import com.google.inject.ImplementedBy
import validators.SdfDocumentValidator

@ImplementedBy(classOf[RestKsfValidationApi])
trait KsfValidationApi extends SdfDocumentValidator {
}
